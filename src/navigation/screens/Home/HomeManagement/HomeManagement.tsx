import { View } from 'react-native'
import Card from '../../../../components/atoms/Card'

export default function HomeManagement(): JSX.Element {
  const 


  return (
    <View className='items-center'>
      <View className='w-full h-full mt-2 items-center'>
        <View className='w-11/12 h-full flex-row justify-between gap-y-2 flex-wrap'>
          <View className='w-[48%] h-1/5'>
            <Card />
          </View>
          <View className='w-[48%] h-1/5'>
            <Card />
          </View>
          <View className='w-[48%] h-1/5'>
            <Card />
          </View>
          <View className='w-[48%] h-1/5'>
            <Card />
          </View>
          <View className='w-full h-1/3 items-center justify-center'>
            <Card />
          </View>
        </View>
      </View>
    </View>
  )
}
