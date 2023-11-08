import ProductModel from '../models/product.model'
import { IProduct } from '../types/product'

class ProductService {
  async create(productInfo: IProduct) {
    return await ProductModel.create(productInfo)
  }

  async findAll(skip: number, limit: number) {
    return await ProductModel.find().skip(skip).limit(limit)
  }

  async findById(id: string) {
    return await ProductModel.findById(id)
  }

  async update(id: string, productUpdated: IProduct) {
    return await ProductModel.findByIdAndUpdate(id, productUpdated, {
      new: true,
    })
  }

  async delete(id: string) {
    return await ProductModel.findByIdAndDelete(id)
  }

  async countCharacters() {
    return await ProductModel.countDocuments()
  }
}

export { ProductService }
