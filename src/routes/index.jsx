import { createBrowserRouter } from "react-router";

import publicRoutes from "./public.routes";
import adminRoutes from "./admin.routes";

let router = createBrowserRouter([
  // Public Routes (unauthenticated)
  ...publicRoutes,

  // Admin Routes
  ...adminRoutes,
]);

export default router;
