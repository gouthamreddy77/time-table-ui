import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Register from './Screens/Register'
import Login from './Screens/Login'
import HomeScreen from './Screens/HomeScreen'
import Dashboard from './Screens/Dashboard'

import Batch from './Features/Batch'
import Course from './Features/Course'
import Mapping from './Features/Mapping'
import GenerateTimeTable from './Features/GenerateTimeTable'

const Router = () => {
  return (
    <Routes>
      <Route exact path='/' element={<Register />} />
      <Route path='/login' element={<Login />} />
      <Route path='home' element={<HomeScreen />}>
        <Route path='dashboard' element={<Dashboard />} />
        <Route path='batch' element={<Batch />} />
        <Route path='course' element={<Course />} />
        <Route path='mapping' element={<Mapping />} />
        <Route path='generate-timetable' element={<GenerateTimeTable />} />
      </Route>
    </Routes>
  )
}

export default Router