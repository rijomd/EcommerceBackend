import React from 'react'
import { Grid } from '@mui/material';
import { AddressBar } from './addressBar';
import { Cart } from './cart';
import { PriceBar } from './pricebar';


export const CartItems = () => {

    return (
        <div  className="cart_items_main">
            <Grid container spacing={2} className='justify-content'>
                <Grid item md={7} xs={11} >
                    <AddressBar />
                    <Cart />
                </Grid>
                <Grid item md={4} xs={11} >
                    <PriceBar />
                </Grid>
            </Grid>
        </div>
    )
}
