import { useCallback, useEffect, useState } from 'react'
import ChatListManagement from './ChatListManagement'
import axios from 'axios'
import { ROUTE_API } from '../../../constants/api'
import { useNavigation } from '@react-navigation/native'
import { useAppDispatch } from '../../../store/store'
import { useAppSelector } from '../../../store/store'
import { selectedUser } from '../../../features/userSlice'
import { ROUTES } from '../../../router/routes'
import { setSelectedChatId } from '../../../features/chatSlice'

export default function ChatListManagementStep(): JSX.Element {
  const dispatch = useAppDispatch()
  const navigation = useNavigation()
  const user = useAppSelector(selectedUser)

  const [isUserFetching, setIsUserFetching] = useState<boolean>(false)
  const [usersList, setUsersList] = useState<any[]>([])

  const fetchUsersAgencyList = async () => {
    setIsUserFetching(true)
    try {
      const { data } = await axios.get(
        `${ROUTE_API.USERS}?role=${user.role_id}&agency=${user.agency_id}`,
      )
      setUsersList([
        ...data.map((user: any) => {
          const fullname = () => {
            const firstname = user.firstname ? user.firstname : ''
            const lastname = user.name ? user.name : ''
            return `${firstname} ${lastname}`
          }

          return {
            id: user.user_id,
            name: fullname(),
          }
        }),
      ])
      setIsUserFetching(false)
    } catch (error) {
      console.log(error)
      setIsUserFetching(false)
    }
  }

  const navigateToChat = useCallback(
    async (id: number) => {
      dispatch(setSelectedChatId({ selectedChatId: id }))
      navigation.navigate(ROUTES.CHAT_DETAILS as never)
    },
    [navigation],
  )

  useEffect(() => {
    fetchUsersAgencyList()
  }, [])

  return (
    <ChatListManagement usersList={usersList} navigateToChat={navigateToChat} />
  )
}
