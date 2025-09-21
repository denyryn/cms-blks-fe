import { createBrowserRouter } from "react-router";
import Home from "@/pages/home";
import LoginPage from "@/pages/auth/login";
import RegisterPage from "@/pages/auth/register";

let router = createBrowserRouter([
  {
    path: "/",
    Component: () => <Home />,
  },
  {
    path: "/auth",
    children: [
      {
        path: "login",
        Component: () => <LoginPage />,
      },
      {
        path: "register",
        Component: () => <RegisterPage />,
      },
    ],
  },
]);

export default router;
