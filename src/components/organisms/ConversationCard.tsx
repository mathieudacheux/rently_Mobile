import Card from '../atoms/Card'
import { View, Image, Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

export default function ConversationCard({
  name,
  time,
  lastMessage,
  onPress,
}: {
  name: string
  time: string
  lastMessage: string
  onPress?: () => void
}): JSX.Element {
  return (
    <TouchableOpacity onPress={onPress}>
      <View className='w-full h-[75px] mb-3'>
        <Card>
          <View className='w-full h-full flex-row'>
            <View className='w-1/6 h-full items-center justify-center'>
              <Image
                source={require('../../../assets/Placeholder.png')}
                className='w-[50px] h-[50px] rounded-full'
              />
            </View>
            <View className='w-5/6 flex-col justify-around pl-2'>
              <View className='w-full h-2/5 flex-row justify-between'>
                <Text className='text-md font-bold'>{name}</Text>
                <Text className='text-md'>{time}</Text>
              </View>
              <Text className='w-full h-2/5 text-md'>{lastMessage}</Text>
            </View>
          </View>
        </Card>
      </View>
    </TouchableOpacity>
  )
}
