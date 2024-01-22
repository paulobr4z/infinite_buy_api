import { Router } from 'express'
import { ProductController } from '../../controllers/products/product.controller'
import { uploadImage } from '../../middleware/uploadImage'

const productRouter = Router()

const productController = new ProductController()

productRouter.get('/', productController.findAll)
productRouter.post('/', productController.create)
productRouter.get('/:id', productController.findById)
productRouter.patch('/:id', productController.update)
productRouter.delete('/:id', productController.delete)
productRouter.patch(
  '/image/:id',
  uploadImage.single('image'),
  productController.uploadImage,
)

export { productRouter }
