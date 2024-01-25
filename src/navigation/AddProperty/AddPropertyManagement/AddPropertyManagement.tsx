import React from 'react'
import { SafeAreaView, Text, View } from 'react-native'
import FormikCheckbox from '../../../components/atoms/FormikCheckbox'
import FormikField from '../../../components/atoms/FormikField'
import FormikAddressField from '../../../components/molecules/FormikAddressField'

export default function AddPropertyManagement() {
  return (
    <SafeAreaView>
      <View className='w-full items-center'>
        <Text className='text-2xl font-bold mb-3'>Ajouter une propriété</Text>
        <FormikField
          name='name'
          placeholder='Nom de la propriété'
          keyboardType='default'
        />
        <FormikAddressField name='address' />
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
        <View className='flex-row flex-wrap w-11/12'>
          <View className='w-1/3 py-2'>
            <FormikCheckbox name='elevator' label='Ascenseur' />
          </View>
          <View className='w-1/3 py-2'>
            <FormikCheckbox name='balcony' label='Balcon' />
          </View>
          <View className='w-1/3 py-2'>
            <FormikCheckbox name='terrace' label='Terrasse' />
          </View>
          <View className='w-1/3 py-2'>
            <FormikCheckbox name='cellar' label='Cave' />
          </View>
          <View className='w-1/3 py-2'>
            <FormikCheckbox name='parking' label='Parking' />
          </View>
          <View className='w-1/3 py-2'>
            <FormikCheckbox name='pool' label='Piscine' />
          </View>
          <View className='w-1/3 py-2'>
            <FormikCheckbox name='caretaker' label='Gardien' />
          </View>
          <View className='w-1/3 py-2'>
            <FormikCheckbox name='fiber_deployed' label='Fibre Déployée' />
          </View>
          <View className='w-1/3 py-2'>
            <FormikCheckbox name='duplex' label='Duplex' />
          </View>
          <View className='w-1/3 py-2'>
            <FormikCheckbox name='top_floor' label='Dernier Étage' />
          </View>
          <View className='w-1/3 py-2'>
            <FormikCheckbox name='work_done' label='Travaux Effectués' />
          </View>
          <View className='w-1/3 py-2'>
            <FormikCheckbox name='life_annuity' label='Viager' />
          </View>
          <View className='w-1/3 py-2'>
            <FormikCheckbox name='ground_floor' label='Rez-de-chaussée' />
          </View>
          <View className='w-1/3 py-2'>
            <FormikCheckbox name='garden' label='Jardin' />
          </View>
          <View className='w-1/3 py-2'>
            <FormikCheckbox name='ground_floor' label='Rez-de-chaussée' />
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}
