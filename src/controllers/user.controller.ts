import { Request, Response } from 'express'
import { UserService } from '../services/user.service'

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
      const emailAlreadyExists = await userService.findOne({
        field: 'email',
        value: email,
      })

      if (emailAlreadyExists) {
        return response
          .status(404)
          .json({ message: 'E-mail already registered! Try again.' })
      }
    } catch (error) {
      console.log(error)
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
}

export { UserController }
