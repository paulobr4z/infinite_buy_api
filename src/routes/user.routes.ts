import { Router } from 'express'
import { UserController } from '../controllers/user.controller'

const userRouter = Router()

const userController = new UserController()

userRouter.post('/login', userController.login)
userRouter.post('/signup', userController.signup)
userRouter.post('/update/:id', userController.update)

export { userRouter }
