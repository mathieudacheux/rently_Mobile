import React, { useState, useEffect } from 'react'
import { Text, View, TouchableOpacity, ImageBackground } from 'react-native'
import {
  Camera as CameraExpo,
  CameraCapturedPicture,
  CameraType,
} from 'expo-camera'

export default function Camera({
  photo,
  takePicture,
  deletePicture,
}: Readonly<{
  photo: CameraCapturedPicture[]
  takePicture: (camera: CameraExpo | null) => Promise<void>
  deletePicture: (uri: string) => void
}>) {
  let camera: CameraExpo | null = null
  const [hasPermission, setHasPermission] = useState<boolean>(false)

  useEffect(() => {
    ;(async () => {
      const { status } = await CameraExpo.requestCameraPermissionsAsync()
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
    <View className='flex flex-col w-full'>
      <CameraExpo
        type={CameraType.back}
        ratio='16:9'
        className='relative w-full h-[80%] rounded'
        focusable
        ref={(ref) => {
          camera = ref
        }}
      >
        <View className='absolute bottom-0 w-full flex-row justify-center items-center p-4'>
          <TouchableOpacity
            onPress={() => {
              takePicture(camera)
            }}
            className='rounded-full bg-white p-8 w-15 h-15'
          />
        </View>
      </CameraExpo>
      {photo && (
        <View className='flex-row items-start mt-4 h-[20%] overflow-x-auto scroll-auto'>
          {photo.map((p) => (
            <View className='rounded w-20 h-20 mr-2' key={p.uri}>
              <ImageBackground
                source={{ uri: p && p.uri }}
                className='w-full h-full'
              />
            </View>
          ))}
        </View>
      )}
    </View>
  )
}
