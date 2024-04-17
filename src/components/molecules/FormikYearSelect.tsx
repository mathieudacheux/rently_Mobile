import React from 'react'
import FormikSelect from '../atoms/FormikSelect'

export default function FormikYearSelect({
  name,
  label,
}: Readonly<{
  name: string
  label: string
}>) {
  const years = []
  for (let i = 0; i < 100; i++) {
    years.push({
      label: `Construit en ${new Date().getFullYear() - i} `,
      value: `${new Date().getFullYear() - i}`,
    })
  }
  return <FormikSelect name={name} label={label} options={years} />
}
