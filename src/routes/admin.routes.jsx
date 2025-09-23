import DashboardLayout from "@/layouts/dashboard.layout";
import CategoryPage from "@/pages/dashboard/category/page";
import ProductPage from "@/pages/dashboard/product/page";

let adminRoutes = [
  {
    path: "/dashboard",
    Component: DashboardLayout,
    children: [
      {
        path: "category",
        Component: CategoryPage,
      },
      {
        path: "product",
        Component: ProductPage,
      },
    ],
  },
];

export default adminRoutes;
