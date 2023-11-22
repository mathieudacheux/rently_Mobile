import { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import PropertyManagement from './PropertyManagement'
import { ROUTE_API } from '../../../constants/api'
import { useAppSelector } from '../../../store/store'
import { selectedUser } from '../../../features/userSlice'
import { useNavigation } from '@react-navigation/native'
import { useAppDispatch } from '../../../store/store'
import {
  setSelectedProperty,
  setSelectedPropertyImages,
} from '../../../features/propertySlice'
import { ROUTES } from '../../../router/routes'

export default function PropertyManagementStep(): JSX.Element {
  const dispatch = useAppDispatch()
  const navigation = useNavigation()

  const user = useAppSelector(selectedUser)?.user_id

  const [isLoading, setIsLoading] = useState(false)
  const [property, setProperty] = useState<any>([])
  const [propertyImages, setPropertyImages] = useState<
    { id: number; name: string; url: string[] }[]
  >([])

  const getProperty = async () => {
    setIsLoading(true)
    try {
      const { data } = await axios.get(
        `${ROUTE_API.PROPERTY_FILTERS}agent_id=${user}`,
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

  useEffect(() => {
    getProperty()
  }, [])

  useEffect(() => {
    if (isLoading) return
    fetchPropertyImages()
  }, [property.length, isLoading])

  return (
    <PropertyManagement
      propertyImages={propertyImages}
      onPress={navigateToProperty}
    />
  )
}
