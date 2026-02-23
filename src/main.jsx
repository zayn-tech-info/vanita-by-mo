import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { App } from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ConvexProvider client={convex}>
      <BrowserRouter>
        <App />
        <ToastContainer
          position="bottom-right"
          autoClose={4000}
          hideProgressBar={false}
          closeOnClick
          pauseOnHover
        />
      </BrowserRouter>
    </ConvexProvider>
  </StrictMode>,
);
