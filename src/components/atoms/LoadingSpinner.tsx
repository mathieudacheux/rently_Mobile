import { ActivityIndicator, StyleSheet, View } from 'react-native'

export default function LoadingSpinner() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size='large' color='#cbd5e1' />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
