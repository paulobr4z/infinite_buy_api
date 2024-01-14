import * as Yup from 'yup'

export const ProductDataSchema = Yup.object().shape({
  name: Yup.string().required('nome não informado'),
  description: Yup.string().required('descrição não informada'),
  price: Yup.number().required('preço não informado'),
  images: Yup.array().typeError('campo precisa ser do tipo array'),
  amount: Yup.number().typeError('campo precisa ser do tipo number'),
  discount: Yup.number().typeError('campo precisa ser do tipo number'),
  category: Yup.array().typeError('campo precisa ser do tipo array'),
})
