import { wishlistsConstants, cartConstatnts } from './constants'
import { itemService } from '../_Service/itemService'


export const getWishlists = (wishlists) => {
    console.log(wishlists, "wishlists");
    return async (dispatch) =>

        new Promise((resolve, reject) => {
            dispatch({ type: wishlistsConstants.GETWISHLISTS_REQUEST });
            itemService.getWishlists(wishlists).then(function (res) {
                const wishlists = res.data.docs;
                console.log(wishlists, "getWishlists");
                dispatch({
                    type: wishlistsConstants.GETWISHLISTS_SUCCESS,
                    payload: wishlists,
                });
                return resolve(wishlists);
            }, function (err) {
                console.log(err, "err");
                dispatch({
                    type: wishlistsConstants.GETWISHLISTS_FAILURE,
                    payload: err
                });
                return reject(err);
            })
        });
}


export const addWishlists = (wishlists, type) => {
    console.log(wishlists, "wishlists");
    return async (dispatch) =>
        new Promise((resolve, reject) => {
            dispatch({ type: wishlistsConstants.ADDWISHLIST_REQUEST });
            itemService.addWishlists(wishlists).then(function (res) {
                const wishlists = res.data.docs;
                console.log(wishlists, "getWishlists");
                dispatch({
                    type: wishlistsConstants.GETWISHLISTS_SUCCESS,
                    payload: wishlists,
                });
                return resolve(wishlists);
            }, function (err) {
                dispatch({
                    type: wishlistsConstants.ADDWISHLIST_FAILURE,
                });
                return reject(err);
            })
        });
}


export const addToCart = (cart) => {
    console.log(cart, "cart");
    return async (dispatch) =>

        new Promise((resolve, reject) => {
            dispatch({ type: cartConstatnts.ADDTOCART_REQUEST });
            itemService.addToCart(cart).then(function (res) {
                const cartarray = res.data.docs;
                console.log(cartarray, "cartarray");
                dispatch({
                    type: cartConstatnts.GETCARTLIST_SUCCESS,
                    payload: cartarray,
                });
                return resolve(cartarray);
            }, function (err) {
                console.log(err, "err");
                dispatch({
                    type: cartConstatnts.ADDTOCART_FAILURE,
                    payload: err
                });
                return reject(err);
            })
        });
}


export const getcartlist = (cart) => {
    console.log(cart, "cart");
    return async (dispatch) =>

        new Promise((resolve, reject) => {
            dispatch({ type: cartConstatnts.GETCARTLIST_REQUEST });
            itemService.getcartlist(cart).then(function (res) {
                const cartarray = res.data.docs;
                console.log(cartarray, "cartarray");
                dispatch({
                    type: cartConstatnts.GETCARTLIST_SUCCESS,
                    payload: cartarray,
                });
                dispatch({
                    type: cartConstatnts.CART_COUNT,
                    data: res.data.total,
                })
                localStorage.setItem('cart_count', res.data.total);
                return resolve(cartarray);
            }, function (err) {
                console.log(err, "err");
                dispatch({
                    type: cartConstatnts.GETCARTLIST_FAILURE,
                    payload: err
                });
                return reject(err);
            })
        });
}
