import { useEffect, useMemo, useState } from "react";
import {
  adminRequest,
  apiRequest,
  clearAdminToken,
  getAdminToken,
  setAdminToken,
} from "../utils/api";

const emptyProject = {
  title: "",
  subtitle: "",
  description: "",
  image: "",
  github: "",
  demo: "",
  tags: "",
  bullets: "",
};

function getTopCounts(items, key, limit) {
  const counts = new Map();

  for (const item of items) {
    const value = item[key] || "/";
    counts.set(value, (counts.get(value) || 0) + 1);
  }

  return [...counts.entries()]
    .map(([label, count]) => ({ label, count }))
    .sort((first, second) => second.count - first.count)
    .slice(0, limit);
}

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(Boolean(getAdminToken()));
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [loginError, setLoginError] = useState("");
  const [summary, setSummary] = useState(null);
  const [projects, setProjects] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [events, setEvents] = useState([]);
  const [projectForm, setProjectForm] = useState(emptyProject);
  const [editingProjectId, setEditingProjectId] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  const recentEvents = useMemo(() => events.slice(0, 8), [events]);
  const eventNameCounts = useMemo(() => getTopCounts(events, "name", 5), [events]);
  const pathCounts = useMemo(() => getTopCounts(events, "path", 5), [events]);
  const maxEventCount = Math.max(...eventNameCounts.map((item) => item.count), 1);
  const maxPathCount = Math.max(...pathCounts.map((item) => item.count), 1);

  async function loadDashboard() {
    const [summaryData, projectData, contactData, eventData] = await Promise.all([
      adminRequest("/api/admin/summary"),
      adminRequest("/api/admin/projects"),
      adminRequest("/api/admin/contacts"),
      adminRequest("/api/admin/events"),
    ]);

    setSummary(summaryData);
    setProjects(projectData.projects || []);
    setContacts(contactData.contacts || []);
    setEvents(eventData.events || []);
  }

  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }

    // The dashboard must fetch protected admin data after token hydration.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadDashboard().catch((loadError) => {
      setError(loadError.message);
      clearAdminToken();
      setIsAuthenticated(false);
    });
  }, [isAuthenticated]);

  async function handleLogin(event) {
    event.preventDefault();
    setLoginError("");

    try {
      const data = await apiRequest("/api/auth/login", {
        method: "POST",
        body: JSON.stringify(loginForm),
      });
      setAdminToken(data.token);
      setIsAuthenticated(true);
    } catch (loginRequestError) {
      setLoginError(loginRequestError.message);
    }
  }

  async function handleProjectSubmit(event) {
    event.preventDefault();
    setStatus("");
    setError("");

    try {
      await adminRequest(
        editingProjectId ? `/api/admin/projects/${editingProjectId}` : "/api/admin/projects",
        {
          method: editingProjectId ? "PUT" : "POST",
          body: JSON.stringify(projectForm),
        }
      );
      setProjectForm(emptyProject);
      setEditingProjectId("");
      setStatus(editingProjectId ? "Project updated." : "Project added to portfolio.");
      await loadDashboard();
    } catch (projectError) {
      setError(projectError.message);
    }
  }

  function editProject(project) {
    setEditingProjectId(project.id);
    setProjectForm({
      title: project.title || "",
      subtitle: project.subtitle || "",
      description: project.description || "",
      image: project.image || "",
      github: project.github || "",
      demo: project.demo || "",
      tags: Array.isArray(project.tags) ? project.tags.join(", ") : "",
      bullets: Array.isArray(project.bullets) ? project.bullets.join("\n") : "",
    });
    setStatus("");
    setError("");
  }

  function cancelEdit() {
    setEditingProjectId("");
    setProjectForm(emptyProject);
  }

  async function deleteProject(projectId) {
    await adminRequest(`/api/admin/projects/${projectId}`, { method: "DELETE" });
    await loadDashboard();
  }

  async function updateContactStatus(contactId, statusValue) {
    await adminRequest(`/api/admin/contacts/${contactId}`, {
      method: "PATCH",
      body: JSON.stringify({ status: statusValue }),
    });
    await loadDashboard();
  }

  async function deleteContact(contactId) {
    await adminRequest(`/api/admin/contacts/${contactId}`, { method: "DELETE" });
    await loadDashboard();
  }

  if (!isAuthenticated) {
    return (
      <main className="admin-root admin-login-root">
        <form className="admin-login-card" onSubmit={handleLogin}>
          <span className="admin-eyebrow">Portfolio Admin</span>
          <h1>Sign in</h1>
          <label>
            Email
            <input
              type="email"
              value={loginForm.email}
              onChange={(event) =>
                setLoginForm((current) => ({ ...current, email: event.target.value }))
              }
              required
            />
          </label>
          <label>
            Password
            <input
              type="password"
              value={loginForm.password}
              onChange={(event) =>
                setLoginForm((current) => ({ ...current, password: event.target.value }))
              }
              required
            />
          </label>
          <button type="submit">Login</button>
          {loginError ? <p className="admin-error">{loginError}</p> : null}
          <a href="/">Back to portfolio</a>
        </form>
      </main>
    );
  }

  return (
    <main className="admin-root">
      <header className="admin-header">
        <div>
          <span className="admin-eyebrow">Portfolio Admin</span>
          <h1>Dashboard</h1>
        </div>
        <div className="admin-header-actions">
          <a href="/">Portfolio</a>
          <button
            type="button"
            onClick={() => {
              clearAdminToken();
              setIsAuthenticated(false);
            }}
          >
            Logout
          </button>
        </div>
      </header>

      {summary ? (
        <section className="admin-metrics">
          <div>
            <strong>{summary.totalProjects}</strong>
            <span>Managed Projects</span>
          </div>
          <div>
            <strong>{summary.totalContacts}</strong>
            <span>Contact Messages</span>
          </div>
          <div>
            <strong>{summary.unreadContacts}</strong>
            <span>Unread</span>
          </div>
          <div>
            <strong>{summary.uniqueVisitors}</strong>
            <span>Visitors</span>
          </div>
        </section>
      ) : null}

      {status ? <p className="admin-status">{status}</p> : null}
      {error ? <p className="admin-error">{error}</p> : null}

      <section className="admin-panel">
        <div className="admin-panel-heading">
          <h2>{editingProjectId ? "Edit Project" : "Add Project"}</h2>
          <p>
            {editingProjectId
              ? "Update the selected project and save changes."
              : "Projects added here appear on the public portfolio after refresh."}
          </p>
        </div>
        <form className="admin-project-form" onSubmit={handleProjectSubmit}>
          <input
            placeholder="Project title"
            value={projectForm.title}
            onChange={(event) =>
              setProjectForm((current) => ({ ...current, title: event.target.value }))
            }
            required
          />
          <input
            placeholder="Subtitle / tech stack"
            value={projectForm.subtitle}
            onChange={(event) =>
              setProjectForm((current) => ({ ...current, subtitle: event.target.value }))
            }
          />
          <textarea
            placeholder="Description"
            value={projectForm.description}
            onChange={(event) =>
              setProjectForm((current) => ({ ...current, description: event.target.value }))
            }
            required
          />
          <input
            placeholder="Image path, for example /portfolio.png"
            value={projectForm.image}
            onChange={(event) =>
              setProjectForm((current) => ({ ...current, image: event.target.value }))
            }
          />
          <input
            placeholder="GitHub URL"
            value={projectForm.github}
            onChange={(event) =>
              setProjectForm((current) => ({ ...current, github: event.target.value }))
            }
          />
          <input
            placeholder="Live demo URL"
            value={projectForm.demo}
            onChange={(event) =>
              setProjectForm((current) => ({ ...current, demo: event.target.value }))
            }
          />
          <input
            placeholder="Tags separated by commas"
            value={projectForm.tags}
            onChange={(event) =>
              setProjectForm((current) => ({ ...current, tags: event.target.value }))
            }
          />
          <textarea
            placeholder="Bullets, one per line"
            value={projectForm.bullets}
            onChange={(event) =>
              setProjectForm((current) => ({ ...current, bullets: event.target.value }))
            }
          />
          <div className="admin-form-actions">
            <button type="submit">{editingProjectId ? "Save Changes" : "Add Project"}</button>
            {editingProjectId ? (
              <button type="button" onClick={cancelEdit}>
                Cancel Edit
              </button>
            ) : null}
          </div>
        </form>
      </section>

      <section className="admin-grid">
        <div className="admin-panel">
          <div className="admin-panel-heading">
            <h2>Managed Projects</h2>
            <p>{projects.length} saved projects</p>
          </div>
          <div className="admin-list">
            {projects.map((project) => (
              <article key={project.id} className="admin-list-item">
                <div>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                </div>
                <div className="admin-row-actions">
                  <button type="button" onClick={() => editProject(project)}>
                    Edit
                  </button>
                  <button type="button" onClick={() => deleteProject(project.id)}>
                    Delete
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="admin-panel">
          <div className="admin-panel-heading">
            <h2>Contact Messages</h2>
            <p>{contacts.length} messages</p>
          </div>
          <div className="admin-list">
            {contacts.map((contact) => (
              <article key={contact.id} className="admin-list-item">
                <div>
                  <h3>{contact.name}</h3>
                  <p>{contact.email}</p>
                  <p>{contact.message}</p>
                  <span>{contact.status}</span>
                </div>
                <div className="admin-row-actions">
                  <button
                    type="button"
                    onClick={() =>
                      updateContactStatus(contact.id, contact.status === "read" ? "unread" : "read")
                    }
                  >
                    {contact.status === "read" ? "Unread" : "Read"}
                  </button>
                  <button type="button" onClick={() => deleteContact(contact.id)}>
                    Delete
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="admin-panel">
        <div className="admin-panel-heading">
          <h2>Visitor Analytics</h2>
          <p>{events.length} tracked events</p>
        </div>
        <div className="admin-analytics-grid">
          <div>
            <h3>Top Events</h3>
            <div className="admin-bar-list">
              {eventNameCounts.map((item) => (
                <div key={item.label} className="admin-bar-row">
                  <span>{item.label}</span>
                  <div>
                    <i style={{ width: `${(item.count / maxPathCount) * 100}%` }}></i>
                  </div>
                  <strong>{item.count}</strong>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3>Top Paths</h3>
            <div className="admin-bar-list">
              {pathCounts.map((item) => (
                <div key={item.label} className="admin-bar-row">
                  <span>{item.label || "/"}</span>
                  <div>
                    <i style={{ width: `${(item.count / maxEventCount) * 100}%` }}></i>
                  </div>
                  <strong>{item.count}</strong>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="admin-panel">
        <div className="admin-panel-heading">
          <h2>Recent Visitor Events</h2>
          <p>Latest tracked activity</p>
        </div>
        <div className="admin-event-list">
          {recentEvents.map((event) => (
            <div key={event.id}>
              <strong>{event.name}</strong>
              <span>{event.path || "/"}</span>
              <span>{new Date(event.createdAt).toLocaleString()}</span>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
