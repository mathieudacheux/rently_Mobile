import React, { useState, useEffect } from 'react'
import { ImageBackground } from 'react-native'
import Splash from './src/navigation/screens/Splash'
import Login from './src/navigation/screens/Login/Login'
import { Provider } from 'react-redux'
import { store } from './src/store/store'

export default function App() {
  const [splash, setSplash] = useState<boolean>(true)

  useEffect(() => {
    setTimeout(() => {
      setSplash(false)
    }, 1000)
  }, [])

  return (
    <Provider store={store}>
      <ImageBackground
        source={require('./assets/Background.png')}
        style={{
          width: '100%',
          height: '100%',
        }}
      >
        {splash ? <Splash /> : <Login />}
      </ImageBackground>
    </Provider>
  )
}
