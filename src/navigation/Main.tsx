import React from 'react'
import { Image } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
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
          headerShown: false,
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

          tabBarIcon: ({ focused }: { focused: boolean }) => {
            let iconName
            let rn = route.name

            if (rn === homeName) {
              iconName = focused
                ? require('../../assets/Home.png')
                : require('../../assets/HomeOutlined.png')
            } else if (rn === calendarName) {
              iconName = focused
                ? require('../../assets/Calendar.png')
                : require('../../assets/CalendarOutlined.png')
            } else if (rn === chatName) {
              iconName = focused
                ? require('../../assets/Chat.png')
                : require('../../assets/ChatOutlined.png')
            } else if (rn === profileName) {
              iconName = focused
                ? require('../../assets/Profile.png')
                : require('../../assets/ProfileOutlined.png')
            }

            return (
              <Image
                style={{ height: 25, objectFit: 'contain' }}
                source={iconName}
              />
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
