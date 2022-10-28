import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import { AddressBar } from './addressBar';
import { Cart } from './cart';
import { PriceBar } from './pricebar';
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';


export const CartItems = () => {

    // //if user logged in  need if not logged 
    const [isLoggedUser, setLoggedUser] = useState(false);
    useEffect(() => {
        if (localStorage.getItem('user')) {
            setLoggedUser(false);
        }
        else {
            setLoggedUser(true);
        }
    }, []);

    return (
        <div className="cart_items_main">
            <Grid container spacing={2} className='justify-content'>
                <Grid item md={7} xs={11} >
                    <AddressBar />
                    <Cart />
                </Grid>
                <Grid item md={4} xs={11} >
                    <PriceBar />

                    <div className='place_ordermobile'  >
                        {!isLoggedUser && <div className='place_order_button'>
                            <Link to='/checkoutlist' style={{ textDecoration: "none" }}>
                                <Button variant="contained">PLACE ORDER</Button>
                            </Link>
                        </div>}
                    </div>

                </Grid>
            </Grid>
        </div>
    )
}
