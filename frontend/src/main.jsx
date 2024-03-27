import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import RegistrationPage from "./pages/RegistrationPage";
import LoginPage from "./pages/LoginPage";
import AuthLayout from "./layouts/AuthLayout";
import AppLayout from "./layouts/AppLayout";
import { AuthProvider } from "./contexts/AuthContext";
import RootLayout from "./layouts/RootLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthProvider>
        <RootLayout />
      </AuthProvider>
    ),
    children: [
      {
        path: "app/",
        element: <AppLayout />,
      },
      {
        path: "auth/",
        element: <AuthLayout />,
        children: [
          {
            index: true,
            element: <Navigate to="login" />,
          },
          {
            path: "login",
            element: <LoginPage />,
          },
          {
            path: "register",
            element: <RegistrationPage />,
          },
        ],
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
