import { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { ROUTES } from './routes'
import { useAppSelector } from '../store/store'
import { selectedUser } from '../features/userSlice'
import Login from '../navigation/Login/Login'
import Splash from '../navigation/Splash'
import TabNavigator from './TabNavigator'

export default function Router(): JSX.Element {
  const Stack = createNativeStackNavigator()
  const user = useAppSelector(selectedUser)

  const [isSplash, setIsSplash] = useState<boolean>(true)
  const [isLogin, setIsLogin] = useState<boolean>(false)

  setTimeout(() => {
    setIsSplash(false)
  }, 1500)

  useEffect(() => {
    if (user) {
      setIsLogin(true)
    }
  }, [user])

  if (isSplash) {
    return <Splash />
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!isLogin ? (
          <Stack.Screen
            name={ROUTES.LOGIN}
            component={Login}
            options={{
              headerShown: false,
            }}
          />
        ) : (
          <Stack.Screen
            name='Main'
            component={TabNavigator}
            options={{
              headerShown: false,
            }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}
