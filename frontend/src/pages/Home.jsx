import { Link } from "react-router-dom";
import PublicNavbar from "../components/PublicNavbar";
import "../styles/Home.css";

function Home() {
  return (
    <div className="home-page">
      <PublicNavbar />

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-badge">
            AI-Powered Task Management
          </div>

          <h1>
            Manage Work Smarter.
            <br />
            <span>Powered by AI.</span>
          </h1>

          <p className="hero-description">
            A modern role-based platform where teams can manage tasks,
            collaborate efficiently, upload knowledge documents, and
            discover information using intelligent semantic search.
          </p>

          <div className="hero-buttons">
            <Link to="/signup" className="primary-btn">
              Get Started
            </Link>

            <Link to="/login" className="secondary-btn">
              Login
            </Link>
          </div>

          <div className="hero-stats">
            <div>
              <strong>Role-Based</strong>
              <span>Secure Access</span>
            </div>

            <div>
              <strong>AI Search</strong>
              <span>Smart Knowledge</span>
            </div>

            <div>
              <strong>Real-Time</strong>
              <span>Task Tracking</span>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="dashboard-preview">

            <div className="preview-header">
              <div className="preview-logo">
                AI Task Manager
              </div>

              <div className="preview-avatar">
                A
              </div>
            </div>

            <div className="preview-body">

              <div className="preview-title">
                <p>Welcome back 👋</p>
                <h3>Project Overview</h3>
              </div>

              <div className="preview-cards">

                <div className="preview-card">
                  <span>Total Tasks</span>
                  <strong>24</strong>
                </div>

                <div className="preview-card">
                  <span>Completed</span>
                  <strong>18</strong>
                </div>

                <div className="preview-card">
                  <span>Pending</span>
                  <strong>6</strong>
                </div>

              </div>

              <div className="preview-task">
                <div className="task-icon">✓</div>

                <div>
                  <h4>FastAPI Authentication</h4>
                  <p>Complete JWT authentication module</p>
                </div>

                <span className="status-badge">
                  In Progress
                </span>
              </div>

              <div className="preview-task">
                <div className="task-icon">✓</div>

                <div>
                  <h4>AI Document Search</h4>
                  <p>Implement semantic search</p>
                </div>

                <span className="completed-badge">
                  Completed
                </span>
              </div>

            </div>
          </div>
        </div>
      </section>


      {/* Features */}
      <section className="features-section">

        <div className="section-heading">
          <span>POWERFUL FEATURES</span>

          <h2>Everything You Need in One Platform</h2>

          <p>
            Designed to simplify task management while adding
            intelligent AI-powered capabilities.
          </p>
        </div>

        <div className="features-grid">

          <div className="feature-card">
            <div className="feature-icon">👥</div>
            <h3>User Management</h3>
            <p>
              Users can securely sign up and access their personalized workspace.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📋</div>
            <h3>Task Management</h3>
            <p>
              Create, assign, track, and update tasks efficiently.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📄</div>
            <h3>Document Management</h3>
            <p>
              Upload TXT and PDF documents to build a shared knowledge base.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🔍</div>
            <h3>AI Semantic Search</h3>
            <p>
              Find relevant information using embeddings and vector search.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🔐</div>
            <h3>Secure Authentication</h3>
            <p>
              JWT-based authentication with role-based access control.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Analytics</h3>
            <p>
              Monitor tasks, documents, searches, and platform activity.
            </p>
          </div>

        </div>
      </section>


      {/* How It Works */}
      <section className="workflow-section">

        <div className="section-heading">
          <span>HOW IT WORKS</span>

          <h2>A Simple Workflow</h2>

          <p>
            From user registration to intelligent knowledge search.
          </p>
        </div>

        <div className="workflow-grid">

          <div className="workflow-card">
            <div className="step-number">01</div>
            <h3>Users Sign Up</h3>
            <p>
              Team members create their accounts and securely log in.
            </p>
          </div>

          <div className="workflow-card">
            <div className="step-number">02</div>
            <h3>Admin Manages Users</h3>
            <p>
              The administrator can view registered users and manage work.
            </p>
          </div>

          <div className="workflow-card">
            <div className="step-number">03</div>
            <h3>Tasks Are Assigned</h3>
            <p>
              Admin assigns tasks and users can track their progress.
            </p>
          </div>

          <div className="workflow-card">
            <div className="step-number">04</div>
            <h3>Search with AI</h3>
            <p>
              Search uploaded documents intelligently using semantic search.
            </p>
          </div>

        </div>
      </section>


      {/* Tech Section */}
      <section className="tech-section">

        <div className="section-heading">
          <span>BUILT WITH MODERN TECHNOLOGY</span>

          <h2>Full Stack + AI</h2>
        </div>

        <div className="tech-grid">
          <div>⚛️ React</div>
          <div>⚡ FastAPI</div>
          <div>🐬 MySQL</div>
          <div>🔐 JWT</div>
          <div>🧠 ChromaDB</div>
          <div>🤖 Sentence Transformers</div>
        </div>

      </section>


      {/* CTA */}
      <section className="cta-section">

        <div>
          <h2>Ready to Manage Your Work Smarter?</h2>

          <p>
            Join the AI-powered task management experience.
          </p>
        </div>

        <Link to="/signup" className="cta-btn">
          Create Account →
        </Link>

      </section>


      {/* Footer */}
      <footer className="footer">
        <h3>AI Task Manager</h3>

        <p>
          Smart task management powered by AI.
        </p>

        <span>
          Built with React, FastAPI, MySQL and AI.
        </span>
      </footer>

    </div>
  );
}

export default Home;