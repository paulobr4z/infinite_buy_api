import { Schema, model } from 'mongoose'
import { IUser } from '../types/user'
import bcrypt from 'bcrypt'

const UserSchema = new Schema<IUser>(
  {
    name: { type: String },
    email: { type: String },
    password: { type: String },
    profileImage: { type: String },
    role: { type: String },
    status: { type: String },
  },
  { versionKey: false },
)

UserSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(this.password, 10)
  next()
})

export default model('User', UserSchema)
