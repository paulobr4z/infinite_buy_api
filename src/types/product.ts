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
  _doc: IProduct
}

export interface IQuery {
  page: number
  perPage: number
  category: string
}

export interface ICategory {
  id: string
  name: string
  description: string
  created_at: Date
}
