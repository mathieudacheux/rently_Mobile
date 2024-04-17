import axios from 'axios'
import * as Burnt from 'burnt'
import { useEffect, useState } from 'react'
import { Linking, Platform, SafeAreaView, Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import ShareButton from '../../components/molecules/ShareButton'
import StackBackButton from '../../components/molecules/StackBackButton'
import PropertyDetailCarousel from '../../components/organisms/PropertyDetailCarousel'
import { ROUTE_API } from '../../constants/api'
import {
  selectProperty,
  selectPropertyImages,
} from '../../features/propertySlice'
import { selectedUserToken } from '../../features/userSlice'
import { useAppSelector } from '../../store/store'

export default function PropertyDetail(): JSX.Element {
  const property = useAppSelector(selectProperty)
  const propertyImages = useAppSelector(selectPropertyImages)
  const token = useAppSelector(selectedUserToken)
  const description = property?.description?.replace(/<[^>]*>?/gm, '')

  const [address, setAddress] = useState<{
    address_id: number
    address: string
    city: string
    zipcode: string
    additionnal_info: string
    longitude: string
    latitude: string
  } | null>(null)

  const getAdress = async () => {
    try {
      const { data } = await axios.get(
        `${ROUTE_API.ADDRESS}${property?.address_id}`,
        { headers: { Authorization: 'Bearer ' + token } },
      )
      setAddress(data)
    } catch (error) {
      Burnt.toast({
        title: 'Une erreur est survenue',
        preset: 'error',
      })
      setAddress(null)
    }
  }

  useEffect(() => {
    getAdress()
  }, [])

  return (
    <SafeAreaView className='w-full items-center'>
      <ScrollView className='w-11/12'>
        <View className='w-full flex-row justify-between'>
          <StackBackButton />
          <ShareButton
            message='Découvrez ce bien'
            link={`https://front-rently.mathieudacheux.fr/property_details/${property?.name}/${property?.property_id}`}
          />
        </View>
        <View className='items-center'>
          <Text
            className='text-center text-2xl font-bold mb-1'
            onPress={() => {
              const scheme = Platform.select({
                ios: 'maps://0,0?q=',
                android: 'geo:0,0?q=',
              })
              const latLng = `${address?.latitude},${address?.longitude}`
              const label = `${address?.address}, ${address?.city} ${address?.zipcode}`
              const url =
                Platform.select({
                  ios: `${scheme}${label}@${latLng}`,
                  android: `${scheme}${latLng}(${label})`,
                }) || ''

              Linking.openURL(url)
            }}
          >
            {property?.name} | {property?.price}€
          </Text>
          <PropertyDetailCarousel
            id={property?.property_id}
            imagesArray={propertyImages}
          />
        </View>
        <Text className='text-xl font-bold mb-1'>Description</Text>
        <Text className='text-justify mb-1'>{description}</Text>
        <Text className='text-xl font-bold mb-1'>Caractéristiques</Text>
        <View className='list text-neutral-900 md:leading-10'>
          {property?.surface && (
            <Text className='list-disc'>- Surface: {property.surface}m²</Text>
          )}
          {property?.bedroom && (
            <Text className='list-disc'>- Chambres: {property.bedroom}</Text>
          )}
          {property?.bathroom && (
            <Text className='list-disc'>
              - Salles de bain: {property.bathroom}
            </Text>
          )}
          {property?.elevator && (
            <Text className='list-disc'>
              - Ascenseur: {property.elevator ? 'Oui' : 'Non'}
            </Text>
          )}
          {property?.cellar && (
            <Text className='list-disc'>
              - Cave: {property.cellar ? 'Oui' : 'Non'}
            </Text>
          )}
          {property?.balcony && (
            <Text className='list-disc'>
              - Balcon: {property.balcony ? 'Oui' : 'Non'}
            </Text>
          )}
          {property?.garage && (
            <Text className='list-disc'>
              - Garage: {property.garage ? 'Oui' : 'Non'}
            </Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
