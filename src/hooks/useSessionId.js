import { useState } from "react";

// Generate a unique session ID and persist it in localStorage
function generateSessionId() {
  return (
    "sess_" + Math.random().toString(36).substring(2) + Date.now().toString(36)
  );
}

export function useSessionId() {
  const [sessionId] = useState(() => {
    const existing = localStorage.getItem("vanita_session_id");
    if (existing) return existing;
    const newId = generateSessionId();
    localStorage.setItem("vanita_session_id", newId);
    return newId;
  });
  return sessionId;
}
