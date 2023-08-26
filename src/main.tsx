// libraries
import React from "react";
import ReactDOM from "react-dom/client";

// components
import App from "./App";

// styles
import "@css/global.css";
import ErrorBoundary from "./pages/errors/error_boundary/ErrorBoundary";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
