import React, { useState, useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import Sidebar from './Sidebar';
import Topheader from './Topheader';
import Footer from './Footer';
import { postData, getData, setAuthToken } from '../helperFile';
import Loader from './Loader';

function Addbanner() {
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState('');
    const [buttonText, setButtonText] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [banners, setBanners] = useState([]);
    console.log("banners.length", banners.length)

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setAuthToken(token);
        } else {
            window.location.href = '/login';
        }
    }, []);

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleRemoveImage = (e) => {
        setImage('');
    };
    const handleSubmit = async () => {
        try {
            setLoading(true);
            const formData = new FormData();
            formData.append('image', image);
            formData.append('title', title);
            formData.append('buttonText', buttonText);
            formData.append('description', description);
            const response = await postData('admin/add-app-banner', formData);
            console.log("first ,response", response)
            setTitle('');
            setButtonText('');
            setDescription('');
            setImage(null);
            handleGetBanners()

        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };
    const handleGetBanners = async () => {
        try {
            const response = await getData('admin/get-banners');
            console.log('Get response: get-banners api -------------------------', response);
            console.log("response banners ", response)
            setBanners(response.banners)

        } catch (error) {
            console.error('Get request error:', error);
        }
    };

    const handleDeleteBanner = async (bannerId) => {
        console.log("bannerId" , bannerId)
        try {
            const response = await postData('admin/delete-banner', { bannerId });
            if (response.status === 'success') {
                setBanners(banners.filter(banner => banner.id !== bannerId));
                toast.success('Banner deleted successfully');
            } else {
                toast.error('Failed to delete banner');
            }
        } catch (error) {
            console.error(error);
            toast.error('An error occurred while deleting the banner');
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        console.log(token)
        if (token) {
            setAuthToken(token);
            handleGetBanners()
        }
        else {
            window.location.href = 'login';
        }
    }, []);


    return (
        <>
            <Toaster />
            {loading && <Loader />}
            <div className="wrapper">
                <div id="overlay"></div>
                <Sidebar />
                <div className="content">
                    <Topheader title="Add Product" />
                    <main className="bg-secondary_nwq bg-opacity-25 min-vh-100">
                        <div className="container-fluid p-3 p-md-4">
                            <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
                                <div className="text-secondary lead fw-normal" id="curr_date_time"></div>
                            </div>
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="card shadow">
                                        <div className="card-header">
                                            <h4 className="text-secondary fw-bold">Add New Banner</h4>
                                        </div>
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col-12 col-md-12">
                                                    <h3>You can upload one image at a time</h3>
                                                    <div className="row">
                                                        {banners ? (
                                                            banners.map(banner => (
                                                                <div key={banner.id} className="col-12 col-md-4 col-lg-4">
                                                                    <img src={banner.imageUrl} alt={banner.title} className='w-100' />
                                                                    <h3>{banner.title}</h3>
                                                                    <p>{banner.description}</p>
                                                                    <button onClick={() => handleDeleteBanner(banner.id)}>Delete</button>
                                                                </div>
                                                            ))
                                                        ) : null}
                                                    </div>
                                                    {banners.length <='3' ? (
                                                        <div className="row">
                                                            <div className="col-12 col-sm-3 col-md-3 mt-5">
                                                                <div className="form__img">
                                                                    <label htmlFor="form__img-upload">Upload Banner</label>
                                                                    <input
                                                                        id="form__img-upload"
                                                                        name="form__img-upload"
                                                                        type="file"
                                                                        accept=".png, .jpg, .jpeg"
                                                                        onChange={handleImageChange}
                                                                    />
                                                                    {image && (
                                                                        <div className="uploaded-image">
                                                                            <img src={URL.createObjectURL(image)} alt="Uploaded" />
                                                                            <button className="remove-image" type="button" onClick={handleRemoveImage}>
                                                                                Remove
                                                                            </button>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </div>
                                                            <div className="col-12 col-lg-12 mt-3 form-group mb-3">
                                                                <label htmlFor="title">Title</label>
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    id="title"
                                                                    value={title}
                                                                    onChange={(e) => setTitle(e.target.value)}
                                                                    placeholder="Enter title"
                                                                />
                                                            </div>
                                                            <div className="col-12 col-lg-12 mt-3 form-group mb-3">
                                                                <label htmlFor="buttonText">Button Text</label>
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    id="buttonText"
                                                                    value={buttonText}
                                                                    onChange={(e) => setButtonText(e.target.value)}
                                                                    placeholder="Enter button text"
                                                                />
                                                            </div>
                                                            <div className="col-12 mb-2 form-group mb-3">
                                                                <label htmlFor="description">Description</label>
                                                                <textarea
                                                                    className="form-control"
                                                                    id="description"
                                                                    value={description}
                                                                    onChange={(e) => setDescription(e.target.value)}
                                                                    placeholder="Enter description"
                                                                />
                                                            </div>
                                                            <div className="col-12 col-lg-9 mt-5">
                                                                <button
                                                                    className="btn btn-success text-white"
                                                                    onClick={handleSubmit}>
                                                                    Save Banner
                                                                </button>
                                                            </div>
                                                        </div>
                                                    ) : null}

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
        </>
    );
}

export default Addbanner;
