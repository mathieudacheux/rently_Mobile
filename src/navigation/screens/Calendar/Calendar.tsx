import React, { useEffect, useState } from 'react'
import { View, TextInput, ScrollView, Image, StyleSheet } from 'react-native'
import CalendarCard from './components/CalendarCard'
import axios from 'axios'
import { Appointment, Tag } from './types'

export default function Calendar() {
  const userId = 47

  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlX2lkIjoyLCJ1c2VyX2lkIjoxMDEsImlhdCI6MTY5NTcxOTIyOSwiZXhwIjoxNjk1NzYyNDI5fQ.aaqLL9GpAzwM5scS0-Aki8Y7bHQZ4KcQhmaYdPVGzxg'

  const [tags, setTags] = useState<Tag[]>([])
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [filteredAppointments, setFilteredAppointments] =
    useState<Appointment[]>(appointments)

  useEffect(() => {
    setFilteredAppointments(appointments)
  }, [appointments])

  useEffect(() => {
    axios
      .get('https://back-rently.mathieudacheux.fr/appointment_tags', {
        headers: { Authorization: 'Bearer ' + token },
      })
      .then((res) => setTags((res.data as Tag[]) || []))
      .catch((error) => console.log(error))
    axios
      .get(
        `https://back-rently.mathieudacheux.fr/appointments/user/${userId}`,
        {
          headers: { Authorization: 'Bearer ' + token },
        },
      )
      .then((res) => setAppointments((res.data as Appointment[]) || []))
      .catch((error) => console.error(error))
  }, [])

  const handleSearch = (search: string) => {
    if (search === '') return setFilteredAppointments(appointments)

    setFilteredAppointments(
      appointments.filter((appointment) => {
        const tag = tags.find(
          (tag) => tag.appointment_tag_id === appointment.tag_id,
        )

        if (
          tag?.label.toLocaleLowerCase().includes(search.toLowerCase()) ||
          appointment.note.toLocaleLowerCase().includes(search.toLowerCase())
        ) {
          return appointment
        }
      }),
    )
  }

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      className='w-full mb-4'
    >
      <View className='w-11/12 h-[65px] flex-1 flex-row items-center bg-white rounded-[20px] shadow-md border-solid border-red-500 mt-4'>
        <Image
          style={{ height: 25, objectFit: 'contain' }}
          source={require('../../../../assets/Search.png')}
        />
        <TextInput
          className='w-full'
          placeholder='Search'
          onChangeText={(text) => handleSearch(text)}
        />
      </View>
      {filteredAppointments.map((appointment: Appointment) => (
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
