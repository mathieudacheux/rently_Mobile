import { View, Image } from 'react-native'
import FormikInput from '../atoms/FormikField'

export default function FormikMailField(): JSX.Element {
  return (
    <FormikInput
      name='mail'
      placeholder='Adresse mail'
      keyboardType='email-address'
      inputPassword={false}
    >
      <View className='absolute right-5'>
        <Image
          source={require('../../../assets/Message.png')}
          className='w-[22px] h-[20px]'
        />
      </View>
    </FormikInput>
  )
}
