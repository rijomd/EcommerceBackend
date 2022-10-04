import React, { useState } from 'react'
import { addToCart } from '../_Actions/itemactions';
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { cartOrWishListService } from '../_Service/cartandwishService'
import { LoadingButton } from '@mui/lab';
import { miscService } from '../_Service/miscService';
import { useNavigate } from "react-router-dom";
import './productsingle.css'

export const CartOrBuy = (props) => {

    const { productData, cartArray } = props;
    const [isLoading, setLoading] = useState(false);
    const dispatch = useDispatch();
    let navigate = useNavigate();


    const addToCartList = async (singleproduct) => {
        setLoading(true);
        let priceObj = dispatch(miscService.priceCalculation(singleproduct, "inc")); //price calculation for cart pprice bar
        if (priceObj) {
            if (localStorage.getItem('user')) {
                addingToCart(singleproduct._id);  //logged in
            }
            else {
                cartOrWishListService.addToCartList(singleproduct);  //no logined usedr
                setLoading(false);
            }
        }
    }

    //add to cart
    const addingToCart = (productid) => {
        dispatch(addToCart({ product_id: productid })).then(function (res) {
            setLoading(false);
            navigate("../cartlist", { replace: true });
        });
    }

    const renderitems = () => {
        let myarray = [];

        let exist = false;
        if (cartArray && cartArray.length > 0) {
            exist = cartArray.find((x) => x.product_id._id === productData._id);
        }
        myarray.push(
            <div>
                {
                    exist ?
                        <Link to='/cartlist'>
                            < LoadingButton variant="outlined" > Go To Cart</LoadingButton >
                        </Link >
                        :
                        <LoadingButton variant="contained" loadingPosition='center'
                            loading={isLoading} onClick={() => addToCartList(productData)}>Add To Cart
                        </LoadingButton>
                }
                <LoadingButton variant="contained">Buy</LoadingButton>
            </div>
        )
        return myarray;

    }


    return (
        <div className=''>
            {renderitems()}
        </div>
    )
}
