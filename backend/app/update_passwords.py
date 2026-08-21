from app.database import SessionLocal
from app.models import User
from app.utils.security import hash_password


db = SessionLocal()

try:
    admin = db.query(User).filter(
        User.email == "admin@example.com"
    ).first()

    user = db.query(User).filter(
        User.email == "user@example.com"
    ).first()

    if admin:
        admin.password = hash_password("admin123")

    if user:
        user.password = hash_password("user123")

    db.commit()

    print("Passwords hashed successfully!")

finally:
    db.close()