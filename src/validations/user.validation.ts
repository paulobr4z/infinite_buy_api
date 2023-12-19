import * as Yup from 'yup'

export const UserValidation = Yup.object().shape({
  name: Yup.string().required('required field'),
  email: Yup.string()
    .test('email', 'invalid email', (value) => {
      return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value || '')
    })
    .required('required field'),
  password: Yup.string()
    .required('required field')
    .min(8, 'minimum of 8 characters'),
  passwordConfirmation: Yup.string()
    .oneOf([Yup.ref('password'), null], 'different passwords')
    .required('required field'),
  profileImage: Yup.string().required('required field'),
  role: Yup.string().required('required field'),
  status: Yup.string().required('required field'),
})
