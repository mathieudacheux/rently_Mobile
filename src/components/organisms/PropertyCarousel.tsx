import { Text, View, Dimensions, Image } from 'react-native'
import Carousel from 'react-native-reanimated-carousel'
import { BASE_ROUTE_API } from '../../constants/api'
import LoadingSpinner from '../atoms/LoadingSpinner'

export default function PropertyCarousel({
  propertyData,
  onPress,
}: {
  propertyData: { id: number; name: string; url: string[] }[] | null
  onPress?: (id: number) => void
}): JSX.Element {
  if (!propertyData) return <LoadingSpinner />
  const width = Dimensions.get('window').width * (11 / 12)

  return (
    <View className='flex-1 shadow rounded-xl'>
      <Carousel
        loop
        width={width}
        height={width / 2}
        autoPlay={false}
        data={propertyData}
        scrollAnimationDuration={1000}
        renderItem={({ index }) => (
          <View className='w-full h-full items-center justify-center relative'>
            <View className='z-50 absolute w-full h-full items-center justify-center'>
              <Text
                className=' text-white text-2xl font-bold'
                onPress={() => onPress?.(propertyData[index]?.id)}
              >
                {propertyData[index]?.name}
              </Text>
            </View>
            <View className='z-20 absolute w-full h-full items-center justify-center bg-black opacity-30 rounded-xl'></View>
            <Image
              className='w-full h-full rounded-xl object-cover'
              source={{
                uri: `${BASE_ROUTE_API}/public/img/property/${propertyData[index]?.id}/${propertyData[index]?.url[0]}`,
              }}
            />
          </View>
        )}
      />
    </View>
  )
}
