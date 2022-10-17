import { productconstants } from './constants'
import { productService } from '../_Service/productService'


export const productList = (product) => {
    console.log(product, "product");
    return async (dispatch) =>
        new Promise((resolve, reject) => {
            dispatch({ type: productconstants.PRODUCTLIST_REQUEST });
            productService.productList(product).then(function (res) {
                const product = res.data.docs;
                console.log(product, "ProductList");
                dispatch({
                    type: productconstants.PRODUCTLIST_SUCCESS,
                    payload: product
                });
                return resolve(product);
            }, function (err) {
                console.log(err, "err");
                dispatch({
                    type: productconstants.PRODUCTLIST_FAILURE,
                    payload: err
                });
                return reject(err);
            })
        });
}



export const productListHome = (productListHome) => {
    console.log(productListHome, "productListHome");
    return async (dispatch) =>
        new Promise((resolve, reject) => {

            dispatch({ type: productconstants.PRODUCTLISTHOME_REQUEST });
            productService.productListHome(productListHome).then(function (res) {
                const productListHome = res.data.docs;
                console.log(productListHome, "productListHomeList");
                localStorage.setItem('flexible_productArray', JSON.stringify(productListHome)); /////category changable dataaas
                dispatch({
                    type: productconstants.PRODUCTLISTHOME_SUCCESS,
                    payload: productListHome,
                });
                return resolve(productListHome);
            }, function (err) {
                console.log(err, "err");
                dispatch({
                    type: productconstants.PRODUCTLISTHOME_FAILURE,
                    payload: err
                });
                return reject(err);
            });

        });
}

export const varientList = (product) => {
    console.log(product, "product");
    return async (dispatch) =>
        new Promise((resolve, reject) => {
            dispatch({ type: productconstants.VARIENTLIST_REQUEST });
            productService.varientList(product).then(function (res) {
                const product = res.data.docs;
                console.log(product, "ProductList");
                dispatch({
                    type: productconstants.VARIENTLIST_SUCCESS,
                    payload: product,
                });
                return resolve(product);
            }, function (err) {
                console.log(err, "err");
                dispatch({
                    type: productconstants.VARIENTLIST_FAILURE,
                    payload: err
                });
                return reject(err);
            })
        });
}
