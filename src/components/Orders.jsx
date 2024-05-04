import React, { useState, useEffect } from 'react'
import Sidebar from './Sidebar'
import Topheader from './Topheader'
import Footer from './Footer';
import OrderTable from './OrderTable';
function Orders() {
  

    return (
        <div>
            <div class="wrapper">
                <div id="overlay"></div>
                <Sidebar />
                <div class="content">
                    <Topheader title={'Product list'} />
                    <main class="bg-secondary_nwq bg-opacity-25 min-vh-100">
                        <div class="container-fluid p-3 p-md-4">
                           <OrderTable/>
                        </div>
                    </main>
                    <Footer />


                </div>
            </div>



        </div>
    )
}

export default Orders