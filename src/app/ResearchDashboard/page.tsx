import React from 'react'
import ScopusSearch from '../components/ScopusSearch'

export default function ResearchDashboard() {
  return (
    <div className='bg-black text-white min-h-screen'>
      <h1 className='text-4xl font-bold tracking-tight p-4'>
        Infosphere : Research Dashboard
      </h1>
      <div className='p-4'>
        <ScopusSearch />
      </div>
    </div>
  )
}
