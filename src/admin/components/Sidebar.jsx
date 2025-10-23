import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'
import { BarChart3 } from 'lucide-react' // Add this import
import { Users } from 'lucide-react';

const Sidebar = () => {
  return (
    <div className='w-[18%] min-h-screen border-r-2'>
      <div className='flex flex-col gap-4 pt-6 pl-[20%] text-[15px]'>
        <NavLink className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l' to='/admin/add'>
          <img className='w-5 h-5' src={assets.add_icon} alt="" />
          <p className='md:block text-gray-800'>Add Items</p>
        </NavLink>
        <NavLink className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l' to='/admin/list'>
          <img className='w-5 h-5' src={assets.order_icon} alt="" />
          <p className='md:block'>List Items</p>
        </NavLink>
        <NavLink className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l' to='/admin/order'>
          <img className='w-5 h-5' src={assets.order_icon} alt="" />
          <p className='md:block'>Order Items</p>
        </NavLink>
        <NavLink
          to="/admin/analytics"
          className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l"
        >
          <BarChart3 size={20} className="text-gray-800" />
          <p className="md:block">Analytics</p>
        </NavLink>
        <NavLink
          to="/admin/customers"
          className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l"
        >
          <Users size={20} className="text-gray-800" />
          <p className="md:block">Customers</p>
        </NavLink>
         <NavLink
          to="/admin/measurements"
          className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l"
        >
          <Users size={20} className="text-gray-800" />
          <p className="md:block">Measurements</p>
        </NavLink>
      </div>
    </div>
  )
}

export default Sidebar