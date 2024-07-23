'use client'
import React from 'react'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { IconContext } from 'react-icons'
import './_loading.scss'

function Loading() {
  return (
    <div className='loading_container'>
      <IconContext.Provider value={{ className: 'loading_spinner' }}>
        <AiOutlineLoading3Quarters />
      </IconContext.Provider>
    </div>
  )
}

export default Loading