import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";

import { Cart, PriceBar, AddressBar } from '../Items';
import { Header, Footer } from '../Components';
import { PaymentOptions } from './paymentOptions';

import { addOrder } from '../_Actions/orderAction';

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
                        <PaymentOptions cashOnDelivery={cashOnDelivery} />
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
