import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

// Start MSW worker in development only
if (import.meta.env.DEV) {
  const { worker } = await import("./mocks/browser");
  worker.start({
    onUnhandledRequest: "bypass", // Bypass unhandled requests (e.g., external APIs)
  });
}
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
