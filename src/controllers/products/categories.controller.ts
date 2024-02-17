import { Request, Response } from 'express'
import { ProductCategoriesService } from '../../services/products/category.service'
import { ProductCategoryDataSchema } from '../../validations/product.validation'
import * as Yup from 'yup'
import mongoose from 'mongoose'

const productCategoryService = new ProductCategoriesService()

class ProductCategoryController {
  async create(request: Request, response: Response) {
    try {
      const categoryInfo = request.body

      try {
        await ProductCategoryDataSchema.validate(categoryInfo, {
          abortEarly: false,
        })
      } catch (error) {
        const yupError = error as Yup.ValidationError
        const allErrors = {}

        yupError.inner.forEach((error) => {
          allErrors[error.path] = error.message
        })

        return response.status(404).send({
          message: allErrors,
        })
      }

      const categoryAlreadyExists = productCategoryService.findByName(
        categoryInfo.name,
      )

      if ((await categoryAlreadyExists).length > 0) {
        return response.status(404).send({
          message: 'categoria já existe',
        })
      }

      await productCategoryService.create(categoryInfo)

      return response.status(201).json()
    } catch (error) {
      return response.status(500).send({
        error: 'Internal Server Error!',
        message: error,
      })
    }
  }

  async findAll(request: Request, response: Response) {
    try {
      const categories = await productCategoryService.findAll()

      return response.json(categories)
    } catch (error) {
      return response.status(500).send({
        error: 'Internal Server Error!',
        message: error,
      })
    }
  }

  async findById(request: Request, response: Response) {
    try {
      const { id } = request.params

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return response.status(404).send({
          message: 'id inválido.',
        })
      }

      const product = await productCategoryService.findById(id)

      if (!product) {
        return response.status(404).send({
          message: 'categoria não encontrada.',
        })
      }

      return response.json(product)
    } catch (error) {
      return response.status(500).send({
        error: 'Internal Server Error!',
        message: error,
      })
    }
  }

  async update(request: Request, response: Response) {
    try {
      const { id } = request.params
      const productUpdated = request.body

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return response.status(404).send({
          message: 'id inválido.',
        })
      }

      const product = await productCategoryService.update(id, productUpdated)

      if (!product) {
        return response.status(404).send({
          message: 'produto não encontrado',
        })
      }

      return response.json(product)
    } catch (error) {
      return response.status(500).send({
        error: 'Internal Server Error!',
        message: error,
      })
    }
  }

  async delete(request: Request, response: Response) {
    try {
      const { id } = request.params

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return response.status(404).send({
          message: 'id inválido.',
        })
      }

      const product = await productCategoryService.delete(id)

      if (!product) {
        return response.status(404).send({
          message: 'categoria não encontrada.',
        })
      }

      return response.status(202).json({
        message: 'categoria deletada com sucesso.',
      })
    } catch (error) {
      return response.status(500).send({
        error: 'Internal Server Error!',
        message: error,
      })
    }
  }
}

export { ProductCategoryController }
