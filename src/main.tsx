import { StrictMode } from "react";
import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import "./styles/globals.css";
import App from "./app/App";

// Restore the route forwarded by public/404.html on GitHub Pages.
const redirect = new URLSearchParams(window.location.search).get("redirect");
if (redirect?.startsWith("/") && !redirect.startsWith("//")) {
  const destination = new URL(redirect, window.location.origin);
  if (destination.origin === window.location.origin) {
    window.history.replaceState(null, "", destination.pathname + destination.search + destination.hash);
  }
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
