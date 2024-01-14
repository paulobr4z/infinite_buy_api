import * as Yup from 'yup'

export const UserValidation = Yup.object().shape({
  name: Yup.string().required('campo obrigatório.'),
  email: Yup.string()
    .test('email', 'email inválido', (value) => {
      return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value || '')
    })
    .required('campo obrigatório.'),
  password: Yup.string()
    .required('campo obrigatório.')
    .min(8, 'mínimo de 8 characteres'),
  passwordConfirmation: Yup.string()
    .oneOf([Yup.ref('password'), null], 'senhas não coincidem')
    .required('campo obrigatório.'),
})
