import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import * as Burnt from 'burnt'
import * as LocalAuthentication from 'expo-local-authentication'
import { useFormikContext } from 'formik'
import { useEffect, useState } from 'react'
import { ROUTE_API } from '../../../constants/api'
import {
  setSelectedUser,
  setSelectedUserToken,
} from '../../../features/userSlice'
import useFormikValidator from '../../../hooks/useFormikValidator'
import { useAppDispatch } from '../../../store/store'
import { LoginFormik } from '../types'
import LoginManagement from './LoginManagement'

export default function LoginManagementStep(): JSX.Element {
  const dispatch = useAppDispatch()
  const formikContext = useFormikContext<LoginFormik>()
  const formikValidator = useFormikValidator(formikContext)
  const { values, setFieldValue, resetForm } = formikContext

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [firstConnection, setFirstConnection] = useState<boolean>(true)
  const [isBiometricSupported, setIsBiometricSupported] =
    useState<boolean>(false)

  const isBiometricCompatible = async () => {
    const compatible = await LocalAuthentication.hasHardwareAsync()
    setIsBiometricSupported(compatible)
  }

  useEffect(() => {
    isBiometricCompatible()
  }, [])

  const saveData = async ({
    mail,
    password,
    response,
    user,
  }: {
    mail: string
    password: string
    response: any
    user: any
  }) => {
    await AsyncStorage.setItem('email', mail)
    await AsyncStorage.setItem('password', password)
    await dispatch(setSelectedUserToken({ selectedUserToken: response.token }))
    await dispatch(setSelectedUser({ selectedUser: user }))
    resetForm()
  }

  const isBiometric = async () => {
    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Veuillez vous authentifier',
    })
    if (result.success) {
      return true
    }
    return false
  }

  const agentRoleId = async () => {
    try {
      const { data } = await axios.get(ROUTE_API.ROLE)
      const agentRoleId = data.find(
        (role: any) => role.name === 'AGENT',
      ).role_id
      return agentRoleId
    } catch (error) {
      Burnt.toast({
        title: 'Une erreur est survenue',
        preset: 'error',
      })
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
      Burnt.toast({
        title: "Vous n'avez pas les droits d'accès",
        preset: 'error',
      })
      return false
    }
  }

  const authentification = async (payload: {
    mail: string
    password: string
  }) => {
    console.log('payload', payload)
    try {
      const { data } = await axios.post(ROUTE_API.AUTH, payload)
      return data
    } catch (error) {
      Burnt.toast({
        title: 'Identifiants incorrects',
        preset: 'error',
      })
      return false
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
        if (isBiometricSupported) {
          setIsLoading(false)
          if (await isBiometric()) {
            saveData({ mail, password, response, user })
          } else {
            resetForm()
          }
        } else {
          setIsLoading(false)
          saveData({ mail, password, response, user })
        }
      }
    }
    setIsLoading(false)
  }

  const isConnectionSaved = async () => {
    const email = await AsyncStorage.getItem('email')
    const password = await AsyncStorage.getItem('password')
    if (email && password && firstConnection) {
      setFieldValue('mail', email)
      setFieldValue('password', password)
      setFirstConnection(false)
      await handleSubmit()
    }
  }

  useEffect(() => {
    isConnectionSaved()
  }, [values])

  return (
    <LoginManagement handleSubmit={handleSubmit} isSubmitting={isLoading} />
  )
}
