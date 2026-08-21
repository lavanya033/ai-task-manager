from app.database import SessionLocal
from app.models import User
from app.utils.security import hash_password

db = SessionLocal()

admin = db.query(User).filter(
    User.role.has(name="admin")
).first()

if not admin:
    print("Admin not found")

else:
    admin.email = "admin@gmail.com"
    admin.password = hash_password("Admin@123")

    db.commit()

    print("Admin credentials updated successfully")

db.close()