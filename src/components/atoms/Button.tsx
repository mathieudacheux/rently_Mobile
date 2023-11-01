import { Pressable, Text } from 'react-native'

export default function Button({
  text,
  onPress = async () => {},
  onPressIn = () => {},
  isSubmitting = false,
}: {
  text: string
  onPress?: () => Promise<void>
  onPressIn?: () => void
  isSubmitting?: boolean
}): JSX.Element {
  return (
    <Pressable
      className={`w-[140px] px-[15px] py-[10px] rounded-[10px] justify-center items-center shadow
            ${isSubmitting ? 'bg-indigo-500' : 'bg-indigo-600'}
          `}
      onPress={onPress}
      disabled={isSubmitting}
      onPressIn={onPressIn}
    >
      <Text className="text-white text-lg font-semibold font-['SF Pro Text']">
        {text}
      </Text>
    </Pressable>
  )
}
