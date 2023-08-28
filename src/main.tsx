import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query"; // Import QueryClient and QueryClientProvider
import App from "./App";
import "@css/global.css";
import ErrorBoundary from "./pages/errors/error_boundary/ErrorBoundary";

// Create a new instance of QueryClient
const queryClient = new QueryClient();

// Render the app with QueryClientProvider
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ErrorBoundary>
      {/* Provide the QueryClient instance */}
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
