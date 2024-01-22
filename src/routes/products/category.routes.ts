import { Router } from 'express'
import { ProductCategoryController } from '../../controllers/products/categories.controller'

const categoriesRouter = Router()

const productCategoryController = new ProductCategoryController()

categoriesRouter.get('/', productCategoryController.findAll)
categoriesRouter.post('/', productCategoryController.create)
categoriesRouter.get('/:id', productCategoryController.findById)
categoriesRouter.patch('/:id', productCategoryController.update)
categoriesRouter.delete('/:id', productCategoryController.delete)

export { categoriesRouter }
