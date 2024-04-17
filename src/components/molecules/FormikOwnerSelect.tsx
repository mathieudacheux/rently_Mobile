import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { ROUTE_API } from '../../constants/api'
import { selectedUser } from '../../features/userSlice'
import { useAppSelector } from '../../store/store'
import FormikSelect from '../atoms/FormikSelect'

export default function FormikOwnerSelect({
  name,
  label,
}: Readonly<{
  name: string
  label: string
}>) {
  const user = useAppSelector(selectedUser)

  const [options, setOptions] = useState<{ label: string; value: number }[]>([])

  useEffect(() => {
    axios
      .get(`${ROUTE_API.USERS}role=6&agency=${user.agency_id}`)
      .then((res) => {
        const owners = res.data.map((owner: any) => ({
          label: `${owner.firstname} ${owner.name}`,
          value: owner.user_id,
        }))
        setOptions(owners)
      })
      .catch((err) => {
        setOptions([])
      })
  }, [])

  return <FormikSelect name={name} label={label} options={options} />
}
