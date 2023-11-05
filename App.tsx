import React, { useState, useEffect } from 'react'
import { ImageBackground } from 'react-native'
import Splash from './src/navigation/screens/Splash'
import Login from './src/navigation/screens/Login/Login'
import { Provider } from 'react-redux'
import { store } from './src/store/store'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import Navigation from './src/navigation/Navigation'
import AddAppointment from './src/navigation/screens/AddAppointment/AddAppointment'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Stack = createStackNavigator()

export default function App() {
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false)
  const [splash, setSplash] = useState<boolean>(true)

  const handleSignOut = async () => {
    await AsyncStorage.removeItem('token')
    await AsyncStorage.removeItem('user')
    setIsSignedIn(false)
  }

  useEffect(() => {
    setTimeout(() => {
      setSplash(false)
    }, 1000)
  }, [])

  useEffect(() => {
    ;(async () => {
      const token = await AsyncStorage.getItem('token')
      const user = await AsyncStorage.getItem('user')
      if (token && user) {
        setIsSignedIn(true)
      }
    })()
  }, [AsyncStorage])

  if (splash) {
    return <Splash />
  }

  return (
    <Provider store={store}>
      <ImageBackground
        source={require('./assets/Background.png')}
        style={{
          width: '100%',
          height: '100%',
        }}
      >
        <NavigationContainer>
          <Stack.Navigator>
            {!isSignedIn ? (
              <Stack.Screen
                name='Login'
                component={Login}
                options={{ headerShown: false }}
              />
            ) : (
              <>
                <Stack.Screen
                  name='Main'
                  component={Navigation}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name='AddAppointment'
                  component={AddAppointment}
                  options={{ headerShown: false }}
                />
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </ImageBackground>
    </Provider>
  )
}
