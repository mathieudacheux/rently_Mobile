import { useFormikContext } from 'formik'
import React from 'react'
import { PropertyAddFormik } from '../types'
import AddPropertyManagement from './AddPropertyManagement'

export default function AddPropertyManagementStep() {
  const { values } = useFormikContext<PropertyAddFormik>()

  console.log(values)
  return <AddPropertyManagement />
}
