import React from 'react'
import FormikSelect from '../atoms/FormikSelect'

export default function FormikDPESelect({
  name,
  label,
}: Readonly<{
  name: string
  label: string
}>) {
  const options = [
    { label: 'A', value: 1 },
    { label: 'B', value: 2 },
    { label: 'C', value: 3 },
    { label: 'D', value: 4 },
    { label: 'E', value: 5 },
    { label: 'F', value: 6 },
    { label: 'G', value: 7 },
  ]

  return <FormikSelect name={name} label={label} options={options} />
}
