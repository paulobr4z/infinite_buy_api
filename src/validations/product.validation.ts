import * as Yup from 'yup'

export const ProductDataSchema = Yup.object().shape({
  name: Yup.string().required('nome não informado'),
  description: Yup.string().required('descrição não informada'),
  price: Yup.number().required('preço não informado'),
  images: Yup.array(),
  amount: Yup.number(),
  discount: Yup.number(),
  category: Yup.array(),
})
