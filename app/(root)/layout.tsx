import StreamVideoProvider from '@/providers/StreamClientProvider'
import { Metadata } from 'next';
import React, { ReactNode } from 'react'
import Stream from 'stream'

export const metadata: Metadata = {
  title: "Zoomer",
  description: "Zoom clone",
  icons:{
    icon:'/icons/logo.svg'
  }
};  

const rootLayout = ({children}:{children:ReactNode}) => {
  return (

    <main>
      <StreamVideoProvider>
       
        {children}
        </StreamVideoProvider>
        
        </main>
  )
}

export default rootLayout