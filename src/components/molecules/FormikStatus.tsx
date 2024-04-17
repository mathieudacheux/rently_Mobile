import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { ROUTE_API } from '../../constants/api'
import FormikSelect from '../atoms/FormikSelect'

export default function FormikStatus({
  name,
  label,
}: Readonly<{
  name: string
  label: string
}>) {
  const [options, setOptions] = useState<{ label: string; value: number }[]>([])

  useEffect(() => {
    axios
      .get(`${ROUTE_API.STATUSES}`)
      .then((res) => {
        const status = res.data.map((item: any) => ({
          label: `${item.name}`,
          value: item.status_id,
        }))
        setOptions(status)
      })
      .catch((err) => {
        setOptions([])
      })
  }, [])

  return <FormikSelect name={name} label={label} options={options} />
}
