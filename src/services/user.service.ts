import UserModel from '../models/user.model'
import { IProduct } from '../types/product'
import { IUser } from '../types/user'

interface IFindOne {
  field: string
  value: string
}

class UserService {
  async create(userData: IUser) {
    return await UserModel.create(userData)
  }

  async findAll(skip: number, limit: number) {
    return await UserModel.find().skip(skip).limit(limit)
  }

  async find({ field, value }: IFindOne) {
    return await UserModel.find({ field, value })
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
