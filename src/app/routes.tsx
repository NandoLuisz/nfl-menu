import Dashboard from "@/pages/Dashboard"
import HomeLayout from "@/pages/HomeLayout"
import Orders from "@/pages/Orders"
import Register from "@/pages/Register"
import Stock from "@/pages/Stock"
import { Route } from "react-router-dom"

export const authRoutes = (
  <Route element={<HomeLayout />}>
    <Route path="/" element={<Dashboard />} />
    <Route path="/orders" element={<Orders />} />
    <Route path="/register" element={<Register />} />
    <Route path="/stock" element={<Stock />} />
  </Route>
)
