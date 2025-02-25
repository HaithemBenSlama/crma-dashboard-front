import "./index.css";
import ReactDOM from "react-dom/client"; // Import ReactDOM from react-dom/client
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/login/login";
import React from "react";
import PasswordResetPage from "./pages/password-reset/password-reset";
import OtpPage from "./pages/otp/otp";
const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  { path: "/reset", element: <PasswordResetPage /> },
  { path: "/otp", element: <OtpPage /> },
]);

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
