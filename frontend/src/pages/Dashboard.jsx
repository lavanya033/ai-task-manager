import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../api/axios";
import "../styles/Dashboard.css";

function Dashboard() {
  const role = localStorage.getItem("role");

  const [data, setData] = useState({
    total_tasks: 0,
    completed_tasks: 0,
    pending_tasks: 0,
    total_documents: 0,
    total_searches: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);


  // ========================================
  // FETCH ROLE-BASED DASHBOARD DATA
  // ========================================

  const fetchDashboard = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.get(
        "/analytics/dashboard",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(
        "Dashboard response:",
        response.data
      );

      setData(response.data);

    } catch (error) {

      console.error(
        "Dashboard error:",
        error.response?.data || error
      );

    } finally {

      setLoading(false);

    }
  };


  // ========================================
  // LOADING
  // ========================================

  if (loading) {
    return (
      <>
        <Navbar />

        <div className="dashboard-loading">
          Loading dashboard...
        </div>
      </>
    );
  }


  // ========================================
  // DASHBOARD UI
  // ========================================

  return (
    <div className="dashboard-page">

      <Navbar />

      <main className="dashboard-container">


        {/* ================= HEADER ================= */}

        <section className="dashboard-header">

          <div>

            <p className="dashboard-label">

              {role === "admin"
                ? "ADMIN DASHBOARD"
                : "USER DASHBOARD"}

            </p>

            <h1>
              Welcome back 👋
            </h1>

            <p>
              Here's an overview of your work and activity.
            </p>

          </div>


          <div className="dashboard-date">
            AI Task Manager
          </div>

        </section>


        {/* ================= STATISTICS ================= */}

        <section className="stats-grid">


          {/* TOTAL TASKS */}

          <div className="stat-card">

            <div className="stat-icon">
              📋
            </div>

            <div>

              <p>
                Total Tasks
              </p>

              <h2>
                {data.total_tasks}
              </h2>

            </div>

          </div>


          {/* COMPLETED TASKS */}

          <div className="stat-card">

            <div className="stat-icon completed-icon">
              ✓
            </div>

            <div>

              <p>
                Completed Tasks
              </p>

              <h2>
                {data.completed_tasks}
              </h2>

            </div>

          </div>


          {/* PENDING TASKS */}

          <div className="stat-card">

            <div className="stat-icon pending-icon">
              ⏳
            </div>

            <div>

              <p>
                Pending Tasks
              </p>

              <h2>
                {data.pending_tasks}
              </h2>

            </div>

          </div>


          {/* DOCUMENTS - ADMIN ONLY */}

          {role === "admin" && (

            <div className="stat-card">

              <div className="stat-icon document-icon">
                📄
              </div>

              <div>

                <p>
                  Documents
                </p>

                <h2>
                  {data.total_documents}
                </h2>

              </div>

            </div>

          )}

        </section>


        {/* ================= ROLE BASED CONTENT ================= */}

        <section className="dashboard-content">


          {/* MAIN CARD */}

          <div className="dashboard-main-card">


            <div className="card-heading">

              <div>

                <p className="card-label">
                  QUICK OVERVIEW
                </p>

                <h2>

                  {role === "admin"
                    ? "Manage Your Team"
                    : "Your Work Summary"}

                </h2>

              </div>


              <span className="card-badge">
                Active
              </span>

            </div>


            {/* ================= ADMIN ================= */}

            {role === "admin" ? (

              <div className="admin-info">

                <p>
                  You can manage registered users, assign tasks,
                  upload knowledge documents, and monitor
                  platform activity.
                </p>


                <div className="dashboard-actions">

                  <a href="/users">
                    Manage Users →
                  </a>

                  <a href="/tasks">
                    Manage Tasks →
                  </a>

                  <a href="/analytics">
                    View Analytics →
                  </a>

                </div>

              </div>

            ) : (

              /* ================= USER ================= */

              <div className="user-info">

                <p>
                  View the tasks assigned to you, perform the
                  required knowledge search, and track your
                  progress.
                </p>


                <div className="dashboard-actions">

                  <a href="/tasks">
                    View My Tasks →
                  </a>

                  <a href="/search">
                    Search Knowledge →
                  </a>

                </div>

              </div>

            )}

          </div>


          {/* ================= AI CARD ================= */}

          <div className="ai-card">


            <div className="ai-icon">
              ✦
            </div>


            <p className="card-label">
              AI POWERED
            </p>


            <h2>
              Intelligent Search
            </h2>


            <p>
              Search through uploaded documents using semantic
              search powered by embeddings and vector databases.
            </p>


            <a href="/search">
              Try AI Search →
            </a>


          </div>


        </section>

      </main>

    </div>
  );
}

export default Dashboard;