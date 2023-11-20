import { View, Image } from 'react-native'
import FormikInput from '../atoms/FormikField'

export default function FormikPasswordField(): JSX.Element {
  return (
    <FormikInput
      name='password'
      placeholder='Mot de passe'
      keyboardType='default'
      inputPassword={true}
    >
      <View className='absolute right-5'>
        <Image
          source={require('../../../assets/Password.png')}
          className='w-[20px] h-[20px]'
        />
      </View>
    </FormikInput>
  )
}
