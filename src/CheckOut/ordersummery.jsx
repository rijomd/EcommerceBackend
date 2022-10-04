import React, { useState, useEffect } from 'react'
import { Cart } from '../Items';
import { PriceBar } from '../Items';
import { Grid } from '@mui/material';
import { AddressBar } from '../Items';
import { Header, Footer } from '../Components';
import './order.css'

export const Ordersummery = () => {

    const liStyle = { display: "none" };
    const [loggedUser, setLoggedUser] = useState({});
    useEffect(() => {
        if (localStorage.getItem('user')) {
            let user = JSON.parse(localStorage.getItem('user'));
            if (user) {
                setLoggedUser(user);
            }
        }

    }, []);



    return (
        <div className="">
            <Header />

            <Grid container spacing={2} className='justify-content' sx={{ marginTop: "1rem" }}>
                <Grid item md={7} xs={11} >
                    <div className='login_ordersummary'>
                        <h1>LOGIN</h1>
                        <div>
                            <span className='login_ordersummar_para'>{loggedUser.name}</span>
                            <span style={{color:"#6d7170"}}>{loggedUser.phone}</span>
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
                </Grid>
                <Grid item md={4} xs={11} >
                    <PriceBar />
                </Grid>
            </Grid>

            <Footer />
        </div>
    )
}
