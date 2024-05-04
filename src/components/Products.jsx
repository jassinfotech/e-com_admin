import React, { useState, useEffect } from 'react'
import Sidebar from './Sidebar'
import Topheader from './Topheader'
import Footer from './Footer';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
import { postData, getData, setAuthToken, BASE_URL } from '../helperFile';
import { Link } from 'react-router-dom';
import Loader from './Loader';
function Products() {
    const [Productslist, setProducts] = useState([])
    const [productId, setProductId] = useState('');
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [loding, setLoding] = useState(true)
    const handlegetProductsRequest = async () => {
        try {
            const response = await getData('admin/products');
            console.log("get-products", response)
            setProducts(response.products)
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


    const handleDelete = async () => {
        setLoding(true)
        let data = { product_id: productId }
        try {
            const response = await postData('admin/delete-product', data);
            console.log('Delete response:', response);
            toast.success(response.message);
            handlegetProductsRequest();

            setShowDeleteModal(false);

        } catch (error) {
            console.error('Delete request error:', error);
        }
    };

    const openDeleteModal = (id) => {
        setProductId(id);
        setShowDeleteModal(true);
    };


    return (
        <div>

            {loding && <Loader />}
            <div class="wrapper">
                <div id="overlay"></div>
                <Sidebar />
                <div class="content">
                    <Topheader title={'Product list'} />
                    <main class="bg-secondary_nwq bg-opacity-25 min-vh-100">
                        <div class="container-fluid p-3 p-md-4">
                            <div class="d-flex flex-column flex-md-row justify-content-between align-items-center">
                                <div class="text-secondary lead fw-normal" id="curr_date_time"></div>
                            </div>

                            <div class="row g-4">
                                <div class="col-lg-12 col-md-12">
                                    <div className="table-responsive">
                                        <table className="table table-hover">
                                            <thead>
                                                <tr>
                                                    <th className="border-top-0">Images</th>
                                                    <th className="border-top-0">ID</th>
                                                    <th className="border-top-0">Name</th>
                                                    <th className="border-top-0">Sale Price</th>
                                                    <th className="border-top-0">Regular Price</th>
                                                    <th className="border-top-0">Category</th>
                                                    <th className="border-top-0">Status</th>
                                                    <th className="border-top-0">brand</th>
                                                    <th className="border-top-0">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {Productslist.map(product => (

                                                    <tr key={product.product_id}>
                                                        <td>
                                                            <div className="main__user">
                                                                <div className="main__avatar">
                                                                    <img src={product.image1_url} alt={product.image1_url} />
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td><div className="txt-oflo">{product.product_id}</div></td>
                                                        <td><div className="txt-oflo">{product.name}</div></td>


                                                        <td><div className="txt-oflo">₹ {product.price}</div></td>
                                                        <td><div className="txt-oflo">₹ {product.regular_price}</div></td>
                                                        <td><div className="txt-oflo">{product.category}</div></td>
                                                        <td><div className={`txt-oflo ${product.sell_online === 'TRUE' ? 'txt-oflo' : ''}`}>{product.sell_online}</div></td>
                                                        <td><div className="main__table-text">{product.brand}</div></td>
                                                        <td>
                                                            <div className="main__table-text">
                                                                <Link to="/Editproduct" state={{ item: product }} className="btn btn-success text-white">
                                                                    <i className="fa-solid fa-eye"></i>
                                                                </Link>
                                                                <button onClick={() => openDeleteModal(product.product_id)} className="btn btn-success text-white">
                                                                    <i className="fa-solid fa-trash-can"></i>
                                                                </button>
                                                                <Link to="/Editproduct" state={{ item: product }} className="btn btn-success text-white">
                                                                    <i className="fa-solid fa-pen-to-square"></i>
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

export default Products