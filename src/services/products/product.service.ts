import ProductModel from '../../models/products/product.model'
import { IProduct } from '../../types/product'

interface IQuery {
  category?: {
    $in: string[]
  }
}

interface IFindAllService {
  category: string[]
  sortByName: string
  sortByPrice: string
}

class ProductService {
  async create(productInfo: IProduct) {
    return await ProductModel.create(productInfo)
  }

  async findAll({ category, sortByName, sortByPrice }: IFindAllService) {
    const query: IQuery = {}
    const sort = {}

    if (category) {
      query.category = {
        $in: category,
      }
    }

    if (sortByName) {
      Object.assign(sort, { name: sortByName })
    }

    if (sortByPrice) {
      Object.assign(sort, { price: sortByPrice })
    }

    return await ProductModel.find(query)
      .collation({ locale: 'en' })
      // .skip(skip)
      // .limit(limit)
      .sort(sort)
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
