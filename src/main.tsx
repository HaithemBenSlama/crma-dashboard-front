import "./index.css";
import ReactDOM from "react-dom/client"; // Import ReactDOM from react-dom/client
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React from "react";
import LoginPage from "./pages/auth/login/login";
import PasswordResetPage from "./pages/auth/password-reset/password-reset";
import OtpPage from "./pages/auth/otp/otp";
import NewPasswordPage from "./pages/auth/new-password/new-password";

const router = createBrowserRouter([
  { path: "/", element: <LoginPage /> },
  { path: "/reset", element: <PasswordResetPage /> },
  { path: "/otp", element: <OtpPage /> },
  { path: "/new-password", element: <NewPasswordPage /> },
]);

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
