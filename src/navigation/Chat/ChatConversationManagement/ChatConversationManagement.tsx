import React, { useState, useEffect, useCallback } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import { useAppSelector } from '../../../store/store'
import { selectedUser, selectedUserToken } from '../../../features/userSlice'
import { ROUTE_API } from '../../../constants/api'
import axios from 'axios'
import { IMessage } from 'react-native-gifted-chat'
import { socket } from '../../../socket'
import { SafeAreaView, View } from 'react-native'
import { selectChatId } from '../../../features/chatSlice'
import StackBackButton from '../../../components/molecules/StackBackButton'

export default function ChatConversationManagement() {
  const userId = useAppSelector(selectedUser).user_id
  const selectedChat = useAppSelector(selectChatId)
  const token = useAppSelector(selectedUserToken)

  const [messages, setMessages] = useState<IMessage[]>([])

  useEffect(() => {
    function addToMessages(data: any) {
      setMessages((previousMessages: IMessage[]) => [
        ...previousMessages,
        {
          _id: Math.random(),
          text: data.message,
          createdAt: new Date(),
          user: {
            _id: data.sender,
            name: 'Me',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
      ])
    }

    socket.on('message', addToMessages)
    return () => {
      socket.off('message', addToMessages)
    }
  }, [])

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
        data.map((message: any) => {
          setMessages((previousMessages: IMessage[]) => [
            ...previousMessages,
            {
              _id: message.message_id,
              text: message.content,
              createdAt: new Date(message.created_at).setHours(
                new Date(message.created_at).getHours() + 1,
              ),
              user: {
                _id: message.sender_id,
                name: 'Me',
                avatar: 'https://placeimg.com/140/140/any',
              },
            },
          ])
        })
        const sortByDate = (a: any, b: any) => {
          return b.createdAt - a.createdAt
        }

        setMessages((previousMessages: IMessage[]) =>
          previousMessages.sort(sortByDate),
        )

        console.log('messages', messages)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getMessages()
  }, [token, selectedChat])

  const onSend = useCallback(({ messages }: { messages: IMessage[] }) => {
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
  }, [])

  return (
    <SafeAreaView className='flex-1'>
      <View className='items-center'>
        <View className='w-11/12'>
          <StackBackButton />
        </View>
      </View>
      <GiftedChat
        placeholder='Ecrivez votre message'
        messages={messages}
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
