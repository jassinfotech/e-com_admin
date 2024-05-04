import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Topheader({ title }) {
    let navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };
    return (
        <div>
            <nav className="navbar navbar-expand-md navbar-light bg-light shadow">
                <div className="container-fluid px-3">

                    <button className="navbar-toggler border-0" type="button" id="show_sidebar_phone">
                        <span className="navbar-toggler-icon"></span>
                    </button>


                    <a className="navbar-brand d-none d-md-block" href="#" >
                        {title}
                    </a>

                    <div className="fw-bold text-secondary d-md-none d-block">Admin Panel</div>


                    <div className="ms-auto d-flex align-items-center">



                        <div className="dropdown">

                            <a className="nav-link dropdown-toggle py-1 px-3 rounded-1" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <i className="fas fa-user-circle me-1"></i>Admin
                            </a>

                            <ul className="dropdown-menu dropdown-menu-end">
                                <li><a className="dropdown-item" href="#"><i className="fa-solid fa-address-card me-2"></i>Profile</a></li>
                                <li><a className="dropdown-item" href="#"><i className="fa-solid fa-gear me-2"></i>Account</a></li>
                                <li>

                                </li>
                                <li><a className="dropdown-item" onClick={handleLogout}><i className="fa-solid fa-right-from-bracket me-2"></i>Logout</a>
                                </li>
                            </ul>
                        </div>


                    </div>


                </div>
            </nav>
        </div>
    )
}

export default Topheader