import React, { useState, useEffect } from 'react'
import AddAppointmentManagement from './AddAppointmentManagement'
import axios from 'axios'
import { useAppSelector } from '../../../store/store'
import { selectedUser, selectedUserToken } from '../../../features/userSlice'
import { useNavigation } from '@react-navigation/native'
import * as Burnt from 'burnt'
import { Tag, Property } from '../../Calendar/types'

export default function AddAppointmentManagementStep() {
  const navigation = useNavigation()
  const userId = useAppSelector(selectedUser).user_id
  const token = useAppSelector(selectedUserToken)

  const [tags, setTags] = useState<Tag[]>([])
  const [appointments, setAppointments] = useState<Property[]>([])

  const formatDateForBackend = (date: string) => {
    const DateAndTime = date.split(' ')
    const formatedDate = DateAndTime[0].split('-')
    return `${formatedDate[2].replace(',', '')}-${formatedDate[1]}-${
      formatedDate[0]
    } ${DateAndTime[1]}`
  }

  useEffect(() => {
    axios
      .get('https://back-rently.mathieudacheux.fr/appointment_tags', {
        headers: { Authorization: 'Bearer ' + token },
      })
      .then((res) => setTags((res.data as Tag[]) || []))
      .catch((error) => console.log(error))
    axios
      .get(`https://back-rently.mathieudacheux.fr/properties`, {
        headers: { Authorization: 'Bearer ' + token },
      })
      .then((res) => setAppointments((res.data as Property[]) || []))
      .catch((error) => console.error(error))
  }, [])

  const addAppointment = ({
    appointmentId,
    propertyId,
    tagId,
    startDate,
    endDate,
    note,
  }: {
    appointmentId: number
    propertyId: number
    tagId: number
    startDate: string
    endDate: string
    note: string
  }) => {
    if (appointmentId === 0) {
      axios
        .post(
          `https://back-rently.mathieudacheux.fr/appointments`,
          {
            property_id: propertyId,
            tag_id: tagId,
            date_start: `${formatDateForBackend(startDate)}:00`,
            date_end: `${formatDateForBackend(endDate)}:00`,
            note: note,
            reminder: formatDateForBackend(
              new Date(Date.now()).toLocaleString('es-CL'),
            ),
            user_id_1: userId,
            user_id_2: userId,
          },
          {
            headers: { Authorization: 'Bearer ' + token },
          },
        )
        .then(() => {
          Burnt.toast({
            title: 'Évènement ajouté',
            preset: 'done',
          })
          navigation.goBack()
        })
        .catch((error) =>
          Burnt.toast({
            title: 'Une erreur est survenue',
            preset: 'error',
          }),
        )
    } else {
      axios
        .put(
          `https://back-rently.mathieudacheux.fr/appointments/${appointmentId}`,
          {
            property_id: propertyId,
            tag_id: tagId,
            date_start: `${formatDateForBackend(startDate)}:00`,
            date_end: `${formatDateForBackend(endDate)}:00`,
            note: note,
            reminder: formatDateForBackend(
              new Date(Date.now()).toLocaleString('es-CL'),
            ),
            user_id_1: userId,
            user_id_2: userId,
          },
          {
            headers: { Authorization: 'Bearer ' + token },
          },
        )
        .then(() => {
          Burnt.toast({
            title: 'Évènement modifié',
            preset: 'done',
          })
          navigation.goBack()
        })
        .catch((error) =>
          Burnt.toast({
            title: 'Une erreur est survenue',
            preset: 'error',
          }),
        )
    }
  }

  const onDelete = (appointmentId: number) => {
    axios
      .delete(
        `https://back-rently.mathieudacheux.fr/appointments/${appointmentId}`,
        {
          headers: { Authorization: 'Bearer ' + token },
        },
      )
      .then(() => {
        Burnt.toast({
          title: 'Évènement supprimé',
          preset: 'done',
        })
        navigation.goBack()
      })
  }

  return (
    <AddAppointmentManagement
      appointments={appointments}
      onSave={addAppointment}
      onDelete={onDelete}
      tags={tags}
    />
  )
}
