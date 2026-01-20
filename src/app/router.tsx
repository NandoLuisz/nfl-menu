import Dashboard from "@/pages/Dashboard"
import HomeLayout from "@/pages/HomeLayout"
import Products from "@/pages/Products"
import Orders from "@/pages/Orders"
import { createBrowserRouter } from "react-router"
import Register from "@/pages/Register"

export const router = createBrowserRouter([
  {
    element: <HomeLayout />,
    children: [
      { path: "/", element: <Dashboard /> },
      { path: "/register", element: <Register /> },
      { path: "/products", element: <Products /> },
      { path: "/orders", element: <Orders /> },
    ],
  },
])
