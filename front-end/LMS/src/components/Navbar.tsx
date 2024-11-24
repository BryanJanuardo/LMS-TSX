import React, { useState } from 'react'
import {Link} from "react-router-dom";
import {useLogout} from "../hooks/useLogout.tsx";
import {useAuthContext} from "../hooks/useAuthContext.ts";

const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { logout } = useLogout();
    const { user } = useAuthContext();

    const toggleMenu = () => {
      setIsOpen(!isOpen);
    };
    const handleClick = () =>{
      logout()
    }
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl px-4">
        <div className="flex items-center justify-between md:justify-normal">
          <div className="flex space-x-4">
            <a href="#" className="flex items-center py-5 px-2 text-gray-700 hover:text-gray-900">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3v18h18V3H3z" />
              </svg>
              <span className="font-bold">LMS</span>
            </a>
          </div>

          <div className="hidden md:flex items-center w-full space-x-1 justify-between">
              <div>
                  <a href="/"
                     className="py-5 px-3 text-gray-700 hover:text-indigo-600 transition duration-300 ease-in-out transform hover:scale-105">Home</a>
                  <a href="/courses"
                     className="py-5 px-3 text-gray-700 hover:text-indigo-600 transition duration-300 ease-in-out transform hover:scale-105">Course</a>
                  <a href="/forums"
                     className="py-5 px-3 text-gray-700 hover:text-indigo-600 transition duration-300 ease-in-out transform hover:scale-105">Forum</a>
                  <a href="/assesments"
                     className="py-5 px-3 text-gray-700 hover:text-indigo-600 transition duration-300 ease-in-out transform hover:scale-105">Assesment</a>
                  <a href="/schedule"
                     className="py-5 px-3 text-gray-700 hover:text-indigo-600 transition duration-300 ease-in-out transform hover:scale-105">Schedule</a>
              </div>
              <div className=''>
                  {!user && (<div className='flex flex-row items-center w-full gap-5 justify-evenly'>
                      <Link to="/signin"
                            className="block py-2 px-4 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white transition duration-300 ease-in-out">Sign
                          in</Link>
                      <Link to="/signup"
                            className="block py-2 px-4 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white transition duration-300 ease-in-out">Sign
                          up</Link>
                  </div>)}
                  {user && (<div className='flex flex-row items-center w-full gap-5 justify-evenly'>
                      <span className='ml-4'>Email: {user.newUser.UserEmail}</span>
                      <div
                          className="block py-2 rounded-md px-4 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white transition duration-300 ease-in-out"
                          onClick={handleClick}>Log Out
                      </div>
                  </div>)}
              </div>

          </div>

          {/* <div className="hidden md:flex items-center space-x-1">
            <a href="#" className="py-2 px-3 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition duration-300 ease-in-out">Login</a>
            <a href="#" className="py-2 px-3 border border-indigo-600 text-indigo-600 rounded hover:bg-indigo-600 hover:text-white transition duration-300 ease-in-out">Sign Up</a>
          </div> */}

          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu} className="mobile-menu-button focus:outline-none" title='LMS'>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>
        </div>
      </div>



        <div className={`md:hidden ${isOpen ? 'block' : 'hidden'} `}>
            <Link to="/"
                  className="block py-2 px-4 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white transition duration-300 ease-in-out">Home</Link>
            <a href="#"
               className="block py-2 px-4 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white transition duration-300 ease-in-out">About</a>
        <a href="#" className="block py-2 px-4 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white transition duration-300 ease-in-out">Services</a>
        <a href="#" className="block py-2 px-4 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white transition duration-300 ease-in-out">Contact</a>
            {!user && (<div>
                <Link to="/signin"
                      className="block py-2 px-4 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white transition duration-300 ease-in-out">Sign
                    in</Link>
                <Link to="/signup"
                      className="block py-2 px-4 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white transition duration-300 ease-in-out">Sign
                    up</Link>
            </div>)}
            {user && (<div>
                <span className='ml-4'>Email: {user.newUser.UserEmail}</span>
                <div
                    className="block py-2 px-4 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white transition duration-300 ease-in-out"
                    onClick={handleClick}>Log Out
                </div>
            </div>)}
      </div>
    </nav>
  )
}

export default Navbar
