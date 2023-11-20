import React, { useMemo } from 'react'
import { View, Text } from 'react-native'
import { socket } from '../socket'
import Button from '../components/atoms/Button'

export default function Chat() {
  const isConnected = useMemo(() => socket.connected, [socket])

  return (
    <View className='border-lime-100 flex-1 justify-center items-center'>
      <Button
        onPress={async () => {
          socket.connect()
        }}
        onPressIn={() => {}}
        text='Connect'
      />
      <Text>{isConnected ? 'Connected' : 'Not Connected'}</Text>
      <Button
        onPress={async () => {
          socket.disconnect()
        }}
        text='Disconnect'
      />
    </View>
  )
}
