import { useState } from "react";
import Navbar from "../components/Navbar";
import api from "../api/axios";
import "../styles/Search.css";

function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Get current task
  const currentTaskId = localStorage.getItem(
    "currentTaskId"
  );

  const currentTaskTitle = localStorage.getItem(
    "currentTaskTitle"
  );


  // ===============================
  // HANDLE SEARCH
  // ===============================

  const handleSearch = async (e) => {
    e.preventDefault();

    if (query.trim().length < 2) {
      setMessage("Please enter at least 2 characters.");
      setResults([]);
      return;
    }

    try {
      setLoading(true);
      setMessage("");
      setResults([]);

      const response = await api.get(
        `/search/?q=${encodeURIComponent(query)}`
      );

      setResults(response.data.results);

      // Only allow task completion
      // if search returned results
      if (
        currentTaskId &&
        response.data.results.length > 0
      ) {

        localStorage.setItem(
          "searchedTaskId",
          currentTaskId
        );

      }

      if (response.data.results.length === 0) {

        setMessage(
          "No relevant results found. Please try another search."
        );

      } else {

        setMessage(
          currentTaskId
            ? "Search completed successfully. You can now return to Tasks and mark the task as completed."
            : ""
        );

      }

    } catch (error) {

      console.log(error);

      setMessage(
        error.response?.data?.detail ||
        "Search failed. Please try again."
      );

    } finally {

      setLoading(false);

    }
  };


  // ===============================
  // RELEVANCE
  // ===============================

  const getRelevance = (distance) => {

    if (distance < 0.5) return "High Match";

    if (distance < 1) return "Good Match";

    return "Related";
  };


  return (
    <div className="search-page">

      <Navbar />

      <main className="search-container">


        {/* HEADER */}

        <section className="search-header">

          <p className="search-label">
            AI KNOWLEDGE BASE
          </p>

          <h1>
            Intelligent Document Search
          </h1>

          <p>
            Ask questions and find relevant information from
            uploaded documents using AI-powered semantic search.
          </p>

          {currentTaskTitle && (

            <div className="current-task-info">

              <strong>
                Current Task:
              </strong>

              <span>
                {currentTaskTitle}
              </span>

            </div>

          )}

        </section>


        {/* SEARCH BOX */}

        <section className="search-box-section">

          <form
            className="search-form"
            onSubmit={handleSearch}
          >

            <div className="search-input-wrapper">

              <span className="search-icon">
                🔍
              </span>

              <input
                type="text"
                placeholder="Search for information..."
                value={query}
                onChange={(e) =>
                  setQuery(e.target.value)
                }
              />

            </div>

            <button
              type="submit"
              disabled={loading}
            >
              {loading
                ? "Searching..."
                : "Search"}
            </button>

          </form>

        </section>


        {/* LOADING */}

        {loading && (

          <div className="search-loading">

            <div className="loading-spinner"></div>

            <p>
              Searching the knowledge base...
            </p>

          </div>

        )}


        {/* MESSAGE */}

        {message && !loading && (

          <div className="search-message">

            {message}

          </div>

        )}


        {/* RESULTS */}

        {!loading && results.length > 0 && (

          <section className="results-section">

            <div className="results-header">

              <div>

                <p className="results-label">
                  SEARCH RESULTS
                </p>

                <h2>
                  Found {results.length} relevant result
                  {results.length > 1 ? "s" : ""}
                </h2>

              </div>

              <div className="query-badge">

                "{query}"

              </div>

            </div>


            <div className="results-list">

              {results.map((result, index) => (

                <article
                  className="result-card"
                  key={index}
                >

                  <div className="result-top">

                    <div className="result-number">

                      Result {index + 1}

                    </div>

                    <span
                      className={
                        `relevance-badge relevance-${getRelevance(
                          result.distance
                        )
                          .toLowerCase()
                          .replace(" ", "-")}`
                      }
                    >
                      {getRelevance(result.distance)}
                    </span>

                  </div>


                  <div className="result-content">

                    {result.content}

                  </div>


                  <div className="result-footer">

                    <div className="result-meta">

                      <span>
                        📄 Document #{result.document_id}
                      </span>

                      <span>
                        ✂️ Chunk #{result.chunk_index + 1}
                      </span>

                    </div>


                    <div className="distance-info">

                      Match distance:{" "}

                      <strong>
                        {result.distance.toFixed(3)}
                      </strong>

                    </div>

                  </div>

                </article>

              ))}

            </div>

          </section>

        )}


        {/* EMPTY STATE */}

        {!loading &&
          results.length === 0 &&
          !message && (

          <section className="search-empty">

            <div className="empty-search-icon">
              ✦
            </div>

            <h2>
              Ask the AI Knowledge Base
            </h2>

            <p>
              Search uploaded documents using semantic search
              powered by embeddings and ChromaDB.
            </p>

          </section>

        )}

      </main>

    </div>
  );
}

export default Search;