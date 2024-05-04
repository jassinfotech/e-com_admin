import React, { useState, useEffect } from 'react'
import Sidebar from './Sidebar'
import Topheader from './Topheader'
import Footer from './Footer';
import { Toaster, toast } from 'react-hot-toast';
import { postData, setAuthToken } from '../helperFile';
import { Link } from 'react-router-dom';
function Userslist() {
    const [userslists, setUserslist] = useState([])
    const [customer_id, setCustomerId] = useState('');
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const handleuserDataRequest = async () => {
        try {
            const response = await postData('admin/get-all-users');
            console.log("get-products", response.users)
            setUserslist(response.users)
        } catch (error) {
            console.error('Get request error:', error);
        }
    };
    useEffect(() => {
        const token = localStorage.getItem('token');
        console.log(token)
        if (token) {
            setAuthToken(token);
            handleuserDataRequest()
        }
        else {
            window.location.href = 'login';
        }
    }, []);


    const handleDelete = async () => {
        let data = { customer_id: customer_id }
        try {
            const response = await postData('admin/delete-product', data);
            console.log('Delete response:', response);
            toast.success(response.message);
            handleuserDataRequest();
            setShowDeleteModal(false);
        } catch (error) {
            console.error('Delete request error:', error);
        }
    };

    const openDeleteModal = (id) => {
        setCustomerId(id);
        setShowDeleteModal(true);
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'active':
                return '#00833e';
            case 'dactive':
                return '#d9512c';
            default:
                return 'black';
        }
    };

    return (
        <div>
            <div class="wrapper">
                <div id="overlay"></div>
                <Sidebar />
                <div class="content">
                    <Topheader title={'All Users list'} />
                    <main class="bg-secondary_nwq bg-opacity-25 min-vh-100">
                        <div class="container-fluid p-3 p-md-4">
                            <div class="d-flex flex-column flex-md-row justify-content-between align-items-center">
                                <div class="text-secondary lead fw-normal" id="curr_date_time"></div>
                            </div>

                            <div class="row g-4">
                                <div class="col-lg-12 col-md-12">
                                    <div className="table-responsive">
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th className="border-top-0">CustomerId</th>
                                                    <th className="border-top-0">Name</th>
                                                    <th className="border-top-0">Email</th>
                                                    <th className="border-top-0">Mobile no</th>
                                                    <th className="border-top-0">Join date</th>
                                                    <th className="border-top-0">Status</th>
                                                    <th className="border-top-0">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {userslists.map(user => (
                                                    <tr key={user.id}>
                                                        <td><div>{user.customer_id}</div></td>
                                                        <td><div>{user.name}</div></td>
                                                        <td><div >{user.email}</div></td>
                                                        <td><div >{user.mobile}</div></td>
                                                        <td><div >{user.created_date}</div></td>
                                                        <td>
                                                            <div style={{ color: getStatusColor(user.status) }}>
                                                                <i class="fa-solid fa-circle"></i> {user.status}
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="">
                                                                <Link to="/Editproduct" state={{ item: user }} className="btn btn-success text-white">
                                                                    <i className="fa-solid fa-eye"></i>
                                                                </Link>
                                                                <button  className="btn btn-success text-white mx-2">
                                                                    <i className="fa-solid fa-trash-can"></i>
                                                                </button>
                                                                <button  className="btn btn-success text-white">
                                                                    <i className="fa-solid fa-pen-to-square"></i>
                                                                </button>


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
                        {showDeleteModal && (
                            <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
                                <div className="modal-dialog" role="document">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title">Delete Product</h5>
                                            <button type="button" className="btn-close" onClick={() => setShowDeleteModal(false)} aria-label="Close"></button>
                                        </div>
                                        <div className="modal-body">
                                            <p>Are you sure you want to delete this product?</p>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" onClick={() => setShowDeleteModal(false)}>Close</button>
                                            <button type="button" className="btn btn-danger" onClick={handleDelete}>Delete</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        )}
                    </main>
                    <Footer />
                </div>
            </div>



        </div>
    )
}

export default Userslist