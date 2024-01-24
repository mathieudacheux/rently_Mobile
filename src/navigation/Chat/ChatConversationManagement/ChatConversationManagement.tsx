import { MaterialIcons } from '@expo/vector-icons'
import axios from 'axios'
import * as Burnt from 'burnt'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import {
  Image,
  Linking,
  Modal,
  Pressable,
  SafeAreaView,
  Text,
  View,
} from 'react-native'
import {
  GiftedChat,
  IMessage,
  Send,
  SendProps,
  SystemMessage,
  SystemMessageProps,
} from 'react-native-gifted-chat'
import Button from '../../../components/atoms/Button'
import StackBackButton from '../../../components/molecules/StackBackButton'
import { BASE_ROUTE_API, ROUTE_API } from '../../../constants/api'
import { selectChatId, selectChatName } from '../../../features/chatSlice'
import { selectedUser, selectedUserToken } from '../../../features/userSlice'
import { socket } from '../../../socket'
import { useAppSelector } from '../../../store/store'

export default function ChatConversationManagement() {
  const userId = useAppSelector(selectedUser).user_id
  const selectedChat = useAppSelector(selectChatId)
  const selectedChatName = useAppSelector(selectChatName) ?? ''
  const token = useAppSelector(selectedUserToken)

  const [messages, setMessages] = useState<IMessage[]>([])
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [user, setUser] = useState<any>(null)
  const [userAppointments, setUserAppointments] = useState<any[]>([])

  const selectedPhoto = useMemo(() => {
    return `${BASE_ROUTE_API}/public/img/agent/${selectedChat}/avatar.png`
  }, [selectedChat])

  const isAvailable = useMemo(() => {
    if (new Date().getHours() < 8 || new Date().getHours() > 18) return false
    if (!userAppointments.length) return true

    const appointments = userAppointments
      .map((item: any) => item.appointments)
      .flat()
    const today = new Date(new Date().getTime() + 60 * 60 * 1000)
      .toISOString()
      .split('T')[0]
    const todayDate = new Date(new Date().getTime() + 60 * 60 * 1000)

    const todayAppointments = appointments.filter(
      (item: any) => item.date_start.split('T')[0] === today,
    )

    const isInAppointment = !todayAppointments.some((item: any) => {
      const dateStart = new Date(item.date_start)
      const dateEnd = new Date(item.date_end)
      return todayDate > dateStart && todayDate < dateEnd
    })

    return isInAppointment
  }, [userAppointments])

  const fetchUserData = async (id: number) => {
    try {
      const { data: userGet } = await axios.get(`${ROUTE_API.USER_BY_ID}${id}`)
      const { data: appointmentsGet } = await axios.get(
        `${ROUTE_API.APPOINTMENT_BY_ID}${id}`,
      )
      if (userGet) {
        setUser(userGet)
      }
      if (appointmentsGet) {
        setUserAppointments(appointmentsGet)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const renderSend = useCallback((props: SendProps<IMessage>) => {
    return (
      <Send
        {...props}
        containerStyle={{
          justifyContent: 'center',
          alignItems: 'center',
          paddingRight: 10,
        }}
      >
        <MaterialIcons size={25} color={'#4A43EC'} name={'send'} />
      </Send>
    )
  }, [])

  const renderSystemMessage = useCallback(
    (props: SystemMessageProps<IMessage>) => {
      return (
        <SystemMessage
          {...props}
          containerStyle={{
            marginBottom: 15,
          }}
          textStyle={{
            fontSize: 14,
          }}
        />
      )
    },
    [],
  )

  const getMessages = async () => {
    try {
      const { data } = await axios.get(
        `${ROUTE_API.GET_CHAT}?user_id_1=${userId}&user_id_2=${selectedChat}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      if (data) {
        const bufferArray = data.map((message: any) => ({
          _id: message.message_id,
          text: message.content,
          createdAt: new Date(message.created_at),
          user: {
            _id: message.sender_id,
            name:
              message.sender_id === Number(selectedChat)
                ? selectedChatName
                : 'Me',
            avatar: `${BASE_ROUTE_API}/public/img/agent/${message?.sender_id}/avatar.png`,
          },
        }))

        setMessages(bufferArray)

        const sortByDate = (a: any, b: any) => {
          return b.createdAt - a.createdAt
        }

        setMessages((previousMessages: IMessage[]) =>
          previousMessages.sort(sortByDate),
        )
      }
    } catch (error) {
      Burnt.toast({
        title: 'Serveur indisponible',
        preset: 'error',
      })
    }
  }

  const onSend = useCallback(
    ({ messages }: { messages: IMessage[] }) => {
      setMessages((previousMessages: any) =>
        GiftedChat.append(previousMessages, messages),
      )
      try {
        axios.post(
          ROUTE_API.POST_CHAT,
          {
            user_id_1: userId,
            user_id_2: selectedChat,
            sender_id: userId,
            content: messages[0].text,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
      } catch (error) {
        Burnt.toast({
          title: "Problème lors de l'envoi du message",
          preset: 'error',
        })
      }
    },
    [selectedChat, userId],
  )

  useEffect(() => {
    function addToMessages(data: any) {
      if (
        data.receiver === String(userId) &&
        data.sender === String(selectedChat)
      ) {
        setMessages((previousMessages: IMessage[]) => [
          {
            _id: Math.random(),
            text: data.message,
            createdAt: new Date(),
            user: {
              _id: data.sender,
              name:
                data.sender === Number(selectedChat) ? selectedChatName : 'Me',
              avatar: selectedPhoto,
            },
          },
          ...previousMessages,
        ])
      }
    }

    socket.on('message', addToMessages)
    return () => {
      socket.off('message', addToMessages)
    }
  }, [selectedChat, userId])

  useEffect(() => {
    getMessages()
  }, [token, selectedChat])

  useEffect(() => {
    fetchUserData(selectedChat ?? 0)
  }, [selectedChat])

  return (
    <SafeAreaView className='flex-1'>
      <View className='items-center'>
        <View className='w-11/12 relative d-flex items-center'>
          <View className='absolute left-0'>
            <StackBackButton />
          </View>
          {!!selectedChatName && (
            <View className='flex-row items-baseline'>
              <Pressable onPress={() => setOpenModal(true)}>
                <Text className='text-2xl font-bold mr-2'>
                  {selectedChatName}
                </Text>
              </Pressable>
              <MaterialIcons
                size={20}
                color={isAvailable ? 'green' : 'red'}
                name={isAvailable ? 'radio-button-on' : 'radio-button-off'}
              />
            </View>
          )}
        </View>
      </View>
      <GiftedChat
        placeholder='Ecrivez votre message'
        messages={messages}
        scrollToBottom
        infiniteScroll
        renderAvatarOnTop
        onPressAvatar={() => setOpenModal(true)}
        showUserAvatar={false}
        renderSend={renderSend}
        renderSystemMessage={renderSystemMessage}
        onSend={(messages) =>
          onSend({
            messages,
          })
        }
        user={{
          _id: userId,
        }}
      />
      <Modal
        animationType='slide'
        transparent
        visible={openModal}
        presentationStyle='overFullScreen'
        onRequestClose={() => setOpenModal(false)}
        className='bg-white relative'
      >
        <View className='absolute bottom-0 w-full bg-white rounded-t-2xl rounded-tr-2xl shadow-lg d-flex flex-col items-center justify-start p-6'>
          <Image
            className='w-[150px] h-[150px] rounded-full mb-2'
            source={{
              uri: selectedPhoto,
            }}
          />
          <View className='flex-row items-baseline mb-2'>
            <Text className='text-lg font-semibold flex items-center mr-2'>
              {isAvailable ? 'Disponible' : 'Non disponible'}
            </Text>
            <MaterialIcons
              size={20}
              color={isAvailable ? 'green' : 'red'}
              name={isAvailable ? 'radio-button-on' : 'radio-button-off'}
            />
          </View>
          {user?.mail && (
            <Pressable
              onPress={() => Linking.openURL(`tel:${user?.mail}`)}
              onPressIn={() => Linking.openURL(`tel:${user?.mail}`)}
              className='mb-2'
            >
              <Text className='text- font-medium'>{user?.mail}</Text>
            </Pressable>
          )}
          {user?.phone && (
            <Pressable
              onPress={() => {}}
              onPressIn={() => Linking.openURL(`tel:${user?.phone}`)}
              className='mb-2'
            >
              <Text className='text-lg font-semibold'>{user?.phone}</Text>
            </Pressable>
          )}

          <Button
            onPress={async () => {}}
            onPressIn={() => setOpenModal(false)}
            text='Fermer'
          />
        </View>
      </Modal>
    </SafeAreaView>
  )
}
