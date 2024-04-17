import { MaterialIcons } from '@expo/vector-icons'
import { Pressable, Share } from 'react-native'

export default function ShareButton({
  link,
  message,
}: {
  link: string
  message: string
}): JSX.Element {
  const onShare = async () => {
    await Share.share({
      message: message,
      url: link,
    })
  }

  return (
    <Pressable onPress={onShare} className='rotate-90 mr-2'>
      <MaterialIcons name='ios-share' size={24} color='' />
    </Pressable>
  )
}
