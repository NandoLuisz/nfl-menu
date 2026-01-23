import {
  Beef,
  Wheat,
  Milk,
  LeafyGreen,
  Droplets,
  CupSoda,
  IceCream,
  Package,
  Flame,
  SprayCan,
  Coffee,
  Banana,
} from "lucide-react"

export const categoriesStock = [
  { value: "Carnes", icon: <Beef />, textColorHover: "hover:text-red-800" },

  { value: "Pães", icon: <Wheat />, textColorHover: "hover:text-amber-700" },

  { value: "Laticínios", icon: <Milk />, textColorHover: "hover:text-white" },

  { value: "Vegetais", icon: <LeafyGreen />, textColorHover: "hover:text-green-700" },

  { value: "Frutas", icon: <Banana />, textColorHover: "hover:text-yellow-500" },

  { value: "Molhos e Condimentos", icon: <Droplets />, textColorHover: "hover:text-red-300" },

  { value: "Bebidas", icon: <CupSoda />, textColorHover: "hover:text-blue-800" },

  { value: "Café e Sobremesas", icon: <Coffee />, textColorHover: "hover:text-yellow-900" },

  { value: "Congelados", icon: <IceCream />, textColorHover: "hover:text-lime-600" },

  { value: "Embalagens", icon: <Package />, textColorHover: "hover:text-red-900" },

  { value: "Óleos e Fritura", icon: <Flame />, textColorHover: "hover:text-orange-400" },

  { value: "Limpeza", icon: <SprayCan />, textColorHover: "hover:text-purple-400" },
]
