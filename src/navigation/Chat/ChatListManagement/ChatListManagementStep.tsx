import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import { useFormikContext } from 'formik'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { ROUTE_API } from '../../../constants/api'
import {
  setSelectedChatId,
  setSelectedChatName,
} from '../../../features/chatSlice'
import { selectedUser } from '../../../features/userSlice'
import { ROUTES } from '../../../router/routes'
import { useAppDispatch, useAppSelector } from '../../../store/store'
import ChatListManagement from './ChatListManagement'

export default function ChatListManagementStep(): JSX.Element {
  const dispatch = useAppDispatch()
  const navigation = useNavigation()
  const { values } = useFormikContext<{ search: string }>()
  const user = useAppSelector(selectedUser)
  const userId = user?.user_id

  const [isUserFetching, setIsUserFetching] = useState<boolean>(false)
  const [usersList, setUsersList] = useState<{ id: number; name: string }[]>([])

  const filteredUsersList = useMemo(() => {
    if (values.search.length <= 2)
      return usersList.filter((user) => user.id !== userId)
    return usersList
      .filter((user) => user.id !== userId)
      .filter((user) =>
        user.name.toLowerCase().includes(values.search.toLowerCase()),
      )
  }, [values.search, usersList])

  const fetchUsersAgencyList = async () => {
    setIsUserFetching(true)
    try {
      const { data } = await axios.get(
        `${ROUTE_API.USERS}role=${user.role_id}&agency=${user.agency_id}`,
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
    async (id: number, name: string) => {
      await dispatch(setSelectedChatName({ selectedChatName: name }))
      await dispatch(setSelectedChatId({ selectedChatId: id }))
      navigation.navigate(ROUTES.CHAT_DETAILS as never)
    },
    [navigation],
  )

  useEffect(() => {
    if (!user) return
    fetchUsersAgencyList()
  }, [user])

  return (
    <ChatListManagement
      usersList={filteredUsersList}
      navigateToChat={navigateToChat}
      isLoading={isUserFetching}
    />
  )
}
