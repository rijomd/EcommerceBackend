import React, { useState } from 'react'
import { addToCart } from '../_Actions/itemactions';
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { cartOrWishListService } from '../_Service/cartandwishService'
import { LoadingButton } from '@mui/lab';
import { miscService } from '../_Service/miscService';
import { useNavigate } from "react-router-dom";
import './productsingle.css';
import { cartConstatnts } from '../_Actions/constants'

export const CartOrBuy = (props) => {

    const { productData, cartArray } = props;
    const [isLoading, setLoading] = useState(false);
    const dispatch = useDispatch();
    let navigate = useNavigate();


    const addToCartList = async (singleproduct) => {
        setLoading(true);
     dispatch(miscService.priceCalculation(singleproduct, "inc")).then((priceObj)=>{
         console.log(priceObj,"priceObj")
         if (priceObj) {
             if (localStorage.getItem('user')) {
                 addingToCart(singleproduct._id, priceObj);  //logged in
             }
             else {
                 let cartarray = cartOrWishListService.addToCartList(singleproduct);  //no logined usedr
                 dispatch({
                     type: cartConstatnts.GETCARTLIST_SUCCESS,
                     payload: cartarray,
                 });
                 setLoading(false);
                 navigate("../cartlist", { replace: true });
             }
         }
        }) //price calculation for cart pprice bar
    }

    //add to cart
    const addingToCart = (productid, priceObj) => {
        dispatch(addToCart({ product_id: productid, priceObj: priceObj })).then((res) => {
            setLoading(false);
            navigate("../cartlist", { replace: true });
        });
    }

    const renderitems = () => {
        let myarray = [];
        let newArray = [];
        let exist = false;
        if (localStorage.getItem('cartlist_array')) {
            newArray = JSON.parse(localStorage.getItem('cartlist_array'));
            if (newArray && newArray.length > 0) {
                exist = newArray.find((x) => x._id === productData._id);
            }
        }
        else {
            newArray = cartArray;
            if (newArray && newArray.length > 0) {
                exist = newArray.find((x) => x.product_id._id === productData._id);
            }
        }
        console.log(newArray, "cartArray")

        myarray.push(
            <div>
                {
                    exist ?
                        < LoadingButton variant="outlined" className='cart_button'>
                            <Link to='/cartlist' style={{textDecoration:"none"}}> Go To Cart</Link>
                           </LoadingButton >
                        :
                        <LoadingButton variant="outlined" loadingPosition='center' className='cart_button'
                            loading={isLoading} onClick={() => addToCartList(productData)}>Add To Cart
                        </LoadingButton>
                }
                <LoadingButton variant="contained" sx={{ flex: "1" }}>Buy Item</LoadingButton>
            </div>
        )
        return myarray;

    }


    return (
        <div className='cartin_singleview'>
            {renderitems()}
        </div>
    )
}
