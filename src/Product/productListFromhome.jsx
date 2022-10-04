import React, { useEffect, useState } from 'react'
import { Header } from '../Components/header';
import { Footer } from '../Components/footer';
import { useParams } from "react-router-dom";
import './product.css'
import { addWishlists, getWishlists } from '../_Actions/itemactions';
import { useDispatch, useSelector } from 'react-redux';
import { Grid } from '@mui/material';
import { LoginModal } from "../Container";
import { AlertBox } from '../Components/alertbox';
import { Products } from "./products";
import { CategoryHeadr_Skeleton } from '../_Skeleton'

export const ProductListFromHome = () => {

    let { id } = useParams();

    const items = useSelector(state => state.items);
    const misc = useSelector(state => state.misc);
    const dispatch = useDispatch();

    const [showalert, setAlert] = useState(false);
    const [message, setAlertMsg] = useState("");
    const [myrating, setMyrating] = useState(4.3);

    const [productlist, setProducList] = useState([]);
    const [productname, setPoductname] = useState("");

    useEffect(() => {
        if (localStorage.getItem('user')) {
            dispatch(getWishlists({ status: 1 }));
        }
    }, []);

    useEffect(() => {
        let flexible_productArray = JSON.parse(localStorage.getItem('flexible_productArray'));
        console.log(flexible_productArray, "flexible_productArray")
        if (flexible_productArray && flexible_productArray.length > 0) {
            for (let product of flexible_productArray) {
                if (product._id === id) {
                    setProducList(product.products_id);
                    setPoductname(product.name);
                }
            }
        }
    }, []);


    //add to wishlist
    const addTowishlists = (productid) => {
        dispatch(addWishlists({ product_id: productid }, 1)).then(function (res) {
            setAlert(true);
            setTimeout(function () {
                setAlert(false);
            }, 2000);
            setAlertMsg("Item added successfully");
        });
    }

    //dleteing
    const deleteFromWishlists = (wishlistid) => {
        dispatch(addWishlists({ _id: wishlistid, delete: true })).then(function (res) {
            setAlert(true);
            setTimeout(function () {
                setAlert(false);
            }, 2000);
            setAlertMsg("Item Removed successfully");
        });
    }



    const addToWishList = (product) => {
        console.log("addd")
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
        for (let product of productlist) {
            if (product.productPictures && product.productPictures.length > 0) {
                let exist = items.wishlistArray.find((x) => x.product_id._id === product._id);
                myarray.push(
                    <Grid item xs={6} md={3} sx={{ padding: "0px" }} className='product_listfull' >
                        <Products product={product} exist={exist} myrating={myrating} addToWishList={(product) => addToWishList(product)} />
                    </Grid>
                );
            }

        }
        return myarray;
    }


    return (
        <div>
            <Header />
            {showalert && <AlertBox
                message={message}
            />}
            <div className="productlist">
                <h1>{productname}</h1>
                <Grid container spacing={2}>
                    {productlist.length > 0 ? renderProducts() : <CategoryHeadr_Skeleton />}
                </Grid>
            </div>

            {misc.isLoginmodalOpen && <LoginModal />}

            <Footer />
        </div>
    )
}
