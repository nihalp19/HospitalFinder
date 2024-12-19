import React from 'react'

function Navbar() {
  return (
    <div className='w-full bg-blue-500 text-white'>
        <nav className='flex justify-between items-center p-4'>
            <div className='text-3xl'>HospitalFinder</div>
            <ul className='flex gap-4 items-center'>
                <li>About us</li>
                <li>Services</li>
                <li>Login</li>
            </ul>
        </nav>
    </div>
  )
}

export default Navbar