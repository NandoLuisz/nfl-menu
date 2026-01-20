import Dashboard from "@/pages/Dashboard"
import HomeLayout from "@/pages/HomeLayout"
import List from "@/pages/Register"
import Menu from "@/pages/Products"
import { Route } from "react-router-dom"

export const authRoutes = (
  <Route element={<HomeLayout />}>
    <Route path="/" element={<Dashboard />} />
    <Route path="/list" element={<List />} />
    <Route path="/menu" element={<Menu />} />
  </Route>
)
