import { FormikProvider } from 'formik'
import React from 'react'
import AddPropertyManagementStep from './AddPropertyManagement/AddPropertyManagementStep'
import useAddProperty from './hooks/useAddPropertyFormik'

export default function Login(): JSX.Element {
  const { addPropertyFormik } = useAddProperty()

  return (
    <FormikProvider value={addPropertyFormik}>
      <AddPropertyManagementStep />
    </FormikProvider>
  )
}
