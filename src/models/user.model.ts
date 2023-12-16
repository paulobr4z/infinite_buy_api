import { Schema, model } from 'mongoose'
import { IUser } from '../types/user'

const UserSchema = new Schema<IUser>(
  {
    name: { type: String },
    username: { type: String },
    email: { type: String },
    password: { type: String },
    profileImage: { type: String },
    roles: [{ type: String }],
    status: { type: String },
  },
  { versionKey: false },
)

export default model('User', UserSchema)
