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
  Switch,
} from 'react-native'
import { RefreshControl, ScrollView } from 'react-native-gesture-handler'
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
  onPress,
  switchValue,
  handleSwitch,
  propertyImages,
  refreshing,
  setRefreshing,
}: Readonly<{
  onPress: (id: number) => Promise<void>
  switchValue: boolean
  propertyImages: { id: number; name: string; url: string[] }[] | null
  handleSwitch: (value: boolean) => void
  refreshing: boolean
  setRefreshing: (value: boolean) => void
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

  const imageUri = (id: number, url: string) => {
    return `${BASE_ROUTE_API}/public/img/property/${id}/${url}`
  }

  return (
    <SafeAreaView className='w-full h-full items-center'>
      <View className='relative w-full h-full items-center mt-2'>
        <FormikSearchField isSearch />
        <View className='w-11/12 flex-row justify-center mb-2'>
          <Text className='text-lg font-bold mr-2'>En ligne</Text>
          <Switch
            trackColor={{ false: 'red', true: 'green' }}
            thumbColor='blue'
            value={switchValue}
            onValueChange={async () => {
              handleSwitch(!switchValue)
            }}
          />
          <Text className='text-lg font-bold ml-2'>En brouillon</Text>
        </View>
        <ScrollView
          className='w-11/12 h-[90%]'
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => setRefreshing(true)}
            />
          }
        >
          {propertyImagesFiltered?.map((property) => (
            <View
              key={`${property?.id}-${property?.name}`}
              className='w-full h-[175px] mb-2'
            >
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
                  uri: imageUri(property?.id, property?.url[0]),
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
