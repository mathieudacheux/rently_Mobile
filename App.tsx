import React from 'react'
import { ImageBackground } from 'react-native'
import { Provider } from 'react-redux'
import { store } from './src/store/store'
import Router from './src/router/Router'

export default function App() {
  return (
    <Provider store={store}>
      <ImageBackground
        source={require('./assets/Background.png')}
        className='w-full h-full'
      >
        <Router />
      </ImageBackground>
    </Provider>
  )
}
