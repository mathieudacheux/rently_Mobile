import FormikField from '../atoms/FormikField'
import { View, Image } from 'react-native'

export default function FormikSearchField(): JSX.Element {
  return (
    <FormikField
      name='search'
      placeholder='Rechercher un bien'
      keyboardType='default'
      inputPassword={false}
    >
      <View className='absolute right-5'>
        <Image
          source={require('../../../assets/Search.png')}
          className='w-[22px] h-[22px]'
        />
      </View>
    </FormikField>
  )
}
