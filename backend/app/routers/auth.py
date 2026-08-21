from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from app.utils.activity_logger import create_activity_log
from app.utils.dependencies import get_db
from app.models import User, Role
from app.utils.security import (
    verify_password,
    create_access_token,
    hash_password,
    validate_password
)


router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)


# USER SIGNUP
@router.post("/signup")
def signup(
    username: str,
    email: str,
    password: str,
    db: Session = Depends(get_db)
):

    # Check username
    existing_username = db.query(User).filter(
        User.username == username
    ).first()

    if existing_username:
        raise HTTPException(
            status_code=400,
            detail="Username already exists"
        )

    # Check email
    existing_email = db.query(User).filter(
        User.email == email
    ).first()

    if existing_email:
        raise HTTPException(
            status_code=400,
            detail="Email already exists"
        )

    # Validate password
    password_error = validate_password(password)

    if password_error:
        raise HTTPException(
            status_code=400,
            detail=password_error
        )

    # Get user role automatically
    user_role = db.query(Role).filter(
        Role.name == "user"
    ).first()

    if not user_role:
        raise HTTPException(
            status_code=500,
            detail="User role not found"
        )

    # Create user
    new_user = User(
        username=username,
        email=email,
        password=hash_password(password),
        role_id=user_role.id
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {
        "message": "User registered successfully",
        "user": {
            "id": new_user.id,
            "username": new_user.username,
            "email": new_user.email,
            "role": "user"
        }
    }


# LOGIN
@router.post("/login")
def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):

    user = db.query(User).filter(
        User.email == form_data.username
    ).first()

    if not user:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    password_correct = verify_password(
        form_data.password,
        user.password
    )

    if not password_correct:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    token = create_access_token(
        {
            "sub": str(user.id),
            "role": user.role.name
        }
    )

    create_activity_log(
        db=db,
        user_id=user.id,
        action="login",
        details=f"{user.username} logged in"
    )

    return {
        "access_token": token,
        "token_type": "bearer",
        "role": user.role.name
    }