import { useField, useFormikContext } from 'formik'
import { KeyboardTypeOptions, Text, TextInput, View } from 'react-native'
import Autocomplete from 'react-native-autocomplete-input'

export default function FormikAutoCompleteField({
  name,
  placeholder,
  options,
  keyboardType = 'default',
}: Readonly<{
  name: string
  placeholder: string
  options: { label: string; value: string | number }[]
  keyboardType?: KeyboardTypeOptions
}>) {
  const formik = useFormikContext()
  const [field, meta] = useField(name)

  return (
    <View className={`w-11/12 ${meta.error ? '' : 'mb-2'}`}>
      <View className='h-[50px] px-[15px] bg-white rounded-[15px] shadow justify-center items-center flex-row mb-2'>
        <TextInput
          className="grow shrink basis-0 self-stretch text-gray-800 text-opacity-50 text-md font-normal font-['SF Pro Text']"
          onChangeText={formik.handleChange(name)}
          value={field.value}
          keyboardAppearance='default'
          keyboardType={keyboardType}
          placeholder={placeholder}
        />
      </View>
      <Autocomplete data={options} />
      {meta.error ? (
        <Text className="w-11/12 text-red-400 text-sm font-['SF Pro Text'] mb-2">
          {meta.error}
        </Text>
      ) : null}
    </View>
  )
}
