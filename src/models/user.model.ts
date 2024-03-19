import { Schema, model } from 'mongoose'
import { IUser } from '../types/user'

const UserSchema = new Schema<IUser>(
  {
    name: { type: String },
    email: { type: String },
    password: { type: String },
    profileImage: { type: String },
    role: { type: String, default: 'user' },
    status: { type: String },
  },
  { versionKey: false },
)

export default model('User', UserSchema)
