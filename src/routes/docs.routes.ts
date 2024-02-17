import { Request, Response, Router } from 'express'

const docsRouter = Router()

docsRouter.get('/', (request: Request, response: Response) => {
  response.status(200).json('server running!')
})

export { docsRouter }
