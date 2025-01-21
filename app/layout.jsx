import React from 'react'
import Nav from '@/components/nav'
import "./globals.css";
import Provider from '../components/provider';

export const metadata = {
    title: "Saferide",
    description: "Get safer riding experience"
}

const RootLayout = ({children}) => {
  return (
    <html lang= "en">
      <body >
        <Provider>
            <div className=' '>
              {children}

            </div>

        </Provider>
        
      </body>
    </html>
  )
}

export default RootLayout