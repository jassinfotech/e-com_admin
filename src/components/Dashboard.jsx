import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar'
import Topheader from './Topheader'
import Footer from './Footer'
import { postData, getData, setAuthToken, BASE_URL } from '../helperFile';
import { Link } from 'react-router-dom';
import Loader from './Loader';
function Dashboard() {
    const [details, setDetails] = useState('')
    const [latestOrders, setlatestOrders] = useState([])
    const [loding, setLoding] = useState(true)
    const handleGetDashboard = async () => {
        try {
            const response = await postData('admin/get-stats');
            console.log("get-Dashboard- details", response.totalStats)
            setDetails(response.totalStats)
            setLoding(false)
        } catch (error) {
            console.error('Get request error:', error);
        }
    };

    const handleGetOrderlist = async () => {
        try {
            const response = await postData('admin/get-latest-orders');
            console.log("latest Orders details", response.latestOrders)
            setlatestOrders(response.latestOrders)
            setLoding(false)
        } catch (error) {
            console.error('Get request error:', error);
        }
    };
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setAuthToken(token);
            handleGetDashboard()
            handleGetOrderlist()
           
        }else{
            window.location.href = 'login';
        }
      
    }, []);

    const getStatusColor = (status) => {
        switch (status) {
            case 'Completed':
                return '#00a65a';
            case 'Cancelled':
                return '#e90707';
            case 'Processing':
                return '#00c0ef';
            case 'Pending':
                return '#f39c12';
            default:
                return 'black';
        }
    };

    return (
        <div>
           {loding  && <Loader/> }
            <div className="wrapper">
                <div id="overlay"></div>
                <Sidebar />
                <div className="content">
                    <Topheader title={'Dashboard'} />
                    <main className="bg-secondary_nwq bg-opacity-25 min-vh-100">
                        <div className="container-fluid p-3 p-md-4">
                            <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
                                <div className="text-secondary lead fw-normal" id="curr_date_time"></div>
                            </div>

                            <div className="row g-4">
                                <div className="col-lg-3 col-md-6">
                                    <Link to="/orders" className="text-decoration-none">
                                        <div className="card bg-primary bg-gradient shadow-sm custom-card">
                                            <div className="card-body p-3 pb-2 px-3 d-flex flex-row justify-content-between align-items-center">
                                                <div>
                                                    <h1><i className="fas fa-cart-shopping fa-1x text-white-50"></i></h1>
                                                </div>
                                                <div className="text-center">
                                                    <h2 className="display-4 fw-bold text-white">{details.totalOrders}</h2>
                                                    <h4 className="text-white-50">Orders</h4>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>

                                <div className="col-lg-3 col-md-6">
                                    <Link to="/products" className="text-decoration-none">
                                        <div className="card bg-primary bg-success shadow-sm custom-card">
                                            <div className="card-body p-3 pb-2 px-3 d-flex flex-row justify-content-between align-items-center">
                                                <div>
                                                    <h1><i className="fas fa-list fa-1x text-white-50"></i></h1>
                                                </div>
                                                <div className="text-center">
                                                    <h2 className="display-4 fw-bold text-white">{details.totalProducts}</h2>
                                                    <h4 className="text-white-50">Products</h4>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>

                                <div className="col-lg-3 col-md-6">
                                    <Link to="/userslist" className="text-decoration-none">
                                        <div className="card bg-danger bg-gradient shadow-sm custom-card">
                                            <div className="card-body p-3 pb-2 px-3 d-flex flex-row justify-content-between align-items-center">
                                                <div>
                                                    <h1><i className="fas fa-users fa-1x text-white-50"></i></h1>
                                                </div>
                                                <div className="text-center">
                                                    <h2 className="display-4 fw-bold text-white">{details.totalUsers}</h2>
                                                    <h4 className="text-white-50">Users</h4>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>

                                <div className="col-lg-3 col-md-6">
                                    <a href="#" className="text-decoration-none">
                                        <div className="card bg-dark bg-gradient shadow-sm custom-card">
                                            <div className="card-body p-3 pb-2 px-3 d-flex flex-row justify-content-between align-items-center">
                                                <div>
                                                    <h1><i className="fa-solid fa-shop fa-1x text-white-50"></i></h1>
                                                    
                                                </div>
                                                <div className="text-center">
                                                    <h2 className="display-4 fw-bold text-white">0</h2>
                                                    <h4 className="text-white-50">Vendors</h4>
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            </div>
                            <div className="row ">
                                <div className="col-lg-12 col-md-12 mt-5">
                                    <div className="table-responsive">
                                        <table className="table table-hover table-bordered text-center">
                                            <thead>
                                                <tr>
                                                    <th className="border-top-0">Product Images</th>
                                                    <th className="border-top-0">Order ID</th>
                                                    <th className="border-top-0">Quantity</th>
                                                    <th className="border-top-0">Totale Price</th>
                                                    <th className="border-top-0">Category</th>
                                                    <th className="border-top-0">Status</th>
                                                    <th className="border-top-0">Color</th>
                                                    <th className="border-top-0">Size</th>
                                                    <th className="border-top-0">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {latestOrders.map(order => (

                                                    <tr key={order.product_id}>
                                                        <td>
                                                            <div className="main__avatar">
                                                                <img src={order.image1_url} alt={order.image1_url} />
                                                            </div>
                                                        </td>
                                                        <td><div className="txt-oflo">{order.order_id}</div></td>
                                                        <td><div className="txt-oflo">{order.quantity}</div></td>
                                                        <td><div className="txt-oflo">₹ {order.total_price}</div></td>
                                                        <td><div className="txt-oflo">{order.category}</div></td>

                                                        <td>
                                                            <div className="txt-oflo" style={{ color: getStatusColor(order.order_status) }}>
                                                                <i class="fa-solid fa-circle"></i>  {order.order_status}
                                                            </div>
                                                        </td>

                                                        <td><div className="main__table-text">
                                                            <span style={{ color: order.color }}> <i class="fa-solid fa-square"></i></span>  {order.color}</div></td>
                                                        <td><div className="main__table-text">{order.size}</div></td>
                                                        <td>
                                                            <div className="main__table-text">
                                                                <Link to="/orders" className="btn btn-success text-white">
                                                                    View All
                                                                </Link>
                                                            </div>
                                                        </td>


                                                    </tr>
                                                ))}

                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>

                    <Footer />


                </div>
            </div>





        </div>
    )
}

export default Dashboard