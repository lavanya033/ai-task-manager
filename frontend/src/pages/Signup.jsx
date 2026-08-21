import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import "../styles/Auth.css";

function Signup() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [message, setMessage] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    setMessage("");

    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    try {
      await api.post("/auth/signup", null, {
        params: {
          username,
          email,
          password,
        },
      });

      alert(
        "Account created successfully. Please login."
      );

      navigate("/login");

    } catch (error) {
      setMessage(
        error.response?.data?.detail ||
        "Signup failed. Please try again."
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
            Start Managing Smarter.
          </h1>

          <p>
            Create your account and join a modern
            AI-powered task management platform.
          </p>

          <div className="auth-features">
            <div className="auth-feature">
              ✓ Create and manage your tasks
            </div>

            <div className="auth-feature">
              ✓ Track your task progress
            </div>

            <div className="auth-feature">
              ✓ Search knowledge using AI
            </div>
          </div>

        </div>


        {/* Right Side */}
        <div className="auth-form-section">

          <h2>Create your account</h2>

          <p className="auth-subtitle">
            Join AI Task Manager today.
          </p>

          <form
            className="auth-form"
            onSubmit={handleSignup}
          >

            <div className="form-group">
              <label>Full Name</label>

              <input
                type="text"
                placeholder="Enter your name"
                value={username}
                onChange={(e) =>
                  setUsername(e.target.value)
                }
                required
              />
            </div>


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
                placeholder="Example: User@123"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                required
              />
            </div>


            <div className="form-group">
              <label>Confirm Password</label>

              <input
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(e.target.value)
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
              Create Account
            </button>

          </form>


          <div className="auth-footer">

            <p>
              Already have an account?{" "}

              <button
                onClick={() =>
                  navigate("/login")
                }
              >
                Login
              </button>

            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Signup;