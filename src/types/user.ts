export interface IRole {
  role: 'admin' | 'user'
}

export interface IUser {
  id: string
  name: string
  username: string
  email: string
  password: string
  profileImage: string
  roles: IRole[]
  status: string
}
