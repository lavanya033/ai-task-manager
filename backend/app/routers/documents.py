from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlalchemy.orm import Session
import os
import shutil

from app.models import Document, User
from app.utils.dependencies import get_db, require_admin
from app.utils.activity_logger import create_activity_log
from app.services.document_service import extract_document_text

from app.services.vector_service import store_document_embeddings

router = APIRouter(
    prefix="/documents",
    tags=["Documents"]
)


@router.post("/upload")
def upload_document(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(require_admin)
):

    # Check file type
    if not file.filename.endswith((".txt", ".pdf")):
        raise HTTPException(
            status_code=400,
            detail="Only TXT and PDF files are allowed"
        )

    # Create uploads folder
    os.makedirs("uploads", exist_ok=True)

    # Save file
    file_path = os.path.join(
        "uploads",
        file.filename
    )

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Get file type
    file_type = file.filename.split(".")[-1].lower()

    # Extract text
    extracted_text = extract_document_text(
        file_path,
        file_type
    )

    # Check extracted text
    if not extracted_text.strip():
        raise HTTPException(
            status_code=400,
            detail="Could not extract text from document"
        )

    # Save metadata in MySQL
    document = Document(
        title=file.filename,
        filename=file.filename,
        file_path=file_path,
        file_type=file_type,
        uploaded_by=current_user.id
    )

    db.add(document)
    db.commit()
    db.refresh(document)  


    # Create embeddings and store in ChromaDB
    chunk_count = store_document_embeddings(
    document_id=document.id,
    text=extracted_text
    )

    # Activity log
    create_activity_log(
        db=db,
        user_id=current_user.id,
        action="document_uploaded",
        details=f"Uploaded document: {file.filename}"
    )

    return {
        "message": "Document uploaded successfully",
        "document_id": document.id,
        "filename": document.filename,
        "text_length": len(extracted_text),
        "chunks_created": chunk_count
    }