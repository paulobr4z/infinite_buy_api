import { Router } from 'express'
import { statusRouter } from './status.routes'
import { productRouter } from './product.routes'

const routes = Router()

routes.use('/api/status', statusRouter)
routes.use('/api/products', productRouter)

export { routes }
