import React, { useEffect, useState } from 'react'
import { SafeAreaView, TextInput, Text, View, Pressable } from 'react-native'
import { FormikProvider } from 'formik'
import useLoginFormik from './hooks/useLoginFormik'

export default function Login(): JSX.Element {
  const { loginFormik } = useLoginFormik()
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  useEffect(() => {
    if (!loginFormik.isSubmitting) {
      setIsSubmitting(false)
    }
  }, [loginFormik.isSubmitting])

  return (
    <FormikProvider value={loginFormik}>
      <SafeAreaView className='h-[100%] justify-center items-center'>
        <Text className="w-full h-[50px] text-black text-center text-2xl font-bold font-['SF Pro Text'] justify-center">
          Connexion
        </Text>
        <Text className="w-11/12 text-black text-lg font-semibold font-['SF Pro Text'] mb-2">
          Addresse mail
        </Text>
        <View className='w-11/12 h-[50px] px-[15px] bg-white rounded-[15px] shadow justify-center items-center mb-2'>
          <TextInput
            className="grow shrink basis-0 self-stretch text-gray-800 text-opacity-50 text-md font-normal font-['SF Pro Text']"
            onChangeText={loginFormik.handleChange('mail')}
            value={loginFormik.values.mail}
            keyboardAppearance='default'
            keyboardType='email-address'
            inputMode='email'
            placeholder='Adresse mail'
          />
        </View>
        {loginFormik.errors.mail && (
          <Text className="w-11/12 text-red-400 text-sm font-['SF Pro Text']">
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
        </View>
        {loginFormik.errors.password && (
          <Text className="w-11/12 text-red-400 text-sm font-['SF Pro Text']">
            {loginFormik.errors.password}
          </Text>
        )}
        <Pressable
          className={`w-[140px] px-[15px] py-[7.5px] rounded-[10px] justify-center items-center shadow
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
