import { useFormik } from 'formik'
import { useCallback, useMemo } from 'react'
import * as yup from 'yup'
import { selectedUser } from '../../../features/userSlice'
import { useAppSelector } from '../../../store/store'
import { PropertyAddFormik } from '../types'

export default function useAddPropertyFormik() {
  const onSubmit = useCallback(async () => null, [])
  const user = useAppSelector(selectedUser)

  const initialValues: PropertyAddFormik = useMemo(() => {
    return {
      name: '',
      description: '',
      signature_date: '',
      property_type: null,
      price: null,
      surface: '',
      land_size: '',
      bathroom: null,
      kitchen: null,
      toilet: null,
      bedroom: null,
      elevator: false,
      balcony: false,
      terrace: false,
      cellar: false,
      parking: false,
      number_room: null,
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
      draft: true,
      year_construction: null,
      owner_id: null,
      status_id: null,
      tenant_id: null,
      dpe: null,
      agency_id: user?.agency_id || 0,
      agent_id: user?.id || 0,
      agent_mail: user?.mail || '',
      address: {
        address: '',
        city: '',
        full_address: '',
        latitude: '',
        longitude: '',
        post_code: '',
      },
    }
  }, [])

  const validationSchema = yup.object().shape({
    name: yup.string().required('Ce champ est requis'),
    owner_id: yup.string().required('Ce champ est requis'),
    description: yup
      .string()
      .min(10, 'Minimum 10 caractères')
      .required('Ce champ est requis'),
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
