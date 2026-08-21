from datetime import datetime, timedelta
from jose import jwt
import re
from passlib.context import CryptContext


SECRET_KEY = "my_super_secret_key_123456789"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60


pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto"
)

def validate_password(password):
    if len(password) < 8:
        return "Password must be at least 8 characters long"

    if not re.search(r"[A-Z]", password):
        return "Password must contain at least one uppercase letter"

    if not re.search(r"[a-z]", password):
        return "Password must contain at least one lowercase letter"

    if not re.search(r"\d", password):
        return "Password must contain at least one number"

    if not re.search(r"[!@#$%^&*]", password):
        return "Password must contain at least one special character"

    return None

def hash_password(password):
    return pwd_context.hash(password)


def verify_password(plain_password, hashed_password):
    return pwd_context.verify(
        plain_password,
        hashed_password
    )


def create_access_token(data):
    data_to_encode = data.copy()

    expire = datetime.utcnow() + timedelta(
        minutes=ACCESS_TOKEN_EXPIRE_MINUTES
    )

    data_to_encode["exp"] = expire

    token = jwt.encode(
        data_to_encode,
        SECRET_KEY,
        algorithm=ALGORITHM
    )

    return token