import React, { useEffect, useState } from 'react'
import { View, TextInput, ScrollView, Image, StyleSheet } from 'react-native'
import CalendarCard from '../../components/CalendarCard'
import axios from 'axios'

type Appointment = {
  appointment_id: number
  tag_id: number
  date_start: string
  date_end: string
  note: string
  reminder: string
  property_id: number
  user_id_1: number
  user_id_2: number
}

type Tag = {
  appointment_tag_id: number
  label: string
}

export default function Calendar() {
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlX2lkIjoyLCJ1c2VyX2lkIjoxMDEsImlhdCI6MTY5NTcxOTIyOSwiZXhwIjoxNjk1NzYyNDI5fQ.aaqLL9GpAzwM5scS0-Aki8Y7bHQZ4KcQhmaYdPVGzxg'

  const [tags, setTags] = useState<Tag[]>([])
  const [appointments, setAppointments] = useState<Appointment[]>([])

  useEffect(() => {
    axios
      .get('https://back-rently.mathieudacheux.fr/appointment_tags', {
        headers: { Authorization: 'Bearer ' + token },
      })
      .then((res) => setTags((res.data as Tag[]) || []))
      .catch((error) => console.log(error))
    axios
      .get('https://back-rently.mathieudacheux.fr/appointments', {
        headers: { Authorization: 'Bearer ' + token },
      })
      .then((res) => setAppointments((res.data as Appointment[]) || []))
      .catch((error) => console.error(error))
  }, [])

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      className='w-full mb-4'
    >
      <View className='w-11/12 h-[65px] flex-1 flex-row items-center bg-white rounded-[20px] shadow-md border-solid border-red-500 mt-4'>
        <Image
          style={{ height: 25, objectFit: 'contain' }}
          source={require('../../../assets/Search.png')}
        />
        <TextInput className='w-full' placeholder='Search' />
      </View>
      {appointments.map((appointment: Appointment) => (
        <CalendarCard
          key={appointment.appointment_id}
          label={
            tags.length
              ? tags?.find(
                  (tag) => tag?.appointment_tag_id === appointment?.tag_id,
                )?.label || ''
              : ''
          }
          date={appointment.date_start}
          comment={appointment.note}
        />
      ))}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
})
