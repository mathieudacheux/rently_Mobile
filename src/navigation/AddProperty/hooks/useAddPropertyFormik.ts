import { useFormik } from 'formik'
import { useCallback } from 'react'
import * as yup from 'yup'

export default function useAddPropertyFormik() {
  const onSubmit = useCallback(async () => null, [])

  const initialValues = {
    search: '',
  }

  const validationSchema = yup.object().shape({
    search: yup.string(),
  })

  const addPropertyFormik = useFormik({
    initialValues,
    validateOnChange: false,
    validateOnBlur: true,
    validationSchema,
    onSubmit,
  })

  return {
    addPropertyFormik,
  }
}
