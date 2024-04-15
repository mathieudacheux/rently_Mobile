import React from 'react'
import useAddAppointmentFormik from './hooks/useAddAppointmentFormik'
import { FormikProvider } from 'formik'
import AddAppointmentManagementStep from './AddAppointmentManagement/AddAppointmentManagementStep'

export default function AddAppointment() {
  const addAppointmentFormik = useAddAppointmentFormik()

  return (
    <FormikProvider value={addAppointmentFormik.addAppointmentFormik}>
      <AddAppointmentManagementStep />
    </FormikProvider>
  )
}
