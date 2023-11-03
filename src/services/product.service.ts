import ProductModel from '../models/product.model'
import { IProduct } from '../types/product'

class ProductService {
  async create(productInfo: IProduct) {
    return await ProductModel.create(productInfo)
  }

  async findAll() {
    return await ProductModel.find()
  }

  async findById(id: string) {
    return await ProductModel.findById(id)
  }

  async update(id: string, productUpdated: IProduct) {
    return await ProductModel.findByIdAndUpdate(id, productUpdated, {
      new: true,
    })
  }
}

export { ProductService }
