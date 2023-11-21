import Card from '../atoms/Card'
import { View, Image, Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { BASE_ROUTE_API } from '../../constants/api'

export default function ConversationCard({
  id,
  name,
  onPress,
}: {
  id: number
  name: string
  onPress?: (id: number) => Promise<void>
}): JSX.Element {
  console.log(`${BASE_ROUTE_API}/public/img/agent/${id}/avatar.png`)
  return (
    <TouchableOpacity onPress={async () => await onPress?.(id)}>
      <View className='w-full h-[75px] mb-3'>
        <Card>
          <View className='w-full h-full flex-row items-center'>
            <View className='w-1/6 h-full items-center justify-center mr-3'>
              <Image
                source={{
                  uri: `${BASE_ROUTE_API}/public/img/agent/${id}/avatar.png`,
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
