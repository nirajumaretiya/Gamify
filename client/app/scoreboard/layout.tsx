
import React from 'react'

interface ScoreBoardlayputProps {
    children: React.ReactNode;
  }

const ScoreBoardlayput = ({ children }:ScoreBoardlayputProps) => {
  return (      
    <div className='bg-rgb(101, 117, 141)'>
        {children}
    </div>
    
  )
}

export default ScoreBoardlayput;