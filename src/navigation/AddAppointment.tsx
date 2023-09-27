import {
  Animated,
  Image,
  KeyboardAvoidingView,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { ScrollView, TextInput } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import DatePicker from 'react-native-modern-datepicker'
import { useEffect, useRef, useState } from 'react'
import { Dropdown } from 'react-native-element-dropdown'
import axios from 'axios'
import { Property, Tag } from './screens/Calendar/types'

export default function AddAppointment() {
  const navigation = useNavigation()

  const userId = 47

  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlX2lkIjoyLCJ1c2VyX2lkIjoxMDEsImlhdCI6MTY5NTc5NzQ0NiwiZXhwIjoxNjk1ODQwNjQ2fQ.ap3nKXOPxSEqbJZn_Q9B83GMGL9iVq8v0zLdjo58fuU'

  const [value, onChangeText] = useState<string>('')

  const [dateStart, setDateStart] = useState<string>(
    new Date().toLocaleDateString(),
  )
  const [dateEnd, setDateEnd] = useState<string>(
    new Date().toLocaleDateString(),
  )
  const [selectedDate, setSelectedDate] = useState<number>(0)
  const [showDatePicker, setShowDatePicker] = useState(false)

  const [timeStart, setTimeStart] = useState<string>(
    new Date().toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit',
    }),
  )
  const [timeEnd, setTimeEnd] = useState<string>(
    new Date().toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit',
    }),
  )
  const [selectedTime, setSelectedTime] = useState<number>(0)
  const [showTimePicker, setShowTimePicker] = useState(false)

  const [tags, setTags] = useState<Tag[]>([])
  const [appointments, setAppointments] = useState<Property[]>([])

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
    toValue: 1.3,
    duration: 500,
    useNativeDriver: true,
  }

  const SIZE_OUT_ANIMATION_CONFIG = {
    toValue: 1,
    duration: 500,
    useNativeDriver: true,
  }

  const sizeValue = useRef(new Animated.Value(1)).current

  const handleDateChange = (date: string) => {
    const formatedDate = date.split('/')
    selectedDate === 0
      ? setDateStart(`${formatedDate[2]}/${formatedDate[1]}/${formatedDate[0]}`)
      : setDateEnd(`${formatedDate[2]}/${formatedDate[1]}/${formatedDate[0]}`)
    setShowDatePicker(false)
  }

  const handleTimeChange = (time: string) => {
    selectedTime === 0 ? setTimeStart(time) : setTimeEnd(time)
    setShowTimePicker(false)
  }

  const addAppointment = ({
    propertyId,
    tagId,
    startDate,
    endDate,
    note,
  }: {
    propertyId: number
    tagId: number
    startDate: string
    endDate: string
    note: string
  }) => {
    axios
      .post(
        `https://back-rently.mathieudacheux.fr/appointments`,
        {
          property_id: 1,
          tag_id: 1,
          start_date: '2021-07-01 12:00:00',
          end_date: '2021-07-01 13:00:00',
          note: 'test',
          user_id_1: userId,
          user_id_2: userId,
        },
        {
          headers: { Authorization: 'Bearer ' + token },
        },
      )
      .then((res) => console.log(res))
      .catch((error) => console.error(error))
  }

  return (
    <KeyboardAvoidingView behavior='height'>
      <ScrollView
        contentContainerStyle={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <View style={styles.header}></View>
        <View style={styles.backButton}>
          <Pressable onPress={() => navigation.goBack()}>
            <Image
              style={{ width: 30, height: 30 }}
              source={require('../../assets/Back.png')}
            />
          </Pressable>
        </View>
        <View style={styles.container} className='shadow-md'>
          <View
            style={{
              ...styles.inputContainer,
              paddingBottom: 10,
              borderBottomColor: '#C0C0C0',
              borderBottomWidth: 1,
            }}
          >
            <Text>Titre</Text>
            <TextInput style={styles.input} />
          </View>
          <View style={{ ...styles.inputContainer, paddingTop: 10 }}>
            <Text>Lieu</Text>
            <TextInput style={styles.input} />
          </View>
        </View>
        <View style={styles.container} className='shadow-md'>
          <View
            style={{
              ...styles.inputContainer,
              paddingBottom: 10,
              borderBottomColor: '#C0C0C0',
              borderBottomWidth: 1,
            }}
          >
            <Text>Début</Text>
            <View
              style={{
                flexDirection: 'row',
                width: '70%',
                justifyContent: 'space-between',
              }}
            >
              <TextInput
                style={{ ...styles.input, width: '55%' }}
                onPressIn={() => {
                  setSelectedDate(0)
                  setShowDatePicker(true)
                }}
                value={dateStart}
                showSoftInputOnFocus={false}
              />
              <TextInput
                style={{ ...styles.input, width: '37%' }}
                onPressIn={() => {
                  setSelectedTime(0)
                  setShowTimePicker(true)
                }}
                value={timeStart}
                showSoftInputOnFocus={false}
              />
            </View>
          </View>
          <View style={{ ...styles.inputContainer, paddingTop: 10 }}>
            <Text>Fin</Text>
            <View
              style={{
                flexDirection: 'row',
                width: '70%',
                justifyContent: 'space-between',
              }}
            >
              <TextInput
                style={{ ...styles.input, width: '55%' }}
                onPressIn={() => {
                  setSelectedDate(1)
                  setShowDatePicker(true)
                }}
                value={dateEnd}
                showSoftInputOnFocus={false}
              />
              <TextInput
                style={{ ...styles.input, width: '37%' }}
                onPressIn={() => {
                  setSelectedTime(1)
                  setShowTimePicker(true)
                }}
                value={timeEnd}
                showSoftInputOnFocus={false}
              />
            </View>
          </View>
        </View>
        <View style={styles.container} className='shadow-md'>
          <View
            style={{
              ...styles.inputContainer,
              paddingBottom: 10,
              borderBottomColor: '#C0C0C0',
              borderBottomWidth: 1,
            }}
          >
            <Text>Type</Text>
            <Dropdown
              style={styles.input}
              valueField='appointment_tag_id'
              labelField='label'
              data={tags}
              onChange={() => {}}
            />
          </View>
          <View style={{ ...styles.inputContainer, paddingTop: 10 }}>
            <Text>Bien</Text>
            <Dropdown
              style={styles.input}
              valueField='property_id'
              labelField='name'
              data={appointments}
              onChange={() => {}}
            />
          </View>
          <TextInput
            style={{
              ...styles.input,
              height: 250,
              textAlignVertical: 'top',
              width: '100%',
              marginTop: 10,
            }}
            placeholder='Note'
            multiline
            numberOfLines={12}
            onChangeText={(text) => onChangeText(text)}
            value={value}
            editable
          />
        </View>
        <Pressable
          onPressIn={() => {
            Animated.timing(opacityValue, FADE_IN_ANIMATION_CONFIG).start()
            Animated.timing(sizeValue, SIZE_IN_ANIMATION_CONFIG).start()
            setTimeout(() => {
              Animated.timing(opacityValue, FADE_OUT_ANIMATION_CONFIG).start()
              Animated.timing(sizeValue, SIZE_OUT_ANIMATION_CONFIG).start()
            }, 200)
          }}
          onPressOut={() =>
            addAppointment({
              propertyId: 1,
              tagId: 1,
              startDate: '2021-07-01 12:00:00',
              endDate: '2021-07-01 13:00:00',
              note: 'test',
            })
          }
          style={{ width: '100%', alignItems: 'center' }}
        >
          <Animated.View
            style={{
              ...styles.saveButton,
              opacity: opacityValue,
              transform: [{ scale: sizeValue }],
            }}
          >
            <Text style={{ color: 'white', fontWeight: 'bold' }}>
              Enregistrer
            </Text>
          </Animated.View>
        </Pressable>
        <Modal
          animationType='slide'
          transparent={true}
          visible={showDatePicker}
          style={{ zIndex: 1000 }}
        >
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
              width: '100%',
              backgroundColor: 'rgba(0,0,0,0.5)',
            }}
          >
            <View style={{ width: '90%' }}>
              <DatePicker
                options={{
                  textHeaderColor: '#4A43EC',
                  mainColor: '#4A43EC',
                }}
                mode='calendar'
                selected={selectedDate === 0 ? dateStart : dateEnd}
                onDateChange={handleDateChange}
              ></DatePicker>
            </View>
            <Pressable
              style={styles.closeButton}
              onPress={() => setShowDatePicker(false)}
            >
              <Text style={{ color: 'white' }}>Fermer</Text>
            </Pressable>
          </View>
        </Modal>
        <Modal
          animationType='slide'
          transparent={true}
          visible={showTimePicker}
          style={{ zIndex: 1000 }}
        >
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
              width: '100%',
              backgroundColor: 'rgba(0,0,0,0.5)',
            }}
          >
            <View style={{ width: '90%' }}>
              <DatePicker
                options={{
                  textHeaderColor: '#4A43EC',
                  mainColor: '#4A43EC',
                }}
                mode='time'
                onTimeChange={handleTimeChange}
                selected={selectedTime === 0 ? timeStart : timeEnd}
              ></DatePicker>
            </View>
            <Pressable
              style={styles.closeButton}
              onPress={() => setShowTimePicker(false)}
            >
              <Text style={{ color: 'white' }}>Fermer</Text>
            </Pressable>
          </View>
        </Modal>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: '90%',
    borderRadius: 20,
    padding: 10,
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 50,
    backgroundColor: '#EFEFEF',
    borderRadius: 10,
    paddingHorizontal: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    flexDirection: 'row',
    marginBottom: 15,
    paddingTop: 15,
    paddingLeft: 15,
    width: '100%',
  },
  header: {
    height: 55,
    width: '100%',
    backgroundColor: '#848484',
  },
  closeButton: {
    backgroundColor: '#4A43EC',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  saveButton: {
    backgroundColor: '#4A43EC',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: '90%',
    marginBottom: 40,
  },
})
