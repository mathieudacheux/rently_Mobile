import { useMemo } from 'react'
import { View, Image, Text, SafeAreaView } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import FormikSearchField from '../../../components/molecules/FormikSearchField'
import { BASE_ROUTE_API } from '../../../constants/api'
import { useFormikContext } from 'formik'

export default function PropertyManagement({
  propertyImages,
  onPress,
}: {
  propertyImages: { id: number; name: string; url: string[] }[] | null
  onPress?: (id: number) => Promise<void>
}): JSX.Element {
  const { values } = useFormikContext<{ search: string }>()

  const propertyImagesFiltered = useMemo(() => {
    if (values.search.length <= 2) return propertyImages
    return propertyImages?.filter((property) =>
      property.name.includes(values.search),
    )
  }, [values.search, propertyImages])

  return (
    <SafeAreaView className='w-full items-center'>
      <View className='w-full items-center mt-2'>
        <FormikSearchField />
        <ScrollView className='w-11/12 h-[90%]'>
          {propertyImagesFiltered &&
            propertyImagesFiltered.map((property) => (
              <View key={property?.id} className='w-full h-[175px] mb-2'>
                <View className='z-50 absolute w-full h-full items-center justify-center'>
                  <Text
                    className=' text-white text-2xl font-bold'
                    onPress={async () => await onPress?.(property?.id)}
                  >
                    {property.name}
                  </Text>
                </View>
                <View className='z-20 absolute w-full h-full items-center justify-center bg-black opacity-30 rounded-xl'></View>
                <Image
                  className='w-full h-full rounded-xl object-cover'
                  source={{
                    uri: `${BASE_ROUTE_API}/public/img/property/${property?.id}/${property.url[0]}`,
                  }}
                />
              </View>
            ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}
