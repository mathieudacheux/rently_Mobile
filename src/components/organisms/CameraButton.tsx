import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { Camera, CameraType } from 'expo-camera'

export default function CameraButton() {
  const [hasPermission, setHasPermission] = useState<boolean>(false)
  const [type, setType] = useState(CameraType.back)

  useEffect(() => {
    ;(async () => {
      const { status } = await Camera.requestCameraPermissionsAsync()
      setHasPermission(status === 'granted')
    })()
  }, [])

  if (hasPermission === null) {
    return <View />
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>
  }

  return (
    <Camera type={type} ratio='16:9' className='w-full h-full rounded'>
      <View>
        <TouchableOpacity
          onPress={() => {
            setType(
              type === CameraType.back ? CameraType.front : CameraType.back,
            )
          }}
        >
          <Text> Flip </Text>
        </TouchableOpacity>
      </View>
    </Camera>
  )
}
