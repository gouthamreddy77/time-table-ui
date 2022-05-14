import React, { useState, useEffect } from 'react'

const ViewTimeTable = () => {

    const [Loading,setLoading] = useState(false)
    const [selectedBranch,setSelectedBranch]=useState()
    const uniquekey = useState("val")
    const batch_list = [
        {
            "batch_id": 1,
            "year": 4,
            "dept_name": 'CSE',
            "section": 1,
            "room_no": 'A101',
            "non_empty_slots": 0
        },
        {
            "batch_id": 2,
            "year": 4,
            "dept_name": 'CSE',
            "section": 2,
            "room_no": 'A102',
            "non_empty_slots": 0
        },
        {
            "batch_id": 3,
            "year": 4,
            "dept_name": 'CSE',
            "section": 3,
            "room_no": 'A103',
            "non_empty_slots": 0
        },
        {
            "batch_id": 4,
            "year": 4,
            "dept_name": 'CSE',
            "section": 4,
            "room_no": 'A104',
            "non_empty_slots": 0
        }
    ]

    
    useEffect(()=>{
        getBatchList();
        // getTimetable()
    },[])

    const getBatchList = async () => {
        const res = await fetch('/view_batch')
        const data = await res.json();
        console.log(data);
    }
    const handleSelectedBranch = async (branch) =>{
        setSelectedBranch(branch)
    }
    const getTimetable = async () =>{
        setLoading(true)
        const res = await fetch('/generate_timetable')
        console.log(res);
        setLoading(false) 
    }

    return (
        <>
            <div className='text-center fs-2 fw-bold ' style={{"color":"purple"}}>Time Tables</div>
            {
                Loading === true 
                ?
                    <>
                        <div class="d-flex justify-content-center align-items-center" style={{ "minHeight": "68vh" }}>
                            <div class="spinner-border" style={{ "width": "3rem", "height": "3rem" }} role="status" >
                                <span class="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    </> 
                    :
                    <>
                        <button type="button" className="btn btn-success dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" style={{ "margin": "0% 5%","width":"11rem" }}>
                            {selectedBranch === undefined ? 'Select Batch' : selectedBranch.year + " " + selectedBranch.dept_name + "  " + selectedBranch.section}
                        </button>
                        <ul className="dropdown-menu rounded ">
                            {
                                batch_list.map((item, ind) => <li key={ind} className='dropdown-item' onClick={() => handleSelectedBranch(item)}>{item.year + " " + item.dept_name + " " + item.section}</li>)
                            }
                        </ul>
                        <div style={{ "height": "71vh", "margin": "0% 5%" }} className="card radius shadow p-3">
                            {
                                selectedBranch === undefined
                                    ?
                                    <>
                                        <div className='d-flex  justify-content-center align-items-center fs-2' style={{ "height": "71vh" }}>
                                            Please Select any branch
                                        </div>
                                    </>
                                    :
                                    <>
                                        <div className='row border text-center' style={{ "position": "relative", "minHeight": "3rem", "backgroundColor": "#fab133" }}>
                                            <div className='col border'>Day</div>
                                            <div className='col border'>Slot 1</div>
                                            <div className='col border'>Slot 2</div>
                                            <div className='col border'>Slot 3</div>
                                            <div className='col border'>Slot 4</div>
                                            <div className='col border'>Slot 5</div>
                                            <div className='col border'>Slot 6</div>
                                        </div>
                                        {
                                            <Batches section={"4cse1"} />
                                        }
                                    </>

                            }
                        </div>
                    </>
            }
            
        </>
    )
}

export default ViewTimeTable

const Batches = (props) => {
    return (
        <>
            {
                timeTable[props.section].map( (item,ind) => <Display day={item} index={ind} key={ind + props.section}/>)
            }
        </>
    )
}

const Display = (props) => {
  return (
      <>
        <div className='row border text-center' style={{"position":"relative","minHeight":"3.5rem"}}>
            <div className='col border' style={{"minHeight":"3.5rem"}}>{props.index+1}</div>
            {
                props.day.map((slot,i) => 
                    <>
                        <div key={i+props.index} className='col border' style={{"minHeight":"3.5rem"}}>{slot}</div>
                    </> 
                )
            }
        </div>
      </>
  )
}

const timeTable = {
    "4cse1":[
                ["Slot 1","Slot 2","Slot 3","Slot 4","Slot 5","Slot 6"],
                ["Slot 1","Slot 2","Slot 3","Slot 4","Slot 5","Slot 6"],
                ["Slot 1","Slot 2","Slot 3","Slot 4","Slot 5","Slot 6"],
                ["Slot 1","Slot 2","Slot 3","Slot 4","Slot 5","Slot 6"],
                ["Slot 1","Slot 2","Slot 3","Slot 4","Slot 5","Slot 6"],
                ["Slot 1","Slot 2","Slot 3","Slot 4","Slot 5","Slot 6"]
            ],
    batch_id:'2',
    batch_name:'4CSE1' 
}
// {data: {id:timetable},{id:timetable}}