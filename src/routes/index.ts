import { Router } from 'express'
import { statusRouter } from './status.routes'
import { productRouter } from '../routes/products/product.routes'
import { categoriesRouter } from '../routes/products/category.routes'
import { userRouter } from './user.routes'

const routes = Router()

routes.use('/api/status', statusRouter)
routes.use('/api/products', productRouter)
routes.use('/api/categories/products', categoriesRouter)
routes.use('/api/users', userRouter)

export { routes }
