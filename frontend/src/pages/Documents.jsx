import { useState } from "react";
import Navbar from "../components/Navbar";
import api from "../api/axios";
import "../styles/Documents.css";

function Documents() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [uploading, setUploading] = useState(false);

  const role = localStorage.getItem("role");

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file) {
      setMessage("Please select a TXT or PDF file.");
      return;
    }

    try {
      setUploading(true);
      setMessage("");

      const formData = new FormData();

      formData.append("file", file);

      const response = await api.post(
        "/documents/upload",
        formData
      );

      setMessage(
        `Document uploaded successfully! ${response.data.chunks_created} knowledge chunks created.`
      );

      setFile(null);

      // Reset file input
      document.getElementById("file-input").value = "";

    } catch (error) {
      console.log(error);

      setMessage(
        error.response?.data?.detail ||
        "Document upload failed"
      );

    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="documents-page">

      <Navbar />

      <main className="documents-container">

        {/* Header */}

        <section className="documents-header">

          <div>

            <p className="documents-label">
              KNOWLEDGE BASE
            </p>

            <h1>Documents</h1>

            <p>
              Upload and manage documents used by the AI-powered
              semantic search system.
            </p>

          </div>

          <div className="documents-badge">
            AI Knowledge Base
          </div>

        </section>


        {/* Admin Upload */}

        {role === "admin" ? (

          <section className="upload-section">

            <div className="upload-info">

              <div className="upload-icon">
                📄
              </div>

              <div>

                <p className="section-label">
                  ADMIN ACCESS
                </p>

                <h2>
                  Upload Knowledge Document
                </h2>

                <p>
                  Upload TXT or PDF documents. The system will
                  extract the content, split it into chunks, and
                  store embeddings in ChromaDB for semantic search.
                </p>

              </div>

            </div>


            <form
              className="upload-form"
              onSubmit={handleUpload}
            >

              <label
                className="file-upload-box"
                htmlFor="file-input"
              >

                <input
                  id="file-input"
                  type="file"
                  accept=".txt,.pdf"
                  onChange={(e) =>
                    setFile(e.target.files[0])
                  }
                />

                <div className="file-upload-content">

                  <span className="upload-file-icon">
                    ⬆
                  </span>

                  {file ? (

                    <>
                      <strong>
                        {file.name}
                      </strong>

                      <span>
                        File selected
                      </span>
                    </>

                  ) : (

                    <>
                      <strong>
                        Choose a document
                      </strong>

                      <span>
                        TXT and PDF files are supported
                      </span>
                    </>

                  )}

                </div>

              </label>


              <button
                className="upload-button"
                type="submit"
                disabled={uploading}
              >

                {uploading
                  ? "Uploading..."
                  : "Upload Document →"}

              </button>

            </form>

          </section>

        ) : (

          <section className="user-document-info">

            <div className="user-document-icon">
              🔒
            </div>

            <div>

              <p className="section-label">
                USER ACCESS
              </p>

              <h2>
                Knowledge Search Access
              </h2>

              <p>
                Documents are managed by the administrator.
                You can use AI Search to find relevant information
                from the available knowledge base.
              </p>

              <a href="/search">
                Go to AI Search →
              </a>

            </div>

          </section>

        )}


        {/* Message */}

        {message && (

          <div
            className={
              message.includes("successfully")
                ? "document-message success"
                : "document-message error"
            }
          >
            {message}
          </div>

        )}


        {/* Information Cards */}

        <section className="document-info-grid">

          <div className="document-info-card">

            <div className="info-card-icon">
              📑
            </div>

            <h3>
              Supported Files
            </h3>

            <p>
              TXT and PDF documents can be uploaded
              to the knowledge base.
            </p>

          </div>


          <div className="document-info-card">

            <div className="info-card-icon">
              ✂️
            </div>

            <h3>
              Smart Chunking
            </h3>

            <p>
              Documents are automatically split into
              smaller chunks for better search accuracy.
            </p>

          </div>


          <div className="document-info-card">

            <div className="info-card-icon">
              ✦
            </div>

            <h3>
              AI Semantic Search
            </h3>

            <p>
              Vector embeddings help find relevant
              information based on meaning.
            </p>

          </div>

        </section>

      </main>

    </div>
  );
}

export default Documents;