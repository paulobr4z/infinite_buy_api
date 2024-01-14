import { Request, Response } from 'express'
import { ProductService } from '../services/product.service'
import mongoose from 'mongoose'
import { ProductDataSchema } from '../validations/product.validation'
import * as Yup from 'yup'
import { IQuery } from '../types/product'
import { cloudinary } from '../storage/cloudinary'
import { v4 as uuid } from 'uuid'

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
          message: allErrors,
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
      let { page, perPage, category } = request.query as unknown as IQuery

      if (!perPage) perPage = 10
      if (!page) page = 1

      const totalItems = await productService.countCharacters()
      const totalPages = Math.ceil(totalItems / perPage)
      const skip = Number(page) === 1 ? 0 : Number(page - 1) * perPage
      const previousPage = Number(page) === 1 ? null : page - 1
      const nextPage =
        Number(page) === Number(totalPages) ? null : Number(page) + 1

      const products = await productService.findAll(skip, perPage, category)

      return response.json({
        data: products,
        pagination: {
          currentPage: +page,
          previousPage,
          nextPage,
          perPage: +perPage,
          totalPages: category
            ? Math.ceil(products.length / perPage)
            : Math.ceil(totalItems / perPage),
          totalItems: category ? products.length : totalItems,
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
          message: 'id inválido.',
        })
      }

      const product = await productService.findById(id)

      if (!product) {
        return response.status(404).send({
          message: 'produto não encontrado.',
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

      const product = await productService.update(id, productUpdated)

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

      const product = await productService.delete(id)

      if (!product) {
        return response.status(404).send({
          message: 'produto não encontrado.',
        })
      }

      return response.status(202).json({
        message: 'produto deletado com sucesso.',
      })
    } catch (error) {
      return response.status(500).send({
        error: 'Internal Server Error!',
        message: error,
      })
    }
  }

  async uploadImage(request: Request, response: Response) {
    try {
      const { id } = request.params
      const image = request.file.buffer

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return response.status(404).send({
          message: 'id inválido',
        })
      }

      if (!image) {
        return response.status(404).send({
          message: 'imagem não enviada.',
        })
      }

      const product = await productService.findById(id)

      if (!product) {
        return response.status(404).send({
          message: 'produto não encontrado',
        })
      }

      const productUpdated = { ...product._doc }

      async function imagePromise() {
        return new Promise((resolve, reject) => {
          cloudinary.uploader
            .upload_stream(
              { folder: 'infinite_buy', public_id: `${id}_${uuid()}` },
              (error, result) => {
                if (error) {
                  console.error(error)
                  reject(error)
                } else {
                  productUpdated.images = [result.secure_url]
                  resolve(result.secure_url)
                }
              },
            )
            .end(image)
        })
      }

      await imagePromise()

      const updated = await productService.update(id, productUpdated)

      return response.json(updated)
    } catch (error) {
      return response.status(500).send({
        error: 'Internal Server Error!',
        message: error,
      })
    }
  }
}

export { ProductController }
