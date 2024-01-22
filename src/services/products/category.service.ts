import ProductCategoryModel from '../../models/products/categories.model'
import { ICategory } from '../../types/product'

class ProductCategoriesService {
  async findAll() {
    return await ProductCategoryModel.find()
  }

  async create(productInfo: ICategory) {
    return await ProductCategoryModel.create(productInfo)
  }

  async findById(id: string) {
    return await ProductCategoryModel.findById(id)
  }

  async update(id: string, productUpdated: ICategory) {
    return await ProductCategoryModel.findByIdAndUpdate(id, productUpdated, {
      new: true,
    })
  }

  async delete(id: string) {
    return await ProductCategoryModel.findByIdAndDelete(id)
  }
}

export { ProductCategoriesService }
