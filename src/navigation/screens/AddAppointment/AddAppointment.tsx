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
import { FormikProvider } from 'formik'
import { Property, Tag } from '../Calendar/types'
import useAddAppointmentFormik from './hooks/useAddAppointmentFormik'
import { useAppSelector } from '../../../store/store'
import { selectedAppointmentId } from '../../../features/calendarSlice'

export default function AddAppointment() {
  const navigation = useNavigation()

  const selectedAppt = useAppSelector(selectedAppointmentId)

  console.log(selectedAppt)

  const { addAppointmentFormik } = useAddAppointmentFormik()
  const { values, setFieldValue } = addAppointmentFormik
  const userId = 47

  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlX2lkIjoyLCJ1c2VyX2lkIjoxMDEsImlhdCI6MTY5NTc5NzQ0NiwiZXhwIjoxNjk1ODQwNjQ2fQ.ap3nKXOPxSEqbJZn_Q9B83GMGL9iVq8v0zLdjo58fuU'

  const [selectedDate, setSelectedDate] = useState<number>(0)
  const [showDatePicker, setShowDatePicker] = useState(false)

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
      ? setFieldValue(
          'date_start',
          `${formatedDate[2]}-${formatedDate[1]}-${formatedDate[0]}`,
        )
      : setFieldValue(
          'date_end',
          `${formatedDate[2]}-${formatedDate[1]}-${formatedDate[0]}`,
        )
    setShowDatePicker(false)
  }

  const handleTimeChange = (time: string) => {
    selectedTime === 0
      ? setFieldValue('time_start', time)
      : setFieldValue('time_end', time)
    setShowTimePicker(false)
  }

  const formatDateForBackend = (date: string) => {
    const DateAndTime = date.split(' ')
    const formatedDate = DateAndTime[0].split('-')
    return `${formatedDate[2].replace(',', '')}-${formatedDate[1]}-${
      formatedDate[0]
    } ${DateAndTime[1]}`
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
      .then(() => navigation.goBack())
      .catch((error) => console.error(error))
  }

  return (
    <FormikProvider value={addAppointmentFormik}>
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
                source={require('../../../../assets/Back.png')}
              />
            </Pressable>
          </View>
          <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 20 }}>
            Ajouter un rendez-vous
          </Text>
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
                  value={values.date_start}
                  showSoftInputOnFocus={false}
                />
                <TextInput
                  style={{ ...styles.input, width: '37%' }}
                  onPressIn={() => {
                    setSelectedTime(0)
                    setShowTimePicker(true)
                  }}
                  value={values.time_start}
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
                  value={values.date_end}
                  showSoftInputOnFocus={false}
                />
                <TextInput
                  style={{ ...styles.input, width: '37%' }}
                  onPressIn={() => {
                    setSelectedTime(1)
                    setShowTimePicker(true)
                  }}
                  value={values.time_end}
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
                placeholder="Type d'évènement"
                style={styles.input}
                valueField='appointment_tag_id'
                labelField='label'
                data={tags}
                onChange={(value) => {
                  setFieldValue('tag_id', value.appointment_tag_id)
                }}
              />
            </View>
            <View style={{ ...styles.inputContainer, paddingTop: 10 }}>
              <Text>Bien</Text>
              <Dropdown
                placeholder='Choisir une propriété'
                style={styles.input}
                valueField='property_id'
                labelField='name'
                data={appointments}
                onChange={(value) => {
                  setFieldValue('property_id', value.property_id)
                }}
              />
            </View>
            <TextInput
              style={{
                ...styles.input,
                height: 200,
                textAlignVertical: 'top',
                width: '100%',
                marginTop: 10,
              }}
              placeholder='Note'
              multiline
              numberOfLines={12}
              value={values.note}
              editable
              onChangeText={(text) => setFieldValue('note', text)}
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
                propertyId: values.property_id,
                tagId: values.tag_id,
                startDate: `${values.date_start} ${values.time_start}`,
                endDate: `${values.date_end} ${values.time_end}`,
                note: values.note,
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
                  selected={
                    selectedDate === 0 ? values.date_start : values.date_end
                  }
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
                  selected={
                    selectedTime === 0 ? values.time_start : values.time_end
                  }
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
    </FormikProvider>
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
