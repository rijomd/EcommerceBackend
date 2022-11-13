import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";

import { Cart, PriceBar, AddressBar } from '../Items';
import { Header, Footer } from '../Components';
import { PaymentOptions } from './paymentOptions';

import { addOrder } from '../_Actions/orderAction';
import axios from '../_helpers/axios';
// import razorpay from "razorpay";

import { Grid } from '@mui/material';
import './order.css';

export const Ordersummery = () => {

    const liStyle = { display: "none" };
    const [loggedUser, setLoggedUser] = useState({});
    const dispatch = useDispatch();
    const addresses = useSelector(state => state.addresses);
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('user')) {
            let user = JSON.parse(localStorage.getItem('user'));
            if (user) {
                setLoggedUser(user);
            }
        }

    }, []);


    // cod just ordering
    const cashOnDelivery = () => {
        let price;
        if (localStorage.getItem('price_bar')) {
            let priceObj = JSON.parse(localStorage.getItem('price_bar'));
            price = priceObj.total_price
        }
        let data = {
            cod_delivery: true,
            order_status: true,
            address_id: addresses.selected_address,
            total_price: price
        }
        dispatch(addOrder(data)).then((res) => {
            navigate("/ordersuccess");
        })
    }


    // razor pay
    // const onlinPayment = () => {
    //     const script = document.createElement("script");
    //     script.src = "https://checkout.razorpay.com/v1/checkout.js";

    //     script.onerror = async () => {
    //         alert("error");
    //     }
    //     script.onload = async () => {
    //         try {
    //             let price;
    //             if (localStorage.getItem('price_bar')) {
    //                 let priceObj = JSON.parse(localStorage.getItem('price_bar'));
    //                 price = priceObj.total_price
    //             }
    //             let data = {
    //                 total_price: price + '00'
    //             }
    //             let response = await axios.post("/createOrder", data);
    //             console.log(response, "response");
    //             const { amount, id, order_id, paymentId } = response.data;
    //             let key = await axios.post("/razorpay_key", {});
    //             console.log(key, "key");

    //             const options = {
    //                 "key": "YOUR_KEY_ID", // Enter the Key ID generated from the Dashboard
    //                 "amount": amount.toString(),
    //                 "currency": "INR",
    //                 "name": "G-shop",
    //                 "description": "Online Payment",
    //                 // "image": "https://example.com/your_logo",
    //                 "order_id": order_id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    //                 "handler": async function (response) {
    //                     let query = {
    //                         razorpay_payment_id: response.razorpay_payment_id,
    //                         razorpay_order_id: response.razorpay_order_id,
    //                         razorpay_signature: response.razorpay_signature,
    //                         address_id: addresses.selected_address,
    //                         total_price: price
    //                     }
    //                     dispatch(addOrder(query)).then((res) => {
    //                         navigate("/ordersuccess");
    //                     })
    //                 },
    //                 "theme": {
    //                     "color": "#3399cc"
    //                 }
    //             };

    //             let rzp1 = new razorpay(options);
    //             rzp1.open();
    //         }
    //         catch (error) {
    //             alert("error");
    //         }
    //         document.body.appendChild(script);
    //     }
    // }


    return (
        <div className="">
            <Header />

            <Grid container spacing={2} className='justify-content' sx={{ marginTop: "1rem" }}>
                <Grid item md={7} xs={11} >
                    <div className='login_ordersummary'>
                        <h1>LOGIN</h1>
                        <div>
                            <span className='login_ordersummar_para'>{loggedUser.name}</span>
                            <span style={{ color: "#6d7170" }}>{loggedUser.phone}</span>
                        </div>
                    </div>
                    <div className='delivery_addresses'>
                        <p>delivery address</p>
                    </div>
                    <AddressBar />
                    <div className='order_summer'>
                        <p>Order summery</p>
                    </div>
                    <div style={{ backgroundColor: "#fff" }}>
                        <Cart classStyle={liStyle} />
                    </div>
                    <div className='order_summer'>
                        <p>Payment Option</p>
                    </div>
                    <div style={{ backgroundColor: "#fff" }}>
                        {/* <PaymentOptions cashOnDelivery={cashOnDelivery} onlinPayment={onlinPayment} /> */}
                    </div>
                </Grid>
                <Grid item md={4} xs={11} >
                    <PriceBar />
                </Grid>
            </Grid>

            <Footer />
        </div>
    )
}
