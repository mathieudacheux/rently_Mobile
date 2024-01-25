import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { ROUTE_API } from '../../constants/api'
import FormikSelect from '../atoms/FormikSelect'

export default function FormikPropertyTypeSelect({
  name,
  label,
}: Readonly<{
  name: string
  label: string
}>) {
  const [options, setOptions] = useState<{ label: string; value: number }[]>([])

  useEffect(() => {
    axios
      .get(ROUTE_API.PROPERTY_TYPES)
      .then((res) => {
        console.log(res.data)
        const propertyTypes = res.data.map((propertyType: any) => ({
          label: propertyType.label,
          value: propertyType.property_type_id,
        }))
        setOptions(propertyTypes)
      })
      .catch((err) => {
        setOptions([])
      })
  }, [])

  return <FormikSelect name={name} label={label} options={options} />
}
