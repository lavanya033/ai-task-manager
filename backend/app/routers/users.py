from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.models import User
from app.utils.dependencies import get_db, require_admin


router = APIRouter(
    prefix="/users",
    tags=["Users"]
)


@router.get("/")
def get_all_users(
    db: Session = Depends(get_db),
    current_user: User = Depends(require_admin)
):

    users = db.query(User).all()

    return [
        {
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "role": user.role.name
        }
        for user in users
    ]