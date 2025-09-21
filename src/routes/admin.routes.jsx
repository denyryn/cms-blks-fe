import DashboardLayout from "@/layouts/dashboard.layout";
import HomePage from "@/pages/dashboard/home";

let adminRoutes = [
  {
    path: "/dashboard",
    Component: DashboardLayout,
    children: [
      {
        index: true,
        Component: HomePage,
      },
    ],
  },
];

export default adminRoutes;
