import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import * as Burnt from 'burnt'
import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  RefreshControl,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import BulletPointCard from '../../../components/organisms/BulletPointCard'
import PropertyCarousel from '../../../components/organisms/PropertyCarousel'
import { ROUTE_API } from '../../../constants/api'
import {
  setSelectedProperty,
  setSelectedPropertyImages,
} from '../../../features/propertySlice'
import { selectedUser } from '../../../features/userSlice'
import { ROUTES } from '../../../router/routes'
import { useAppDispatch, useAppSelector } from '../../../store/store'

export default function HomeManagement(): JSX.Element {
  const dispatch = useAppDispatch()
  const navigation = useNavigation()
  const user = useAppSelector(selectedUser)

  const [refreshing, setRefreshing] = useState<boolean>(false)
  const [propertyLoading, setPropertyLoading] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [property, setProperty] = useState<any>([])
  const [propertyStatus, setPropertyStatus] = useState<any>(null)
  const [propertyImages, setPropertyImages] = useState<
    { id: number; name: string; url: string[] }[]
  >([])
  const [appointmentsLoading, setAppointmentsLoading] = useState<boolean>(false)
  const [appointments, setAppointments] = useState<any>([])
  const [appointmentsTags, setAppointmentsTags] = useState<any>([])

  const getColor = (label: string) => {
    switch (label) {
      case 'Visite':
        return '#4A43EC'
      case 'Réunion':
        return '#FEBB2E'
      case 'État des lieux':
        return '#FF6C6C'
      default:
        return 'black'
    }
  }

  const getAppointmentTags = async () => {
    try {
      const { data } = await axios.get(ROUTE_API.TAGS)
      setAppointmentsTags(data)
      return data
    } catch (error) {
      Burnt.toast({
        title: 'Une erreur est survenue',
        preset: 'error',
      })
      setAppointmentsTags([])
      return "Aucun tag n'a été trouvé"
    }
  }

  const getProperty = async () => {
    setPropertyLoading(true)
    try {
      const { data } = await axios.get(
        `${ROUTE_API.PROPERTY_FILTERS}agent_id=${user.user_id}`,
      )
      setProperty(data)
      setPropertyLoading(false)
      return data
    } catch (error) {
      Burnt.toast({
        title: 'Une erreur est survenue',
        preset: 'error',
      })
      setProperty(null)
      setPropertyLoading(false)
      return "Cet agent n'existe pas"
    }
  }

  const todayAppointments = useMemo(() => {
    if (!appointmentsTags.length) return []
    if (!appointments.length) return []

    const appointmentsFlat = appointments
      .map((item: any) => item.appointments)
      .flat()

    const today = new Date(new Date().getTime() + 60 * 60 * 1000)
      .toISOString()
      .split('T')[0]

    const todayDate = new Date(new Date().getTime() + 60 * 60 * 1000)

    const todayAppointments = appointmentsFlat.filter(
      (item: any) => item.date_start.split('T')[0] === today,
    )

    const availableAppointments = todayAppointments.filter((item: any) => {
      const dateStart = new Date(item.date_start)
      const dateEnd = new Date(item.date_end)
      return todayDate > dateStart && todayDate < dateEnd
    })

    const availableAppointmentsSorted = availableAppointments
      .sort((a: any, b: any) => {
        const dateStartA = new Date(a.date_start)
        const dateStartB = new Date(b.date_start)
        return dateStartA.getTime() - dateStartB.getTime()
      })
      .map((item: any) => {
        const tag = appointmentsTags.filter(
          (tag: any) => tag.tag_id === item.appointment_tag_id,
        )[0]
        return {
          ...item,
          date_start: String(new Date(new Date(item.date_start)))
            .split(' ')[4]
            .slice(0, 5),
          tag: tag.label,
        }
      })

    return availableAppointmentsSorted
  }, [appointments, appointmentsTags])

  const getAppointments = async () => {
    setPropertyLoading(true)
    try {
      const { data } = await axios.get(
        `${ROUTE_API.APPOINTMENT_BY_ID}${user.user_id}`,
      )

      setAppointments(data)
      setAppointmentsLoading(false)
      return data
    } catch (error) {
      Burnt.toast({
        title: 'Une erreur est survenue',
        preset: 'error',
      })
      setAppointments([])
      setAppointmentsLoading(false)
      return "Cet agent n'a aucun rendez-vous"
    }
  }

  const getPropertyStatus = async () => {
    setIsLoading(true)
    try {
      const { data } = await axios.get(ROUTE_API.PROPERTY_STATUS)
      setPropertyStatus(data)
      setIsLoading(false)
      return data
    } catch (error) {
      Burnt.toast({
        title: 'Une erreur est survenue',
        preset: 'error',
      })
      setPropertyStatus(null)
      setIsLoading(false)
      return "Aucun type de bien n'a été trouvé"
    }
  }

  useEffect(() => {
    getProperty()
    getPropertyStatus()
  }, [])

  const navigateToProperty = useCallback(
    async (propertyId: number) => {
      const selectedProperty = property?.find(
        (property: any) => property.property_id === propertyId,
      )
      const selectedImages = propertyImages
        ? propertyImages
            ?.filter((propertyImages) => propertyImages.id === propertyId)
            .map((propertyImages) => propertyImages.url)
            .flat()
        : null

      if (!selectedProperty) return

      await dispatch(
        setSelectedPropertyImages({ selectedPropertyImages: selectedImages }),
      )
      await dispatch(
        setSelectedProperty({ selectedProperty: selectedProperty }),
      )

      navigation.navigate(ROUTES.PROPERTY_DETAILS as never)
    },
    [propertyImages],
  )

  const fetchPropertyImages = () => {
    property?.map(async (property: any) => {
      try {
        const { data } = await axios.get(
          `${ROUTE_API.IMAGES}${property.property_id}`,
        )

        setPropertyImages((prevState) => [
          ...prevState!,
          {
            id: property.property_id,
            name: property.name,
            url: data,
          },
        ])
      } catch (error) {
        return "Aucune image n'a été trouvée"
      }
    })
  }

  const propertyStatusToSell = useMemo(
    () =>
      propertyStatus
        ? propertyStatus?.filter(
            (propertyStatus: any) => propertyStatus.name === 'À vendre',
          )[0]?.status_id
        : 0,
    [propertyStatus],
  )

  const propertyStatusToRent = useMemo(
    () =>
      propertyStatus
        ? propertyStatus?.filter(
            (propertyStatus: any) => propertyStatus.name === 'À louer',
          )[0]?.status_id
        : 0,
    [propertyStatus],
  )

  const propertyStatusInSaling = useMemo(
    () =>
      propertyStatus
        ? propertyStatus?.filter(
            (propertyStatus: any) =>
              propertyStatus.name === 'En cours de vente',
          )[0]?.status_id
        : 0,
    [propertyStatus],
  )

  const propertyStatusProspectIncoming = useMemo(
    () =>
      propertyStatus
        ? propertyStatus?.filter(
            (propertyStatus: any) => propertyStatus.name === 'Prospect entrant',
          )[0]?.status_id
        : 0,
    [propertyStatus],
  )

  const propertyToSell = useMemo(
    () =>
      property
        ? property?.reduce(
            (acc: any, property: any) =>
              property.status_id === propertyStatusToSell ? acc + 1 : acc + 0,
            0,
          )
        : 0,
    [property, propertyStatusToSell],
  )

  const propertyToRent = useMemo(
    () =>
      property
        ? property?.reduce(
            (acc: any, property: any) =>
              property.status_id === propertyStatusToRent ? acc + 1 : acc + 0,
            0,
          )
        : 0,
    [property, propertyStatusToRent],
  )

  const propetyInSaling = useMemo(
    () =>
      property
        ? property?.reduce(
            (acc: any, property: any) =>
              property.status_id === propertyStatusInSaling ? acc + 1 : acc + 0,
            0,
          )
        : 0,
    [property, propertyStatusInSaling],
  )

  const prospectIncoming = useMemo(
    () =>
      property
        ? property?.reduce(
            (acc: any, property: any) =>
              property.status_id === propertyStatusProspectIncoming
                ? acc + 1
                : acc + 0,
            0,
          )
        : 0,
    [property, propertyStatusProspectIncoming],
  )

  useEffect(() => {
    if (propertyLoading) return
    fetchPropertyImages()
  }, [property.length, propertyLoading])

  useEffect(() => {
    if (appointmentsLoading) return
    getAppointments()
  }, [appointments.length, appointmentsLoading])

  useEffect(() => {
    if (appointmentsTags.length) return
    getAppointmentTags()
  }, [appointmentsTags.length, refreshing])

  useEffect(() => {
    if (!refreshing) return
    getProperty()
    getPropertyStatus()
    getAppointments()
    fetchPropertyImages()
    setTimeout(() => {
      setRefreshing(false)
    }, 1000)
  }, [refreshing])

  return (
    <SafeAreaView className='w-full h-full'>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => setRefreshing(true)}
          />
        }
        className='w-full h-full'
      >
        <View className='items-center h-[800px] w-full'>
          <View className='w-full h-full mt-2 items-center'>
            <View className='w-11/12 h-full flex-row justify-between flex-wrap'>
              <BulletPointCard
                color='red-600'
                text='Propriété à vendre'
                numberOf={propertyToSell}
                isLoading={isLoading}
              />
              <BulletPointCard
                color='green-700'
                text='Propriété à louer'
                numberOf={propertyToRent}
                isLoading={isLoading}
              />
              <BulletPointCard
                color='blue-700'
                text='Prospects en cours'
                numberOf={prospectIncoming}
                isLoading={isLoading}
              />
              <BulletPointCard
                color='yellow-400'
                text='Ventes en cours'
                numberOf={propetyInSaling}
                isLoading={isLoading}
              />
              <View className='w-full h-1/4 items-center justify-center mb-2'>
                <PropertyCarousel
                  propertyData={propertyImages}
                  onPress={navigateToProperty}
                />
              </View>
              <View className='w-full h-1/3 items-center justify-start'>
                {todayAppointments.length > 0
                  ? todayAppointments.map((appointment: any) => (
                      <TouchableOpacity
                        key={appointment.appointment_id}
                        onPress={() => console.log('a')}
                        className='w-full'
                      >
                        <View className='w-full h-[75px] rounded-xl bg-white shadow flex justify-start p-3'>
                          <View className='w-full h-full'>
                            <View className='flex-row items-baseline mb-2'>
                              <Text
                                style={{
                                  color: getColor(appointment.tag),
                                  fontSize: 18,
                                  fontWeight: 'bold',
                                }}
                              >
                                {appointment.tag}
                              </Text>
                              {appointment.date_start && <Text> - </Text>}
                              <Text
                                style={{
                                  fontSize: 16,
                                  fontWeight: 'bold',
                                }}
                              >
                                {String(appointment.date_start)}
                              </Text>
                            </View>
                            <View className='w-full h-full flex-row'>
                              <Text
                                numberOfLines={1}
                                className='text-sm text-gray-800'
                              >
                                {appointment.note || ''}
                              </Text>
                            </View>
                          </View>
                        </View>
                      </TouchableOpacity>
                    ))
                  : null}
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
