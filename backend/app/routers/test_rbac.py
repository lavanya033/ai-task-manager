from fastapi import APIRouter, Depends

from app.utils.dependencies import (
    get_current_user,
    require_admin
)


router = APIRouter(
    prefix="/test",
    tags=["RBAC Testing"]
)


@router.get("/profile")
def get_profile(
    current_user=Depends(get_current_user)
):

    return {
        "message": "Authenticated successfully",
        "username": current_user.username,
        "role": current_user.role.name
    }


@router.get("/admin")
def admin_only(
    current_user=Depends(require_admin)
):

    return {
        "message": "Welcome Admin!",
        "username": current_user.username
    }