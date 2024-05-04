import React, { useState, useEffect } from 'react'
import { Toaster, toast } from 'react-hot-toast';
import Sidebar from './Sidebar'
import Topheader from './Topheader'
import Footer from './Footer'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { postData, getData, setAuthToken } from '../helperFile';
import Loader from './Loader';
function OrdersDetails() {
    const location = useLocation()
    let navigate = useNavigate();
    const { item } = location.state
    console.log("item", item)
    const [showModal, setShowModal] = useState(false);
    const [loding, setLoding] = useState(true)
    const [ordersStatus, setOrderStatus] = useState('Confirm');

    const handleUpdate = async () => {
        let data = {
            order_id: item.order_id,
            orderStatus: ordersStatus,
            customer_id: item.customer_id
        }
        try {
            setLoding(true)
            const response = await postData('admin/product_order-status', data);
            console.log('Delete response:', response);
            setLoding(false)
            toast.success(response.message);
            navigate('/orders');


        } catch (error) {
            console.error('Delete request error:', error);
        }
    };
    const openUpdateModal = (id) => {
        setShowModal(true);
    };

    const handleOrderChange = (e) => {
        setOrderStatus(e.target.value);
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        console.log(token);
        if (token) {
            setAuthToken(token);
        }
        else {
            window.location.href = 'login';
        }
    }, [item]);
    return (
        <>
            <div class="wrapper">
                <div id="overlay"></div>
                <Sidebar />
                <div class="content">
                    <Topheader title=" Orders Details" />
                    <main class="bg-secondary_nwq bg-opacity-25 min-vh-100">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-12">
                                    <div className="form p-4">
                                        <div className="row bg-white">
                                            <div className="col-12 col-md-12 ">
                                                <div className="row form-horizontal mt-4">
                                                    <div className='col-12 col-lg-12 col-md-12'>
                                                        <div className='row'>
                                                            <div className='col-12 col-lg-3 col-md-3'>
                                                                <div className='image_boxs'>
                                                                    <img src={item.image1_url} class="img-thumbnail" alt="image" />
                                                                </div>
                                                            </div>
                                                            <div className='col-12 col-lg-9 col-md-9'>
                                                                <div className='row'>
                                                                    <div className="col-12 col-sm-6 col-lg-6 mt-3 form-group">
                                                                        <label className="help">Prduct Name </label>
                                                                        <input type="text" className="form-control" value={item.product_name} readOnly />
                                                                    </div>
                                                                    <div className="col-12 col-sm-6 col-lg-6 mt-3 form-group">
                                                                        <label className="help">Product quantity </label>
                                                                        <input type="text" className="form-control" value={item.quantity} readOnly />
                                                                    </div>
                                                                    <div className="col-12 col-sm-6 col-lg-6 mt-3 form-group">
                                                                        <label className="help"> Category </label>
                                                                        <input type="text" className="form-control" value={item.category} readOnly />
                                                                    </div>
                                                                    <div className="col-12 col-lg-6 mt-3 form-group">
                                                                        <label className="help">Color </label>
                                                                        <input type="text" className="form-control" value={item.color} readOnly />
                                                                    </div>
                                                                    <div className="col-12 col-lg-6 mt-3 form-group">
                                                                        <label className="help" >Size </label>
                                                                        <input type="text" className="form-control" value={item.size} readOnly />
                                                                    </div>
                                                                    <div className="col-12 col-lg-6 mt-3 form-group">
                                                                        <label className="help"> Total Price </label>
                                                                        <input type="text" className="form-control" value={item.total_price} readOnly />
                                                                    </div>
                                                                    <div className="col-12 col-lg-6 mt-3 form-group">
                                                                        <label className="helpl" >payment method </label>
                                                                        <input type="text" className="form-control" value={item.payment_method} readOnly />
                                                                    </div>
                                                                    <div className="col-12 col-lg-6 mt-3 form-group">
                                                                        <label className="helpl" >payment Status </label>
                                                                        <input type="text" className="form-control" value={item.payment_status} readOnly />
                                                                    </div>
                                                                    <div className="col-12 col-lg-6 mt-3 form-group">
                                                                        <label className="helpl" >State </label>
                                                                        <input type="text" className="form-control" value={item.states} readOnly />
                                                                    </div>
                                                                    <div className="col-12 col-lg-6 mt-3 form-group">
                                                                        <label className="helpl" >City </label>
                                                                        <input type="text" className="form-control" value={item.city} readOnly />
                                                                    </div>
                                                                    <div className="col-12 col-lg-6 mt-3 form-group">
                                                                        <label className="helpl" >Zip Code </label>
                                                                        <input type="text" className="form-control" value={item.zip_code} readOnly />
                                                                    </div>

                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-12 mb-2 form-group">
                                                        <label className="help" >Complete Address </label>
                                                        <input type="text" className="form-control" value={item.address} readOnly />
                                                    </div>
                                                    <div className="col-12 mb-2 form-group">
                                                        <label className="help" >Description</label>
                                                        <textarea type="text" className="form-control " placeholder="Enater description " readOnly />
                                                    </div>
                                                    <div className="col-12 col-lg-6 form-group">
                                                       <button className="btn btn-success text-white" onClick={openUpdateModal}>Update Order </button>
                                                    </div>
                                                    <div className="col-12 col-lg-6 form-group text-end">
                                                        <Link to='/invoice' state={item} className="btn btn-success text-white">Generate bill </Link>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>


                                </div>
                            </div>

                        </div>
                    </main>

                    <Footer />


                </div>
            </div>
            <Toaster style={{
                transition: "all 10s",
            }} />
            {showModal && (
                <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Update Order</h5>
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
                                        <option value='Confirm'>Confirm order</option>
                                        <option value='Rejected'>Rejected order</option>
                                    </select>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Close</button>
                                <button type="button" className="btn btn-success" onClick={handleUpdate}>{ordersStatus === 'Rejected' ? 'Rejected' : 'Confirm'}</button>
                            </div>
                        </div>
                    </div>
                </div>

            )}

        </>
    )
}

export default OrdersDetails