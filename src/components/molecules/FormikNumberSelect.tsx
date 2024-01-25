import React from 'react'
import FormikSelect from '../atoms/FormikSelect'

export default function FormikNumberSelect({
  name,
  label,
}: Readonly<{
  name: string
  label: string
}>) {
  const options = Array.from({ length: 15 }, (_, i) => ({
    label: `${i + 1} ${label}`,
    value: i + 1,
  }))

  return <FormikSelect name={name} label={label} options={options} />
}
