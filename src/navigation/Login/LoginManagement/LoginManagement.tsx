import { Image, SafeAreaView, View } from 'react-native'
import FormikMailField from '../../../components/molecules/FormikMailField'
import FormikPasswordField from '../../../components/molecules/FormikPasswordField'
import Button from '../../../components/atoms/Button'

export default function LoginManagement({
  handleSubmit,
  isSubmitting,
}: Readonly<{
  handleSubmit: () => Promise<void>
  isSubmitting: boolean
}>): JSX.Element {
  return (
    <SafeAreaView className='h-[100%] justify-center items-center'>
      <Image
        source={require('../../../../assets/splash.png')}
        style={{
          width: '40%',
          height: 100,
          objectFit: 'contain',
        }}
      />
      <FormikMailField />
      <FormikPasswordField />
      <View className='w-11/12 flex flex-col mb-2'>
        <Button
          text='Connexion'
          onPress={handleSubmit}
          onPressIn={() => {}}
          isSubmitting={isSubmitting}
        />
      </View>
    </SafeAreaView>
  )
}
