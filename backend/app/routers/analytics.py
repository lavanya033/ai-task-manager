from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func

from app.models import Task, Document, ActivityLog, User
from app.utils.dependencies import (
    get_db,
    get_current_user,
    require_admin
)


router = APIRouter(
    prefix="/analytics",
    tags=["Analytics"]
)


# ==========================================
# ADMIN ANALYTICS
# ==========================================

@router.get("/")
def get_analytics(
    db: Session = Depends(get_db),
    current_user: User = Depends(require_admin)
):

    # Total tasks
    total_tasks = db.query(Task).count()

    # Completed tasks
    completed_tasks = db.query(Task).filter(
        Task.status == "completed"
    ).count()

    # Pending tasks
    pending_tasks = db.query(Task).filter(
        Task.status == "pending"
    ).count()

    # Total documents
    total_documents = db.query(Document).count()

    # Total searches
    total_searches = db.query(ActivityLog).filter(
        ActivityLog.action == "search"
    ).count()

    # Most searched queries
    most_searched = (
        db.query(
            ActivityLog.details,
            func.count(ActivityLog.id).label("count")
        )
        .filter(
            ActivityLog.action == "search"
        )
        .group_by(
            ActivityLog.details
        )
        .order_by(
            func.count(ActivityLog.id).desc()
        )
        .limit(5)
        .all()
    )

    top_queries = []

    for query in most_searched:

        search_query = query.details.replace(
            "Search query: ",
            ""
        )

        top_queries.append(
            {
                "query": search_query,
                "count": query.count
            }
        )

    return {
        "total_tasks": total_tasks,
        "completed_tasks": completed_tasks,
        "pending_tasks": pending_tasks,
        "total_documents": total_documents,
        "total_searches": total_searches,
        "most_searched_queries": top_queries
    }


# ==========================================
# ROLE-BASED DASHBOARD
# ==========================================

@router.get("/dashboard")
def get_dashboard(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    # ======================================
    # ADMIN DASHBOARD
    # ======================================

    if current_user.role.name == "admin":

        total_tasks = db.query(Task).count()

        completed_tasks = db.query(Task).filter(
            Task.status == "completed"
        ).count()

        pending_tasks = db.query(Task).filter(
            Task.status == "pending"
        ).count()

        total_documents = db.query(Document).count()

        total_searches = db.query(ActivityLog).filter(
            ActivityLog.action == "search"
        ).count()


    # ======================================
    # USER DASHBOARD
    # ======================================

    else:

        total_tasks = db.query(Task).filter(
            Task.assigned_to == current_user.id
        ).count()

        completed_tasks = db.query(Task).filter(
            Task.assigned_to == current_user.id,
            Task.status == "completed"
        ).count()

        pending_tasks = db.query(Task).filter(
            Task.assigned_to == current_user.id,
            Task.status == "pending"
        ).count()

        # Users don't manage documents
        total_documents = 0

        # Only this user's searches
        total_searches = db.query(ActivityLog).filter(
            ActivityLog.user_id == current_user.id,
            ActivityLog.action == "search"
        ).count()


    return {
        "total_tasks": total_tasks,
        "completed_tasks": completed_tasks,
        "pending_tasks": pending_tasks,
        "total_documents": total_documents,
        "total_searches": total_searches
    }