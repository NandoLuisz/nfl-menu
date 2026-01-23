export type Order = {
  id: string
  date: string
  items: number
  status: "pendente" | "entregue" | "cancelado"
  price: number
  address: string
}

export const orders: Order[] = [
  {
    id: "m5gr84i9",
    date: "17 Jan, 2025",
    items: 316,
    price: 25.5,
    status: "entregue",
    address: "13 de Maio, 5483",
  },
  {
    id: "3u1reuv4",
    date: "17 Jan, 2025",
    items: 242,
    price: 25.5,
    status: "entregue",
    address: "13 de Maio, 5483",
  },
  {
    id: "derv1ws0",
    date: "17 Jan, 2025",
    items: 837,
    price: 25.5,
    status: "pendente",
    address: "13 de Maio, 5483",
  },
  {
    id: "5kma53ae",
    date: "17 Jan, 2025",
    items: 874,
    price: 25.5,
    status: "entregue",
    address: "13 de Maio, 5483",
  },
  {
    id: "bhqecj4p",
    date: "17 Jan, 2025",
    items: 721,
    price: 25.5,
    status: "cancelado",
    address: "13 de Maio, 5483",
  },
]
