import { useState } from 'react'
import axios from 'axios'
import LoginManagement from './LoginManagement'
import useFormikValidator from '../../../../hooks/useFormikValidator'
import { useFormikContext } from 'formik'
import { LoginFormik } from '../types'
import { ROUTE_API } from '../../../../constants/api'
import { useNavigation } from '@react-navigation/native'

export default function LoginManagementStep(): JSX.Element {
  const formikContext = useFormikContext<LoginFormik>()
  const formikValidator = useFormikValidator(formikContext)
  // const navigation = useNavigation()
  const { values } = formikContext

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const agentRoleId = async () => {
    try {
      const { data } = await axios.get(ROUTE_API.ROLE)
      const agentRoleId = data.find(
        (role: any) => role.name === 'AGENT',
      ).role_id
      return agentRoleId
    } catch (error) {
      return "Ce rôle n'existe pas"
    }
  }

  const getUserRole = async (payload: { mail: string }, token: string) => {
    try {
      const { data } = await axios.get(
        `${ROUTE_API.USER_BY_MAIL}${payload.mail}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      const agentId = await agentRoleId()
      const isAgent = data?.find((user: any) => user.role_id === agentId)
      return isAgent
    } catch (error) {
      return "Ce compte n'existe pas"
    }
  }

  const authentification = async (payload: {
    mail: string
    password: string
  }) => {
    try {
      const { data } = await axios.post(ROUTE_API.AUTH, payload)
      return data
    } catch (error) {
      return "Ce compte n'existe pas"
    }
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    const isValid = await formikValidator(values)

    if (!isValid) {
      setIsLoading(false)
      return
    }

    const { mail, password } = values

    const payload = {
      mail,
      password,
    }

    const response = await authentification(payload)

    if (response.token) {
      const user = await getUserRole(payload, response.token)
      if (typeof user !== 'string') {
        setIsLoading(false)
      }
    } else {
      setIsLoading(false)
    }
  }

  return (
    <LoginManagement handleSubmit={handleSubmit} isSubmitting={isLoading} />
  )
}
