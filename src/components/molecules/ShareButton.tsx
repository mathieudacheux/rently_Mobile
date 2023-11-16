import { Image, Pressable, Share } from 'react-native'

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
    <Pressable onPress={onShare} className='rotate-90'>
      <Image
        style={{ width: 30, height: 30 }}
        source={require('../../../assets/Back.png')}
      />
    </Pressable>
  )
}
