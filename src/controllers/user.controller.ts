import { Request, Response } from 'express'
import { UserService } from '../services/user.service'
import { UserValidation } from '../validations/user.validation'
import * as Yup from 'yup'
import bcrypt from 'bcrypt'
import { IUser } from '../types/user'
import jwt from 'jsonwebtoken'

const userService = new UserService()

class UserController {
  async login(request: Request, response: Response) {
    const { email, password } = request.body

    if (email === '' || password === '') {
      return response
        .status(404)
        .json({ message: 'Email or Password invalid. Try again.' })
    }

    try {
      const user = await userService.find({
        field: 'email',
        value: email,
      })

      if (user.email !== email) {
        return response
          .status(422)
          .json({ message: 'Incorrect email or password. Try again.' })
      }

      const passwordIsValid = bcrypt.compareSync(password, user.password)

      if (!passwordIsValid) {
        return response
          .status(422)
          .json({ message: 'Incorrect username or password. Try again.' })
      }

      const token = jwt.sign(
        {
          id: user._id,
          email: user.email,
        },
        `${process.env.SECRET_JWT}`,
        {
          expiresIn: 86400000,
        },
      )

      user.password = undefined
      user.role = 'user'

      return response.json({
        user,
        token,
      })
    } catch (err) {
      response.status(500).send(err)
    }
  }

  async signup(request: Request, response: Response) {
    const userData = request.body

    try {
      await UserValidation.validate(userData, { abortEarly: false })
    } catch (error) {
      const yupError = error as Yup.ValidationError
      const allErrors = {}

      yupError.inner.forEach((error) => {
        allErrors[error.path] = error.message
      })

      return response.status(404).send({
        error: allErrors,
      })
    }

    const userAlreadyRegistered = (await userService.find({
      field: 'email',
      value: userData.email,
    })) as unknown as IUser

    if (userAlreadyRegistered?.email === userData.email) {
      return response
        .status(422)
        .json({ message: 'E-mail already registered!' })
    }

    const defaultUserData = {
      ...userData,
      profileImage: userData.profileImage ? userData.profileImage : '',
      role: 'user',
      status: 'active',
    }

    console.log(defaultUserData)

    try {
      await userService.create(defaultUserData)

      return response
        .status(201)
        .json({ message: 'successfully registered user' })
    } catch (error) {
      response.status(500).json({ message: error })
    }
  }
}

export { UserController }
