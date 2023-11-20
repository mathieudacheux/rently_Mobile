import { View, Text } from 'react-native'

export default function Card({
  children,
}: {
  children?: React.ReactNode
}): JSX.Element {
  return (
    <View className='w-full h-full rounded-xl bg-white shadow p-3 items-center justify-around'>
      {children}
    </View>
  )
}
