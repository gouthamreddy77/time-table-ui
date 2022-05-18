import React, { useState, useEffect } from 'react'
import {useLocation} from 'react-router-dom';

const ViewTimeTable = () => {

    const {state} = useLocation();
    const [Loading,setLoading] = useState(false)
    const [selectedBranch,setSelectedBranch]=useState()
    const [batch_list,setBatch_list] = useState([])
    const uniquekey = useState("val")

    
    useEffect(()=>{
        getBatchList();
    },[])

    const getBatchList = async () => {
        setLoading(true)
        const res = await fetch('/view_batch')
        const data = await res.json();
        // console.log(data.data);
        setBatch_list(data.data);
        setLoading(false)
    }
    const handleSelectedBranch = (branch) =>{
        setSelectedBranch(branch)
    }
    

    return (
        <>
            <div className='text-center fs-2 fw-bold mt-3' style={{"color":"purple"}}>Time Tables</div>
            {
                Loading === true 
                ?
                    <>
                        <div className="d-flex justify-content-center align-items-center" style={{ "minHeight": "68vh" }}>
                            <div className="spinner-border" style={{ "width": "3rem", "height": "3rem" }} role="status" >
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    </> 
                    :
                    <>
                        <button type="button" className="btn btn-success dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" style={{ "margin": "0% 5%","width":"11rem" }}>
                            {selectedBranch === undefined ? 'Select Batch' : selectedBranch?.year + " " + selectedBranch?.dept_name + "  " + selectedBranch?.section}
                        </button>
                        <ul className="dropdown-menu rounded ">
                            {
                                batch_list.map((item, ind) => <li key={ind} className='dropdown-item' onClick={() => handleSelectedBranch(item)}>{item.year + " " + item.dept_name + " " + item.section}</li>)
                            }
                        </ul>
                        <div style={{ "minHeight": "70vh", "margin": "0% 5%" }} className=" radius shadow-lg p-4">
                            {
                                selectedBranch === undefined
                                    ?
                                    <>
                                        <div className='d-flex  justify-content-center align-items-center fs-3 mt-5 pt-5'>
                                            Please Select any branch
                                        </div>
                                    </>
                                    :
                                    (
                                        state === null ?
                                        <>
                                            <div className='d-flex  justify-content-center align-items-center fs-3 mt-5 pt-5'>
                                                Please Generate Time Table Before Selecting Branch
                                            </div>
                                        </>
                                        :
                                        <>
                                            {console.log(state)}
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
                                                <Batches section={"{"+selectedBranch?.year + " " + selectedBranch?.dept_name + " " + selectedBranch?.section+"}"} timeTable={state}/>
                                            }
                                    </>
                                    )

                            }
                        </div>
                    </>
            }
        </>
    )
}

export default ViewTimeTable

const Batches = (props) => {
    const {section,timeTable}=props
    console.log(timeTable);
    console.log(timeTable[section]);
    return (
        <>
            {
                timeTable[section].map( (item,ind) => <Display day={item} index={ind} key={ind + props.section}/>)
            }
        </>
    )
}

const Display = (props) => {

    const days = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']

  const splitfunctionality = (slot) =>{
      console.log(slot.toString().indexOf('\n'));
    if(slot.toString().indexOf('\n') > -1){
        console.log(slot.split('\n'));
        return(
            <>
                {
                    slot.split('\n').map((item,k) => <span key={k}>{item}{k == 0 ? <br/> : null}</span>)
                }
            </>
        )    
    }
    else
        return(<>{slot}</>)
  }

  return (
      <>
        <div className='row  text-center  ' style={{"position":"relative","minHeight":"3.7rem"}}>
            <div className='col border pt-3' >{days[props.index]}</div>
            {
                props.day.map((slot,i) => 
                    <>
                        <div key={i+props.index} className='col border ' >
                            {splitfunctionality(slot)}
                        </div>
                    </> 
                )
            }
        </div>
      </>
  )
}

const timeTable = {
    "4 CSE 1":[
                ["Slot 1","Slot 2","Slot 3","Slot 4","Slot 5","Slot 6"],
                ["Slot 1","Slot 2","Slot 3","Slot 4","Slot 5","Slot 6"],
                ["Slot 1","Slot 2","Slot 3","Slot 4","Slot 5","Slot 6"],
                ["Slot 1","Slot 2","Slot 3","Slot 4","Slot 5","Slot 6"],
                ["Slot 1","Slot 2","Slot 3","Slot 4","Slot 5","Slot 6"],
                ["Slot 1","Slot 2","Slot 3","Slot 4","Slot 5","Slot 6"]
            ],
    "4 CSE 2":[
                ["Slot 21","Slot 22","Slot 23","Slot 24","Slot 25","Slot 26"],
                ["Slot 21","Slot 22","Slot 23","Slot 24","Slot 25","Slot 26"],
                ["Slot 21","Slot 22","Slot 23","Slot 24","Slot 25","Slot 26"],
                ["Slot 21","Slot 22","Slot 23","Slot 24","Slot 25","Slot 26"],
                ["Slot 21","Slot 22","Slot 23","Slot 24","Slot 25","Slot 26"],
                ["Slot 21","Slot 22","Slot 23","Slot 24","Slot 25","Slot 26"]
            ]    
}