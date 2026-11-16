
import { useState } from "react";
import "./App.css";

type Task = {
  id: number;
  title: string;
  description: string;
  status: "pending" | "completed";
};

function App() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: "Learn React",
      description: "Practice React hooks and components",
      status: "pending",
    },
    {
      id: 2,
      title: "Complete To-Do Project",
      description: "Build frontend and connect backend",
      status: "completed",
    },
    {
      id: 3,
      title: "Practice TypeScript",
      description: "Learn interfaces and types",
      status: "pending",
    },
  ]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [showForm, setShowForm] = useState(false);

  const completedCount = tasks.filter(
    (task) => task.status === "completed"
  ).length;

  const pendingCount = tasks.length - completedCount;

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesFilter =
      filter === "all" || task.status === filter;

    return matchesSearch && matchesFilter;
  });

  const addTask = () => {
    if (!title.trim()) {
      alert("Please enter task title");
      return;
    }

    const newTask: Task = {
      id: Date.now(),
      title,
      description,
      status: "pending",
    };

    setTasks([...tasks, newTask]);
    setTitle("");
    setDescription("");
    setShowForm(false);
  };

  const toggleTask = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? {
              ...task,
              status:
                task.status === "pending"
                  ? "completed"
                  : "pending",
            }
          : task
      )
    );
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="dashboard">

      {/* Sidebar */}
      <aside className="sidebar">
        <div className="brand">
          <span className="brand-icon">✓</span>
          <span>TaskFlow</span>
        </div>

        <p className="menu-label">MENU</p>

        <button
          className={`nav-item ${filter === "all" ? "active" : ""}`}
          onClick={() => setFilter("all")}
        >
          <span>▦</span> Dashboard
        </button>

        <button
          className="nav-item"
          onClick={() => {
            setFilter("all");
            setSearch("");
          }}
        >
          <span>☷</span> All Tasks
        </button>

        <button
          className={`nav-item ${filter === "pending" ? "active" : ""}`}
          onClick={() => setFilter("pending")}
        >
          <span>◷</span> Pending
        </button>

        <button
          className={`nav-item ${filter === "completed" ? "active" : ""}`}
          onClick={() => setFilter("completed")}
        >
          <span>✓</span> Completed
        </button>

        <div className="sidebar-bottom">
          <div className="profile">
            <div className="avatar">K</div>
            <div>
              <strong>My Workspace</strong>
              <small>Personal Account</small>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">

        <header className="topbar">
          <div>
            <p className="welcome">WELCOME BACK 👋</p>
            <h1>My Dashboard</h1>
            <p className="subtitle">
              Manage your tasks and stay productive.
            </p>
          </div>

          <button
            className="add-button"
            onClick={() => setShowForm(!showForm)}
          >
            + Add New Task
          </button>
        </header>

        {/* Statistics */}
        <section className="stats-grid">

          <div className="stat-card">
            <div className="stat-icon purple">▦</div>
            <p>Total Tasks</p>
            <h2>{tasks.length}</h2>
            <small>All your tasks</small>
          </div>

          <div className="stat-card">
            <div className="stat-icon orange">◷</div>
            <p>Pending Tasks</p>
            <h2>{pendingCount}</h2>
            <small>Tasks to complete</small>
          </div>

          <div className="stat-card">
            <div className="stat-icon green">✓</div>
            <p>Completed Tasks</p>
            <h2>{completedCount}</h2>
            <small>Successfully completed</small>
          </div>

        </section>

        {/* Task Section */}
        <section className="task-section">

          <div className="section-header">
            <div>
              <h2>My Tasks</h2>
              <p>Keep track of your daily activities.</p>
            </div>

            <div className="search-box">
              <span>⌕</span>
              <input
                type="text"
                placeholder="Search tasks..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          {/* Add Task Form */}
          {showForm && (
            <div className="task-form">
              <h3>Add New Task</h3>

              <input
                type="text"
                placeholder="Enter task title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              <textarea
                placeholder="Enter task description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />

              <div className="form-actions">
                <button
                  className="cancel-button"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>

                <button className="add-button" onClick={addTask}>
                  Save Task
                </button>
              </div>
            </div>
          )}

          {/* Filters */}
          <div className="filter-tabs">
            {["all", "pending", "completed"].map((item) => (
              <button
                key={item}
                className={filter === item ? "selected" : ""}
                onClick={() => setFilter(item)}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </button>
            ))}
          </div>

          {/* Task List */}
          <div className="task-list">

            {filteredTasks.length === 0 ? (
              <div className="empty-state">
                <span>📋</span>
                <h3>No tasks found</h3>
                <p>Try adding a new task to get started.</p>
              </div>
            ) : (
              filteredTasks.map((task) => (
                <div className="task-card" key={task.id}>

                  <button
                    className={`task-check ${
                      task.status === "completed" ? "checked" : ""
                    }`}
                    onClick={() => toggleTask(task.id)}
                    aria-label="Toggle task status"
                  >
                    {task.status === "completed" ? "✓" : ""}
                  </button>

                  <div className="task-details">
                    <h3 className={
                      task.status === "completed" ? "completed-title" : ""
                    }>
                      {task.title}
                    </h3>
                    <p>{task.description}</p>
                  </div>

                  <span className={`status ${task.status}`}>
                    {task.status}
                  </span>

                  <button
                    className="delete-button"
                    onClick={() => deleteTask(task.id)}
                    aria-label="Delete task"
                  >
                    ✕
                  </button>

                </div>
              ))
            )}

          </div>

        </section>

        <footer>
          Made with care · TaskFlow
        </footer>

      </main>
    </div>
  );
}

export default App;
