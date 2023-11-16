import React, { useEffect, useRef, useState } from 'react'
import { View, StyleSheet, Pressable, Animated, Text } from 'react-native'
import CalendarCard from './components/CalendarCard'
import axios from 'axios'
import { Appointment, Tag } from './types'
import { useIsFocused } from '@react-navigation/native'
import { Agenda, AgendaEntry } from 'react-native-calendars'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useAppSelector } from '../../../store/store'
import { selectedUser, selectedUserToken } from '../../../features/userSlice'

export default function Calendar({ navigation }: { navigation: any }) {
  const userId = useAppSelector(selectedUser).user_id
  const token = useAppSelector(selectedUserToken)

  const [tags, setTags] = useState<Tag[]>([])
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [filteredAppointments, setFilteredAppointments] =
    useState<Appointment[]>(appointments)

  useEffect(() => {
    setFilteredAppointments(appointments)
  }, [appointments])

  const isFocus = useIsFocused()

  useEffect(() => {
    if (!isFocus) return
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
  }, [isFocus])

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

  const FADE_IN_ANIMATION_CONFIG = {
    toValue: 0.7,
    duration: 100,
    useNativeDriver: true,
  }

  const FADE_OUT_ANIMATION_CONFIG = {
    toValue: 1,
    duration: 100,
    useNativeDriver: true,
  }

  const opacityValue = useRef(new Animated.Value(1)).current

  const SIZE_IN_ANIMATION_CONFIG = {
    toValue: 1.5,
    duration: 500,
    useNativeDriver: true,
  }

  const SIZE_OUT_ANIMATION_CONFIG = {
    toValue: 1,
    duration: 500,
    useNativeDriver: true,
  }

  const sizeValue = useRef(new Animated.Value(1)).current

  let appointmentsObject: {
    [key: string]: { name: string; height: number; day: string }[]
  } = appointments.reduce(
    (acc, appointment) => {
      let dateStart = appointment.date_start.split('T')[0]
      let filteredAppointment = {
        name: `${
          tags.find((tag) => tag.appointment_tag_id === appointment.tag_id)
            ?.label || ''
        }-${appointment.note}`,
        height: 100,
        day: '1',
      }

      if (acc[dateStart]) {
        acc[dateStart].push(filteredAppointment)
      } else {
        acc[dateStart] = [filteredAppointment]
      }

      return acc
    },
    {} as { [key: string]: { name: string; height: number; day: string }[] },
  )

  return (
    <View style={styles.mainContainer}>
      <View style={{ width: '100%', height: '100%' }}>
        <Agenda
          contentContainerStyle={{
            width: '100%',
            height: '100%',
          }}
          items={appointmentsObject}
          renderItem={(reservation: AgendaEntry) => {
            return (
              <TouchableOpacity
                testID={''}
                style={{ height: reservation.height }}
              >
                <CalendarCard
                  label={reservation.name.split('-')[0]}
                  date=''
                  comment={reservation.name.split('-')[1]}
                />
              </TouchableOpacity>
            )
          }}
          renderEmptyDate={() => {
            return (
              <View style={styles.emptyDate}>
                <Text>This is empty date!</Text>
              </View>
            )
          }}
          rowHasChanged={(r1: AgendaEntry, r2: AgendaEntry) => {
            return r1.name !== r2.name
          }}
          showClosingKnob={true}
          hideExtraDays={true}
          theme={{
            agendaDayTextColor: 'black',
            agendaTodayColor: '#4A43EC',
            dotColor: '#4A43EC',
            selectedDayBackgroundColor: '#4A43EC',
            todayTextColor: '#4A43EC',
          }}
        />
        <View style={styles.plus}>
          <Pressable
            onPressIn={() => {
              Animated.timing(opacityValue, FADE_IN_ANIMATION_CONFIG).start()
              Animated.timing(sizeValue, SIZE_IN_ANIMATION_CONFIG).start()
              setTimeout(() => {
                Animated.timing(opacityValue, FADE_OUT_ANIMATION_CONFIG).start()
                Animated.timing(sizeValue, SIZE_OUT_ANIMATION_CONFIG).start()
              }, 200)
            }}
            onPressOut={() => {
              navigation.navigate('AddAppointment')
            }}
          >
            <Animated.Image
              style={{
                height: 55,
                transform: [{ scale: sizeValue }],
                objectFit: 'contain',
                opacity: opacityValue,
              }}
              source={require('../../../../assets/Plus.png')}
            />
          </Pressable>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    height: '100%',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  plus: {
    position: 'absolute',
    bottom: 20,
    right: -30,
  },
  switchButton: {
    width: '50%',
    alignItems: 'center',
    backgroundColor: '#b5b5b5',
    padding: 15,
    marginTop: 10,
  },
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginTop: 17,
    width: '90%',
    marginLeft: '5%',
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30,
  },
  customDay: {
    margin: 10,
    fontSize: 24,
    color: 'green',
  },
  dayItem: {
    marginLeft: 34,
  },
})
