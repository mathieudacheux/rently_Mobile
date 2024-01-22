import { MaterialIcons } from '@expo/vector-icons'
import axios from 'axios'
import React, { useCallback, useEffect, useState } from 'react'
import { SafeAreaView, Text, View } from 'react-native'
import {
  GiftedChat,
  IMessage,
  Send,
  SendProps,
  SystemMessage,
  SystemMessageProps,
} from 'react-native-gifted-chat'
import StackBackButton from '../../../components/molecules/StackBackButton'
import { BASE_ROUTE_API, ROUTE_API } from '../../../constants/api'
import { selectChatId, selectChatName } from '../../../features/chatSlice'
import { selectedUser, selectedUserToken } from '../../../features/userSlice'
import { socket } from '../../../socket'
import { useAppSelector } from '../../../store/store'

export default function ChatConversationManagement() {
  const userId = useAppSelector(selectedUser).user_id
  const selectedChat = useAppSelector(selectChatId)
  const selectedChatName = useAppSelector(selectChatName)
  const token = useAppSelector(selectedUserToken)

  const [messages, setMessages] = useState<IMessage[]>([])

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
            name: 'Me',
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
      console.log(error)
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
        console.log(error)
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
              avatar: 'https://placeimg.com/140/140/any',
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

  return (
    <SafeAreaView className='flex-1'>
      <View className='items-center'>
        <View className='w-11/12 relative d-flex items-center'>
          <View className='absolute left-0'>
            <StackBackButton />
          </View>
          {!!selectedChatName && (
            <Text className='text-2xl font-bold'>{selectedChatName}</Text>
          )}
        </View>
      </View>
      <GiftedChat
        placeholder='Ecrivez votre message'
        messages={messages}
        scrollToBottom
        infiniteScroll
        renderAvatarOnTop
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
    </SafeAreaView>
  )
}
