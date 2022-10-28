import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Grid } from '@mui/material';
import '../Items/item.css'
import images from "../_Images/order.png";

import { getOrder } from '../_Actions/orderAction';
import { Header, Footer } from '../Components';
import { useMediaQuery } from '@react-hook/media-query';


export const MyOrder = () => {

    const dispatch = useDispatch();
    const order = useSelector(state => state.order);
    const isMobile = useMediaQuery('(max-width: 830px)'); //for isDesktop only

    useEffect(() => {
        dispatch(getOrder());
    }, []);

    const renderMyOrder = () => {
        let myarray = [];
        console.log(order.orderarray, "order.orderarray");

        if (order.orderarray.length > 0 && order.orderarray[0].product_varient) {
            for (let cart of order.orderarray) {
                if (cart.product_varient && cart.product_varient.length > 0) {
                    myarray.push(
                        <Grid container spacing={2} className='order_block'>
                            <Grid item md={8} xs={12} >
                                <Grid container spacing={2} >
                                    <Grid item xs={4} className="cart_imgblock" >
                                        <img src={cart.product_varient && cart.product_varient[0].productPictures[0]} />
                                    </Grid>
                                    <Grid item xs={8}  >
                                        <div className='head_prduct'>
                                            <h3>{cart.product_varient[0].varient_name}</h3>
                                        </div>
                                        <div className="seller_crt">
                                            <h4>Seller :{cart.user_id.name} </h4>
                                        </div>
                                        <div className='cart_price'>
                                            <p className='cart_p2'>Total Price </p>
                                            <p className='cart_p2'> ₹{cart.total_price}</p>
                                        </div>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid >
                    )
                }
            }
        }
        return myarray;
    }

    return (
        <div className='my-orders'>
            {isMobile && <Header />}

            <div className='wishlist_main_head'>
                <p>My Orders</p>
            </div>
            {order.orderarray.length > 0 ? renderMyOrder() :
                <div className="no_item">
                    <img src={images} alt="hello" />
                </div>
            }

            {isMobile && <Footer />}

        </div>
    )
}

