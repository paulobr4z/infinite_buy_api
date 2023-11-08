export interface IProduct {
  id: string
  name: string
  description: string
  price: number
  images: string[]
  amount: number
  discount: number
  category: string[]
  created_at: Date
}

export interface IQuery {
  page: number
  perPage: number
}
