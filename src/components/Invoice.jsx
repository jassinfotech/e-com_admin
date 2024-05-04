import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

function Invoice() {
    const location = useLocation()
    let navigate = useNavigate();
    const { item } = location.state
    console.log("item", item)
    const [invoiceData, setInvoiceData] = useState({
        companyName: 'Shivay Gems',
        companyWebsite: 'www.shivaygems.com',
        shippingAddress: {
            name: 'Mr Raj Kumar',
            contactNo: '9780080903',
            state: 'Punjab',
            city: 'Abohar',
            zipCode: '152116',
            location: 'Shivay Gems, Ward no 25, Near Chugh Dharmshala, Anupgarh disst. Anupgarh, Rajasthan 335701',
        },
        billingAddress: {
            name: 'Shivay Gems',
            contactNo: '(000)-(0000)-(000)',
            state: 'Rajasthan',
            city: 'Anupgarh',
            zipCode: '335701',
            location: 'Shivay Gems, Ward no 25, Near Chugh Dharmshala, Anupgarh disst. Anupgarh, Rajasthan 335701',
        },
        products: [
            {
                name: 'Bicolour Sapphire – 5.40 Carat',
                quantity: 2,
                category: 'Sapphire',
                color: 'Blue',
                size: '5.40 Carat',
                price: 67500.00,
            },
        ],
        gst: 250.00,
        deliveryCharges: 100.00,
        totalAmount: 1350.00,
    });

    const handlePrint = () => {
        window.print();
    };

    return (
        <div>
            <div className="container-fluid">
                <div className="invoice">
                    <div className="header-invoice">
                        <img src="/assets/logo.png" alt="Company Logo" className="logo-invoice" />
                        <div className="company-name">Shivay Gems</div>
                        <p>www.shivaygems.com</p>
                    </div>
                    <div className="address">
                        <div className='ship_address'>
                            <h3>Shipping Address</h3>
                            <h6>Name : {item.name}</h6>
                            <h6>Contact No: {item.contactNo}</h6>
                            <h6>State: {item.state}</h6>
                            <h6>City: {item.city}</h6>
                            <h6>Zip Code : {item.zipCode}</h6>
                            <p>{item.location}</p>
                        </div>
                        <div className='bill_address'>
                            <h3>Billing Address</h3>
                            <h6>Name : {item.name}</h6>
                            <h6>Contact No: {item.contactNo}</h6>
                            <h6>State: {item.state}</h6>
                            <h6>City: {item.city}</h6>
                            <h6>Zip Code : {item.zipCode}</h6>
                            <p>{item.location}</p>
                        </div>
                    </div>
                    <table className="product-table">
                        <thead>
                            <tr>
                                <th>Name of Product</th>
                                <th>Quantity</th>
                                <th>Category</th>
                                <th>Color</th>
                                <th>Size</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {invoiceData.products.map((product, index) => (
                                <tr key={index}>
                                    <td>{product.name}</td>
                                    <td>{product.quantity}</td>
                                    <td>{product.category}</td>
                                    <td>{product.color}</td>
                                    <td>{product.size}</td>
                                    <td>₹{product.price.toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan="5">GST (25%)</td>
                                <td>₹{invoiceData.gst.toFixed(2)}</td>
                            </tr>
                            <tr>
                                <td colSpan="5">Delivery Charges</td>
                                <td>₹{invoiceData.deliveryCharges.toFixed(2)}</td>
                            </tr>
                            <tr className="total-row">
                                <td colSpan="5">Total Amounts</td>
                                <td>₹{invoiceData.totalAmount.toFixed(2)}</td>
                            </tr>
                        </tfoot>
                    </table>
                    <div className="footer-invoice">
                       <p onClick={handlePrint}>Thank you for your purchase!</p>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Invoice;
