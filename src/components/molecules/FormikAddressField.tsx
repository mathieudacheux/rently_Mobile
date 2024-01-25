import { useField } from 'formik'
import React, { useEffect, useState } from 'react'
import FormikAutoCompleteField from '../atoms/FormikAutocompleteField'

export default function FormikAddressField({
  name,
  placeholder,
}: Readonly<{
  name: string
  placeholder: string
}>) {
  const [field] = useField(name)

  const [options, setOptions] = useState([])
  console.log(options)

  const fetchAddress = async (query: string) => {
    const response = await fetch(
      `https://api-adresse.data.gouv.fr/search/?q=${field.value}&type=housenumber&autocomplete=1`,
    )
    const data = await response.json()
    return data.features
  }

  useEffect(() => {
    fetchAddress(field.value).then((data) => {
      setOptions(
        data.map((address: any) => ({
          label: address.properties.label,
          value: address.properties.label,
        })),
      )
    })
  }, [field.value])

  return (
    <FormikAutoCompleteField
      name={name}
      placeholder={placeholder}
      options={options}
    />
  )
}
