import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
import { postData, getData, setAuthToken, BASE_URL } from '../helperFile';
import { Link } from 'react-router-dom';
import Loader from './Loader';
function OrderTable() {
    const [Productslist, setProducts] = useState([])
    const [order_id, setOrder_id] = useState('');
    const [ordersStatus, setOrderStatus] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [showModals, setShowModals] = useState(false);
    const [loding, setLoding] = useState(true)


    const handlegetProductsRequest = async () => {
        try {
            const response = await postData('admin/product_orders');
            console.log("get-products", response)
            setProducts(response.orders)
            setLoding(false)
        } catch (error) {
            console.error('Get request error:', error);
        }
    };
    useEffect(() => {
        const token = localStorage.getItem('token');
        console.log(token)
        if (token) {
            setAuthToken(token);
            handlegetProductsRequest()
        }
        else {
            window.location.href = 'login';
        }
    }, []);


    const handleUpdate = async () => {
        let data = { order_id: order_id, orderStatus: ordersStatus }
        try {
            setLoding(true)
            const response = await postData('admin/product_order-status', data);
            console.log('Delete response:', response);
            setLoding(false)
            toast.success(response.message);
            handlegetProductsRequest();
            setShowModal(false);
        } catch (error) {
            console.error('Delete request error:', error);
        }
    };


    const handleUpdateorder = async () => {
        let data = { order_id: order_id }
        try {
            setLoding(true)
            const response = await postData('admin/product_delete-order', data);
            console.log('Delete response:', response);
            setLoding(false)
            toast.success(response.message);
            handlegetProductsRequest();
            setShowModals(false);
        } catch (error) {
            console.error('Delete request error:', error);
        }
    };
    const openUpdateModal = (id) => {
        setOrder_id(id);
        setShowModal(true);
    };

    const openUpdateModals = (id) => {
        setOrder_id(id);
        setShowModals(true);
    };

    const handleOrderChange = (e) => {
        setOrderStatus(e.target.value);
    };







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
            case 'Confirm':
                return '#00c0ef';
            case 'Rejected':
                return '#e90707';
            default:
                return 'black';
        }
    };

    return (

        <div>

            {loding && <Loader />}
            <div className="row g-4">
                <div className="col-lg-12 col-md-12">
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
                                {Productslist.map(product => (

                                    <tr key={product.product_id}>
                                        <td>
                                            <div className="main__avatar">
                                                <img src={product.image1_url} alt={product.image1_url} />
                                            </div>
                                        </td>
                                        <td><div className="txt-oflo">{product.order_id}</div></td>
                                        <td><div className="txt-oflo">{product.quantity}</div></td>
                                        <td><div className="txt-oflo">₹ {product.total_price}</div></td>
                                        <td><div className="txt-oflo">{product.category}</div></td>

                                        <td>
                                            <div className="txt-oflo" style={{ color: getStatusColor(product.order_status) }}>
                                                <i class="fa-solid fa-circle"></i>  {product.order_status}
                                            </div>
                                        </td>

                                        <td><div className="main__table-text">
                                            <span style={{ color: product.color }}> <i class="fa-solid fa-square"></i></span>  {product.color}</div></td>
                                        <td><div className="main__table-text">{product.size}</div></td>
                                        <td>
                                            <div className="main__table-text">
                                                <Link to="/orders-details" state={{ item: product }} className="btn btn-success text-white">
                                                    <i className="fa-solid fa-eye"></i>
                                                </Link>
                                                <button onClick={() => openUpdateModals(product.order_id)} className="btn btn-success text-white mx-2">
                                                    <i className="fa-solid fa-trash-can"></i>
                                                </button>
                                                <button onClick={() => openUpdateModal(product.order_id)} className="btn btn-success text-white">
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
            {showModal && (
                <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Update Order Status For This Product</h5>
                                <button type="button" className="btn-close" onClick={() => setShowModal(false)} aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div className="col-12 col-lg-12 form-group mb-3">
                                    <label className="help">Update Order Status </label>
                                    <select
                                        className="form-control"
                                        id="order"
                                        name="order"
                                        value={ordersStatus}
                                        onChange={handleOrderChange}
                                    >
                                        <option value="">Select Status</option>
                                        <option value='Completed'>Completed</option>
                                        <option value='Processing'>Processing</option>
                                        <option value='Cancelled'>Cancelled</option>
                                        <option value='Pending'>Pending</option>


                                    </select>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Close</button>
                                <button type="button" className="btn btn-success" onClick={handleUpdate}>Update</button>
                            </div>
                        </div>
                    </div>
                </div>

            )}

            {showModals && (
                <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">delete this Order</h5>
                                <button type="button" className="btn-close" onClick={() => setShowModals(false)} aria-label="Close"></button>
                            </div>

                            <div className="modal-body">
                                <p>Are you sure you want to delete this Order?</p>
                            </div>

                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setShowModals(false)}>Close</button>
                                <button type="button" className="btn btn-success" onClick={handleUpdateorder}>Update</button>
                            </div>
                        </div>
                    </div>
                </div>

            )}




        </div>

    )
}

export default OrderTable