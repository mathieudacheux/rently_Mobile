import axios from 'axios'
import LoginManagement from './LoginManagement'
import useFormikValidator from '../../../../hooks/useFormikValidator'
import { useFormikContext } from 'formik'
import { LoginFormik } from '../types'
import { ROUTE_API } from '../../../../constants/api'
import { useNavigation, useRoute } from '@react-navigation/native'

export default function LoginManagementStep(): JSX.Element {
  const formikContext = useFormikContext<LoginFormik>()
  const formikValidator = useFormikValidator(formikContext)
  const navigation = useNavigation()
  const { values } = formikContext

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

  const getUserRole = async (
    payload: { mail: string },
    token: string,
  ): Promise<boolean> => {
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
      console.log(agentId)
      const isAgent =
        data?.find((user: any) => user.role_id === agentId).role_id === agentId

      return isAgent
    } catch (error) {
      return false
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
    const isValid = await formikValidator(values)

    if (!isValid) return

    const { mail, password } = values

    const payload = {
      mail,
      password,
    }

    const response = await authentification(payload)

    if (response.token) {
      const isAgent = await getUserRole(payload, response.token)
      if (isAgent) {
        console.log('isAgent')
        navigation.navigate('Main' as never)
      }
    }
  }

  return (
    <>
      <LoginManagement handleSubmit={handleSubmit} />
    </>
  )
}
