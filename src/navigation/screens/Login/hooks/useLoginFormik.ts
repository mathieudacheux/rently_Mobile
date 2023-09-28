import { useCallback } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'

export default function useLoginFormik() {
  const onSubmit = useCallback(async () => null, [])

  const initialValues = {
    mail: '',
    password: '',
  }

  const validationSchema = yup.object({
    mail: yup
      .string()
      .email('Veuillez entrer une adresse mail valide')
      .required('Ce champ est obligatoire'),
    password: yup.string().required('Ce champ est obligatoire'),
  })

  const loginFormik = useFormik({
    initialValues,
    validateOnChange: false,
    validateOnBlur: true,
    validationSchema,
    onSubmit,
  })

  return {
    loginFormik,
  }
}
