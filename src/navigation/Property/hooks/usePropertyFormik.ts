import { useCallback } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'

export default function usePropertyFormik() {
  const onSubmit = useCallback(async () => null, [])

  const initialValues = {
    search: '',
  }

  const validationSchema = yup.object().shape({
    search: yup.string(),
  })

  const propertyFormik = useFormik({
    initialValues,
    validateOnChange: false,
    validateOnBlur: true,
    validationSchema,
    onSubmit,
  })

  return {
    propertyFormik,
  }
}
