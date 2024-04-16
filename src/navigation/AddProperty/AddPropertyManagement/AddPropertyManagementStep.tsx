import React, { useState } from 'react'
import axios from 'axios'
import * as Burnt from 'burnt'
import { useFormikContext } from 'formik'
import { BASE_ROUTE_API, ROUTE_API } from '../../../constants/api'
import { selectedUserToken } from '../../../features/userSlice'
import useFormikValidator from '../../../hooks/useFormikValidator'
import { useAppSelector } from '../../../store/store'
import { PropertyAddFormik } from '../types'
import AddPropertyManagement from './AddPropertyManagement'
import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system'
import { useNavigation } from '@react-navigation/native'

export default function AddPropertyManagementStep() {
  const navigation = useNavigation()
  const token = useAppSelector(selectedUserToken)
  const formikContext = useFormikContext<PropertyAddFormik>()
  const { values, resetForm } = formikContext
  const formikValidator = useFormikValidator(formikContext)

  const [photo, setPhoto] = useState<ImagePicker.ImagePickerAsset[] | null>(
    null,
  )

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      quality: 1,
      allowsMultipleSelection: true,
    })

    if (!result.canceled) {
      setPhoto(result.assets)
    }
  }

  const save = async () => {
    const isValid = await formikValidator(values)

    if (!isValid) return

    const addressResponse = await axios
      .post(
        ROUTE_API.POST_ADDRESS,
        {
          address: values.address.full_address.split(/\d{5}/)[0],
          city: values.address.city,
          zipcode: values.address.post_code,
          additionnal_info: '',
          longitude: values.address.longitude,
          latitude: values.address.latitude,
        },
        { headers: { Authorization: `Bearer ${token}` } },
      )
      .then((res) => res.data)
      .catch((err) => {
        Burnt.toast({
          title: 'Une erreur est survenue',
          preset: 'error',
        })
      })

    const property = await axios
      .post(
        ROUTE_API.PROPERTY,
        {
          name: values.name,
          description: values.description,
          price: Number(values.price),
          surface: values.surface,
          land_size: values.land_size ?? '12',
          bathroom: Number(values.bathroom),
          kitchen: Number(values.kitchen),
          toilet: Number(values.toilet),
          bedroom: Number(values.bedroom),
          elevator: values.elevator || false,
          balcony: values.balcony || false,
          terrace: values.terrace || false,
          cellar: values.cellar || false,
          parking: values.parking || false,
          number_room: Number(values.number_room),
          pool: values.pool || false,
          caretaker: values.caretaker || false,
          fiber_deployed: values.fiber_deployed || false,
          duplex: values.duplex || false,
          top_floor: values.top_floor || false,
          garage: values.garage || false,
          work_done: values.work_done || false,
          life_annuity: values.life_annuity || false,
          ground_floor: values.ground_floor || false,
          land_size_1: values.land_size_1 || '12',
          garden: values.garden || false,
          updated_at: new Date(),
          dpe: Number(values.dpe),
          year_construction: values.year_construction,
          property_type: Number(values.property_type),
          owner_id: values.owner_id,
          address_id: addressResponse.address_id,
          agent_id: values.agent_id,
          status_id: values.status_id,
          agency_id: values.agency_id,
          draft: true,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then((res) => {
        Burnt.toast({
          title: 'Propriété ajoutée',
          preset: 'done',
        })
        return res.data
      })
      .catch((err) => {
        Burnt.toast({
          title: 'Une erreur est survenue',
          preset: 'error',
        })
      })

    if (photo) {
      const array: Array<boolean> = []
      photo.forEach(async (o) => {
        const response = await FileSystem.uploadAsync(
          `${BASE_ROUTE_API}/file/img/property/${property.property_id}`,
          o.uri,
          {
            uploadType: FileSystem.FileSystemUploadType.MULTIPART,
            fieldName: 'file',
            httpMethod: 'POST',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )

        if (response.status === 200) {
          array.push(true)
        } else {
          array.push(false)
        }
      })
      if (array.every((o) => o === true)) {
        Burnt.toast({
          title: 'Propriété ajoutée avec succès',
          preset: 'done',
        })
      } else {
        Burnt.toast({
          title: 'Une erreur est survenue',
          preset: 'error',
        })
      }
    }
    navigation.goBack()
    resetForm()
  }

  return (
    <AddPropertyManagement save={save} photo={photo} pickImage={pickImage} />
  )
}
