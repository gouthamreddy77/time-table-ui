import React from 'react'
import { Link } from 'react-router-dom'
const logout = () => {

}
const email = "Goutham"
const Navbar = () => {
    return (
        <>
            <nav className="navbar sticky-top navbar-expand-sm " style={{ "boxShadow": "0 1px 9px #000" }}>
                <div className="container-fluid">
                    <span className="" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample" style={{ "backgroundColor": "#23395b" }}

                    >
                        <div className="menu"></div>
                        <div className="menu"></div>
                        <div className="menu"></div>
                    </span>

                    <div className="offcanvas offcanvas-start w-25" tabIndex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
                        <div className="offcanvas-header">
                            <h5 className="offcanvas-title" id="offcanvasExampleLabel">VNRVJIET</h5>
                            <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div className="offcanvas-body">
                            <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-start" id="menu">
                                <li className="nav-item" data-bs-dismiss="offcanvas" aria-label="Close">
                                    <Link to="/home/dashboard" className="nav-link text-truncate">
                                        <i className="fs-5 bi-house"></i><span className="ms-1 d-none d-sm-inline">Dashboard</span>
                                    </Link>
                                </li>
                                <li className="nav-item" data-bs-dismiss="offcanvas" aria-label="Close">
                                    <Link to="/home/batch" className="nav-link text-truncate">
                                        <i className="fs-5 bi-house"></i><span className="ms-1 d-none d-sm-inline">Batches</span>
                                    </Link>
                                </li>
                                <li className="nav-item" data-bs-dismiss="offcanvas" aria-label="Close">
                                    <Link to="/home/course" className="nav-link text-truncate">
                                        <i className="fs-5 bi-house"></i><span className="ms-1 d-none d-sm-inline">Courses</span>
                                    </Link>
                                </li>
                                <li className="nav-item" data-bs-dismiss="offcanvas" aria-label="Close">
                                    <Link to="/home/lecturers" className="nav-link text-truncate">
                                        <i className="fs-5 bi-house"></i><span className="ms-1 d-none d-sm-inline">Lecturers</span>
                                    </Link>
                                </li>
                                <li className="nav-item" data-bs-dismiss="offcanvas" aria-label="Close">
                                    <Link to="/home/mapping" className="nav-link text-truncate">
                                        <i className="fs-5 bi-house"></i><span className="ms-1 d-none d-sm-inline">Mapping</span>
                                    </Link>
                                </li>
                                <li className="nav-item" data-bs-dismiss="offcanvas" aria-label="Close">
                                    <Link to="/home/display-timetable" className="nav-link text-truncate">
                                        <i className="fs-5 bi-house"></i><span className="ms-1 d-none d-sm-inline">View TimeTable</span>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <Link className="navbar-brand text-white fs-4" to="/Home"><strong>Time Table </strong>App</Link>


                    <div className="" id="navbarCollapse">
                        <ul className="navbar-nav ms-auto ">
                            <li className="nav-item dropdown ">
                                <a className="nav-link  text-white" href="/" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false" >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="white" className="bi bi-person-circle mb-1" viewBox="0 0 16 16">
                                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                                        <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                                    </svg>
                                    <span className="ms-1">{email[0]}</span>
                                </a>
                                <ul className="dropdown-menu   dropdown-menu-end" >
                                    <li>
                                        <button className="dropdown-item" onClick={logout}>
                                            Log out
                                        </button>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>

                </div>
            </nav>

        </>
    )
}

export default Navbar
