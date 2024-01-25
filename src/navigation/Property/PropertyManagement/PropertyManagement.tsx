import { useNavigation } from '@react-navigation/native'
import { useFormikContext } from 'formik'
import { useMemo, useRef } from 'react'
import {
  Animated,
  Image,
  Pressable,
  SafeAreaView,
  Text,
  View,
} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import FormikSearchField from '../../../components/molecules/FormikSearchField'
import { BASE_ROUTE_API } from '../../../constants/api'
import {
  FADE_IN_ANIMATION_CONFIG,
  FADE_OUT_ANIMATION_CONFIG,
  SIZE_IN_ANIMATION_CONFIG,
  SIZE_OUT_ANIMATION_CONFIG,
} from '../../../constants/constants'
import { ROUTES } from '../../../router/routes'

export default function PropertyManagement({
  propertyImages,
  onPress,
}: Readonly<{
  propertyImages: { id: number; name: string; url: string[] }[] | null
  onPress?: (id: number) => Promise<void>
}>): JSX.Element {
  const navigation = useNavigation()
  const { values } = useFormikContext<{ search: string }>()

  const propertyImagesFiltered = useMemo(() => {
    if (values.search.length <= 2) return propertyImages
    return propertyImages?.filter((property) =>
      property.name.includes(values.search),
    )
  }, [values.search, propertyImages])

  const opacityValue = useRef(new Animated.Value(1)).current

  const sizeValue = useRef(new Animated.Value(1)).current

  return (
    <SafeAreaView className='w-full h-full items-center'>
      <View className='relative w-full h-full items-center mt-2'>
        <FormikSearchField />
        <ScrollView className='w-11/12 h-[90%]'>
          {propertyImagesFiltered?.map((property) => (
            <View key={property?.id} className='w-full h-[175px] mb-2'>
              <View className='z-50 absolute w-full h-full items-center justify-center'>
                <Text
                  className=' text-white text-2xl font-bold'
                  onPress={async () => await onPress?.(property?.id)}
                >
                  {property?.name}
                </Text>
              </View>
              <View className='z-20 absolute w-full h-full items-center justify-center bg-black opacity-30 rounded-xl'></View>
              <Image
                className='w-full h-full rounded-xl object-cover'
                source={{
                  uri: `${BASE_ROUTE_API}/public/img/property/${property?.id}/${property?.url[0]}`,
                }}
              />
            </View>
          ))}
        </ScrollView>
        <View className='absolute bottom-7 -right-[30px]'>
          <Pressable
            onPressIn={() => {
              Animated.timing(opacityValue, FADE_IN_ANIMATION_CONFIG).start()
              Animated.timing(sizeValue, SIZE_IN_ANIMATION_CONFIG).start()
              setTimeout(() => {
                Animated.timing(opacityValue, FADE_OUT_ANIMATION_CONFIG).start()
                Animated.timing(sizeValue, SIZE_OUT_ANIMATION_CONFIG).start()
              }, 200)
            }}
            onPressOut={() => {
              navigation.navigate(ROUTES.ADD_PROPERTY as never)
            }}
          >
            <Animated.Image
              style={{
                height: 55,
                transform: [{ scale: sizeValue }],
                objectFit: 'contain',
                opacity: opacityValue,
              }}
              source={require('../../../../assets/Plus.png')}
            />
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  )
}
