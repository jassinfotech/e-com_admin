import React, { useState, useEffect } from 'react'
import Sidebar from './Sidebar'
import Topheader from './Topheader'
import Footer from './Footer';
import { getData, setAuthToken } from '../helperFile';
import { Link } from 'react-router-dom';
import Loader from './Loader';
function Category() {
    const [categoryslist, setCategorys] = useState([])
    const [loding, setLoding] = useState(true)
    const handlegetProductsRequest = async () => {
        try {
            const response = await getData('admin/categorys');
            console.log("get-categorys", response)
            setCategorys(response.results)
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



    return (
        <div>
            {loding && <Loader />}
            <div class="wrapper">
                <div id="overlay"></div>
                <Sidebar />
                <div class="content">
                    <Topheader title={'Category list'} />
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
                                                    <th className="border-top-0">Category Images</th>
                                                    <th className="border-top-0">Category</th>
                                                    <th className="border-top-0">Sub Category</th>
                                                    <th className="border-top-0">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {categoryslist.map(category => (

                                                    <tr key={category.id}>
                                                        <td>
                                                            <div className="main__avatar">
                                                                <img src={category.image1_url} alt={category.image1_url} />

                                                            </div>
                                                        </td>
                                                        <td><div className="txt-oflo">{category.category}</div></td>
                                                        <td><div className="main__table-text">{category.subcategory}</div></td>
                                                        <td>
                                                            <div className="main__table-text">
                                                                <Link to="/Editproduct" state={{ item: category }} className="btn btn-success text-white">
                                                                    <i className="fa-solid fa-eye"></i>
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

export default Category