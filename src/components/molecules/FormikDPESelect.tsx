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
    { label: 'DPE A', value: 1 },
    { label: 'DPE B', value: 2 },
    { label: 'DPE C', value: 3 },
    { label: 'DPE D', value: 4 },
    { label: 'DPE E', value: 5 },
    { label: 'DPE F', value: 6 },
    { label: 'DPE G', value: 7 },
  ]

  return <FormikSelect name={name} label={label} options={options} />
}
