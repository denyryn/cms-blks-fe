import AuthLayout from "@/layouts/auth.layout";
import Home from "@/pages/home";
import LoginPage from "@/pages/auth/login";
import RegisterPage from "@/pages/auth/register";

let publicRoutes = [
  {
    path: "/",
    Component: Home,
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
