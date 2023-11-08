import { Request, Response } from 'express'
import { ProductService } from '../services/product.service'
import mongoose from 'mongoose'
import { ProductDataSchema } from '../validations/product.validation'
import * as Yup from 'yup'
import { IQuery } from '../types/product'

const productService = new ProductService()

class ProductController {
  async create(request: Request, response: Response) {
    try {
      const productInfo = request.body

      try {
        await ProductDataSchema.validate(productInfo, { abortEarly: false })
      } catch (error) {
        const yupError = error as Yup.ValidationError
        const allErrors = {}

        yupError.inner.forEach((error) => {
          allErrors[error.path] = error.message
        })

        return response.status(404).send({
          error: allErrors,
        })
      }

      await productService.create(productInfo)

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
      let { page, perPage } = request.query as unknown as IQuery

      if (!perPage) perPage = 10
      if (!page) page = 1

      const totalItems = await productService.countCharacters()
      const totalPages = Math.ceil(totalItems / perPage)
      const skip = Number(page) === 1 ? 0 : Number(page - 1) * perPage
      const previousPage = Number(page) === 1 ? null : page - 1
      const nextPage =
        Number(page) === Number(totalPages) ? null : Number(page) + 1

      const products = await productService.findAll(skip, perPage)

      return response.json({
        data: products,
        pagination: {
          currentPage: +page,
          previousPage,
          nextPage,
          perPage: +perPage,
          totalPages,
          totalItems,
        },
      })
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
          error: 'invalid id',
        })
      }

      const product = await productService.findById(id)

      if (!product) {
        return response.status(404).send({
          error: 'product not found',
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
          error: 'invalid id',
        })
      }

      const product = await productService.update(id, productUpdated)

      if (!product) {
        return response.status(404).send({
          error: 'product not found',
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
          error: 'invalid id',
        })
      }

      const product = await productService.delete(id)

      if (!product) {
        return response.status(404).send({
          error: 'product not found',
        })
      }

      return response.status(202).json({
        message: 'product deleted successfully',
      })
    } catch (error) {
      return response.status(500).send({
        error: 'Internal Server Error!',
        message: error,
      })
    }
  }
}

export { ProductController }
