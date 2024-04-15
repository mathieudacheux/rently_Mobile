import { useField, useFormikContext } from 'formik'
import { KeyboardTypeOptions, Text, TextInput, View } from 'react-native'

export default function FormikField({
  name,
  placeholder,
  keyboardType = 'default',
  inputPassword = false,
  children,
  multiline = false,
  isSearch = false,
}: Readonly<{
  name: string
  placeholder: string
  keyboardType: KeyboardTypeOptions
  inputPassword?: boolean
  children?: React.ReactNode
  multiline?: boolean
  isSearch?: boolean
}>) {
  const formik = useFormikContext()
  const [field, meta] = useField(name)

  return (
    <View className={`w-11/12 ${meta.error || isSearch ? '' : 'mb-2'}`}>
      <View
        className={`${multiline ? 'h-[150px]' : 'h-[50px]'} px-[15px] ${
          multiline && 'py-[15px]'
        } bg-white rounded-[15px] shadow justify-center items-center flex-row mb-2`}
      >
        <TextInput
          className="grow shrink basis-0 self-stretch text-gray-800 text-opacity-50 text-md font-normal font-['SF Pro Text']"
          onChangeText={formik.handleChange(name)}
          value={field.value}
          keyboardAppearance='default'
          keyboardType={keyboardType}
          secureTextEntry={inputPassword}
          placeholder={placeholder}
          multiline={multiline}
          numberOfLines={multiline ? 5 : 1}
        />
        {children}
      </View>
      {meta.error ? (
        <Text className="w-11/12 text-red-400 text-sm font-['SF Pro Text'] mb-2">
          {meta.error}
        </Text>
      ) : null}
    </View>
  )
}
