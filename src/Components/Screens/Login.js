import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {

    const navigate = useNavigate()
    const [username, setusername] = useState("")
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")

    const login = () => {
        console.log(username, email, password);
        navigate('/home/dashboard')
    }

    return (
        <>
            <>
                <div>
                    <div className="row" style={{ "marginTop": "5%", "marginLeft": "9%", "marginRight": "5%", "height": "83vh" }}>

                        <div className="col-sm-12 col-md-6 col-lg-6   d-flex justify-content-center align-items-start p-5 " >
                            <div className="" style={{ "textAlign": "center" }}>
                                <p className="" style={{ "fontSize": "49px" }}><strong>Time  Table </strong><span style={{ "fontSize": "34px" }}>App</span></p>
                                <p>
                                    Now Generate and view time tables at a single platform.
                                </p>
                            </div>
                        </div>

                        <div className="col-sm-12 col-md-6 col-lg-4  d-flex flex-column justify-content-around p-5  shadow text-black login" style={{  "borderRadius": "29px", "marginBottom": "2%" }}>

                            <h3 style={{ "textAlign": "center" }}>Login to your Account</h3>
                            <label>User Name:</label>
                            <input type="text" value={username} onChange={(e) => setusername(e.target.value)}></input>
                            <label>Email:</label>
                            <input type="email" value={email} onChange={(e) => setemail(e.target.value)}></input>
                            <label>Password:</label>
                            <input type="password" value={password} onChange={(e) => setpassword(e.target.value)}></input>
                            <button className="btn mt-3 text-white" onClick={login} style={{backgroundColor:"#23395b"}} role="login">Login</button>
                            <Link to="/" style={{color:"#23395b"}}>New Here? Register</Link>

                        </div>
                        <div className="col-sm-12">
                            <br />
                            <br />
                        </div>
                    </div>

                </div>
            </>
        </>
    )
}

export default Login