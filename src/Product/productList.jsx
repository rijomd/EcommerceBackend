import React, { useEffect, useState } from 'react'
import './product.css'
import { productList } from '../_Actions/productactions';
import { addWishlists, getWishlists } from '../_Actions/itemactions';
import { useDispatch, useSelector } from 'react-redux';
import { Grid } from '@mui/material';
import { LoginModal } from "../Container";
import { AlertBox } from '../Components/alertbox';
import { Products } from "./products";

export const ProductList = (props) => {

    let { id, categoryname } = props;

    const product = useSelector(state => state.product);
    const items = useSelector(state => state.items);
    const misc = useSelector(state => state.misc);
    const dispatch = useDispatch();

    const [showalert, setAlert] = useState(false);
    const [message, setAlertMsg] = useState("");
    const [myrating, setMyrating] = useState(4.3);

    useEffect(() => {
        let query = {
            status: 1,
            category: id
        }
        dispatch(productList(query));
        if (localStorage.getItem('user')) {
            dispatch(getWishlists({ status: 1 }));
        }

    }, []);


    //add to wishlist
    const addTowishlists = (productid) => {
        console.log("addTowishlists")
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
        let productList = product.productArray;
        for (let product of productList) {
            categoryname(product.category.name);
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
            {showalert && <AlertBox
                message={message}
            />}
            <div className="productlist">
                <Grid container spacing={2}>
                    {product.productArray && product.productArray.length > 0 ? renderProducts() : null}
                </Grid>
            </div>

            {misc.isLoginmodalOpen && <LoginModal />}

        </div>
    )
}
