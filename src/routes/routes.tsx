import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Login from "../pages/Login";
import Register from "../pages/Register";
import { routesGenerator } from "../utils/routesGenerator";
import { adminPaths } from "./admin.routes";
import { facultyPaths } from "./faculty.routes";
import { studentPaths } from "./student.routes";
import ProtectedRoute from "../components/layout/ProtectedRoute";
import ChangePassword from "../pages/ChangePassword";

export const router: ReturnType<typeof createBrowserRouter> =
  createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        {
          path: "about",
          element: <About />,
        },
        {
          path: "contact",
          element: <Contact />,
        },
      ],
    },
    {
      path: "/admin",
      element: (
        <ProtectedRoute role="admin">
          <App />
        </ProtectedRoute>
      ),
      children: routesGenerator(adminPaths),
    },
    {
      path: "/faculty",
      element: (
        <ProtectedRoute role="faculty">
          <App />
        </ProtectedRoute>
      ),
      children: routesGenerator(facultyPaths),
    },
    {
      path: "/student",
      element: (
        <ProtectedRoute role="student">
          <App />
        </ProtectedRoute>
      ),
      children: routesGenerator(studentPaths),
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "change-password",
      element: <ChangePassword />,
    },
  ]);
