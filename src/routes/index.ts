import { Router } from 'express'
import { statusRouter } from './status.routes'
import { productRouter } from '../routes/products/product.routes'
import { categoriesRouter } from '../routes/products/category.routes'
import { userRouter } from './user.routes'
import swaggerUi from 'swagger-ui-express'
import swaggerDocs from '../swagger.json'

const routes = Router()

routes.use('/api/status', statusRouter)
routes.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))
routes.use('/api/products', productRouter)
routes.use('/api/categories/products', categoriesRouter)
routes.use('/api/users', userRouter)

export { routes }
