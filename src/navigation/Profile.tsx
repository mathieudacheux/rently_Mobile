import React, { useState } from 'react'
import { View, Image, Text } from 'react-native'
import Button from '../components/atoms/Button'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useAppDispatch, useAppSelector } from '../store/store'
import {
  setSelectedUser,
  setSelectedUserToken,
  selectedUser,
} from '../features/userSlice'
import { BASE_ROUTE_API } from '../constants/api'

export default function Profile() {
  const dispatch = useAppDispatch()
  const user = useAppSelector(selectedUser)
  console.log('🚀 ~ Profile ~ user:', user)

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const selectedPhoto = `${BASE_ROUTE_API}/public/img/agent/${user.user_id}/avatar.png`

  return (
    <View className='border-lime-100 flex-1 justify-center items-center'>
      <Image
        className='w-[150px] h-[150px] rounded-full mb-2'
        source={{
          uri: selectedPhoto,
        }}
      />
      <Text className='text-xl font-bold mb-2'>
        {user.name} {user.firstname}
      </Text>
      <View className='w-8/12 flex flex-col'>
        <View className='w-full flex flex-col mb-2'>
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
            disabled
            text='Mon profil'
          />
        </View>
        <View className='w-full flex flex-col mb-2'>
          <Button
            onPress={async () => {
              setIsLoading(true)
              await dispatch(setSelectedUser({ selectedUser: null }))
              await dispatch(setSelectedUserToken({ selectedUserToken: null }))
              await AsyncStorage.removeItem('email')
              await AsyncStorage.removeItem('password')
              setIsLoading(false)
            }}
            disabled
            isSubmitting={isLoading}
            text='Mes documents'
          />
        </View>
        <View className='w-full flex flex-col mb-2'>
          <Button
            onPress={async () => {
              setIsLoading(true)
              await dispatch(setSelectedUser({ selectedUser: null }))
              await dispatch(setSelectedUserToken({ selectedUserToken: null }))
              await AsyncStorage.removeItem('email')
              await AsyncStorage.removeItem('password')
              setIsLoading(false)
            }}
            disabled
            isSubmitting={isLoading}
            text='Condidentialité et sécurité'
          />
        </View>
        <View className='w-full flex flex-col mb-2'>
          <Button
            onPress={async () => {
              setIsLoading(true)
              await dispatch(setSelectedUser({ selectedUser: null }))
              await dispatch(setSelectedUserToken({ selectedUserToken: null }))
              await AsyncStorage.removeItem('email')
              await AsyncStorage.removeItem('password')
              setIsLoading(false)
            }}
            disabled
            isSubmitting={isLoading}
            text='Accesibilité'
          />
        </View>
      </View>
      <View className='w-6/12'>
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
          isDeconnecting
          text='Se déconnecter'
        />
      </View>
    </View>
  )
}
