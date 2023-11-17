import React, { useState } from 'react'
import { View } from 'react-native'
import Button from '../components/atoms/Button'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useAppDispatch } from '../store/store'
import { setSelectedUser, setSelectedUserToken } from '../features/userSlice'

export default function Profile() {
  const dispatch = useAppDispatch()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  return (
    <View className='border-lime-100 flex-1 justify-center items-center'>
      <Button
        onPress={async () => {
          setIsLoading(true)
          await dispatch(setSelectedUser({ selectedUser: null }))
          await dispatch(setSelectedUserToken({ selectedUserToken: null }))
          await AsyncStorage.removeItem('email')
          await AsyncStorage.removeItem('password')
          setIsLoading(false)
        }}
        isSubmitting={isLoading}
        text='Déconnexion'
      />
    </View>
  )
}
