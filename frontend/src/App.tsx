import { RouterProvider } from "react-router"
import Router from "./router/Routes"

export default function App() {
  const router = Router();
  return <RouterProvider router={router} />
}

 