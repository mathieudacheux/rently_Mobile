import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import * as Burnt from 'burnt'
import { useCallback, useEffect, useState } from 'react'
import { ROUTE_API } from '../../../constants/api'
import {
  setSelectedProperty,
  setSelectedPropertyImages,
} from '../../../features/propertySlice'
import { selectedUser } from '../../../features/userSlice'
import { ROUTES } from '../../../router/routes'
import { useAppDispatch, useAppSelector } from '../../../store/store'
import PropertyManagement from './PropertyManagement'

export default function PropertyManagementStep(): JSX.Element {
  const dispatch = useAppDispatch()
  const navigation = useNavigation()

  const user = useAppSelector(selectedUser)?.user_id

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [property, setProperty] = useState<any>([])
  const [propertyImages, setPropertyImages] = useState<
    { id: number; name: string; url: string[] }[]
  >([])
  const [switchValue, setSwitchValue] = useState<boolean>(false)

  const getProperty = async () => {
    setIsLoading(true)
    try {
      const { data } = await axios.get(
        `${ROUTE_API.PROPERTY_FILTERS}agent_id=${user}&draft=${switchValue}`,
      )
      setProperty(data)
      setIsLoading(false)
      return data
    } catch (error) {
      setProperty(null)
      setIsLoading(false)
      Burnt.toast({
        title: 'Une erreur est survenue',
        preset: 'error',
      })
      return "Cet agent n'existe pas"
    }
  }

  const fetchPropertyImages = () => {
    setPropertyImages([])
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
  }, [switchValue])

  useEffect(() => {
    if (isLoading) return
    fetchPropertyImages()
  }, [property.length, isLoading])

  return (
    <PropertyManagement
      propertyImages={propertyImages}
      onPress={navigateToProperty}
      switchValue={switchValue}
      handleSwitch={(value) => setSwitchValue(value)}
    />
  )
}
