import { Text, SafeAreaView, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { useAppSelector } from '../../store/store'
import {
  selectProperty,
  selectPropertyImages,
} from '../../features/propertySlice'
import StackBackButton from '../../components/molecules/StackBackButton'
import PropertyDetailCarousel from '../../components/organisms/PropertyDetailCarousel'

export default function PropertyDetail(): JSX.Element {
  const property = useAppSelector(selectProperty)
  const propertyImages = useAppSelector(selectPropertyImages)
  console.log(propertyImages)

  return (
    <SafeAreaView className='w-full items-center'>
      <ScrollView>
        <StackBackButton />
        <Text className='text-center text-2xl font-bold mb-1'>
          {property?.name}
        </Text>
        <View className='w-11/12 items-center'>
          <PropertyDetailCarousel
            id={property?.property_id}
            imagesArray={propertyImages}
          />
          <Text>{property?.description}</Text>
          <Text>{property?.price}€</Text>
          <Text>{property?.surface}m²</Text>
          <Text>{property?.room} pièces</Text>
          <Text>{property?.bedroom} chambres</Text>
          <Text>{property?.bathroom} salles de bain</Text>
          <Text>{property?.toilet} toilettes</Text>
          <Text>{property?.energy_class}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
