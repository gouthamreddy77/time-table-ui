import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Register from './Screens/Register'
import Login from './Screens/Login'
import HomeScreen from './Screens/HomeScreen'
import Dashboard from './Screens/Dashboard'

import Batch from './Features/Input-Pages/Batch'
import Course from './Features/Input-Pages/Course'
import Lecturers from './Features/Input-Pages/Lecturers'
import Mapping from './Features/Mapping/Mapping'
import ViewTimeTable from './Features/ViewTimeTable'

const Router = () => {
  return (
    <Routes>
      
      <Route exact path='/' element={<Register />} />
      <Route path='/login' element={<Login />} />
      <Route path='home' element={<HomeScreen />}>
        <Route path='dashboard' element={<Dashboard />} />
        <Route path='batch' element={<Batch />} />
        <Route path='course' element={<Course />} />
        <Route exact path='lecturers' element={<Lecturers/>}/>
        <Route path='mapping' element={<Mapping />} />
        <Route path='display-timetable' element={<ViewTimeTable />} />
      </Route>
    </Routes>
  )
}

export default Router