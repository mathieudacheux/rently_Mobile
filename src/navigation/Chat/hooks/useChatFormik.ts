import { useCallback } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'

export default function useChatFormik() {
  const onSubmit = useCallback(async () => null, [])

  const initialValues = {
    search: '',
  }

  const validationSchema = yup.object().shape({
    search: yup.string(),
  })

  const searchFormik = useFormik({
    initialValues,
    validateOnChange: false,
    validateOnBlur: true,
    validationSchema,
    onSubmit,
  })

  return {
    searchFormik,
  }
}
