import { createServer } from "node:http";
import { createId, readCollection, writeCollection } from "./storage.js";
import { createToken, validateLogin, verifyToken } from "./auth.js";
import { config } from "./config.js";
import { rateLimit } from "./rateLimit.js";

function sendJson(response, status, payload) {
  response.writeHead(status, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": config.allowedOrigin,
    "Access-Control-Allow-Methods": "GET,POST,PUT,PATCH,DELETE,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type,Authorization",
  });
  response.end(JSON.stringify(payload));
}

function parseBody(request) {
  return new Promise((resolve, reject) => {
    let body = "";

    request.on("data", (chunk) => {
      body += chunk;

      if (body.length > 1_000_000) {
        request.destroy();
        reject(new Error("Request body is too large"));
      }
    });

    request.on("end", () => {
      if (!body) {
        resolve({});
        return;
      }

      try {
        resolve(JSON.parse(body));
      } catch {
        reject(new Error("Invalid JSON"));
      }
    });
  });
}

function getAuthPayload(request) {
  const header = request.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : "";
  return verifyToken(token);
}

function cleanProject(input) {
  return {
    title: String(input.title || "").trim(),
    subtitle: String(input.subtitle || "").trim(),
    description: String(input.description || "").trim(),
    image: String(input.image || "").trim(),
    github: String(input.github || "").trim(),
    demo: String(input.demo || "").trim(),
    tags: Array.isArray(input.tags)
      ? input.tags.map(String).map((tag) => tag.trim()).filter(Boolean)
      : String(input.tags || "")
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
    bullets: Array.isArray(input.bullets)
      ? input.bullets.map(String).map((item) => item.trim()).filter(Boolean)
      : String(input.bullets || "")
          .split("\n")
          .map((item) => item.trim())
          .filter(Boolean),
  };
}

async function requireAdmin(request, response) {
  const authPayload = getAuthPayload(request);

  if (!authPayload) {
    sendJson(response, 401, { error: "Unauthorized" });
    return null;
  }

  return authPayload;
}

async function route(request, response) {
  const url = new URL(request.url, `http://${request.headers.host}`);
  const { pathname } = url;

  if (request.method === "OPTIONS") {
    sendJson(response, 204, {});
    return;
  }

  if (request.method === "GET" && pathname === "/api/health") {
    sendJson(response, 200, { ok: true, service: "portfolio-api" });
    return;
  }

  if (request.method === "POST" && pathname === "/api/auth/login") {
    if (rateLimit(request, response, "login", 8)) {
      return;
    }

    const body = await parseBody(request);

    if (!validateLogin(body.email, body.password)) {
      sendJson(response, 401, { error: "Invalid admin credentials" });
      return;
    }

    sendJson(response, 200, { token: createToken(body.email), email: body.email });
    return;
  }

  if (request.method === "GET" && pathname === "/api/projects") {
    const projects = await readCollection("projects");
    sendJson(response, 200, { projects: projects.filter((project) => project.visible !== false) });
    return;
  }

  if (request.method === "POST" && pathname === "/api/contact") {
    if (rateLimit(request, response, "contact", 10)) {
      return;
    }

    const body = await parseBody(request);
    const contacts = await readCollection("contacts");
    const contact = {
      id: createId("contact"),
      name: String(body.name || "").trim(),
      email: String(body.email || "").trim(),
      message: String(body.message || "").trim(),
      status: "unread",
      createdAt: new Date().toISOString(),
    };

    if (!contact.name || !contact.email || !contact.message) {
      sendJson(response, 400, { error: "Name, email, and message are required" });
      return;
    }

    contacts.unshift(contact);
    await writeCollection("contacts", contacts);
    sendJson(response, 201, { ok: true, contact });
    return;
  }

  if (request.method === "POST" && pathname === "/api/track") {
    if (rateLimit(request, response, "track", 120)) {
      return;
    }

    const body = await parseBody(request);
    const events = await readCollection("events");
    const event = {
      id: createId("event"),
      name: String(body.name || "event").slice(0, 80),
      details: body.details || {},
      sessionId: String(body.sessionId || "").slice(0, 120),
      path: String(body.path || ""),
      search: String(body.search || ""),
      referrer: String(body.referrer || ""),
      userAgent: request.headers["user-agent"] || "",
      createdAt: new Date().toISOString(),
    };

    events.unshift(event);
    await writeCollection("events", events.slice(0, 1000));
    sendJson(response, 201, { ok: true });
    return;
  }

  if (pathname.startsWith("/api/admin")) {
    const admin = await requireAdmin(request, response);

    if (!admin) {
      return;
    }

    if (request.method === "GET" && pathname === "/api/admin/summary") {
      const [projects, contacts, events] = await Promise.all([
        readCollection("projects"),
        readCollection("contacts"),
        readCollection("events"),
      ]);
      const uniqueVisitors = new Set(events.map((event) => event.sessionId).filter(Boolean));

      sendJson(response, 200, {
        totalProjects: projects.length,
        totalContacts: contacts.length,
        unreadContacts: contacts.filter((contact) => contact.status !== "read").length,
        totalEvents: events.length,
        uniqueVisitors: uniqueVisitors.size,
      });
      return;
    }

    if (request.method === "GET" && pathname === "/api/admin/projects") {
      sendJson(response, 200, { projects: await readCollection("projects") });
      return;
    }

    if (request.method === "POST" && pathname === "/api/admin/projects") {
      const projects = await readCollection("projects");
      const project = {
        id: createId("project"),
        ...cleanProject(await parseBody(request)),
        visible: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      if (!project.title || !project.description) {
        sendJson(response, 400, { error: "Title and description are required" });
        return;
      }

      projects.unshift(project);
      await writeCollection("projects", projects);
      sendJson(response, 201, { project });
      return;
    }

    const projectMatch = pathname.match(/^\/api\/admin\/projects\/([^/]+)$/);

    if (projectMatch && request.method === "PUT") {
      const projects = await readCollection("projects");
      const projectId = projectMatch[1];
      const index = projects.findIndex((project) => project.id === projectId);

      if (index === -1) {
        sendJson(response, 404, { error: "Project not found" });
        return;
      }

      projects[index] = {
        ...projects[index],
        ...cleanProject(await parseBody(request)),
        updatedAt: new Date().toISOString(),
      };
      await writeCollection("projects", projects);
      sendJson(response, 200, { project: projects[index] });
      return;
    }

    if (projectMatch && request.method === "DELETE") {
      const projects = await readCollection("projects");
      const nextProjects = projects.filter((project) => project.id !== projectMatch[1]);
      await writeCollection("projects", nextProjects);
      sendJson(response, 200, { ok: true });
      return;
    }

    if (request.method === "GET" && pathname === "/api/admin/contacts") {
      sendJson(response, 200, { contacts: await readCollection("contacts") });
      return;
    }

    const contactMatch = pathname.match(/^\/api\/admin\/contacts\/([^/]+)$/);

    if (contactMatch && request.method === "PATCH") {
      const contacts = await readCollection("contacts");
      const contact = contacts.find((item) => item.id === contactMatch[1]);

      if (!contact) {
        sendJson(response, 404, { error: "Contact not found" });
        return;
      }

      const body = await parseBody(request);
      contact.status = body.status === "read" ? "read" : "unread";
      contact.updatedAt = new Date().toISOString();
      await writeCollection("contacts", contacts);
      sendJson(response, 200, { contact });
      return;
    }

    if (contactMatch && request.method === "DELETE") {
      const contacts = await readCollection("contacts");
      await writeCollection(
        "contacts",
        contacts.filter((contact) => contact.id !== contactMatch[1])
      );
      sendJson(response, 200, { ok: true });
      return;
    }

    if (request.method === "GET" && pathname === "/api/admin/events") {
      sendJson(response, 200, { events: await readCollection("events") });
      return;
    }
  }

  sendJson(response, 404, { error: "Not found" });
}

const server = createServer((request, response) => {
  route(request, response).catch((error) => {
    sendJson(response, 500, { error: error.message || "Server error" });
  });
});

server.listen(config.port, () => {
  console.log(`Portfolio API running at http://127.0.0.1:${config.port}`);
});
