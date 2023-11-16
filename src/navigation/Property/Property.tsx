import { Text } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { useAppSelector } from '../../store/store'
import {
  selectProperty,
  selectPropertyImages,
} from '../../features/propertySlice'

export default function Property(): JSX.Element {
  const property = useAppSelector(selectProperty)
  const propertyImages = useAppSelector(selectPropertyImages)
  console.log(propertyImages)

  return (
    <ScrollView>
      <Text>{property?.name}</Text>
      <Text>{property?.description}</Text>
      <Text>{property?.price}€</Text>
      <Text>{property?.surface}m²</Text>
      <Text>{property?.room} pièces</Text>
      <Text>{property?.bedroom} chambres</Text>
      <Text>{property?.bathroom} salles de bain</Text>
      <Text>{property?.toilet} toilettes</Text>
      <Text>{property?.energy_class}</Text>
    </ScrollView>
  )
}
