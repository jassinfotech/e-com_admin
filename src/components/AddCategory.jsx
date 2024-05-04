import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import { Toaster, toast } from 'react-hot-toast';
import Topheader from './Topheader';
import Footer from './Footer';
import { postData, setAuthToken } from '../helperFile';
import { useNavigate } from "react-router-dom";
function AddCategory() {
    let navigate = useNavigate();
    const [mainCategory, setMainCategory] = useState('');
    const [subCategory, setSubCategory] = useState('');
    const [image, setImage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!mainCategory || !subCategory || !image) {
            toast.error('Please fill in all fields and upload an image.');
            return;
        }

        const formData = new FormData();
        formData.append('category', mainCategory);
        formData.append('maincategory', mainCategory);
        formData.append('subcategory', subCategory);
        formData.append('categoryImage', image);

        try {
            const response = await postData('admin/add-category', formData);
            console.log('Post response:', response);
            if (response.status === 'success') {
                toast.success(response.message);
                navigate('/Products');
            }
        } catch (error) {
            console.error('Post request error:', error);
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
        }
    };
    const handleDeleteImage = () => {
        setImage(null);
    };
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setAuthToken(token);
        }
        else{
            window.location.href = 'login';
        }
    }, []);

    return (
        <div className="wrapper">
            <div id="overlay"></div>
            <Sidebar />
            <div className="content">
                <Topheader title="Add New Category" />
                <main className="bg-secondary_nwq bg-opacity-25 min-vh-100">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">
                                <div className="form">
                                    <div className="row">
                                        <div className="col-12 col-md-5 mx-auto p-4">
                                            <div className="row form-horizontal mt-4 horizontal_cata">
                                                <div className="col-12 form-group mb-3">
                                                    <label className="help mb-2">Main Category</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        value={mainCategory}
                                                        onChange={(e) => setMainCategory(e.target.value)}
                                                        placeholder="Enter Product Name"
                                                    />
                                                </div>

                                                <div className="col-12 col-lg-12 mt-3 mb-3 form-group">
                                                    <label className="help mb-2">Sub Category</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        value={subCategory}
                                                        onChange={(e) => setSubCategory(e.target.value)}
                                                        placeholder="Enter Subcategory Name"
                                                    />
                                                </div>

                                                <div className="col-12 col-lg-12 mt-3 form-group mb-3">
                                                    <label className="help mb-2">{!image ? 'Upload' : 'Delete'}</label>
                                                    {image ? (
                                                        <div className='image_box'>
                                                            <div className='cata_gy_img position-relative'>
                                                                <img
                                                                    src={URL.createObjectURL(image)}
                                                                    alt="Uploaded"
                                                                    style={{ width: '100%', marginTop: '10px', }}
                                                                />
                                                                <button className="btn btn-danger mt-2  pos_absolute" onClick={handleDeleteImage}>
                                                                    X
                                                                </button>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <div className='image_box'>
                                                            <input
                                                                type="file"
                                                                accept=".png, .jpg, .jpeg"
                                                                onChange={handleImageChange}
                                                            />
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="col-12 col-lg-12 form-group mt-3">
                                                    <button className="btn btn-success text-white" onClick={handleSubmit}>
                                                    Submit
                                                    </button>
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
    );
}

export default AddCategory;