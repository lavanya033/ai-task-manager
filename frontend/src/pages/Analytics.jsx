import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../api/axios";
import "../styles/Analytics.css";

function Analytics() {
  const [data, setData] = useState({
    total_tasks: 0,
    completed_tasks: 0,
    pending_tasks: 0,
    total_documents: 0,
    total_searches: 0,
    most_searched_queries: [],
  });

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);

      const response = await api.get("/analytics/");

      setData(response.data);

    } catch (error) {
      console.error("Analytics error:", error);

      setMessage(
        error.response?.data?.detail ||
        "Failed to load analytics."
      );

    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="analytics-page">
        <Navbar />

        <div className="analytics-loading">
          <div className="analytics-spinner"></div>
          <p>Loading analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="analytics-page">

      <Navbar />

      <main className="analytics-container">

        {/* Header */}
        <section className="analytics-header">

          <div>
            <p className="analytics-label">
              ADMIN INSIGHTS
            </p>

            <h1>
              Platform Analytics
            </h1>

            <p>
              Monitor tasks, documents, searches, and overall
              platform activity.
            </p>
          </div>

          <button
            className="refresh-button"
            onClick={fetchAnalytics}
          >
            ↻ Refresh
          </button>

        </section>


        {message && (
          <div className="analytics-message">
            {message}
          </div>
        )}


        {/* Statistics */}
        <section className="analytics-stats">

          <div className="analytics-stat-card">
            <div className="analytics-icon">
              📋
            </div>

            <div>
              <p>Total Tasks</p>
              <h2>{data.total_tasks}</h2>
            </div>
          </div>


          <div className="analytics-stat-card">
            <div className="analytics-icon completed">
              ✓
            </div>

            <div>
              <p>Completed</p>
              <h2>{data.completed_tasks}</h2>
            </div>
          </div>


          <div className="analytics-stat-card">
            <div className="analytics-icon pending">
              ⏳
            </div>

            <div>
              <p>Pending</p>
              <h2>{data.pending_tasks}</h2>
            </div>
          </div>


          <div className="analytics-stat-card">
            <div className="analytics-icon documents">
              📄
            </div>

            <div>
              <p>Documents</p>
              <h2>{data.total_documents}</h2>
            </div>
          </div>


          <div className="analytics-stat-card">
            <div className="analytics-icon searches">
              🔍
            </div>

            <div>
              <p>AI Searches</p>
              <h2>{data.total_searches}</h2>
            </div>
          </div>

        </section>


        {/* Content Grid */}
        <section className="analytics-content">


          {/* Task Overview */}
          <div className="analytics-card">

            <div className="analytics-card-header">

              <div>
                <p className="analytics-label">
                  TASK OVERVIEW
                </p>

                <h2>
                  Task Progress
                </h2>
              </div>

            </div>


            <div className="task-progress-list">

              <div className="progress-item">

                <div className="progress-info">
                  <span>Completed Tasks</span>

                  <strong>
                    {data.completed_tasks}
                  </strong>
                </div>

                <div className="progress-bar">

                  <div
                    className="progress-fill completed-fill"
                    style={{
                      width: `${
                        data.total_tasks
                          ? (data.completed_tasks /
                              data.total_tasks) *
                            100
                          : 0
                      }%`
                    }}
                  ></div>

                </div>

              </div>


              <div className="progress-item">

                <div className="progress-info">
                  <span>Pending Tasks</span>

                  <strong>
                    {data.pending_tasks}
                  </strong>
                </div>

                <div className="progress-bar">

                  <div
                    className="progress-fill pending-fill"
                    style={{
                      width: `${
                        data.total_tasks
                          ? (data.pending_tasks /
                              data.total_tasks) *
                            100
                          : 0
                      }%`
                    }}
                  ></div>

                </div>

              </div>

            </div>

          </div>


          {/* Search Overview */}
          <div className="analytics-card search-overview">

            <div className="analytics-card-header">

              <div>
                <p className="analytics-label">
                  AI ACTIVITY
                </p>

                <h2>
                  Knowledge Search
                </h2>
              </div>

              <div className="search-total">
                {data.total_searches}
              </div>

            </div>

            <p className="search-description">
              Total searches performed across the AI-powered
              knowledge base.
            </p>

          </div>

        </section>


        {/* Most Searched Queries */}

        <section className="top-searches-section">

          <div className="section-header">

            <div>
              <p className="analytics-label">
                SEARCH INSIGHTS
              </p>

              <h2>
                Most Searched Queries
              </h2>
            </div>

          </div>


          {data.most_searched_queries.length === 0 ? (

            <div className="no-searches">

              No search activity yet.

            </div>

          ) : (

            <div className="queries-list">

              {data.most_searched_queries.map(
                (item, index) => (

                  <div
                    className="query-item"
                    key={index}
                  >

                    <div className="query-rank">
                      #{index + 1}
                    </div>

                    <div className="query-text">
                      {item.query}
                    </div>

                    <div className="query-count">
                      {item.count} searches
                    </div>

                  </div>

                )
              )}

            </div>

          )}

        </section>

      </main>

    </div>
  );
}

export default Analytics;