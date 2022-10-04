import { adressConstants } from './constants'
import { adressService } from '../_Service/addressservice'


export const getAllAdress = (address) => {
    console.log(address, "address");
    return async (dispatch) =>
        new Promise((resolve, reject) => {
            dispatch({ type: adressConstants.ADDRESSLIST_REQUEST });
            adressService.getAllAdress(address).then(function (res) {
                const address = res.data.docs;
                console.log(address, "getAllAdress");
                dispatch({
                    type: adressConstants.ADDRESSLIST_SUCCESS,
                    payload: address,
                });
                return resolve(address);
            }, function (err) {
                console.log(err, "err");
                dispatch({
                    type: adressConstants.ADDRESSLIST_FAILURE,
                    payload: err
                });
                return reject(err);
            })
        });
}


export const addAdress = (address) => {
    console.log(address, "address");
    return async (dispatch) =>

        new Promise((resolve, reject) => {
            dispatch({ type: adressConstants.ADDRESSADD_REQUEST });
            adressService.addAdress(address).then(function (res) {
                const addressarray = res.data.docs;
                console.log(addressarray, "address");
                localStorage.setItem('flexible_addressArray', JSON.stringify(addressarray));
                dispatch({
                    type: adressConstants.ADDRESSLIST_SUCCESS,
                    payload: addressarray,
                });
                return resolve(addressarray);
            }, function (err) {
                console.log(err, "err");
                dispatch({
                    type: adressConstants.ADDRESSADD_FAILURE,
                    payload: err
                });
                return reject(err);
            })
        });
}

