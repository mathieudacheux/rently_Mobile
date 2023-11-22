import React, { useEffect, useRef } from 'react'
import { Image, View } from 'react-native'
import { Animated } from 'react-native'

export default function Splash(): JSX.Element {
  const animView = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.timing(animView, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start()
  }, [animView])

  return (
    <Animated.View
      className='flex-1 justify-center items-center object-contain'
      style={{
        opacity: animView,
      }}
    >
      <Image
        source={require('../../assets/splash.png')}
        style={{
          width: '80%',
          height: 200,
          objectFit: 'contain',
        }}
      />
    </Animated.View>
  )
}
