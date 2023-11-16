import React, { useState } from 'react'
import { View } from 'react-native'
import Button from '../components/atoms/Button'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'

export default function Profile() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const navigation = useNavigation()

  return (
    <View className='border-lime-100 flex-1 justify-center items-center'>
      <Button
        onPress={async () => {
          setIsLoading(true)
          await AsyncStorage.removeItem('token')
          await AsyncStorage.removeItem('user')
          navigation.navigate('Login' as never)
          setIsLoading(false)
        }}
        isSubmitting={isLoading}
        text='Déconnexion'
      />
    </View>
  )
}
