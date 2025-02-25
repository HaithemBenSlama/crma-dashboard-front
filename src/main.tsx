import "./index.css";
import ReactDOM from "react-dom/client"; // Import ReactDOM from react-dom/client
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/login/login";
import React from "react";
import PasswordResetPage from "./pages/password-reset/password-reset";
const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  { path: "/reset", element: <PasswordResetPage /> },
]);

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
