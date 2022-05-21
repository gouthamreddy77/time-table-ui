import React from 'react'
import { ToastContainer } from 'react-toastify'
import ElectiveMapping from './ElectiveMapping'
import LabMapping, { MappingLab } from './LabMapping'
import LectureMapping from './LectureMapping'

const Mapping = () => {
  return (
    <>
    <div className='row g-0 mt-3 fw-bold'>
      <div className='col-5'>
      <ul class="nav nav-tabs mt-4 border-bottom " id="myTab" role="tablist">
        <li class="nav-item" role="presentation">
          <a class="nav-link active" id="Lectures-tab" data-bs-toggle="tab" href="#Lectures" role="tab" aria-controls="Lectures" aria-selected="true">Lectures  </a>
        </li> 
        <li class="nav-item" role="presentation">
          <a class="nav-link" id="Labs-tab" data-bs-toggle="tab" href="#Labs" role="tab" aria-controls="Labs" aria-selected="false">Labs</a>
        </li> 
        <li class="nav-item" role="presentation">
          <a class="nav-link" id="Elective-tab" data-bs-toggle="tab" href="#Elective" role="tab" aria-controls="Elective" aria-selected="false">Electives</a>
        </li>
      </ul>
      </div>
      <div className='col-7  border-bottom fw-bold fs-3' style={{'color':'#23395b'}}>
        Mapping
      </div>
    </div>
    <div class="tab-content" id="myTabContent">
      <div class="tab-pane fade show active" id="Lectures" role="tabpanel" aria-labelledby="Lectures-tab"><LectureMapping/></div>
      <div class="tab-pane fade" id="Labs" role="tabpanel" aria-labelledby="Labs-tab"><LabMapping/></div>
      <div class="tab-pane fade" id="Elective" role="tabpanel" aria-labelledby="Elective-tab"><ElectiveMapping/></div>
    </div>
    <ToastContainer newestOnTop={true} autoClose={1600} position="top-center  "/>
    </>
  )
}

export default Mapping