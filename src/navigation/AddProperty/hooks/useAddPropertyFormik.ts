import { useFormik } from 'formik'
import { useCallback } from 'react'
import * as yup from 'yup'
import { PropertyAddFormik } from '../types'

export default function useAddPropertyFormik() {
  const onSubmit = useCallback(async () => null, [])

  const initialValues: PropertyAddFormik = {
    name: '',
    description: '',
    signature_date: '',
    property_type: 0,
    price: 0,
    surface: '',
    land_size: '',
    bathroom: 0,
    kitchen: 0,
    toilet: 0,
    bedroom: 0,
    elevator: false,
    balcony: false,
    terrace: false,
    cellar: false,
    parking: false,
    number_room: 0,
    pool: false,
    caretaker: false,
    fiber_deployed: false,
    duplex: false,
    top_floor: false,
    garage: false,
    work_done: false,
    life_annuity: false,
    ground_floor: false,
    land_size_1: '',
    garden: false,
    draft: false,
    year_construction: 0,
    owner_id: 0,
    status_id: 0,
    tenant_id: 0,
    dpe: 0,
    agency_id: 0,
    agent_id: 0,
    agent_mail: '',
    address: {
      address: '',
      city: '',
      full_address: '',
      latitude: '',
      longitude: '',
      post_code: '',
    },
  }

  const validationSchema = yup.object().shape({
    search: yup.string(),
  })

  const addPropertyFormik = useFormik({
    initialValues,
    validateOnChange: false,
    validateOnBlur: true,
    validationSchema,
    onSubmit,
  })

  return {
    addPropertyFormik,
  }
}
