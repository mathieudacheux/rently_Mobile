import { useEffect, useState, useMemo } from 'react'
import { View, Text } from 'react-native'
import Card from '../../../../components/atoms/Card'
import axios from 'axios'
import { ROUTE_API } from '../../../../constants/api'
import { useAppSelector } from '../../../../store/store'
import { selectedUser } from '../../../../features/userSlice'
import BulletPointCard from '../../../../components/organisms/BulletPointCard'

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

  return (
    <View className='items-center'>
      <View className='w-full h-full mt-2 items-center'>
        <View className='w-11/12 h-full flex-row justify-between flex-wrap'>
          <BulletPointCard
            text='Propriété à vendre'
            numberOf={propertyToSell}
            isLoading={isLoading}
          />
          <BulletPointCard
            text='Propriété à louer'
            numberOf={propertyToRent}
            isLoading={isLoading}
          />
          <BulletPointCard
            text='Prospects en cours'
            numberOf={prospectIncoming}
            isLoading={isLoading}
          />
          <BulletPointCard
            text='Ventes en cours'
            numberOf={propetyInSaling}
            isLoading={isLoading}
          />
          <View className='w-full h-1/3 items-center justify-center'>
            <Card />
          </View>
        </View>
      </View>
    </View>
  )
}
