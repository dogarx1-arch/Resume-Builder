import React from 'react'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux' // FIXED: Added this
import Navbar from '../components/Navbar.jsx'
import Loader from '../components/Loader.jsx' // FIXED: Assuming these paths
import Login from '../pages/Login.jsx'      // FIXED: Assuming these paths

const Layout = () => {
  // Now useSelector is defined!
  const { user, loading } = useSelector(state => state.auth)

  if (loading) {
    return <Loader />
  }

  return (
    <div>
      {
        user ? (
          <div className='min-h-screen bg-gray-50'>
            <Navbar />
            <div className="max-w-7xl mx-auto px-4"> 
              <Outlet />
            </div>
          </div>
        )
          : <Login />
      }
    </div>
  )
}

export default Layout