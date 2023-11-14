import { useEffect, useState } from 'react'
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
  const [propertyTypes, setPropertyTypes] = useState<any>(null)

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

  const getPropertyTypes = async () => {
    setIsLoading(true)
    try {
      const { data } = await axios.get(ROUTE_API.PROPERTY_STATUS)
      setPropertyTypes(data)
      setIsLoading(false)
      return data
    } catch (error) {
      setPropertyTypes(null)
      setIsLoading(false)
      return "Aucun type de bien n'a été trouvé"
    }
  }

  useEffect(() => {
    getProperty()
    getPropertyTypes()
  }, [])

  return (
    <View className='items-center'>
      <View className='w-full h-full mt-2 items-center'>
        <View className='w-11/12 h-full flex-row justify-between gap-y-2 flex-wrap'>
          <View className='w-[48%] h-1/5'>
            <Card>
              <Text className='text-xl text-center font-bold'>
                Propriété à vendre
              </Text>
              <Text className='text-xl text-center font-bold'>5</Text>
            </Card>
          </View>
          <View className='w-[48%] h-1/5'>
            <Card>
              <Text className='text-xl text-center font-bold'>
                Locations à louer
              </Text>
              <Text className='text-xl text-center font-bold'>5</Text>
            </Card>
          </View>
          <View className='w-[48%] h-1/5'>
            <Card>
              <Text className='text-xl text-center font-bold'>
                Prospects en cours
              </Text>
              <Text className='text-xl text-center font-bold'>5</Text>
            </Card>
          </View>
          <View className='w-[48%] h-1/5'>
            <Card>
              <Text className='text-xl text-center font-bold'>
                Ventes en cours
              </Text>
              <Text className='text-xl text-center font-bold'>5</Text>
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
