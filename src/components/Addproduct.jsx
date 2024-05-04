import React, { useState, useEffect } from 'react'
import { Toaster, toast } from 'react-hot-toast';
import Sidebar from './Sidebar'
import Topheader from './Topheader'
import Footer from './Footer'
import { postData, getData, setAuthToken } from '../helperFile';
import UploedImages from './UploedImages'
import { Link } from 'react-router-dom';
import Loader from './Loader';
function Addproduct() {
    const [productName, setProductName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [description, setDescription] = useState('');
    const [salePrice, setSalePrice] = useState('');
    const [regularPrice, setRegularPrice] = useState('');
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedColor, setSelectedColor] = useState('');
    const [selectedSubCategory, setSelectedSubCategory] = useState('');
    const [selectedMainCategory, setSelectedMainCategory] = useState('');
    const [sizes, setSizelist] = useState([])
    const [colors, setColorsList] = useState([])
    const [mainCategories, setmainCategories] = useState([])
    const [subCategories, setsubCategories] = useState([])
    const [ProductID, setnewProductID] = useState(false)
    const [uploadImages, setUploardImages] = useState(false)

    const [loding, setLoding] = useState(false)
    const handleSizeChange = (e) => {
        setSelectedSize(e.target.value);
    };

    const handleColorChange = (e) => {
        setSelectedColor(e.target.value);
    };

    const handleSubCategoryChange = (e) => {
        setSelectedSubCategory(e.target.value);
    };

    const handleMainCategoryChange = (e) => {
        setSelectedMainCategory(e.target.value);
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        // Validate each field
        if (!productName || !quantity || !selectedMainCategory || !selectedSubCategory || !description || !selectedColor || !selectedSize || !salePrice || !regularPrice) {
            alert('Please fill in all fields.');
            return;
        }

        try {
            setLoding(true)

            const data = {
                name: productName,
                quantity: quantity,
                sellonline: true,
                brand: 'brand',
                maincategory: selectedMainCategory,
                category: selectedMainCategory,
                subcategory: selectedSubCategory,
                description: description,
                color: selectedColor,
                size: selectedSize,
                price: salePrice,
                regularPrice: regularPrice
            };

            console.log('data', data);
            const response = await postData('admin/product-details', data);
            console.log('Post response:', response);
            setLoding(false)
            if (response.status === 'success') {
                console.log(response.newProductID, 'response.newProductID')
                setnewProductID(response.newProductID)
                
                setUploardImages(true)
               
                toast.error(response.message);
            } else {
                toast.error(response.message);
            }
        } catch (error) {
            console.error('Post request error:', error);

        }
    };

    const handleGetsizesRequest = async () => {
        try {
            const response = await getData('admin/get-sizes');
            console.log('Get response: get-sizes api -------------------------', response);
            console.log("response size ", response.sizes)
            setSizelist(response.sizes)
        } catch (error) {
            console.error('Get request error:', error);
        }
    };

    const handleGetcolorsRequest = async () => {
        try {
            const response = await getData('admin/get-colors');
            console.log('Get response: get-colors api -------------------------', response);
            console.log("get-colors", response)
            setColorsList(response.colors)

        } catch (error) {
            console.error('Get request error:', error);
        }
    };

    const handlegetcategoriesRequest = async () => {
        try {
            const response = await getData('admin/get-categories');
            console.log('Get response: get-categories api -------------------------', response);
            console.log("get-categories", response)
            setmainCategories(response.maincategory)
            setsubCategories(response.subcategory)


        } catch (error) {
            console.error('Get request error:', error);
        }
    };




    useEffect(() => {
        const token = localStorage.getItem('token');
        console.log(token)
        if (token) {
            setAuthToken(token);
            handleGetsizesRequest()
            handleGetcolorsRequest()
            handlegetcategoriesRequest()
        }
        else{
            window.location.href = 'login';
        }
    }, []);

 
    return (
        <>
          {loding  && <Loader/> }
            <div class="wrapper">
                <div id="overlay"></div>
                <Sidebar />
                <div class="content">
                    <Topheader title={'Add Product'} />
                    <main class="bg-secondary_nwq bg-opacity-25 min-vh-100">
                        <div class="container-fluid p-3 p-md-4">
                            <div class="d-flex flex-column flex-md-row justify-content-between align-items-center">
                                <div class="text-secondary lead fw-normal" id="curr_date_time"></div>
                            </div>

                            <div class="row g-4">
                                <div class="col-lg-12">
                                    <div class="card shadow">
                                        <div class="card-header">
                                            <h4 class="text-secondary fw-bold">Add New Product</h4>
                                        </div>
                                        <div class="card-body">
                                            <div class="row g-4">
                                                <div className="col-12 col-md-12 ">
                                                    {uploadImages ?
                                                        <UploedImages ProductID={ProductID} /> : <>
                                                            <div className="row form-horizontal mt-4">
                                                                <div className="col-12 col-sm-6 col-lg-6 form-group mb-3">
                                                                    <label className="help">Product Name</label>
                                                                    <input type="text" className="form-control" value={productName} onChange={(e) => setProductName(e.target.value)} placeholder="Enater product Name" />
                                                                </div>
                                                                <div className="col-12 col-sm-6 col-lg-6 form-group mb-3">
                                                                    <label className="help">Product quantity</label>
                                                                    <input type="number" className="form-control" value={quantity} onChange={(e) => setQuantity(e.target.value)} placeholder="Enater product quantity" />
                                                                </div>

                                                                <div className="col-12 col-sm-6 col-lg-6 form-group mb-3">
                                                                    <label className="help">Main Category </label>
                                                                    <select
                                                                        className="form-control"
                                                                        id="mainCategory"
                                                                        name="mainCategory"
                                                                        value={selectedMainCategory}
                                                                        onChange={handleMainCategoryChange}
                                                                    >
                                                                        <option value="">Select Main Category</option>
                                                                        {mainCategories.map((mainCategory) => (
                                                                            <option
                                                                                key={mainCategory}
                                                                                value={mainCategory}

                                                                            >
                                                                                {mainCategory}
                                                                            </option>
                                                                        ))}
                                                                    </select>
                                                                </div>

                                                                <div className="col-12 col-sm-6 col-lg-6 form-group mb-3" >
                                                                    <label className="help" >Sub Category </label>
                                                                    <select
                                                                        className="form-control"
                                                                        id="subCategory"
                                                                        name="subCategory"
                                                                        value={selectedSubCategory}
                                                                        onChange={handleSubCategoryChange}
                                                                    >
                                                                        <option value="">Select Sub Category</option>
                                                                        {subCategories.map((subCategory) => (
                                                                            <option key={subCategory} value={subCategory}>
                                                                                {subCategory}
                                                                            </option>
                                                                        ))}
                                                                    </select>
                                                                </div>



                                                                <div className="col-12 col-lg-6 form-group mb-3 position-relative">
                                                                    <label className="help">Color </label>
                                                                    <Link to={'/add-size'} state={{ item: 'Color' }} className="pulsing-icon"><i class="fa-solid fa-circle-plus"></i></Link>
                                                                    <select
                                                                        className="form-control"
                                                                        id="color"
                                                                        name="color"
                                                                        value={selectedColor}
                                                                        onChange={handleColorChange}
                                                                    >
                                                                        <option value="">Select Color</option>
                                                                        {colors.map((color) => (
                                                                            <option key={color.color} value={color.color} style={{ color: color.color }}>
                                                                                {color.color}
                                                                            </option>
                                                                        ))}
                                                                    </select>
                                                                </div>
                                                                <div className="col-12 col-lg-6 form-group mb-3 position-relative">
                                                                    <label className="help" >Size </label>
                                                                    <Link to={'/add-size'} state={{ item: 'Size' }} className="pulsing-icon"><i class="fa-solid fa-circle-plus"></i></Link>
                                                                    <select className="form-control" id="size" name="size" value={selectedSize} onChange={handleSizeChange}>
                                                                        <option value="">Select Size</option>
                                                                        {sizes.map((size) => (
                                                                            <option key={size.size} value={size.size}>
                                                                                {size.size}
                                                                            </option>
                                                                        ))}
                                                                    </select>
                                                                </div>
                                                                <div className="col-12 col-lg-6 mt-3 form-group mb-3">
                                                                    <label className="help" >Sale Price </label>
                                                                    <input type="number" className="form-control" value={salePrice} onChange={(e) => setSalePrice(e.target.value)} placeholder="sale price" />

                                                                </div>
                                                                <div className="col-12 col-lg-6 mt-3 form-group">
                                                                    <label className="helpl" >Regular Price </label>
                                                                    <input type="number" className="form-control" value={regularPrice} onChange={(e) => setRegularPrice(e.target.value)} placeholder="regular price" />

                                                                </div>
                                                                <div className="col-12 mb-2 form-group mb-3">
                                                                    <label className="help" >Description</label>
                                                                    <textarea type="text" className="form-control " value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Enater description " />
                                                                </div>


                                                                <div className="col-12 col-lg-6 form-group mb-3">
                                                                    <button className="btn btn-success text-white" onClick={handleSubmit}>Save Product </button>
                                                                </div>
                                                            </div></>}
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
    )
}

export default Addproduct