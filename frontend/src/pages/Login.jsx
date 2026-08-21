import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import "../styles/Auth.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    setMessage("");

    try {
      const formData = new URLSearchParams();

      formData.append("username", email);
      formData.append("password", password);

      const response = await api.post(
        "/auth/login",
        formData,
        {
          headers: {
            "Content-Type":
              "application/x-www-form-urlencoded",
          },
        }
      );

      localStorage.setItem(
        "token",
        response.data.access_token
      );

      localStorage.setItem(
        "role",
        response.data.role
      );

      navigate("/dashboard");

    } catch (error) {
      setMessage(
        error.response?.data?.detail ||
        "Login failed. Please try again."
      );
    }
  };

  return (
    <div className="auth-page">

      <div className="auth-container">

        {/* Left Side */}
        <div className="auth-info">

          <div className="auth-logo">
            ✦ AI Task Manager
          </div>

          <h1>
            Welcome Back!
          </h1>

          <p>
            Manage your tasks, collaborate with your team,
            and search your knowledge base using AI.
          </p>

          <div className="auth-features">
            <div className="auth-feature">
              ✓ Secure JWT Authentication
            </div>

            <div className="auth-feature">
              ✓ Role-Based Access
            </div>

            <div className="auth-feature">
              ✓ AI-Powered Search
            </div>
          </div>

        </div>


        {/* Right Side */}
        <div className="auth-form-section">

          <h2>Sign in to your account</h2>

          <p className="auth-subtitle">
            Enter your credentials to continue.
          </p>

          <form
            className="auth-form"
            onSubmit={handleLogin}
          >

            <div className="form-group">
              <label>Email Address</label>

              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                required
              />
            </div>


            <div className="form-group">
              <label>Password</label>

              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                required
              />
            </div>


            {message && (
              <div className="auth-message">
                {message}
              </div>
            )}


            <button
              type="submit"
              className="auth-button"
            >
              Login
            </button>

          </form>


          <div className="auth-footer">

            <p>
              Don't have an account?{" "}

              <button
                onClick={() =>
                  navigate("/signup")
                }
              >
                Create an account
              </button>

            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Login;