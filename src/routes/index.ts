import { Router } from 'express'
import { statusRouter } from './status.routes'
import { productRouter } from './product.routes'
import { userRouter } from './user.routes'

const routes = Router()

routes.use('/api/status', statusRouter)
routes.use('/api/products', productRouter)
routes.use('/api/login', userRouter)

export { routes }
