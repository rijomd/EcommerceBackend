import React, { useEffect, useState } from 'react'
import { Header } from '../Components/header';
import { Footer } from '../Components/footer';
import { useParams } from "react-router-dom";
import { productList } from '../_Actions/productactions';
import { useDispatch, useSelector } from 'react-redux';
import { getcartlist } from '../_Actions/itemactions';
import { CartOrBuy } from './cartORbuy';
import { ProductImages } from './productImages';
import { ProductDetails } from './productDetails';

import { Grid } from '@mui/material';

export const ProductSingleview = () => {

    let { id } = useParams();
    const dispatch = useDispatch();
    const items = useSelector(state => state.items);
    const [productData, setProduct] = useState({});


    useEffect(() => {
        let query = {
            _id: id
        }
        dispatch(productList(query)).then((res) => {
            if (res.length > 0) {
                setProduct(res[0]);
            }
        });
        if (localStorage.getItem('user')) {
            dispatch(getcartlist({ status: 1, }));
        }
    }, []);


    const renderView = () => {
        let width = window.innerWidth;
        //desktop
        if (width > 770) {
            return (
                <Grid container spacing={2} sx={{ backgroundColor: "#fff",marginTop:"0px" }} >
                    <Grid item md={5} >
                        <ProductImages
                            productData={productData}
                        />
                    </Grid>
                    <Grid item md={7}>
                        <ProductDetails />
                        <CartOrBuy
                            productData={productData}
                            cartArray={items.cartArray}
                        />
                    </Grid>
                </Grid>
            )
        }
        else {
            return (
                <div>
                    haai
                </div>
            )
        }
    }




    return (
        <div>
            <Header />
            {renderView()}
            <Footer />
        </div>
    )
}
