import React from 'react'

export const Navbar = () => {
    return (
        <div className='flex items-center justify-between bg-gray-800 text-white p-4 h-14'>
            <h1 className='font-bold text-2xl'>Code Snipper</h1>
            <button>Logout</button>
        </div>
    )
}
