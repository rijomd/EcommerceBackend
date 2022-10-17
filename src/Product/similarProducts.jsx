import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useMediaQuery } from '@react-hook/media-query';

import { varientList } from '../_Actions/productactions';
import { addWishlists, getWishlists } from '../_Actions/itemactions';

import { Products } from "./products";
import { LoginModal } from "../Container";

import { Grid, Typography } from '@mui/material';
import './product.css'

export const SimilarProducts = (props) => {

    const { categoryid ,id} = props;
    const dispatch = useDispatch();

    const product = useSelector(state => state.product);
    const items = useSelector(state => state.items);
    const misc = useSelector(state => state.misc);

    const isMobile = useMediaQuery('(max-width: 768px)'); //for mobiles only

    useEffect(() => {
        if (categoryid) {
            let query = {
                status: 1,
                category: categoryid,
                listing: true
            }
            dispatch(varientList(query));
            if (localStorage.getItem('user')) {
                dispatch(getWishlists({ status: 1 }));
            }
        }
    }, [id]);



    //add to wishlist
    const addTowishlists = (productid) => {
        console.log("addTowishlists")
        dispatch(addWishlists({ product_id: productid }, 1));
    }

    //dleteing
    const deleteFromWishlists = (wishlistid) => {
        dispatch(addWishlists({ _id: wishlistid, delete: true }));
    }



    const addToWishList = (product) => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });

        if (localStorage.getItem('user')) {
            //remove from wishlists
            if (items.wishlistArray && items.wishlistArray.length > 0) {
                let exist = items.wishlistArray.find((x) => x.product_id._id === product._id);
                if (exist) {
                    deleteFromWishlists(exist._id);
                }
                else {
                    addTowishlists(product._id);
                }
            }
            else {
                addTowishlists(product._id);
            }
        }
        else {
            dispatch({
                type: "IS_LOGINMODAL_OPEN",
                data: true
            });
        }

    }

    const renderProducts = () => {
        let myarray = [];
        let length = isMobile ? 4 : 6;
        let productlist = product.varientsArray;

        for (let product of productlist) {
            let exist = items.wishlistArray.find((x) => x.product_id._id === product._id);
            myarray.push(
                <Grid xs={6} md={2} item className="flexble_grid_product">
                    <Products product={product} exist={exist} myrating={4.3} addToWishList={(product) => addToWishList(product)} />
                </Grid>
            )
        }
        return myarray.slice(0, length);
    }

    return (
        <>
            <div className="productlist">
                <h1>
                    Similar Products
                </h1>

                <Grid container spacing={2}>
                    {product.varientsArray && product.varientsArray.length > 0 ? renderProducts() : null}
                </Grid>
            </div>
            {misc.isLoginmodalOpen && <LoginModal />}
        </>
    )
}
