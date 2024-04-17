import { useField } from 'formik'
import React from 'react'
import BouncyCheckbox from 'react-native-bouncy-checkbox'

export default function FormikCheckbox({
  name,
  label,
}: Readonly<{
  name: string
  label: string
}>) {
  const [, meta, helpers] = useField(name)

  return (
    <BouncyCheckbox
      size={30}
      fillColor='#4A43EC'
      unfillColor='#FFFFFF'
      innerIconStyle={{
        borderRadius: 5,
        borderWidth: 2,
      }}
      text={label}
      textStyle={{
        fontFamily: 'SF Pro Text',
        fontSize: 14,
        color: '#424242',
        textDecorationLine: 'none',
      }}
      iconStyle={{
        borderColor: '#4A43EC',
        borderRadius: 5,
        backgroundColor: meta.value ? '#4A43EC' : '#EEEEEE',
      }}
      onPress={(value: boolean) => {
        helpers.setValue(value)
        helpers.setTouched(true)
      }}
    />
  )
}
