import { createBrowserRouter } from "react-router";
import Dashboard from "@/pages/Dashboard";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import Assets from "@/pages/Assets";
import { protectedLoader } from "@/components/auth/protectedLoader";
export default function Router() {
  const router = createBrowserRouter([
    {
      element: <DashboardLayout />,
      loader: protectedLoader,
      children: [
        { path: "/", element: <Dashboard /> },
        { path: "/assets", element: <Assets /> },
      ],
    },
  ]);

  return router;
}
