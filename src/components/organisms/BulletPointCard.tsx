import { View, Text } from 'react-native'
import Card from '../atoms/Card'

export default function BulletPointCard({
  text,
  numberOf,
  isLoading,
}: {
  text: string
  numberOf: number
  isLoading?: boolean
}): JSX.Element {
  return (
    <View className='w-[48%] h-1/5 mb-3'>
      <Card>
        {isLoading && <Text>Chargement...</Text>}
        <Text className='text-xl text-center font-bold'>{text}</Text>
        <Text className='text-xl text-center font-bold'>{numberOf}</Text>
      </Card>
    </View>
  )
}
