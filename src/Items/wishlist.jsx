import React, { useEffect, useState } from 'react'
import { Header, AlertBox } from '../Components';
import { Grid, Box } from '@mui/material';
import { Link } from "react-router-dom";
import './item.css'
import Button from '@mui/material/Button';
import images from "../_Images/wishlist.jpg";
import loadingimage from "../_Images/loader1.gif";

import { addWishlists, getWishlists } from '../_Actions/itemactions';
import { useDispatch, useSelector } from 'react-redux';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { useMediaQuery } from '@react-hook/media-query';

export const Wishlist = () => {

    const [showalert, setAlert] = useState(false);
    const [message, setAlertMsg] = useState("");
    const [isLoading, setLoading] = useState(false);
    const [isLoggedin, setLoggedin] = useState(false);
    const [isEmpty, setEmpty] = useState(false);
    const isMobile = useMediaQuery('(max-width: 830px)'); //for isDesktop only

    const items = useSelector(state => state.items);
    const dispatch = useDispatch();

    useEffect(() => {
        let user = {};

        if (localStorage.getItem('user')) {
            user = JSON.parse(localStorage.getItem('user'));
            if (user) {
                setLoggedin(true);
                setLoading(true);
                dispatch(getWishlists({ user_id: user._id })).then(function (res) {
                    setLoading(false);
                    if (res.length == 0) {
                        setEmpty(true);
                    }
                })
            }
        }
    }, []);


    const removefromWishList = (productid) => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        setLoading(true);
        dispatch(addWishlists({ product_id: productid, delete: true }, 2)).then(function (res) {
            setAlert(true);
            setLoading(false);
            setTimeout(function () {
                setAlert(false);
            }, 2000);
            setAlertMsg("Item Removed successfully");
        });
    }
    const calculateOffer = (sellerprice, original) => {
        let i = (original - sellerprice) / original;
        let offer = i * 100;
        return offer;
    }
    const rendermylists = () => {
        if (isLoading) {
            return <img src={loadingimage} style={{ width: "100%", objectFit: "contain" }} />
        }
        if (items.wishlistArray && items.wishlistArray.length > 0) {
            return renderwishlists();
        }
        if (isEmpty) {
            return (<div className="no_item">
                <img src={images} alt="hello" />
                {isLoggedin && <h1>Lets continue your shoping!</h1>}
                {isLoggedin && <Link to="/" className='link'>
                    <Button variant="contained">Shop Now</Button>
                </Link>}
            </div>);
        }
    }
    const renderwishlists = () => {
        let myarray = [];
        if (items.wishlistArray.length > 0 && items.wishlistArray[0].product_id && items.wishlistArray[0].product_id._id) {
            for (let wishItem of items.wishlistArray) {
                let offer = calculateOffer(wishItem.product_id.selling_price, wishItem.product_id.orginal_price);
                myarray.push(
                    <Grid container spacing={2} className='cart_block' style={{ height: "140px" }}>
                        <Grid item md={8} xs={12} >
                            <Grid container spacing={2} >
                                <Grid item xs={4} className="cart_imgblock" >
                                    <Link to={"/productpage/" + wishItem.product_id._id} style={{ textDecoration: "none", flex: 1 }}>
                                        <img src={wishItem.product_id && wishItem.product_id.productPictures[0]} />
                                    </Link>
                                </Grid>
                                <Grid item xs={8}  >
                                    <div className='head_prduct'>
                                        <h3>{wishItem.product_id.name}</h3>
                                    </div>
                                    <div className="product_ratin_wish">
                                        <span className='rate_span'>
                                            <div className='rating_list'>
                                                4.3
                                                <StarBorderIcon sx={{ height: "13px !important", width: "13px !important" }} />
                                            </div>
                                        </span>
                                        <span className='rate_total'>
                                            (12,353)
                                        </span>
                                    </div>
                                    <div className='cart_price'>
                                        <p className='cart_p1'>₹{wishItem.product_id && wishItem.product_id.orginal_price}</p>
                                        <p className='cart_p2'>₹{wishItem.product_id && wishItem.product_id.selling_price}</p>
                                        <p className='cart_p3'>{Math.round(offer)}% off</p>
                                    </div>
                                    <div className="cart_savelater">
                                        <h1 onClick={() => removefromWishList(wishItem)}>REMOVE</h1>
                                    </div>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid >
                )
            }
        }
        return myarray;
    }


    return (
        <Box className='my_wishlist_main'>
            {showalert && <AlertBox
                message={message}
            />}
            {isMobile && <Header />}
            {
                items.wishlistArray && items.wishlistArray.length > 0 && <div className='wishlist_main_head'>
                    <p>My Wishlist</p>
                </div>
            }
            < Grid container spacing={2} className="items_wishlist" >
                {rendermylists()}
            </Grid>
        </Box >
    )
}
