import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../api/axios";
import "../styles/Tasks.css";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const role = localStorage.getItem("role");
  const navigate = useNavigate();


  // ===============================
  // GET TASKS
  // ===============================

  const getTasks = async () => {
    try {
      setLoading(true);

      const response = await api.get("/tasks/");

      setTasks(response.data);

    } catch (error) {
      console.log(error);

      setMessage(
        error.response?.data?.detail ||
        "Failed to load tasks"
      );

    } finally {
      setLoading(false);
    }
  };


  // ===============================
  // COMPLETE TASK
  // ===============================

  const completeTask = async (taskId) => {
    try {

      // Check whether user completed a search
      const searchedTaskId = localStorage.getItem(
        "searchedTaskId"
      );

      if (String(searchedTaskId) !== String(taskId)) {
        setMessage(
          "Please complete the AI search before marking this task as completed."
        );

        return;
      }

      await api.patch(
        `/tasks/${taskId}`,
        {
          status: "completed",
        }
      );

      setMessage("Task completed successfully ✓");

      // Remove completed task search permission
      localStorage.removeItem("searchedTaskId");

      getTasks();

    } catch (error) {
      console.log(error);

      setMessage(
        error.response?.data?.detail ||
        "Failed to update task"
      );
    }
  };


  // ===============================
  // START TASK
  // ===============================

  const startTask = (task) => {

    // Save current task information
    localStorage.setItem(
      "currentTaskId",
      task.id
    );

    localStorage.setItem(
      "currentTaskTitle",
      task.title
    );

    localStorage.setItem(
      "currentTaskDescription",
      task.description || ""
    );

    // Navigate to AI Search
    navigate("/search");
  };


  useEffect(() => {
    getTasks();
  }, []);


  return (
    <div className="tasks-page">

      <Navbar />

      <main className="tasks-container">


        {/* HEADER */}

        <section className="tasks-header">

          <div>

            <p className="tasks-label">
              {role === "admin"
                ? "TASK MANAGEMENT"
                : "MY TASKS"}
            </p>

            <h1>
              {role === "admin"
                ? "Manage Tasks"
                : "My Assigned Tasks"}
            </h1>

            <p>
              {role === "admin"
                ? "View and manage tasks assigned to your team."
                : "Complete the assigned task by searching the knowledge base."}
            </p>

          </div>


          <div className="task-summary">

            <span>Total Tasks</span>

            <strong>
              {tasks.length}
            </strong>

          </div>

        </section>


        {/* MESSAGE */}

        {message && (
          <div className="task-message">
            {message}
          </div>
        )}


        {/* LOADING */}

        {loading ? (

          <div className="tasks-loading">
            Loading tasks...
          </div>

        ) : tasks.length === 0 ? (

          <div className="empty-tasks">

            <div className="empty-icon">
              📋
            </div>

            <h2>No tasks found</h2>

            <p>
              {role === "admin"
                ? "No tasks have been created yet."
                : "You don't have any tasks assigned yet."}
            </p>

          </div>

        ) : (

          <div className="tasks-grid">

            {tasks.map((task) => {

              const searchedTaskId = localStorage.getItem(
                "searchedTaskId"
              );

              const canComplete =
                String(searchedTaskId) === String(task.id);

              return (

                <div
                  className="task-card"
                  key={task.id}
                >

                  <div className="task-card-header">

                    <div className="task-number">
                      #{task.id}
                    </div>

                    <span
                      className={
                        task.status === "completed"
                          ? "status completed"
                          : "status pending"
                      }
                    >
                      {task.status}
                    </span>

                  </div>


                  <h2>
                    {task.title}
                  </h2>


                  <p className="task-description">
                    {task.description ||
                      "No description provided."}
                  </p>


                  <div className="task-details">

                    <div>

                      <span>Assigned To</span>

                      <strong>
                        User #{task.assigned_to}
                      </strong>

                    </div>

                  </div>


                  {/* TASK ACTION */}

                  <div className="task-card-footer">

                    {task.status === "pending" ? (

                      role !== "admin" ? (

                        canComplete ? (

                          <button
                            className="complete-task-btn"
                            onClick={() =>
                              completeTask(task.id)
                            }
                          >
                            ✓ Mark as Completed
                          </button>

                        ) : (

                          <button
                            className="start-task-btn"
                            onClick={() =>
                              startTask(task)
                            }
                          >
                            🔍 Start Task
                          </button>

                        )

                      ) : (

                        <span className="admin-task-text">
                          Assigned task
                        </span>

                      )

                    ) : (

                      <span className="completed-text">
                        ✓ Task Completed
                      </span>

                    )}

                  </div>

                </div>

              );
            })}

          </div>

        )}

      </main>

    </div>
  );
}

export default Tasks;