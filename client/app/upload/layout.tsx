
import React from 'react'

interface VidoeUploadtProps {
    children: React.ReactNode;
  }

const VidoeUploadtProps = ({ children }:VidoeUploadtProps) => {
  return (      
    <div className='bg-rgb(101, 117, 141)'>
        {children}
    </div>
    
  )
}

export default VidoeUploadtProps;