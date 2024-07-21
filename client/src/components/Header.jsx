import React from 'react'
import { Link, NavLink } from 'react-router-dom';


//temporarily removed all styling
const Header = () => {
    const navItems = [
        { to: "/home", label: "Home" },
        { to: "/transactions", label: "Transactions" },
        { to: "/groups", label: "Groups" },
        { to: "/reports", label: "Reports" },
      ];
    
  return (
    <div className="w-screen h-[4.5rem] shadow-md text-2xl flex items-center justify-between absolute px-6">
        <div>
        <Link to='#'>
        <h1 className='w-44 p-1 flex items-center justify-center rounded-xl'>Moni Matter</h1>
        </Link>
        </div>
          <div>
          <ul className="flex mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
      {navItems.map((item, index) => (
        <li key={index}>
          <NavLink
            to={item.to}
            className={({ isActive }) =>
              `block py-2 pr-4 pl-3 duration-200 text-xl ${
                isActive ? "text-emerald-700" : "text-black"
              } border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-emerald-700 lg:p-0`
            }
          >
            {item.label}
          </NavLink>
        </li>
      ))}
    </ul>
    </div>  
    <div className='flex flex-row gap-3'>
        {/*This is going to be a toggle button for light and dark mode */}
        <div className='text-xl'>toggle</div>
    <Link to='/profile'>
     <div>
        <h1 className='text-xl'>Profile</h1>
    </div>
    </Link>
    </div>
    </div>
  )
}

export default Header