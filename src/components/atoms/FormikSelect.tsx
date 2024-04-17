import { useField } from 'formik'
import { View, Text } from 'react-native'
import RNPickerSelect from 'react-native-picker-select'

export default function FormikSelect({
  name,
  label,
  options,
}: Readonly<{
  name: string
  label: string
  options: { label: string; value: number | string }[]
}>) {
  const [, meta, helpers] = useField(name)

  return (
    <View className={`w-11/12 ${meta.error ? '' : 'mb-2'}`}>
      <View className='h-[50px] px-[15px] p-4 bg-white rounded-[15px] shadow justify-start items-center flex-row mb-2'>
        <RNPickerSelect
          placeholder={{ label, value: null }}
          onValueChange={(value) => helpers.setValue(value)}
          items={options}
        />
      </View>
      {meta.error ? (
        <Text className="w-11/12 text-red-400 text-sm font-['SF Pro Text'] mb-2">
          {meta.error}
        </Text>
      ) : null}
    </View>
  )
}
