import ProductModel from '../models/product.model'
import { IProduct } from '../types/product'

class ProductService {
  async create(productInfo: IProduct) {
    return await ProductModel.create(productInfo)
  }

  async findAll() {
    return await ProductModel.find()
  }
}

export { ProductService }
