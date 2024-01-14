export interface IUser {
  _id: string
  name: string
  email: string
  password: string
  profileImage: string
  role: 'admin' | 'user'
  status: string
}
