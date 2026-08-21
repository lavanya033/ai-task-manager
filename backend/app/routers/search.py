from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from app.models import User
from app.utils.dependencies import get_db, get_current_user
from app.utils.activity_logger import create_activity_log
from app.services.vector_service import search_documents


router = APIRouter(
    prefix="/search",
    tags=["AI Search"]
)


@router.get("/")
def semantic_search(
    q: str = Query(..., min_length=2),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    results = search_documents(q)

    documents = results.get("documents", [[]])[0]
    metadatas = results.get("metadatas", [[]])[0]
    distances = results.get("distances", [[]])[0]

    search_results = []

    for index in range(len(documents)):
        search_results.append(
            {
                "content": documents[index],
                "document_id": metadatas[index]["document_id"],
                "chunk_index": metadatas[index]["chunk_index"],
                "distance": distances[index]
            }
        )

    # Activity logging
    create_activity_log(
        db=db,
        user_id=current_user.id,
        action="search",
        details=f"Search query: {q}"
    )

    return {
        "query": q,
        "results": search_results
    }