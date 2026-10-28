import React from 'react'
// import {assets} from '../assets/assets'
import logo from '../assets/manas_logo.svg'

const Navbar = ({setToken}) => {
  return (
    <div className='flex items-center py-2 px-[4%] justify-between'>
        <div>
        <img className='w-[max(10%,80px)] ' src={logo} alt="" />
        <p className=' text-[rgb(201,134,165,1)] w-[max(100%,80px)] h-[max(100%,80px)] '>Admin panel</p>
        </div>
        <button onClick={()=>setToken('')} className='bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm'>Logout</button>
    </div>
  )
}

export default Navbar