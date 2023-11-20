import React from 'react'
import { FormikProvider } from 'formik'
import useLoginFormik from './hooks/useLoginFormik'
import LoginManagementStep from './LoginManagement/LoginManagementStep'

export default function Login(): JSX.Element {
  const { loginFormik } = useLoginFormik()

  return (
    <FormikProvider value={loginFormik}>
      <LoginManagementStep />
    </FormikProvider>
  )
}
