import { useIsFocused } from '@react-navigation/native'
import axios from 'axios'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native'
import { Agenda, AgendaEntry } from 'react-native-calendars'
import { TouchableOpacity } from 'react-native-gesture-handler'
import {
  FADE_IN_ANIMATION_CONFIG,
  FADE_OUT_ANIMATION_CONFIG,
  SIZE_IN_ANIMATION_CONFIG,
  SIZE_OUT_ANIMATION_CONFIG,
  days,
  months,
} from '../../constants/constants'
import { setSelectedAppointment } from '../../features/calendarSlice'
import { selectedUser, selectedUserToken } from '../../features/userSlice'
import { useAppDispatch, useAppSelector } from '../../store/store'
import CalendarCard from './components/CalendarCard'
import { Appointment, Tag } from './types'

export default function Calendar({ navigation }: { navigation: any }) {
  const dispatch = useAppDispatch()

  const user = useAppSelector(selectedUser)
  const token = useAppSelector(selectedUserToken)

  const [tags, setTags] = useState<Tag[]>([])
  const [appointments, setAppointments] = useState<Appointment[]>([])

  const isFocus = useIsFocused()

  useEffect(() => {
    if (!isFocus) return
    if (!token) return
    if (!user) return
    axios
      .get('https://back-rently.mathieudacheux.fr/appointment_tags', {
        headers: { Authorization: 'Bearer ' + token },
      })
      .then((res) => setTags((res.data as Tag[]) || []))
      .catch((error) => console.log(error))
    axios
      .get(
        `https://back-rently.mathieudacheux.fr/appointments/user/${user.user_id}`,
        {
          headers: { Authorization: 'Bearer ' + token },
        },
      )
      .then((res) => setAppointments((res.data as Appointment[]) || []))
      .catch((error) => console.error(error))
  }, [isFocus])

  const opacityValue = useRef(new Animated.Value(1)).current

  const sizeValue = useRef(new Animated.Value(1)).current

  const appointmentsObject: {
    [key: string]: { name: string; height: number; day: string }[]
  } = appointments.reduce(
    (acc, appointment) => {
      appointment.appointments.map((appt) =>
        acc[appointment.dateStart as string]
          ? acc[appointment.dateStart as string].push({
              name: `${
                tags.find((tag) => tag.appointment_tag_id === appt.tag_id)
                  ?.label || ''
              }-${appt.note}-${appt.appointment_id}`,
              height: 100,
              day: '1',
            })
          : (acc[appointment.dateStart as string] = [
              {
                name: `${
                  tags.find((tag) => tag.appointment_tag_id === appt.tag_id)
                    ?.label || ''
                }-${appt.note || 'Sans commentaire'}-${appt.appointment_id}`,
                height: 100,
                day: new Date(appt.date_start).toLocaleTimeString(),
              },
            ]),
      )

      return acc
    },
    {} as {
      [date: string]: { name: string; height: number; day: string }[]
    },
  )

  return useMemo(
    () => (
      <View style={styles.mainContainer}>
        <View style={{ width: '100%', height: '100%' }}>
          <Agenda
            monthFormat={'MMMM yyyy'}
            renderHeader={(date: Date) => {
              return (
                <View
                  style={{
                    width: '100%',
                    height: 40,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Text style={{ fontSize: 20 }}>
                    {months[date.getUTCMonth()]} {date.getUTCFullYear()}
                  </Text>
                </View>
              )
            }}
            contentContainerStyle={{
              width: '100%',
              height: '100%',
            }}
            items={appointmentsObject}
            renderEmptyData={() => <View />}
            renderItem={(reservation: AgendaEntry) => {
              return (
                reservation && (
                  <TouchableOpacity
                    testID={''}
                    style={{ height: reservation.height }}
                    onPress={async () => {
                      await dispatch(
                        setSelectedAppointment({
                          selectedAppointmentId: Number(
                            reservation.name.split('-')[2],
                          ),
                        }),
                      )
                      navigation.navigate('AddAppointment')
                    }}
                  >
                    <CalendarCard
                      label={reservation.name.split('-')[0]}
                      date={reservation.day}
                      comment={reservation.name.split('-')[1]}
                    />
                  </TouchableOpacity>
                )
              )
            }}
            renderEmptyDate={() => {
              return (
                <View style={styles.emptyDate}>
                  <Text>Cette date est vide !</Text>
                </View>
              )
            }}
            rowHasChanged={(r1: AgendaEntry, r2: AgendaEntry) => {
              return r1.name !== r2.name
            }}
            showClosingKnob={true}
            renderDay={(day: Date) => {
              if (day) {
                return (
                  <View
                    style={{
                      width: '25%',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 16,
                        ...(day.toLocaleDateString() ===
                        new Date(Date.now()).toLocaleDateString()
                          ? { color: '#4A43EC' }
                          : ''),
                      }}
                    >
                      {days[day.getDay()]}
                    </Text>
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: 'bold',
                        ...(day.toLocaleDateString() ===
                        new Date(Date.now()).toLocaleDateString()
                          ? { color: '#4A43EC' }
                          : ''),
                      }}
                    >
                      {day.getDate()}
                    </Text>
                  </View>
                )
              }
              return <View style={{ width: '25%' }} />
            }}
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
                  Animated.timing(
                    opacityValue,
                    FADE_OUT_ANIMATION_CONFIG,
                  ).start()
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
                source={require('../../../assets/Plus.png')}
              />
            </Pressable>
          </View>
        </View>
      </View>
    ),
    [appointments],
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
    width: '100%',
    marginLeft: '5%',
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30,
  },
  customDay: {
    fontSize: 20,
  },
})
