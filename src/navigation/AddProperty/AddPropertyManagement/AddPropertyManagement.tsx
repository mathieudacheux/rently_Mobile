import React, { useState } from 'react'
import { Modal, SafeAreaView, ScrollView, Text, View } from 'react-native'
import Button from '../../../components/atoms/Button'
import FormikCheckbox from '../../../components/atoms/FormikCheckbox'
import FormikField from '../../../components/atoms/FormikField'
import FormikAddressField from '../../../components/molecules/FormikAddressField'
import FormikDPESelect from '../../../components/molecules/FormikDPESelect'
import FormikNumberSelect from '../../../components/molecules/FormikNumberSelect'
import FormikOwnerSelect from '../../../components/molecules/FormikOwnerSelect'
import FormikPropertyTypeSelect from '../../../components/molecules/FormikPropertyTypeSelect'
import FormikYearSelect from '../../../components/molecules/FormikYearSelect'
import FormikStatus from '../../../components/molecules/FormikStatus'
import GestureRecognizer from 'react-native-swipe-gestures'
import Camera from '../../../components/organisms/Camera'
import { Camera as CameraExpo, CameraCapturedPicture } from 'expo-camera'

export default function AddPropertyManagement({
  save,
  photo,
  takePicture,
  deletePicture,
}: Readonly<{
  save: () => Promise<void>
  photo: CameraCapturedPicture[]
  takePicture: (camera: CameraExpo | null) => Promise<void>
  deletePicture: (uri: string) => void
}>) {
  const [openModal, setOpenModal] = useState<boolean>(false)

  return (
    <SafeAreaView>
      <ScrollView keyboardShouldPersistTaps>
        <View className='w-full items-center'>
          <Text className='text-2xl font-bold mb-3'>Ajouter une propriété</Text>
          <FormikField
            name='name'
            placeholder='Nom de la propriété'
            keyboardType='default'
          />
          <FormikStatus name='status_id' label='Statut' />
          <FormikAddressField name='full_address' />
          <FormikField
            name='address.post_code'
            placeholder='Code postal'
            keyboardType='number-pad'
          />
          <FormikField
            name='address.city'
            placeholder='Ville'
            keyboardType='default'
          />
          <FormikOwnerSelect name='owner_id' label='Propriétaire' />
          <View className='mt-1 mb-2 w-full items-center'>
            <FormikPropertyTypeSelect
              name='property_type'
              label='Type de propriété'
            />
          </View>
          <FormikField
            name='price'
            placeholder='Prix'
            keyboardType='decimal-pad'
          >
            <Text>€</Text>
          </FormikField>
          <FormikField
            name='land_size'
            placeholder='Surface du terrain'
            keyboardType='decimal-pad'
          >
            <Text>m²</Text>
          </FormikField>
          <View className='flex-row flex-wrap w-11/12'>
            <View className='w-1/2 pb-2'>
              <FormikCheckbox name='elevator' label='Ascenseur' />
            </View>
            <View className='w-1/2 pb-2'>
              <FormikCheckbox name='balcony' label='Balcon' />
            </View>
            <View className='w-1/2 py-2'>
              <FormikCheckbox name='terrace' label='Terrasse' />
            </View>
            <View className='w-1/2 py-2'>
              <FormikCheckbox name='cellar' label='Cave' />
            </View>
            <View className='w-1/2 py-2'>
              <FormikCheckbox name='parking' label='Parking' />
            </View>
            <View className='w-1/2 py-2'>
              <FormikCheckbox name='pool' label='Piscine' />
            </View>
            <View className='w-1/2 py-2'>
              <FormikCheckbox name='caretaker' label='Gardien' />
            </View>
            <View className='w-1/2 py-2'>
              <FormikCheckbox name='fiber_deployed' label='Fibre Déployée' />
            </View>
            <View className='w-1/2 py-2'>
              <FormikCheckbox name='duplex' label='Duplex' />
            </View>
            <View className='w-1/2 py-2'>
              <FormikCheckbox name='top_floor' label='Dernier Étage' />
            </View>
            <View className='w-1/2 py-2'>
              <FormikCheckbox name='work_done' label='Travaux Effectués' />
            </View>
            <View className='w-1/2 py-2'>
              <FormikCheckbox name='life_annuity' label='Viager' />
            </View>
            <View className='w-1/2 py-2'>
              <FormikCheckbox name='ground_floor' label='Rez-de-chaussée' />
            </View>
            <View className='w-1/2 py-2'>
              <FormikCheckbox name='garden' label='Jardin' />
            </View>
          </View>
          <FormikField
            name='surface'
            placeholder='Surface'
            keyboardType='default'
          >
            <Text>m²</Text>
          </FormikField>
          <View className='mt-1 mb-2 w-full items-center'>
            <FormikNumberSelect name='number_room' label='Pièce' />
          </View>
          <View className='mt-1 mb-2 w-full items-center'>
            <FormikNumberSelect name='bedroom' label='Chambre' />
          </View>
          <View className='mb-2 w-full items-center'>
            <FormikNumberSelect name='bathroom' label='Salle de bain' />
          </View>
          <View className='mb-2 w-full items-center'>
            <FormikNumberSelect name='toilet' label='Toilette' />
          </View>
          <View className='mb-2 w-full items-center'>
            <FormikNumberSelect name='kitchen' label='Cuisine' />
          </View>
          <View className='mb-2 w-full items-center'>
            <FormikYearSelect
              name='year_construction'
              label='Année de construction'
            />
          </View>
          <View className='mb-2 w-full items-center'>
            <FormikDPESelect
              name='dpe'
              label='Diagnostic de performance énergétique'
            />
          </View>
          <FormikField
            name='description'
            placeholder='Description'
            keyboardType='default'
            multiline
          />
          <FormikField
            name='note'
            placeholder='Note'
            keyboardType='default'
            multiline
          />
          <FormikField
            name='caracteristics'
            placeholder='Caractéristiques'
            keyboardType='default'
            multiline
          />
        </View>
        <View className='w-full flex flex-row items-center justify-around'>
          <Button onPress={async () => setOpenModal(true)} text='Photo' />
          <Button
            onPress={async () => {
              await save()
            }}
            text='Enregistrer'
          />
        </View>
      </ScrollView>

      <GestureRecognizer
        onSwipeUp={() => setOpenModal(false)}
        onSwipeDown={() => setOpenModal(false)}
      >
        <Modal
          animationType='slide'
          transparent
          visible={openModal}
          presentationStyle='overFullScreen'
          onRequestClose={() => setOpenModal(false)}
          className='bg-white relative '
          collapsable
        >
          <View className='absolute h-[80%] bottom-0 w-full bg-white rounded-t-2xl rounded-tr-2xl shadow-lg d-flex flex-col items-center justify-start p-6'>
            <Camera
              photo={photo}
              takePicture={takePicture}
              deletePicture={deletePicture}
            />
          </View>
        </Modal>
      </GestureRecognizer>
    </SafeAreaView>
  )
}
