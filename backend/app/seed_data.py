from app.database import SessionLocal
from app.models import Role, User


db = SessionLocal()

try:
    # Create roles
    admin_role = Role(name="admin")
    user_role = Role(name="user")

    db.add(admin_role)
    db.add(user_role)
    db.commit()

    # Create admin
    admin = User(
        username="admin",
        email="admin@example.com",
        password="admin123",
        role_id=admin_role.id
    )

    # Create normal user
    user = User(
        username="user",
        email="user@example.com",
        password="user123",
        role_id=user_role.id
    )

    db.add(admin)
    db.add(user)
    db.commit()

    print("Roles and users created successfully!")

except Exception as error:
    print("Error:", error)

finally:
    db.close()