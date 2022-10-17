import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

import { varientList } from '../_Actions/productactions';
import { getcartlist } from '../_Actions/itemactions';

import { ProductSingleviewSkeleton } from '../_Skeleton'
import { Header, Footer } from '../Components';
import { CartOrBuy } from './cartORbuy';
import { ProductImages } from './productImages';
import { ProductDetails } from './productDetails';
import { SimilarProducts } from '../Product';

import { Grid } from '@mui/material';

export const ProductSingleview = () => {

    let { id } = useParams();
    const dispatch = useDispatch();
    const items = useSelector(state => state.items);
    const[mycartArray,setMycartarray]=useState([]);
    const [varientsArray, setvarientsArray] = useState([]); // no of varients of product
    const [atribute_value, setAtribute_value] = useState([]); // varients attribute values
    const [isLoading, setLoading] = useState(false);
    const [varientdata, setvarientData] = useState({}); //varient single data
    const [productData, setProductData] = useState({}); //product data
    const [categoryid, setCategoryId] = useState('');

    const loadPage = (value) => {
        setTimeout(
            () => {
                setLoading(value)
            },
            3000
        );
    }

    useEffect(() => {
        let query = {
            _id: id,
            singleview_Web: true
        }
        setLoading(true);
        dispatch(varientList(query)).then((res) => {
            if (res.length > 0) {
                let fullData = res[0];
                let product = fullData.product;
                let varients = fullData.varients;

                console.log(product.category,"categoryyy")
                setCategoryId(product.category);
                let atribute_value = varients[0].atribute_value;
                setAtribute_value(atribute_value);
                setProductData(product);
                if (varients.length > 0) {
                    setvarientData(varients[0]);
                    if (product.type_product === "multi") {
                        setvarientsArray(varients);
                    }
                }
                setLoading(false);
            }
        });
        if (localStorage.getItem('user')) {
            dispatch(getcartlist({ status: 1, }))
        }
       
    }, [id]);


    const renderView = () => {
        let width = window.innerWidth;
        //desktop
        if (width > 770) {
            return (
                <Grid container spacing={2} sx={{ backgroundColor: "#fff", marginTop: "0px" }} >
                    <Grid item md={5} >
                        <ProductImages
                            productData={varientdata}
                        />
                        <CartOrBuy
                            productData={varientdata}
                            cartArray={items.cartArray}
                        />
                    </Grid>
                    <Grid item md={7}>
                        <ProductDetails productData={productData} varientdata={varientdata} atribute_value={atribute_value} varientsArray={varientsArray}
                            setAtribute={(data) => setAtribute_value(data)} setVarient={(data) => setvarientData(data)}
                            setLoading={(value) => loadPage(value)} />
                    </Grid>
                </Grid>
            )
        }
        else {
            return (
                <Grid container spacing={2} sx={{ backgroundColor: "#fff", marginTop: "0px" }} >
                <Grid item md={5} xs={12}>
                    <ProductImages
                        productData={varientdata}
                    />
                       <CartOrBuy
                            productData={varientdata}
                            cartArray={items.cartArray}
                        />
                </Grid>
                <Grid item md={7} xs={12}>
                    <ProductDetails productData={productData} varientdata={varientdata} atribute_value={atribute_value} varientsArray={varientsArray}
                        setAtribute={(data) => setAtribute_value(data)} setVarient={(data) => setvarientData(data)}
                        setLoading={(value) => loadPage(value)} />
                </Grid>
            </Grid>
            )
        }
    }




    return (
        <div>
            <Header />
            {isLoading ? <ProductSingleviewSkeleton /> : renderView()}
            <SimilarProducts categoryid={categoryid} id={id}/>
            <Footer />
        </div>
    )
}
