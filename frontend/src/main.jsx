import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import RegistrationPage from "./pages/RegistrationPage";
import LoginPage from "./pages/LoginPage";
import AuthLayout from "./layouts/AuthLayout";
import AppLayout from "./layouts/AppLayout";
import { AuthProvider } from "./contexts/AuthContext";
import RootLayout from "./layouts/RootLayout";
import { PrivateRoute } from "./components/PrivateRoute";
import "./global.css";
import { BallotsPage } from "./pages/BallotsPage";
import { AvailableVotings } from "./pages/AvailableVotings";
import { EndedVotings } from "./pages/EndedVotings";
import { CreateVotingPage } from "./pages/CreateVotingPage";
import { VotingDetailsPage } from "./pages/VotingDetailsPage";

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
        index: true,
        element: <Navigate to="/app" />,
      },
      {
        path: "app/",
        element: (
          <PrivateRoute redirectTo="/auth/login">
            <AppLayout />
          </PrivateRoute>
        ),
        children: [
          {
            path: "ballots",
            element: (
              <PrivateRoute redirectTo="/auth/login">
                <BallotsPage />
              </PrivateRoute>
            ),
          },
          {
            path: "available-votings",
            element: (
              <PrivateRoute redirectTo="/auth/login">
                <AvailableVotings />
              </PrivateRoute>
            ),
          },
          {
            path: "available-votings/:id",
            element: (
              <PrivateRoute redirectTo="/auth/login">
                <VotingDetailsPage />
              </PrivateRoute>
            ),
          },
          {
            path: "ended-votings",
            element: (
              <PrivateRoute redirectTo="/auth/login">
                <EndedVotings />
              </PrivateRoute>
            ),
          },
          {
            path: "ended-votings/:id",
            element: (
              <PrivateRoute redirectTo="/auth/login">
                <VotingDetailsPage />
              </PrivateRoute>
            ),
          },
          {
            path: "create-voting",
            element: (
              <PrivateRoute redirectTo="/auth/login">
                <CreateVotingPage />
              </PrivateRoute>
            ),
          },
        ],
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
