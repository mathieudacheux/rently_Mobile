import { View } from 'react-native'
import { StyleSheet, Text } from 'react-native'

export default function CalendarCard({
  label,
  date,
  comment,
}: {
  label: string
  date: string
  comment: string
}) {
  const getColor = (label: string) => {
    switch (label) {
      case 'Visite':
        return '#4A43EC'
      case 'Réunion':
        return '#FEBB2E'
      case 'État des lieux':
        return '#FF6C6C'
      default:
        return 'black'
    }
  }

  const convertedDate = new Date(Date.parse(date))

  return (
    <View style={styles.card} className='shadow-md'>
      <View style={styles.cardComponent}>
        <Text
          style={{
            ...styles.label,
            color: getColor(label),
          }}
        >
          {label}
        </Text>
        <Text> - </Text>
        <Text
          style={styles.date}
        >{`${convertedDate.toLocaleDateString()} à ${convertedDate.toLocaleTimeString()}`}</Text>
      </View>
      <View style={styles.cardComponent}>
        <Text style={styles.details}>{comment}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    width: '90%',
    minHeight: 85,
    backgroundColor: 'white',
    borderRadius: 20,
    marginTop: 20,
    padding: 20,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  cardComponent: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  date: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  details: {
    fontSize: 14,
    color: 'gray',
  },
})
