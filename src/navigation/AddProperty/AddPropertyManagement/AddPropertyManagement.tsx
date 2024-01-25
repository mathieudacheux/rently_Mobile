import React from 'react'
import { SafeAreaView, ScrollView, Text, View } from 'react-native'
import FormikCheckbox from '../../../components/atoms/FormikCheckbox'
import FormikField from '../../../components/atoms/FormikField'
import FormikAddressField from '../../../components/molecules/FormikAddressField'
import FormikDPESelect from '../../../components/molecules/FormikDPESelect'
import FormikNumberSelect from '../../../components/molecules/FormikNumberSelect'
import FormikPropertyTypeSelect from '../../../components/molecules/FormikPropertyTypeSelect'
import FormikYearSelect from '../../../components/molecules/FormikYearSelect'

export default function AddPropertyManagement() {
  return (
    <SafeAreaView>
      <ScrollView>
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
          <View className='mt-1 mb-2 w-full items-center'>
            <FormikPropertyTypeSelect
              name='property_type'
              label='Type de propriété'
            />
          </View>
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
            placeholder='Surface m²'
            keyboardType='default'
          />
          <View className='mt-1 mb-2 w-full items-center'>
            <FormikNumberSelect name='number_room' label='Pièces' />
          </View>
          <View className='mt-1 mb-2 w-full items-center'>
            <FormikNumberSelect name='bedrooms' label='Chambres' />
          </View>
          <View className='mb-2 w-full items-center'>
            <FormikNumberSelect name='bathrooms' label='Salles de bain' />
          </View>
          <View className='mb-2 w-full items-center'>
            <FormikNumberSelect name='toilet' label='Toilettes' />
          </View>
          <View className='mb-2 w-full items-center'>
            <FormikNumberSelect name='kitchen' label='Cuisines' />
          </View>
          <View className='mb-2 w-full items-center'>
            <FormikYearSelect
              name='year_construction'
              label='Année de construction'
            />
          </View>
          <View className='mb-2 w-full items-center'>
            <FormikDPESelect
              name='year_construction'
              label='Diagnostic de performance énergétique'
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
