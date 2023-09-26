import React from 'react'
import { Image } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
// import Ionicons from 'react-native-vector-icons/Ionicons'
import Profile from './screens/Profile'
import Home from './screens/Home'
import Calendar from './screens/Calendar'
import Chat from './screens/Chat'

const homeName = 'Home'
const calendarName = 'Calendar'
const chatName = 'Chat'
const profileName = 'Profile'

const Tab = createBottomTabNavigator()

export default function Main() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={homeName}
        screenOptions={({ route }: { route: any }) => ({
          tabBarActiveTintColor: '#4A43EC',
          tabBarInactiveTintColor: '#848484',
          tabBarItemStyle: {
            height: 80,
            borderTopWidth: 1,
            borderTopColor: '#E5E5E5',
            backgroundColor: '#E5E5E5',
            paddingVertical: 10,
            paddingBottom: 25,
          },

          tabBarIcon: ({
            focused,
            color,
            size,
          }: {
            focused: boolean
            color: string
            size: number
          }) => {
            let iconName
            let rn = route.name

            if (rn === homeName) {
              iconName = focused ? 'home' : 'home-outline'
            } else if (rn === calendarName) {
              iconName = focused ? 'calendar' : 'calendar-outline'
            } else if (rn === chatName) {
              iconName = focused ? 'chatbubble' : 'chatbubble-outline'
            } else if (rn === profileName) {
              iconName = focused ? 'person' : 'person-outline'
            }

            return (
              <Image source={require('../assets/Home.png')} />
              // <Ionicons name={iconName as string} size={size} color={color} />
            )
          },
        })}
      >
        <Tab.Screen name={homeName} component={Home} />
        <Tab.Screen name={calendarName} component={Calendar} />
        <Tab.Screen name={chatName} component={Chat} />
        <Tab.Screen name={profileName} component={Profile} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}
