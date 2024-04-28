import { Image, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { BASE_ROUTE_API } from '../../constants/api'
import Card from '../atoms/Card'
import { useState } from 'react'

export default function ConversationCard({
  id,
  name,
  onPress,
}: Readonly<{
  id: number
  name: string
  onPress?: (id: number) => Promise<void>
}>): JSX.Element {
  const [isImageError, setIsImageError] = useState<boolean>(false)

  const imageUri = isImageError
    ? `${BASE_ROUTE_API}/public/img/agent/none/avatar.png`
    : `${BASE_ROUTE_API}/public/img/agent/${id}/resized-avatar.png`

  return (
    <TouchableOpacity onPress={async () => await onPress?.(id)}>
      <View className='w-full h-[75px] mb-3'>
        <Card>
          <View className='w-full h-full flex-row items-center'>
            <View className='w-1/6 h-full items-center justify-center mr-3'>
              <Image
                source={{
                  uri: imageUri,
                }}
                onError={() => {
                  setIsImageError(true)
                }}
                className='w-[50px] h-[50px] rounded-full'
              />
            </View>
            <Text className='text-md font-bold'>{name}</Text>
          </View>
        </Card>
      </View>
    </TouchableOpacity>
  )
}
