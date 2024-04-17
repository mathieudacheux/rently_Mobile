import { useCallback, useEffect, useMemo, useState } from 'react'
import { useFormik } from 'formik'
import { AddAppointmentFormik } from '../types'
import { useAppSelector } from '../../../store/store'
import { selectedAppointmentId } from '../../../features/calendarSlice'
import axios from 'axios'
import { selectedUserToken } from '../../../features/userSlice'
import { Appointment } from '../../Calendar/types'

export default function useAddAppointmentFormik() {
  const onSubmit = useCallback(async () => null, [])
  const token = useAppSelector(selectedUserToken)
  const appointmentId = useAppSelector(selectedAppointmentId)

  const [appointment, setAppointment] = useState<any>(null)

  const getAppointment = () =>
    axios
      .get(
        `https://back-rently.mathieudacheux.fr/appointments/${appointmentId}`,
        {
          headers: { Authorization: 'Bearer ' + token },
        },
      )
      .then((res) => setAppointment((res.data as Appointment) || null))
      .catch((error) => console.error(error))

  useEffect(() => {
    if (!token) return
    if (!appointmentId) return
    getAppointment()
  }, [appointmentId])

  const initialValues = useMemo(
    () =>
      ({
        date_start:
          new Date(appointment?.date_start).toLocaleDateString('es-CL') ??
          new Date().toLocaleDateString('es-CL'),
        date_end:
          new Date(appointment?.date_end).toLocaleDateString('es-CL') ??
          String(new Date().toLocaleDateString('es-CL')),
        time_start:
          new Date(appointment?.date_start).toLocaleTimeString('es-CL') ??
          String(
            new Date().toLocaleTimeString('es-CL', {
              hour: '2-digit',
              minute: '2-digit',
            }),
          ),
        time_end:
          new Date(appointment?.date_end).toLocaleTimeString('es-CL') ??
          String(
            new Date().toLocaleTimeString('es-CL', {
              hour: '2-digit',
              minute: '2-digit',
            }),
          ),
        note: appointment?.note ?? '',
        reminder: appointment?.reminder ?? '',
        property_id: appointment?.property_id ?? 0,
        user_id_1: appointment?.user_id_1 ?? 0,
        user_id_2: appointment?.user_id_2 ?? 0,
        tag_id: appointment?.tag_id ?? 0,
        appointment_id: appointment?.appointment_id ?? 0,
      }) as AddAppointmentFormik,
    [appointment, appointmentId],
  )

  const addAppointmentFormik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: true,
    onSubmit,
  })

  return {
    addAppointmentFormik,
  }
}
