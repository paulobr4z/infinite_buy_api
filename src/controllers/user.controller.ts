import { Request, Response } from 'express'
import { UserService } from '../services/user.service'
import { UserValidation } from '../validations/user.validation'
import * as Yup from 'yup'

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
      const emailAlreadyExists = await userService.find({
        field: 'email',
        value: email,
      })

      if (emailAlreadyExists) {
        return response
          .status(404)
          .json({ message: 'E-mail already registered! Try again.' })
      }

      return response.json({ message: 'login' })
    } catch (error) {
      console.log(error)
      response.status(500).send(error)
    }

    try {
      // const user = await userService.findOne(email)
      // if (!user) {
      //   return response
      //     .status(404)
      //     .json({ message: 'Incorrect username or password. Try again.' })
      // }
      // const passwordIsValid = bcrypt.compareSync(password, user.password)
      // if (!passwordIsValid) {
      //   return response
      //     .status(404)
      //     .json({ message: 'Incorrect username or password. Try again.' })
      // }
      // const token = await AuthService.generateToken(`${user._id}`)
      // response.send({
      //   token,
      //   user: {
      //     id: user._id,
      //   },
      // })
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

    try {
      const userAlreadyRegistered = await userService.find({
        field: 'email',
        value: userData.email,
      })

      if (userAlreadyRegistered.length > 0) {
        return response
          .status(422)
          .json({ message: 'E-mail already registered!' })
      }
    } catch (error) {
      console.log(error)
    }

    try {
      await userService.create(userData)

      return response
        .status(201)
        .json({ message: 'successfully registered user' })
    } catch (error) {
      response.status(500).json({ message: error })
    }
  }
}

export { UserController }
