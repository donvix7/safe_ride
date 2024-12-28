import React from 'react'
import Provider from '@/components/provider'
import Nav from '@/components/nav'
import "./globals.css";

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