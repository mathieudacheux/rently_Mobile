import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { ParamListBase, RouteProp } from '@react-navigation/native'
import * as Burnt from 'burnt'
import React, { useEffect, useState } from 'react'
import { Image } from 'react-native'
import { selectedUser } from '../features/userSlice'
import Calendar from '../navigation/Calendar/Calendar'
import Chat from '../navigation/Chat/Chat'
import Home from '../navigation/Home/Home'
import Profile from '../navigation/Profile'
import Property from '../navigation/Property/Property'
import { socket } from '../socket'
import { useAppSelector } from '../store/store'
import { ROUTES } from './routes'

export default function TabNavigator() {
  const Tab = createBottomTabNavigator()
  const user = useAppSelector(selectedUser)

  const [whichTab, setWhichTab] = useState<string>(ROUTES.HOME)

  useEffect(() => {
    function notify(data: any) {
      if (!user) return
      if (whichTab === ROUTES.CHAT) return
      if (data.receiver !== String(user.user_id)) return
      if (data.sender === String(user.user_id)) return

      Burnt.toast({
        title: 'Nouveau message',
        preset: 'done',
      })
    }

    socket.on('message', notify)
    return () => {
      socket.off('message', notify)
    }
  }, [user, whichTab])

  return (
    <Tab.Navigator
      initialRouteName={ROUTES.HOME}
      screenListeners={{
        focus: (item) => {
          setWhichTab(item.target?.split('-')[0] ?? '')
        },
      }}
      screenOptions={({ route }: { route: RouteProp<ParamListBase> }) => ({
        headerTitle: '',
        headerStyle: {
          height: 55,
          backgroundColor: '#fff',
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
          } else if (rn === ROUTES.PROPERTY) {
            iconName = focused
              ? require('../../assets/Home.png')
              : require('../../assets/HomeOutlined.png')
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
      <Tab.Screen name={ROUTES.PROPERTY} component={Property} />
      <Tab.Screen name={ROUTES.CHAT} component={Chat} />
      <Tab.Screen name={ROUTES.PROFILE} component={Profile} />
    </Tab.Navigator>
  )
}
