import { Schema, model } from 'mongoose'
import { ICategory } from '../../types/product'

const CategoriesSchema = new Schema<ICategory>(
  {
    name: { type: String },
    description: { type: String },
    created_at: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false },
)

export default model('ProductCategories', CategoriesSchema)
