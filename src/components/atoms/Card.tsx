import { View, Text } from 'react-native'

export default function Card({
  children,
}: {
  children: React.ReactNode
}): JSX.Element {
  return (
    <View className='w-full h-full rounded-lg bg-blue-500'>{children}</View>
  )
}
