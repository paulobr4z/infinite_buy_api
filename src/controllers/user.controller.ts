import { Request, Response } from 'express'
import { UserService } from '../services/user.service'
import { UserValidation } from '../validations/user.validation'
import * as Yup from 'yup'
import bcrypt from 'bcrypt'
import { IUser } from '../types/user'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'

const userService = new UserService()

class UserController {
  async login(request: Request, response: Response) {
    const { email, password } = request.body

    if (email === '' || password === '') {
      return response
        .status(404)
        .json({ message: 'E-mail ou senha invalido. Tente novamente.' })
    }

    try {
      const user = await userService.find({
        field: 'email',
        value: email,
      })

      if (!user) {
        return response
          .status(422)
          .json({ message: 'E-mail ou senha invalido. Tente novamente.' })
      }

      if (user.email !== email) {
        return response
          .status(422)
          .json({ message: 'E-mail ou senha invalido. Tente novamente.' })
      }

      const passwordIsValid = bcrypt.compareSync(password, user.password)

      if (!passwordIsValid) {
        return response
          .status(422)
          .json({ message: 'E-mail ou senha invalido. Tente novamente.' })
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

      return response.status(409).send({
        error: allErrors,
      })
    }

    const userAlreadyRegistered = (await userService.find({
      field: 'email',
      value: userData.email,
    })) as unknown as IUser

    if (userAlreadyRegistered?.email === userData.email) {
      return response.status(422).json({ message: 'E-mail já cadastrado.' })
    }

    const defaultUserData = {
      ...userData,
      profileImage: userData.profileImage ? userData.profileImage : '',
      role: 'user',
      status: 'active',
    }

    const hash = await bcrypt.hash(userData.password, 10)

    userData.password = hash

    try {
      await userService.create(defaultUserData)

      return response
        .status(201)
        .json({ message: 'Usuário cadastrado com sucesso.' })
    } catch (error) {
      response.status(500).json({ message: error })
    }
  }

  async update(request: Request, response: Response) {
    try {
      const { id } = request.params
      const userData = request.body

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return response.status(404).send({
          message: 'id inválido.',
        })
      }

      try {
        await UserValidation.validate(userData, { abortEarly: false })
      } catch (error) {
        const yupError = error as Yup.ValidationError
        const allErrors = {}

        yupError.inner.forEach((error) => {
          allErrors[error.path] = error.message
        })

        return response.status(409).send({
          error: allErrors,
        })
      }

      const hash = await bcrypt.hash(userData.password, 10)

      userData.password = hash

      const user = await userService.update(id, userData)

      if (!user) {
        return response.status(404).send({
          message: 'usuário não encontrado',
        })
      }

      user.password = undefined

      return response.json(user)
    } catch (error) {
      return response.status(500).send({
        error: 'Internal Server Error!',
        message: error,
      })
    }
  }
}

export { UserController }
