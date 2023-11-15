import { View, Text } from 'react-native'
import Card from '../atoms/Card'
import LoadingSpinner from '../atoms/LoadingSpinner'

export default function BulletPointCard({
  text,
  numberOf,
  color,
  isLoading,
}: {
  text: string
  numberOf: number
  color?: 'red-600' | 'green-700' | 'blue-700' | 'yellow-400'
  isLoading?: boolean
}): JSX.Element {
  return (
    <View className='w-[48%] h-1/5 mb-3'>
      <Card>
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <>
            <Text className='text-xl text-center font-bold'>{text}</Text>
            <Text className={`text-xl text-center font-bold text-${color}`}>
              {numberOf}
            </Text>
          </>
        )}
      </Card>
    </View>
  )
}
