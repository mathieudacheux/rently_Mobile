import { View, Pressable, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'

export default function StackBackButton(): JSX.Element {
  const navigation = useNavigation()

  return (
    <Pressable onPress={() => navigation.goBack()}>
      <Image
        style={{ width: 30, height: 30 }}
        source={require('../../../assets/Back.png')}
      />
    </Pressable>
  )
}
