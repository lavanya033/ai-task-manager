import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../api/axios";
import "../styles/Users.css";

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  // Selected user for task assignment
  const [selectedUser, setSelectedUser] = useState(null);
  const [showTaskForm, setShowTaskForm] = useState(false);

  // Task form fields
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");

  const [taskMessage, setTaskMessage] = useState("");
  const [taskLoading, setTaskLoading] = useState(false);


  // Fetch users
  const fetchUsers = async () => {
    try {
      setLoading(true);
      setMessage("");

      const response = await api.get("/users/");

      setUsers(response.data);

    } catch (error) {
      console.error("Users error:", error);

      setMessage(
        error.response?.data?.detail ||
        "Failed to load users"
      );

    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchUsers();
  }, []);


  // Open Assign Task form
  const handleAssignTask = (user) => {
    setSelectedUser(user);

    setTaskTitle("");
    setTaskDescription("");
    setTaskMessage("");

    setShowTaskForm(true);

    // Scroll to form
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };


  // Close task form
  const handleCloseTaskForm = () => {
    setShowTaskForm(false);
    setSelectedUser(null);

    setTaskTitle("");
    setTaskDescription("");
    setTaskMessage("");
  };


  // Submit task
  const submitTask = async (e) => {
    e.preventDefault();

    if (!taskTitle.trim()) {
      setTaskMessage("Task title is required");
      return;
    }

    if (!selectedUser) {
      setTaskMessage("Please select a user");
      return;
    }

    try {
      setTaskLoading(true);
      setTaskMessage("");

      const token = localStorage.getItem("token");

      await api.post(
        "/tasks/",
        {
          title: taskTitle,
          description: taskDescription,
          assigned_to: selectedUser.id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTaskMessage(
        `Task assigned successfully to ${selectedUser.username}`
      );

      setTaskTitle("");
      setTaskDescription("");

      // Close form after success
      setTimeout(() => {
        handleCloseTaskForm();
      }, 1500);

    } catch (error) {
      console.error("Task assignment error:", error);

      setTaskMessage(
        error.response?.data?.detail ||
        "Failed to assign task"
      );

    } finally {
      setTaskLoading(false);
    }
  };


  return (
    <div className="users-page">

      <Navbar />

      <main className="users-container">


        {/* Header */}

        <section className="users-header">

          <div>

            <p className="users-label">
              USER MANAGEMENT
            </p>

            <h1>
              Registered Users
            </h1>

            <p>
              View registered users and assign tasks
              to your team members.
            </p>

          </div>


          <div className="users-header-actions">

            <div className="total-users">

              <span>
                Total Users
              </span>

              <strong>
                {users.length}
              </strong>

            </div>


            <button
              className="refresh-users-button"
              onClick={fetchUsers}
            >
              ↻ Refresh
            </button>

          </div>

        </section>


        {/* Assign Task Form */}

        {showTaskForm && selectedUser && (

          <section className="assign-task-card">


            <div className="assign-task-header">

              <div>

                <p className="users-label">
                  ASSIGN NEW TASK
                </p>

                <h2>
                  Assign Task
                </h2>

                <p>
                  Assigning to{" "}
                  <strong>
                    {selectedUser.username}
                  </strong>
                </p>

                <p>
                  {selectedUser.email}
                </p>

              </div>


              <button
                className="close-task-button"
                onClick={handleCloseTaskForm}
              >
                ✕
              </button>

            </div>


            <form
              className="assign-task-form"
              onSubmit={submitTask}
            >


              {/* Task Title */}

              <div className="form-group">

                <label>
                  Task Title
                </label>

                <input
                  type="text"
                  placeholder="Example: Complete Login API"
                  value={taskTitle}
                  onChange={(e) =>
                    setTaskTitle(e.target.value)
                  }
                />

              </div>


              {/* Task Description */}

              <div className="form-group">

                <label>
                  Task Description
                </label>

                <textarea
                  placeholder="Describe what the user needs to complete..."
                  value={taskDescription}
                  onChange={(e) =>
                    setTaskDescription(e.target.value)
                  }
                />

              </div>


              {/* Message */}

              {taskMessage && (

                <div className="task-message">
                  {taskMessage}
                </div>

              )}


              {/* Buttons */}

              <div className="task-form-actions">

                <button
                  type="button"
                  className="cancel-task-button"
                  onClick={handleCloseTaskForm}
                >
                  Cancel
                </button>


                <button
                  type="submit"
                  className="submit-task-button"
                  disabled={taskLoading}
                >
                  {taskLoading
                    ? "Assigning..."
                    : "Assign Task"
                  }
                </button>

              </div>

            </form>

          </section>

        )}


        {/* Loading */}

        {loading && (

          <div className="users-loading">

            <div className="users-spinner"></div>

            <p>
              Loading users...
            </p>

          </div>

        )}


        {/* Error */}

        {message && !loading && (

          <div className="users-message">
            {message}
          </div>

        )}


        {/* Users Table */}

        {!loading && !message && (

          users.length === 0 ? (

            <div className="no-users">

              <div className="no-users-icon">
                👥
              </div>

              <h2>
                No users found
              </h2>

              <p>
                No users have registered yet.
              </p>

            </div>

          ) : (

            <section className="users-card">


              <div className="users-card-header">

                <div>

                  <h2>
                    All Users
                  </h2>

                  <p>
                    Registered users in the system
                  </p>

                </div>

              </div>


              <div className="users-table-wrapper">

                <table className="users-table">


                  <thead>

                    <tr>

                      <th>
                        ID
                      </th>

                      <th>
                        User
                      </th>

                      <th>
                        Email
                      </th>

                      <th>
                        Role
                      </th>

                      <th>
                        Action
                      </th>

                    </tr>

                  </thead>


                  <tbody>

                    {users.map((user) => (

                      <tr key={user.id}>


                        {/* ID */}

                        <td>

                          <span className="user-id">
                            #{user.id}
                          </span>

                        </td>


                        {/* User */}

                        <td>

                          <div className="user-profile">

                            <div className="user-avatar">

                              {user.username
                                ?.charAt(0)
                                .toUpperCase()}

                            </div>


                            <div>

                              <strong>
                                {user.username}
                              </strong>

                              <p>
                                Registered user
                              </p>

                            </div>

                          </div>

                        </td>


                        {/* Email */}

                        <td className="user-email">

                          {user.email}

                        </td>


                        {/* Role */}

                        <td>

                          <span
                            className={
                              user.role === "admin"
                                ? "role-badge admin-role"
                                : "role-badge user-role"
                            }
                          >

                            {user.role}

                          </span>

                        </td>


                        {/* Action */}

                        <td>

                          {user.role === "user" ? (

                            <button
                              className="assign-task-button"
                              onClick={() =>
                                handleAssignTask(user)
                              }
                            >
                              Assign Task
                            </button>

                          ) : (

                            <span className="admin-text">
                              Administrator
                            </span>

                          )}

                        </td>


                      </tr>

                    ))}

                  </tbody>

                </table>

              </div>

            </section>

          )

        )}

      </main>

    </div>
  );
}

export default Users;