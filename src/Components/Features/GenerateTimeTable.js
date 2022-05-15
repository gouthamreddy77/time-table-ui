import React,{useEffect,useState} from 'react'
import { useNavigate } from 'react-router-dom'
const GenerateTimeTable = () => {

    const [Loading,setLoading] = useState(false)
    const [click,setclick] = useState(false)
    const [error,seterror] = useState(true)
    const [Tdata,setTdata] = useState()
    const navigate = useNavigate()

    const getTimetable = async () =>{
        setLoading(true)
        seterror(false)
        try{
            setclick(true)
            const res = await fetch('/generate_timetable')
            const data = await res.json()
            const keys = Object.keys(data.data)
            const timetable = {}
            for(const section of keys){
                data.data[section].shift()
                for(const slots of data.data[section]){
                    slots.shift()
                }
                timetable[section.toString()] = data.data[section]
            }
            setTdata(data.data)
            // console.log("time --> "+JSON.stringify(timetable,null,'\n'));
        }
        catch(err){
            console.log(err);
            seterror(true)
        }
        setLoading(false) 
    }
    const func = () =>{
        navigate('/home/display-timetable',{state:Tdata})
    }

  return (
      <>
        <div className='shadow text-center row border' style={{"height":"55vh","margin":"5rem","color":"purple"}}>
            <div className='fw-bold fs-2 col-6 d-flex justify-content-center align-items-center'>Generate TimeTable</div>
            <div className='col-6 ' style={{"height":"55vh"}}>
                <div className=' d-flex flex-column '>
                <div className='' style={{"height":"27vh"}}>
                {
                    click === true ?
                    (
                        Loading === true ?
                            <>
                                <div className="mt-5">
                                    <div>Sent Request</div>
                                    <div className="spinner-border" style={{ "width": "3rem", "height": "3rem" }} role="status" >
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                    <div>It may take some time</div>
                                </div>
                            </> 
                    :
                        (
                            error === true ?
                                <>
                                    <div className='mt-5 pt-5'>Error Ocurred Try again </div>
                                </>
                            :
                            
                            <>
                                {func()}
                            </>
                        )
                    ):
                    null
                }
                </div>
                <div className='' style={{"height":"27vh"}}  >
                    <button className='btn  btn-success' onClick={() => getTimetable()} style={{"height":"35px","width":"135px"}}>
                        Generate
                    </button>
                </div>
                </div>
            </div>
        </div>
      </>
  )
}

export default GenerateTimeTable