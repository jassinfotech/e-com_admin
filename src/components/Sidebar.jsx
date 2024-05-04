import React from 'react';
import { Outlet, Link } from 'react-router-dom';

const Sidebar = () => {


    return (
        <>
            <div className="sidebar shadow">
                <div className="admin_brand d-flex justify-content-between align-items-baseline">
                    <div>
                        <Link className="nav-link fw-bold" to="/dashboard">
                            <span className="menu">shivay astro gems</span>
                        </Link>
                    </div>

                </div>

                <ul className="nav nav-pills flex-column">
                <p className='text-white hediing_sb'>Dashboard Details</p>
                    <li className="nav-item">
                        <Link className="nav-link" to="/dashboard">
                            <span className="icon" >
                                <i className="fas fa-dashboard"></i></span>
                            <span className="menu">Dashboard</span>
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link" to="/products">
                            <span className="icon" >
                            <i class="fa-solid fa-list"></i></span>
                            <span className="menu">Product List</span>
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link" to="/categorys">
                            <span className="icon" >
                            <i class="fa-solid fa-list"></i></span>
                            <span className="menu">Category List</span>
                        </Link>
                    </li>
                    <li className="nav-item " >
                        <Link className="nav-link" to="/addproduct">
                            <span className="icon" >
                                <i className="fas fa-cubes"></i>
                            </span>
                            <span className="menu">Add Product</span>
                        </Link>
                    </li>

                    <li className="nav-item " >
                        <Link className="nav-link" to="/addcategory">
                            <span className="icon" >
                                <i className="fas fa-cubes"></i>
                            </span>
                            <span className="menu">Add Category</span>
                        </Link>
                    </li>

                  


                    <p className='text-white hediing_sb'>Orders Details</p>
                    <li className="nav-item">
                        <Link className="nav-link" to="/orders">
                            <span className="icon" >
                            <i class="fa-solid fa-folder-plus"></i></span>
                            <span className="menu">Orders</span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="#">
                            <span className="icon" >
                            <i class="fa-solid fa-folder-plus"></i></span>
                            <span className="menu">Orders</span>
                        </Link>
                    </li>


                    <p className='text-white hediing_sb'>User Details</p>
                    <li className="nav-item">
                        <Link className="nav-link" to="/userslist">
                            <span className="icon" >
                                <i className="fas fa-users"></i></span>
                            <span className="menu">Users</span>
                        </Link>
                    </li>


                    <li className="nav-item">
                        <Link className="nav-link" to="/add-banner">
                            <span className="icon">
                                <i className="fas fa-sign-out"></i></span>
                            <span className="menu">Add Banner</span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="#">
                            <span className="icon">
                                <i className="fas fa-sign-out"></i></span>
                            <span className="menu">Logout</span>
                        </Link>
                    </li>

                </ul>
            </div>
            <Outlet />
        </>
    );
};

export default Sidebar;
