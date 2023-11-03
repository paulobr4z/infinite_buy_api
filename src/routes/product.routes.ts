import { Router } from 'express'
import { ProductController } from '../controllers/product.controller'

const productRouter = Router()

const productController = new ProductController()

productRouter.get('/', productController.findAll)
productRouter.post('/', productController.create)
productRouter.get('/:id', productController.findById)

export { productRouter }
