import { SafeAreaView, View, Image } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import FormikSearchField from '../../../components/molecules/FormikSearchField'
import ConversationCard from '../../../components/organisms/ConversationCard'
import LoadingSpinner from '../../../components/atoms/LoadingSpinner'

export default function ChatListManagement({
  usersList = [],
  navigateToChat,
  isLoading,
}: {
  usersList?: {
    id: number
    name: string
  }[]
  isLoading?: boolean
  navigateToChat?: (id: number) => Promise<void>
}): JSX.Element {
  return (
    <SafeAreaView className='w-full items-center'>
      <View className='w-full items-center mt-2'>
        <FormikSearchField title='Rechercher une conversation' />
        <ScrollView className='w-11/12 h-[90%]'>
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            usersList.map((user) => (
              <ConversationCard
                key={user.id}
                id={user.id}
                name={user.name}
                onPress={async () => await navigateToChat?.(user.id)}
              />
            ))
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}
