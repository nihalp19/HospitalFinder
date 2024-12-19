import React from 'react'

function Footer() {
  return (
    <div className=' bg-blue-500 text-white p-2'>
        <ul className='flex gap-4 justify-center items-center p-2'>
            <li>About us</li>
            <li>Services</li>
            <li>Rights</li>
        </ul>
        <p className='w-full text-center'>© 2024 HosiptalFinder.Powered by HosiptalFinder.</p>
    </div>
  )
}

export default Footer