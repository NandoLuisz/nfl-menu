export interface FoodResponse {
  id: number
  title: string
  image: string
  description: string
  price: number
  type: string
}

export interface FoodRequest {
  title: string
  image: string
  description: string
  price: number
  type: string
}
