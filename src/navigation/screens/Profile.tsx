import React from 'react'
import { View } from 'react-native'
import Button from '../../components/atoms/Button'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'

export default function Profile() {
  const navigation = useNavigation()

  return (
    <View className='border-lime-100 flex-1 justify-center items-center'>
      <Button
        onPress={async () => {
          await AsyncStorage.removeItem('token')
          await AsyncStorage.removeItem('user')
        }}
        text='Déconnexion'
      />
    </View>
  )
}
