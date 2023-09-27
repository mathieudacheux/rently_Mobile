import React, { useEffect, useState } from 'react'
import {
  SafeAreaView,
  TextInput,
  Text,
  View,
  Pressable,
  Image,
} from 'react-native'
import { FormikProvider } from 'formik'
import useLoginFormik from './hooks/useLoginFormik'
import useFetch from '../../../hooks/useFetch'
import { useAppDispatch } from '../../../store/store'
import { setSelectedUser } from '../../../features/userSlice'

export default function Login(): JSX.Element {
  const dispatch = useAppDispatch()

  const { post, get } = useFetch()
  const { loginFormik } = useLoginFormik()

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [userToken, setUserToken] = useState<boolean>(false)

  const agentId = async () => {
    await get('https://back-rently.mathieudacheux.fr/roles')
      .then((data) => {
        return data?.find((role: any) => role.name === 'AGENT')?.id
      })
      .catch((error) => {
        return false
      })
  }

  const loginUser = async () => {
    const formIsValid = await loginFormik.validateForm()

    if (Object.keys(formIsValid).length !== 0) return false

    const payload = {
      mail: loginFormik.values.mail,
      password: loginFormik.values.password,
    }

    const auth: boolean = await post(
      'https://back-rently.mathieudacheux.fr/authentifications',
      payload,
    )
      .then((data) => {
        console.log(data)
        return true
      })
      .catch((error) => {
        return true
      })

    if (!auth) return false

    setUserToken(true)
    return true
  }

  const getUser = async () => {
    const payload = {
      mail: loginFormik.values.mail,
    }

    const result: boolean = await get(
      `https://back-rently.mathieudacheux.fr/users/users_filter?mail=${payload.mail}`,
    )
      .then(async (data) => {
        const userIsAgent = await get(
          'https://back-rently.mathieudacheux.fr/roles',
        )
          .then((data) => {
            return data.find((role: any) => role.name === 'AGENT')?.role_id
          })
          .catch((error) => {
            return false
          })

        if (data[0].role_id !== userIsAgent) return false
        dispatch(setSelectedUser(data))
        return true
      })
      .catch((error) => {
        console.log(error)
        return false
      })

    if (!result) return false
    setUserToken(false)
    return true
  }

  useEffect(() => {
    if (loginFormik.isSubmitting) {
      loginUser()
    }
    setIsSubmitting(false)
  }, [loginFormik.isSubmitting])

  useEffect(() => {
    if (!userToken) return
    getUser()
  }, [userToken])

  return (
    <FormikProvider value={loginFormik}>
      <SafeAreaView className='h-[100%] justify-center items-center'>
        <Image
          source={require('../../../../assets/splash.png')}
          style={{
            width: '40%',
            height: 100,
            objectFit: 'contain',
          }}
        />
        <Text className="w-11/12 text-black text-lg font-semibold font-['SF Pro Text'] mb-2">
          Addresse mail
        </Text>
        <View className='w-11/12 h-[50px] px-[15px] bg-white rounded-[15px] shadow justify-center items-center mb-2 relative'>
          <TextInput
            className="grow shrink basis-0 self-stretch text-gray-800 text-opacity-50 text-md font-normal font-['SF Pro Text']"
            onChangeText={loginFormik.handleChange('mail')}
            value={loginFormik.values.mail}
            keyboardAppearance='default'
            keyboardType='email-address'
            inputMode='email'
            placeholder='Adresse mail'
          />
          <View className='absolute right-5'>
            <Image
              source={require('../../../../assets/Message.png')}
              className='w-[22px] h-[20px]'
            />
          </View>
        </View>
        {loginFormik.errors.mail && (
          <Text className="w-11/12 text-red-400 text-sm font-['SF Pro Text'] mb-2">
            {loginFormik.errors.mail}
          </Text>
        )}
        <Text className="w-11/12 text-black text-lg font-semibold font-['SF Pro Text'] mb-2">
          Mot de passe
        </Text>
        <View className='w-11/12 h-[50px] px-[15px] bg-white rounded-[15px] shadow justify-center items-center mb-3'>
          <TextInput
            className="grow shrink basis-0 self-stretch text-gray-800 text-opacity-50 text-md font-normal font-['SF Pro Text']"
            onChangeText={loginFormik.handleChange('password')}
            value={loginFormik.values.password}
            keyboardAppearance='default'
            keyboardType='default'
            secureTextEntry={true}
            placeholder='Mot de passe'
          />
          <View className='absolute right-5'>
            <Image
              source={require('../../../../assets/Password.png')}
              className='w-[20px] h-[20px]'
            />
          </View>
        </View>
        {loginFormik.errors.password && (
          <Text className="w-11/12 text-red-400 text-sm font-['SF Pro Text'] mb-3">
            {loginFormik.errors.password}
          </Text>
        )}
        <Pressable
          className={`w-[140px] px-[15px] py-[10px] rounded-[10px] justify-center items-center shadow
            ${isSubmitting ? 'bg-indigo-500' : 'bg-indigo-600'}
          `}
          onPress={() => loginFormik.handleSubmit()}
          disabled={loginFormik.isSubmitting}
          onPressIn={() => {
            setIsSubmitting(true)
          }}
        >
          <Text className="text-white text-lg font-semibold font-['SF Pro Text']">
            Connexion
          </Text>
        </Pressable>
      </SafeAreaView>
    </FormikProvider>
  )
}
