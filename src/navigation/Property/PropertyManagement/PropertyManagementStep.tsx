import { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import PropertyManagement from './PropertyManagement'
import { ROUTE_API } from '../../../constants/api'
import { useAppSelector } from '../../../store/store'
import { selectedUser } from '../../../features/userSlice'
import { useFormikContext } from 'formik'
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
  const { values } = useFormikContext<{ search: string }>()
  const [property, setProperty] = useState<any>([])
  const [isLoading, setIsLoading] = useState(false)
  const [propertyImages, setPropertyImages] = useState<
    { id: number; name: string; url: string[] }[]
  >([])
  const [propertyImagesFiltered, setPropertyImagesFiltered] = useState<
    { id: number; name: string; url: string[] }[]
  >([])

  const user = useAppSelector(selectedUser)?.user_id

  const getProperty = async () => {
    setIsLoading(true)
    try {
      const { data } = await axios.get(
        `${ROUTE_API.PROPERTY_FILTERS}agent_id=${user}`,
      )
      if (!data) return
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
    if (isLoading) return
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
    if (values.search.length <= 3) return
    const filtered = propertyImages.filter((property) =>
      property.name.toLowerCase().includes(values.search.toLowerCase()),
    )
    setPropertyImagesFiltered(filtered)
  }, [values.search])

  useEffect(() => {
    getProperty()
  }, [])

  useEffect(() => {
    fetchPropertyImages()
  }, [property])

  return (
    <PropertyManagement
      propertyImages={propertyImages}
      onPress={navigateToProperty}
    />
  )
}
