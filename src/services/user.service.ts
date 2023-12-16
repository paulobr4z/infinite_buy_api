import UserModel from '../models/user.model'
import { IProduct } from '../types/product'

interface IFindOne {
  field: string
  value: string
}

class UserService {
  async create(productInfo: IProduct) {
    return await UserModel.create(productInfo)
  }

  async findAll(skip: number, limit: number) {
    return await UserModel.find().skip(skip).limit(limit)
  }

  async findOne({ field, value }: IFindOne) {
    return await UserModel.findById({ field, value })
  }

  async update(id: string, productUpdated: IProduct) {
    return await UserModel.findByIdAndUpdate(id, productUpdated, {
      new: true,
    })
  }

  async delete(id: string) {
    return await UserModel.findByIdAndDelete(id)
  }

  async countCharacters() {
    return await UserModel.countDocuments()
  }
}

export { UserService }
