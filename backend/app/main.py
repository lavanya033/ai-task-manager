from fastapi import FastAPI 
from fastapi.middleware.cors import CORSMiddleware
from app.database import Base, engine
from app import models 

from app.routers import tasks

from app.routers import auth
from app.routers import test_rbac
from app.routers import documents
from app.routers import search
from app.routers import analytics
from app.routers import users


Base.metadata.create_all(bind=engine)

app = FastAPI(title="AI Task & Knowledge Management System")


app.include_router(auth.router)
app.include_router(test_rbac.router)
app.include_router(tasks.router)
app.include_router(documents.router)
app.include_router(search.router)
app.include_router(analytics.router)
app.include_router(users.router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {
        "message": "AI Task & Knowledge Management System is running"
    }