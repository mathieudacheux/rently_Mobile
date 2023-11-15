import { useEffect, useState, useMemo } from 'react'
import { View, Text } from 'react-native'
import Card from '../../../../components/atoms/Card'
import axios from 'axios'
import { ROUTE_API } from '../../../../constants/api'
import { useAppSelector } from '../../../../store/store'
import { selectedUser } from '../../../../features/userSlice'

export default function HomeManagement(): JSX.Element {
  const user = useAppSelector(selectedUser)

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [property, setProperty] = useState<any>(null)
  const [propertyStatus, setPropertyStatus] = useState<any>(null)

  const getProperty = async () => {
    setIsLoading(true)
    try {
      const { data } = await axios.get(
        `${ROUTE_API.PROPERTY_FILTERS}agent_id=${user.user_id}`,
      )
      setProperty(data)
      setIsLoading(false)
      return data
    } catch (error) {
      setProperty(null)
      setIsLoading(false)
      return "Cet agent n'existe pas"
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
      setPropertyStatus(null)
      setIsLoading(false)
      return "Aucun type de bien n'a été trouvé"
    }
  }

  useEffect(() => {
    getProperty()
    getPropertyStatus()
  }, [])

  const propertyStatusToSell = useMemo(
    () =>
      propertyStatus
        ? propertyStatus?.filter(
            (propertyStatus: any) => propertyStatus.name === 'A vendre',
          )[0]?.status_id
        : 0,
    [propertyStatus],
  )

  const propertyStatusToRent = useMemo(
    () =>
      propertyStatus
        ? propertyStatus?.filter(
            (propertyStatus: any) => propertyStatus.name === 'A louer',
          )[0]?.status_id
        : 0,
    [propertyStatus],
  )

  const propertyStatusInSaling = useMemo(
    () =>
      propertyStatus?.lenght
        ? propertyStatus?.filter(
            (propertyStatus: any) =>
              propertyStatus.name === 'En cours de vente',
          )[0]?.status_id
        : 0,
    [propertyStatus],
  )

  const propertyStatusProspectIncoming = useMemo(
    () =>
      propertyStatus?.lenght
        ? propertyStatus?.filter(
            (propertyStatus: any) => propertyStatus.name === 'Prospect entrant',
          )[0]?.status_id
        : 0,
    [propertyStatus],
  )

  const propertyToSell = property?.lenght
    ? property?.filter(
        (property: any) => property.status_id === propertyStatusToSell,
      ).lenght
    : 0

  const propertyToRent = property?.lenght
    ? property?.filter(
        (property: any) => property.status_id === propertyStatusToRent,
      ).lenght
    : 0

  const propetyInSaling = property?.lenght
    ? property?.filter(
        (property: any) => property.status_id === propertyStatusInSaling,
      ).lenght
    : 0

  const prospectIncoming = property?.lenght
    ? property?.filter(
        (property: any) =>
          property.status_id === propertyStatusProspectIncoming,
      ).lenght
    : 0

  return (
    <View className='items-center'>
      <View className='w-full h-full mt-2 items-center'>
        <View className='w-11/12 h-full flex-row justify-between gap-y-2 flex-wrap'>
          <View className='w-[48%] h-1/5'>
            <Card>
              <Text className='text-xl text-center font-bold'>
                Propriété à vendre
              </Text>
              <Text className='text-xl text-center font-bold'>
                {propertyToSell}
              </Text>
            </Card>
          </View>
          <View className='w-[48%] h-1/5'>
            <Card>
              <Text className='text-xl text-center font-bold'>
                Locations à louer
              </Text>
              <Text className='text-xl text-center font-bold'>
                {propertyToRent}
              </Text>
            </Card>
          </View>
          <View className='w-[48%] h-1/5'>
            <Card>
              <Text className='text-xl text-center font-bold'>
                Prospects en cours
              </Text>
              <Text className='text-xl text-center font-bold'>
                {prospectIncoming}
              </Text>
            </Card>
          </View>
          <View className='w-[48%] h-1/5'>
            <Card>
              <Text className='text-xl text-center font-bold'>
                Ventes en cours
              </Text>
              <Text className='text-xl text-center font-bold'>
                {propetyInSaling}
              </Text>
            </Card>
          </View>
          <View className='w-full h-1/3 items-center justify-center'>
            <Card />
          </View>
        </View>
      </View>
    </View>
  )
}
