import React from 'react'
import { SafeAreaView, TextInput, Button, Text, View } from 'react-native'
import { FormikProvider } from 'formik'
import useLoginFormik from './hooks/useLoginFormik'

export default function Login(): JSX.Element {
  const { loginFormik } = useLoginFormik()

  return (
    <FormikProvider value={loginFormik}>
      <SafeAreaView>
        <Text className="w-full text-black text-2xl font-bold font-['Manrope']">
          Connexion
        </Text>
        <Text className="w-full text-black text-lg font-semibold font-['Manrope']">
          Addresse mail
        </Text>
        <View className='className="w-11/12 h-[50px] px-[15px] bg-white rounded-[15px] shadow flex justify-center items-center inline-flex"'>
          <TextInput
            className="grow shrink basis-0 self-stretch text-gray-500 text-opacity-50 text-sm font-normal font-['SF Pro Text']"
            onChangeText={loginFormik.handleChange('mail')}
            value={loginFormik.values.mail}
            keyboardAppearance='default'
            keyboardType='email-address'
            inputMode='email'
            placeholder='Adresse mail'
          />
        </View>
        <Text className="w-full text-black text-lg font-semibold font-['Manrope']">
          Mot de passe
        </Text>
        <View className='className="w-11/12 h-[50px] px-[15px] bg-white rounded-[15px] shadow flex justify-center items-center inline-flex"'>
          <TextInput
            className="grow shrink basis-0 self-stretch text-gray-500 text-opacity-50 text-sm font-normal font-['SF Pro Text']"
            onChangeText={loginFormik.handleChange('password')}
            value={loginFormik.values.password}
            keyboardAppearance='default'
            keyboardType='default'
            secureTextEntry={true}
            placeholder='Mot de passe'
          />
        </View>
        <Button
          title='Connexion'
          onPress={() => loginFormik.handleSubmit()}
          disabled={loginFormik.isSubmitting}
        />
      </SafeAreaView>
    </FormikProvider>
  )
}
