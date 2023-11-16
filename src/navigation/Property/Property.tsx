import { Text } from 'react-native'
import { useAppSelector } from '../../store/store'
import { selectProperty } from '../../features/propertySlice'

export default function Property(): JSX.Element {
  console.log(useAppSelector(selectProperty))
  return <Text>Properties</Text>
}
