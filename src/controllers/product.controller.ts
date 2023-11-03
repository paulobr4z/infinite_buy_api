import { Request, Response } from 'express'
import { ProductService } from '../services/product.service'
import mongoose from 'mongoose'

const productService = new ProductService()

class ProductController {
  async create(request: Request, response: Response) {
    try {
      const productInfo = request.body

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
      const user = await productService.findAll()

      return response.json(user)
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
}

export { ProductController }
