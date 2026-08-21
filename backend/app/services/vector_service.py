import chromadb
from sentence_transformers import SentenceTransformer


# Load embedding model
model = SentenceTransformer(
    "all-MiniLM-L6-v2"
)


# Persistent Chroma database
client = chromadb.PersistentClient(
    path="chroma_db"
)


# Create collection if it doesn't exist
collection = client.get_or_create_collection(
    name="documents"
)


def create_chunks(text, chunk_size=300):
    paragraphs = text.split("\n\n")

    chunks = []

    for paragraph in paragraphs:
        paragraph = paragraph.strip()

        if not paragraph:
            continue

        # Small paragraph = one chunk
        if len(paragraph) <= chunk_size:
            chunks.append(paragraph)

        # Large paragraph = split by words
        else:
            words = paragraph.split()

            current_chunk = ""

            for word in words:
                new_chunk = current_chunk + " " + word

                if len(new_chunk) <= chunk_size:
                    current_chunk = new_chunk.strip()

                else:
                    chunks.append(current_chunk)
                    current_chunk = word

            if current_chunk:
                chunks.append(current_chunk)

    return chunks


def store_document_embeddings(
    document_id,
    text
):
    chunks = create_chunks(text)

    embeddings = model.encode(
        chunks
    ).tolist()

    ids = []

    metadatas = []

    for index, chunk in enumerate(chunks):

        ids.append(
            f"document_{document_id}_chunk_{index}"
        )

        metadatas.append(
            {
                "document_id": document_id,
                "chunk_index": index
            }
        )

    collection.add(
        ids=ids,
        embeddings=embeddings,
        documents=chunks,
        metadatas=metadatas
    )

    return len(chunks)


def search_documents(
    query,
    limit=1
):
    query_embedding = model.encode(
        [query]
    ).tolist()

    results = collection.query(
        query_embeddings=query_embedding,
        n_results=limit
    )

    return results