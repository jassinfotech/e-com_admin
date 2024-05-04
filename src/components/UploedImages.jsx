import React, { useState, useEffect } from 'react'
import { Toaster, toast } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import { postData, setAuthToken } from '../helperFile';
import Loader from './Loader';
function UploedImages(ProductID) {
    console.log("ProductID", ProductID.ProductID)
    let navigate = useNavigate();
    const [images, setImages] = useState([]);
    const [loding, setLoding] = useState(false)


    const handleRemoveImage = (index) => {
        const updatedImages = [...images];
        updatedImages.splice(index, 1);
        setImages(updatedImages);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('product_id', ProductID.ProductID);
        images.forEach((image, index) => {
            formData.append(`image${index + 1}`, image);
        });
        try {
            setLoding(true)
            const response = await postData('admin/product-image', formData);
            console.log('Post response:xc', response);
            setLoding(false)
            if (response.status === 'success') {
                toast.success(response.message);
                navigate('/Products');
            }
           
        } catch (error) {
            console.error('Post request error:', error);
        }
    };

    const compressAndCropImage = async (image) => {
        return new Promise((resolve) => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          const maxImageSize = 600; // Set your desired max image size here
    
          const img = new Image();
          img.src = URL.createObjectURL(image);
    
          img.onload = () => {
            let width = img.width;
            let height = img.height;
    
            // Resize image if it exceeds the max size
            if (width > maxImageSize || height > maxImageSize) {
              const aspectRatio = width / height;
    
              if (width > height) {
                width = maxImageSize;
                height = width / aspectRatio;
              } else {
                height = maxImageSize;
                width = height * aspectRatio;
              }
            }
    
            // Set canvas size to the new size
            canvas.width = width;
            canvas.height = height;
    
            // Draw image on the canvas
            ctx.drawImage(img, 0, 0, width, height);
    
            // Convert the canvas content to a blob (compressed image)
            canvas.toBlob((blob) => {
              resolve(blob);
            }, 'image/jpeg', 0.7); // Adjust the quality as needed (0.7 is 70% quality)
          };
        });
      };
    
      const handleImageChange = async (e) => {
        const files = Array.from(e.target.files);
        const allowedFiles = files.slice(0, 4 - images.length);
    
        const compressedImages = await Promise.all(
          allowedFiles.map(async (file) => await compressAndCropImage(file))
        );
    
        setImages([...images, ...compressedImages]);
      };
    










    useEffect(() => {
        const token = localStorage.getItem('token');
        console.log(token)
        if (token) {
            setAuthToken(token);
        }
        else{
            window.location.href = 'login';
        }
    }, []);

    return (
        <>

{loding  && <Loader/> }
            <div className='row form__content'>
                <div class="col-12 col-md-12 ">
                    <h3>You have to maximum 4 image upload in this one time</h3>
                    {images && <div className="row">
                        {images.map((image, index) => (
                            <div key={index} className="uploaded-image col-2 col-sm-2 col-md-2 col-lg-2 d-flex">
                                <img src={URL.createObjectURL(image)} alt={`Uploaded ${index}`} />
                                <button className='remove-image' type="button" onClick={() => handleRemoveImage(index)}>
                                    Remove
                                </button>
                            </div>

                        ))}
                    </div>
                    }
                    <div className="row">
                        <div className="col-12 col-sm-3 col-md-3 mt-5">
                            <div className="form__img">
                                <label>Upload + </label>
                                <input
                                    id="form__img-upload"
                                    name="form__img-upload"
                                    type="file"
                                    accept=".png, .jpg, .jpeg"
                                    multiple
                                    onChange={handleImageChange}
                                    disabled={images.length >= 4}
                                />
                            </div>
                        </div>
                        <div className="col-12 col-lg-9 mt-5">
                            <button className="btn btn-success text-white" onClick={handleSubmit}>Save Product </button>
                        </div>

                    </div>
                </div>
            </div>

            <Toaster style={{
                transition: "all 10s",
            }} />
        </>
    )
}
export default UploedImages
