import Card from '../atoms/Card'
import { View, Image, Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

export default function ConversationCard({
  name,
  onPress,
}: {
  name: string
  onPress?: () => void
}): JSX.Element {
  return (
    <TouchableOpacity onPress={onPress}>
      <View className='w-full h-[75px] mb-3'>
        <Card>
          <View className='w-full h-full flex-row items-center'>
            <View className='w-1/6 h-full items-center justify-center mr-3'>
              <Image
                source={require('../../../assets/Placeholder.png')}
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
