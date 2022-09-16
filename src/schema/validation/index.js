import { object, string, ref } from 'yup'

export const LoginValidation = object().shape({
  email: string().required('Valid email required').email('Valid email required'),
  password: string().min(8, 'Required').required('Required')
})

export const RegisterValidation = object().shape({
  name: string().required('Required'),
  email: string().required('Valid email required').email('Valid email required'),
  password: string().min(8, 'Min 8 symbols').required('Required'),
  confirmPassword: string()
    .required('Please confirm your password')
    .oneOf([ref('password')], 'Passwords do not match')
})

export const ArticleValidation = object().shape({
  title: string().required('Required'),
  text: string().required('Required')
})

export const CommentValidation = object().shape({
  text: string().required('Required')
})