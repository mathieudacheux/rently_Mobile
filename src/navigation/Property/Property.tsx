import React from 'react'
import { FormikProvider } from 'formik'
import usePropertyFormik from './hooks/usePropertyFormik'
import PropertyManagementStep from './PropertyManagement/PropertyManagementStep'

export default function Login(): JSX.Element {
  const { propertyFormik } = usePropertyFormik()

  return (
    <FormikProvider value={propertyFormik}>
      <PropertyManagementStep />
    </FormikProvider>
  )
}
