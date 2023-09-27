import React, { useEffect, useRef, useState } from 'react'
import {
  View,
  TextInput,
  ScrollView,
  Image,
  StyleSheet,
  Pressable,
  Animated,
  RefreshControl,
} from 'react-native'
import CalendarCard from './components/CalendarCard'
import axios from 'axios'
import { Appointment, Tag } from './types'

export default function Calendar({ navigation }: { navigation: any }) {
  const userId = 47

  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlX2lkIjoyLCJ1c2VyX2lkIjoxMDEsImlhdCI6MTY5NTc5NzQ0NiwiZXhwIjoxNjk1ODQwNjQ2fQ.ap3nKXOPxSEqbJZn_Q9B83GMGL9iVq8v0zLdjo58fuU'

  const [tags, setTags] = useState<Tag[]>([])
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [filteredAppointments, setFilteredAppointments] =
    useState<Appointment[]>(appointments)

  const [refreshing] = useState(false)

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

  const handleRefresh = () => {
    axios
      .get(
        `https://back-rently.mathieudacheux.fr/appointments/user/${userId}`,
        {
          headers: { Authorization: 'Bearer ' + token },
        },
      )
      .then((res) => setAppointments((res.data as Appointment[]) || []))
      .catch((error) => console.error(error))
  }

  return (
    <View style={styles.mainContainer}>
      <View className='h-[70px] w-full flex items-center bg-[#F5F5F5] z-40'>
        <View className='w-11/12 flex-1 flex-row items-center bg-white rounded-[20px] shadow-md mt-4'>
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
      </View>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        contentContainerStyle={styles.container}
        className='w-full'
      >
        {filteredAppointments
          .sort(
            (a, b) =>
              new Date(a.date_start).getTime() -
              new Date(b.date_start).getTime(),
          )
          .slice(0, 5)
          .map((appointment: Appointment) => (
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
})
