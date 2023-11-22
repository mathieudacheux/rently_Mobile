import { View, Dimensions, Image } from 'react-native'
import Carousel from 'react-native-reanimated-carousel'
import { BASE_ROUTE_API } from '../../constants/api'
import LoadingSpinner from '../atoms/LoadingSpinner'

export default function PropertyDetailCarousel({
  id,
  imagesArray,
}: {
  id: number
  imagesArray: string[] | null
}): JSX.Element {
  if (!imagesArray) return <LoadingSpinner />
  const width = Dimensions.get('window').width * (11 / 12)

  return (
    <View className='shadow rounded-xl w-full mb-2'>
      <Carousel
        loop
        width={width}
        height={width / 2}
        autoPlay={false}
        data={imagesArray}
        scrollAnimationDuration={1000}
        renderItem={({ index }) => (
          <View className='w-full h-full items-center justify-center relative'>
            <Image
              className='w-full h-full rounded-xl object-cover'
              source={{
                uri: `${BASE_ROUTE_API}/public/img/property/${id}/${imagesArray[index]}`,
              }}
            />
          </View>
        )}
      />
    </View>
  )
}
