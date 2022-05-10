import React from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'

const HomeScreen = () => {
  return (

    <>
      <Navbar />
      <Outlet />
    </>
  )
}

export default HomeScreen