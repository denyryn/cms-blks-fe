import AuthLayout from "@/layouts/auth.layout";
import LoginPage from "@/pages/auth/login";
import RegisterPage from "@/pages/auth/register";
import LandingPage from "@/pages/landing/page";
import { Navigate } from "react-router";

let publicRoutes = [
  {
    path: "/",
    Component: LandingPage,
  },
  {
    path: "/login",
    element: <Navigate to="/auth/login" />,
  },
  {
    path: "/register",
    element: <Navigate to="/auth/register" />,
  },
  {
    path: "/auth",
    Component: AuthLayout,
    children: [
      {
        index: true,
        navigator: "/auth/login",
      },
      {
        path: "login",
        Component: LoginPage,
      },
      {
        path: "register",
        Component: RegisterPage,
      },
    ],
  },
];

export default publicRoutes;
