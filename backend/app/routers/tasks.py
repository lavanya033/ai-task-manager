from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import Optional 

from app.utils.activity_logger import create_activity_log

from app.models import Task, User
from app.schemas.task import TaskCreate, TaskUpdate
from app.utils.dependencies import (
    get_db,
    get_current_user,
    require_admin
)


router = APIRouter(
    prefix="/tasks",
    tags=["Tasks"]
)


# Admin creates and assigns task
@router.post("/")
def create_task(
    task_data: TaskCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_admin)
):

    assigned_user = db.query(User).filter(
        User.id == task_data.assigned_to
    ).first()

    if not assigned_user:
        raise HTTPException(
            status_code=404,
            detail="Assigned user not found"
        )

    task = Task(
        title=task_data.title,
        description=task_data.description,
        assigned_to=task_data.assigned_to,
        created_by=current_user.id
    )

    db.add(task)
    db.commit()
    db.refresh(task)

    return {
        "message": "Task created successfully",
        "task": task
    }


# Admin sees all tasks
# User sees only assigned tasks
# Supports filtering
@router.get("/")
def get_tasks(
    status: Optional[str] = Query(None),
    assigned_to: Optional[int] = Query(None),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    query = db.query(Task)

    # User can see only their tasks
    if current_user.role.name == "user":
        query = query.filter(
            Task.assigned_to == current_user.id
        )

    # Admin can filter by assigned user
    elif assigned_to is not None:
        query = query.filter(
            Task.assigned_to == assigned_to
        )

    # Dynamic status filtering
    if status is not None:
        query = query.filter(
            Task.status == status
        )

    tasks = query.all()

    return tasks


# User/Admin updates task status
@router.patch("/{task_id}")
def update_task_status(
    task_id: int,
    task_data: TaskUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    task = db.query(Task).filter(
        Task.id == task_id
    ).first()

    if not task:
        raise HTTPException(
            status_code=404,
            detail="Task not found"
        )

    # Normal user can update only their own task
    if (
        current_user.role.name == "user"
        and task.assigned_to != current_user.id
    ):
        raise HTTPException(
            status_code=403,
            detail="You cannot update this task"
        )

    # Only allow completed or pending
    if task_data.status not in ["pending", "completed"]:
        raise HTTPException(
            status_code=400,
            detail="Status must be pending or completed"
        )

    task.status = task_data.status

    db.commit()
    db.refresh(task)

    create_activity_log(
    db=db,
    user_id=current_user.id,
    action="task_updated",
    details=f"Task ID {task.id} status changed to {task.status}"
    )

    return {
        "message": "Task updated successfully",
        "task": task
    }