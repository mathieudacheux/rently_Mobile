import React from 'react'
import { Image } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { ROUTES } from './routes'
import { RouteProp, ParamListBase } from '@react-navigation/native'
import Profile from '../navigation/screens/Profile'
import Calendar from '../navigation/screens/Calendar/Calendar'
import Chat from '../navigation/screens/Chat'
import Home from '../navigation/screens/Home/Home'

export default function TabNavigator() {
  const Tab = createBottomTabNavigator()

  return (
    <Tab.Navigator
      initialRouteName={ROUTES.HOME}
      screenOptions={({ route }: { route: RouteProp<ParamListBase> }) => ({
        headerTitle: '',
        headerStyle: {
          backgroundColor: '#FBF9F9',
          height: 55,
        },
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#848484',
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: '#4A43EC',
        },

        tabBarIcon: ({ focused }: { focused: boolean }) => {
          let iconName
          let rn = route.name

          if (rn === ROUTES.HOME) {
            iconName = focused
              ? require('../../assets/Home.png')
              : require('../../assets/HomeOutlined.png')
          } else if (rn === ROUTES.CALENDAR) {
            iconName = focused
              ? require('../../assets/Calendar.png')
              : require('../../assets/CalendarOutlined.png')
          } else if (rn === ROUTES.CHAT) {
            iconName = focused
              ? require('../../assets/Chat.png')
              : require('../../assets/ChatOutlined.png')
          } else if (rn === ROUTES.PROFILE) {
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
      <Tab.Screen name={ROUTES.HOME} component={Home} />
      <Tab.Screen name={ROUTES.CALENDAR} component={Calendar} />
      <Tab.Screen name={ROUTES.PROPERTY} component={Home} />
      <Tab.Screen name={ROUTES.CHAT} component={Chat} />
      <Tab.Screen name={ROUTES.PROFILE} component={Profile} />
    </Tab.Navigator>
  )
}
