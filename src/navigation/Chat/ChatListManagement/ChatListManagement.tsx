import { SafeAreaView, View, Text, Image } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import FormikSearchField from '../../../components/molecules/FormikSearchField'
import Card from '../../../components/atoms/Card'
import ConversationCard from '../../../components/organisms/ConversationCard'

export default function ChatListManagement(): JSX.Element {
  return (
    <SafeAreaView className='w-full items-center'>
      <View className='w-full items-center mt-2'>
        <FormikSearchField title='Rechercher une conversation' />
        <ScrollView className='w-11/12'>
          <ConversationCard
            name='Jean Dupont'
            time='Hier'
            lastMessage='Bonjour, je suis intéressé par votre bien'
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}
