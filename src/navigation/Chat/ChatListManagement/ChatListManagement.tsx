import { SafeAreaView, View } from 'react-native'
import { RefreshControl, ScrollView } from 'react-native-gesture-handler'
import LoadingSpinner from '../../../components/atoms/LoadingSpinner'
import FormikSearchField from '../../../components/molecules/FormikSearchField'
import ConversationCard from '../../../components/organisms/ConversationCard'

export default function ChatListManagement({
  usersList = [],
  navigateToChat,
  isLoading,
  refreshing,
  setRefreshing,
}: Readonly<{
  usersList?: {
    id: number
    name: string
  }[]
  isLoading?: boolean
  navigateToChat?: (id: number, name: string) => Promise<void>
  refreshing: boolean
  setRefreshing: (value: boolean) => void
}>): JSX.Element {
  return (
    <SafeAreaView className='w-full items-center'>
      <View className='w-full items-center mt-2'>
        <FormikSearchField title='Rechercher une conversation' />
        <ScrollView
          className='w-11/12 h-[90%]'
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => setRefreshing(true)}
            />
          }
        >
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            usersList.map((user) => (
              <ConversationCard
                key={user.id}
                id={user.id}
                name={user.name}
                onPress={async () =>
                  await navigateToChat?.(user.id, user?.name)
                }
              />
            ))
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}
