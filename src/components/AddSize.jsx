import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import { Toaster, toast } from 'react-hot-toast';
import Topheader from './Topheader';
import Footer from './Footer';
import { postData, setAuthToken } from '../helperFile';
import { useNavigate, useLocation } from "react-router-dom";

function AddSize() {
    const location = useLocation()
    const { item } = location.state;
    let navigate = useNavigate();
    const [color, setColor] = useState('');
    const [sizeValue, setSize] = useState('');


    console.log("size", sizeValue)
    const handleSubmit = async () => {
        if (item === 'Color') {
            if (color) {
                try {
                    const response = await postData('admin/add-color', { color });
                    if (response.status === 'success') {
                        toast.success(response.message);
                        navigate('/addproduct');
                    } else {
                        console.log("response.message", response.message)
                    }
                } catch (error) {
                    console.error("Error adding size and color:", error.message);
                    toast.error(error.message);
                }
            } else {
                toast.error("Please fill in both color");
            }
        }

        let size = `${sizeValue}carat`;
        console.log("size ------> ", size);
        if (sizeValue) {
            try {
                const response = await postData('admin/add-size', { size });
                if (response.status === 'success') {
                    toast.success(response.message);
                    navigate('/addproduct');
                } else {
                    console.log("response.message", response.message)
                }
            } catch (error) {
                console.error("Error adding size and color:", error);
                toast.error(error.message);
            }
        } else {
            toast.error("Please fill in both Size");
        }



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
                <Topheader title="Edit Product" />
                <main className="bg-secondary_nwq bg-opacity-25 min-vh-100">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">
                                <div className="form">
                                    <div className="row">
                                        <div className="col-12 col-md-5 mx-auto p-4">
                                            <div className="row form-horizontal mt-4 horizontal_cata">
                                                {item === 'Color' ? <div className="col-12 form-group mb-3">
                                                    <label className="help mb-2"> Add New Color</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        value={color}
                                                        onChange={(e) => setColor(e.target.value)}
                                                        placeholder="Enter Color"
                                                    />
                                                </div> :
                                                    <div className="col-12 form-group mb-3">
                                                        <label className="help mb-2">Add New Size</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            value={sizeValue}
                                                            onChange={(e) => setSize(e.target.value)}
                                                            placeholder="Enter Size"
                                                        />
                                                    </div>
                                                }

                                                <div className="col-12 col-lg-12 form-group mt-3">
                                                    <button className="btn btn-success text-white" onClick={handleSubmit}>
                                                        Save
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
            <Toaster style={{
                transition: "all 10s",
            }} />
        </div>
    );
}

export default AddSize;
