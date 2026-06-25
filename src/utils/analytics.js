const ANALYTICS_SESSION_KEY = "portfolio_session_id";
const ANALYTICS_EVENT_KEY = "portfolio_event_count";
const DEFAULT_ANALYTICS_ENDPOINT = "http://127.0.0.1:4174/api/track";

function getSessionId() {
  const existingId = localStorage.getItem(ANALYTICS_SESSION_KEY);

  if (existingId) {
    return existingId;
  }

  const generatedId =
    typeof crypto !== "undefined" && crypto.randomUUID
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(16).slice(2)}`;

  localStorage.setItem(ANALYTICS_SESSION_KEY, generatedId);
  return generatedId;
}

function getEventCount() {
  const current = Number(localStorage.getItem(ANALYTICS_EVENT_KEY) || "0") + 1;
  localStorage.setItem(ANALYTICS_EVENT_KEY, String(current));
  return current;
}

export function initAnalytics() {
  const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;

  if (!measurementId || window.gtag) {
    return;
  }

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };
  window.gtag("js", new Date());
  window.gtag("config", measurementId);
}

export function trackEvent(name, details = {}) {
  const event = {
    name,
    details,
    sessionId: getSessionId(),
    eventCount: getEventCount(),
    path: window.location.pathname,
    search: window.location.search,
    referrer: document.referrer,
    timestamp: new Date().toISOString(),
  };

  if (window.gtag) {
    window.gtag("event", name, details);
  }

  const endpoint = import.meta.env.VITE_ANALYTICS_ENDPOINT || DEFAULT_ANALYTICS_ENDPOINT;

  if (endpoint && navigator.sendBeacon) {
    const payload = new Blob([JSON.stringify(event)], {
      type: "application/json",
    });
    navigator.sendBeacon(endpoint, payload);
  }

  if (import.meta.env.DEV) {
    console.info("[portfolio analytics]", event);
  }
}
