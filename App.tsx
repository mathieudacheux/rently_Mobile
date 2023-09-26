import React, { useState, useEffect } from 'react'
import Navigation from './src/navigation/Navigation'
import Splash from './src/navigation/screens/Splash'

export default function App() {
  const [splash, setSplash] = useState<boolean>(true)

  useEffect(() => {
    setTimeout(() => {
      setSplash(false)
    }, 1000)
  }, [])

  return <>{splash ? <Splash /> : <Navigation />}</>
}
