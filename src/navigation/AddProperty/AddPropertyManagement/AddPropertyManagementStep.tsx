import axios from 'axios'
import * as Burnt from 'burnt'
import { useFormikContext } from 'formik'
import React from 'react'
import { ROUTE_API } from '../../../constants/api'
import { selectedUserToken } from '../../../features/userSlice'
import useFormikValidator from '../../../hooks/useFormikValidator'
import { useAppSelector } from '../../../store/store'
import { PropertyAddFormik } from '../types'
import AddPropertyManagement from './AddPropertyManagement'

export default function AddPropertyManagementStep() {
  const formikContext = useFormikContext<PropertyAddFormik>()
  const { values } = formikContext
  const formikValidator = useFormikValidator(formikContext)
  const token = useAppSelector(selectedUserToken)

  const save = async () => {
    const isValid = await formikValidator(values)

    if (!isValid) return

    await axios
      .post(
        ROUTE_API.PROPERTY,
        {
          values,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then((res) => {
        Burnt.toast({
          title: 'Propriété ajoutée',
          preset: 'none',
        })
      })
      .catch((err) => {
        Burnt.toast({
          title: 'Une erreur est survenue',
          preset: 'error',
        })
      })
  }

  return <AddPropertyManagement save={save} />
}
