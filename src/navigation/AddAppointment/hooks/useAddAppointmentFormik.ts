import { useCallback } from 'react'
import { useFormik } from 'formik'
import { AddAppointmentFormik } from '../types'

export default function useAddAppointmentFormik() {
  const onSubmit = useCallback(async () => null, [])

  const initialValues = {
    date_start: String(new Date().toLocaleDateString('es-CL')),
    date_end: String(new Date().toLocaleDateString('es-CL')),
    time_start: String(
      new Date().toLocaleTimeString('es-CL', {
        hour: '2-digit',
        minute: '2-digit',
      }),
    ),
    time_end: String(
      new Date().toLocaleTimeString('es-CL', {
        hour: '2-digit',
        minute: '2-digit',
      }),
    ),
    note: '',
    reminder: '',
    property_id: 0,
    user_id_1: 0,
    user_id_2: 0,
    tag_id: 0,
    appointment_id: 0,
  } as AddAppointmentFormik

  const addAppointmentFormik = useFormik({
    initialValues,
    validateOnChange: false,
    validateOnBlur: true,
    onSubmit,
  })

  return {
    addAppointmentFormik,
  }
}
