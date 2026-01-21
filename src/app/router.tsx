import Dashboard from "@/pages/Dashboard"
import HomeLayout from "@/pages/HomeLayout"
import Orders from "@/pages/Orders"
import { createBrowserRouter } from "react-router"
import Register from "@/pages/Register"
import Stock from "@/pages/Stock"

export const router = createBrowserRouter([
  {
    element: <HomeLayout />,
    children: [
      { path: "/", element: <Dashboard /> },
      { path: "/register", element: <Register /> },
      { path: "/stock", element: <Stock /> },
      { path: "/orders", element: <Orders /> },
    ],
  },
])
