import { Navigate } from "react-router";
import DashboardLayout from "@/layouts/dashboard.layout";
import HomePage from "@/pages/dashboard/home/page";
import CategoryPage from "@/pages/dashboard/category/page";
import ProductPage from "@/pages/dashboard/product/page";
import ProductEditCreatePage from "@/pages/dashboard/product/edit-create/page";
import OrderPage from "@/pages/dashboard/order/page";

let adminRoutes = [
  {
    path: "/dashboard",
    Component: DashboardLayout,
    children: [
      {
        index: true,
        element: <Navigate to="home" />,
      },
      {
        path: "home",
        Component: HomePage,
      },
      {
        path: "category",
        Component: CategoryPage,
      },
      {
        path: "product",
        Component: ProductPage,
      },
      {
        path: "product/create",
        Component: ProductEditCreatePage,
      },
      {
        path: "product/edit/:id",
        Component: ProductEditCreatePage,
      },
      {
        path: "order",
        Component: OrderPage,
      },
    ],
  },
];

export default adminRoutes;
