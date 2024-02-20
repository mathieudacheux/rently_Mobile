import { useField } from 'formik'
import { debounce } from 'lodash'
import React, { useMemo, useState } from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import Autocomplete from 'react-native-autocomplete-input'
import useAddressSearch from '../../hooks/useAddressSearch'

export default function FormikAddressField({
  name,
}: Readonly<{
  name: string
}>) {
  const [helpers, meta] = useField(name)
  const fieldName = (arg: string) => `address.${arg}`

  const [inputFields, setInputFields] = useState<string>('')
  const [isFocus, setIsFocus] = useState<boolean>(false)

  const [, , numberHelpers] = useField(fieldName('number'))
  const [, , postCodeHelpers] = useField(fieldName('post_code'))
  const [, , wayHelpers] = useField(fieldName('way'))
  const [, , cityHelpers] = useField(fieldName('city'))
  const [, , longitudeHelpers] = useField(fieldName('longitude'))
  const [, , latitudeHelpers] = useField(fieldName('latitude'))
  const [, fullAddressMeta, fullAddressHelpers] = useField(
    fieldName('full_address'),
  )

  const [options, searchForAddress] = useAddressSearch()

  const handlerSearchInputChange = (value: string) => {
    if (value.trim() && value.length > 2) {
      searchForAddress(value)
    }
  }

  const debounceHandlerSearchInput = useMemo(
    () => debounce(handlerSearchInputChange, 300),
    [],
  )

  const setFieldsValues = (value: any) => {
    if (value?.rowData?.properties && value?.rowData?.geometry) {
      const { properties, geometry } = value.rowData

      numberHelpers.setValue(properties.housenumber)
      postCodeHelpers.setValue(properties.postcode)
      wayHelpers.setValue(properties.street)
      cityHelpers.setValue(properties.city)
      longitudeHelpers.setValue(geometry.coordinates[0])
      latitudeHelpers.setValue(geometry.coordinates[1])
      fullAddressHelpers.setValue(properties.label)

      numberHelpers.setTouched(false)
      postCodeHelpers.setTouched(false)
      wayHelpers.setTouched(false)
      cityHelpers.setTouched(false)
      longitudeHelpers.setTouched(false)
      latitudeHelpers.setTouched(false)
      fullAddressHelpers.setTouched(false)
    }
  }

  return (
    <View className={`w-11/12 ${meta.error ? '' : 'mb-2'} z-50`}>
      <Autocomplete
        inputContainerStyle={{ borderWidth: 0 }}
        data={options}
        onChange={(value) => {
          setFieldsValues(value)
        }}
        hideResults={inputFields.length < 3 || !isFocus}
        renderTextInput={() => (
          <View className='h-[50px] px-[15px] bg-white rounded-[15px] shadow justify-center items-center flex-row mb-2'>
            <TextInput
              onFocus={() => {
                setIsFocus(true)
                setInputFields('')
              }}
              onChangeText={(value) => {
                setInputFields(value)
                debounceHandlerSearchInput(value)
              }}
              defaultValue={`${fullAddressMeta.value.split(/\d{5}/)[0] || ''}`}
              className="grow shrink basis-0 self-stretch text-gray-800 text-opacity-50 text-md font-normal font-['SF Pro Text']"
              keyboardAppearance='default'
              placeholder='Adresse'
              onBlur={() => setIsFocus(false)}
            />
          </View>
        )}
        renderResultList={(item: any) => (
          <View className='bg-white rounded-[15px] shadow'>
            {item?.data?.map((dataItem: any) => (
              <TouchableOpacity
                className='p-2'
                key={dataItem.rowData.properties.id}
                onPress={() => {
                  setIsFocus(false)
                  setInputFields(dataItem.label)
                  setFieldsValues(dataItem)
                }}
              >
                <Text>{dataItem.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      />
      {meta.error ? (
        <Text className="w-11/12 text-red-400 text-sm font-['SF Pro Text'] mb-2">
          {meta.error}
        </Text>
      ) : null}
    </View>
  )
}
