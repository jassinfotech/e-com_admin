import React, { useState, useEffect } from 'react'
import { Toaster, toast } from 'react-hot-toast';
import Sidebar from './Sidebar'
import Topheader from './Topheader'
import Footer from './Footer'
import { useLocation, useNavigate } from 'react-router-dom';
import { postData, getData, setAuthToken } from '../helperFile';
import Loader from './Loader';
function Editproduct() {
    let navigate = useNavigate();
    const location = useLocation()
    const { item } = location.state
    console.log("item", item)
    const [productName, setProductName] = useState('');
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
        setLoding(true)
        try {
            const data = {
                product_id: item.product_id,
                name: productName,
                brand: 'brand',
                main_category: selectedMainCategory,
                category: selectedMainCategory,
                sub_category: selectedSubCategory,
                description: description,
                color: selectedColor,
                size: selectedSize,
                price: salePrice,
                regular_price: regularPrice
            };

            console.log('data', data);
            const response = await postData('admin/update-product-details', data); // Assuming this is the correct endpoint
            console.log('Post response:', response);
            setLoding(true)
            if (response.status === 'success') {
               setLoding(true)
                toast.success(response.message);
                navigate('/Products');
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
        console.log(token);
        if (token) {
            setAuthToken(token);
            handleGetsizesRequest();
            handleGetcolorsRequest();
            handlegetcategoriesRequest();
            if (item) {
                setProductName(item.name || '');
                setSelectedMainCategory(item.main_category || '');
                setSelectedSubCategory(item.sub_category || '');
                setDescription(item.description || '');
                setSelectedColor(item.color || '');
                setSelectedSize(item.size || '');
                setSalePrice(item.price || '');
                setRegularPrice(item.regular_price || '');
            }
        }
        else {
            window.location.href = 'login';
        }
    }, [item]);
    return (
        <>
            {loding && <Loader />}
            <div class="wrapper">
                <div id="overlay"></div>
                <Sidebar />
                <div class="content">
                    <Topheader title="Edit Product" />
                    <main class="bg-secondary_nwq bg-opacity-25 min-vh-100">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-12">
                                    <div className="form">
                                        <div className="row">
                                            <div className="col-12 col-md-12 ">

                                                <div className="row form-horizontal mt-4">
                                                    <div className="col-12 form-group">
                                                        <label className="help">Prduct Name </label>
                                                        <input type="text" className="form-control" value={productName} onChange={(e) => setProductName(e.target.value)} placeholder="Enater Prduct Name" />
                                                    </div>

                                                    <div className="col-12 col-sm-6 col-lg-6 form-group">
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

                                                    <div className="col-12 col-sm-6 col-lg-6 form-group">
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



                                                    <div className="col-12 col-lg-6 form-group">
                                                        <label className="help">Color </label>
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
                                                    <div className="col-12 col-lg-6 form-group">
                                                        <label className="help" >Size </label>
                                                        <select className="form-control" id="size" name="size" value={selectedSize} onChange={handleSizeChange}>
                                                            <option value="">Select Size</option>
                                                            {sizes.map((size) => (
                                                                <option key={size.size} value={size.size}>
                                                                    {size.size}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                    <div className="col-12 col-lg-6 mt-3 form-group">
                                                        <label className="help" >Sale Price </label>
                                                        <input type="number" className="form-control" value={salePrice} onChange={(e) => setSalePrice(e.target.value)} placeholder="sale price" />

                                                    </div>
                                                    <div className="col-12 col-lg-6 mt-3 form-group">
                                                        <label className="helpl" >Regular Price </label>
                                                        <input type="number" className="form-control" value={regularPrice} onChange={(e) => setRegularPrice(e.target.value)} placeholder="regular price" />

                                                    </div>
                                                    <div className="col-12 mb-2 form-group">
                                                        <label className="help" >Description</label>
                                                        <textarea type="text" className="form-control " value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Enater description " />
                                                    </div>


                                                    <div className="col-12 col-lg-6 form-group">
                                                        <button className="btn btn-success text-white" onClick={handleSubmit}>Save Product </button>
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
        </>
    )
}

export default Editproduct