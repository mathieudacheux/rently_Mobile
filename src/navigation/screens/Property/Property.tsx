import { Text } from 'react-native'
import { useAppSelector } from '../../../store/store'
import { selectedProperty } from '../../../features/propertySlice'

export default function Property(): JSX.Element {
  console.log(useAppSelector(selectedProperty))
  return <Text>Properties</Text>
}
