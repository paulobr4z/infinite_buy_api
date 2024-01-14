import { Schema, model } from 'mongoose'
import { IProduct } from '../types/product'

const ProductSchema = new Schema<IProduct>(
  {
    name: { type: String },
    description: { type: String },
    price: { type: Number },
    images: [{ type: String }],
    amount: {
      type: Number,
      default: 0,
    },
    discount: { type: Number, default: 0 },
    category: [{ type: String }],
    created_at: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false },
)

export default model('Products', ProductSchema)
