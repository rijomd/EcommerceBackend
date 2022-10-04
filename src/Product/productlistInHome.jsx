import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { productListHome } from '../_Actions/productactions';
import { Box, Grid, Button } from '@mui/material';
import { Link } from "react-router-dom";
import './product.css'
import { Products } from "./products";
import { useMediaQuery } from '@react-hook/media-query'

export const ProductListInHome = () => {

    const product = useSelector(state => state.product);
    const dispatch = useDispatch();
    const isMobile = useMediaQuery('(max-width: 768px)'); //for mobiles only

    const wishstyle = { display: "none" };
    let query = {
        status: 1,
    }

    useEffect(() => {
        dispatch(productListHome(query));
    }, []);


    const renderProductHomelist = (productList) => {
        let myarray = [];
        for (let product of productList) {
            if (product.products_id.length > 0) {
                myarray.push(
                    < Box className='renderProductHomelist'>
                        <div className='flex_div'>
                            <p className="flexible_product_para">{product.name}</p>
                            <Link to={"/ProductListfromHome/" + product._id} style={{ textDecoration: "none" }}>
                                <Button sx={{ margin: "10px" }} variant="contained">View All</Button>
                            </Link>
                        </div>

                        <Grid container spacing={2} sx={{ paddingTop: "25px" }}>
                            {renderProducts(product.products_id)}
                        </Grid>
                    </Box>
                )
            }
        }
        return myarray;
    }

    const renderProducts = (productlist) => {
        let myarray = [];
        let length = isMobile ? 4 : 6;

        for (let product of productlist) {
            myarray.push(
                <Grid xs={6} md={2} item className="flexble_grid_product">
                    <Products product={product} myrating="4.5" wishstyle={wishstyle} />
                </Grid>
            )
        }
        return myarray.slice(0, length);
    }

    return (
        <>
            {product.productlisthome.length > 0 && renderProductHomelist(product.productlisthome)}

        </>
    )
}
