import React from 'react'
import { FormikProvider } from 'formik'
import useChatFormik from './hooks/useChatFormik'
import ChatListManagementStep from './ChatListManagement/ChatListManagementStep'

export default function Login(): JSX.Element {
  const { chatFormik } = useChatFormik()

  return (
    <FormikProvider value={chatFormik}>
      <ChatListManagementStep />
    </FormikProvider>
  )
}
