import axios from '../_helpers/axios';
import { miscConstants } from '../_Actions/constants'

const callBackResponse = (response) => {
    console.log(response.data, "data");
    if (response.data && response.data.error_code != 0) {
        const error = response && response.data.message;
        return Promise.reject(error);
    }
    return response.data;
}

const fileUpload = async (file, name) => {
    console.log(file, name);
    let data = new FormData();
    data.append("file", file);
    console.log(data, "dataaa");

    return axios.post("/imageAdd", data).then(callBackResponse);
}

const imageList = async (data) => {
    return axios.post("/imagelist", data).then(callBackResponse);
}

const incrementData = (O_price, S_price) => {
    let priceObj = JSON.parse(localStorage.getItem('price_bar'));
    console.log(priceObj, "priceObj");

    let newOrgPrice = priceObj.orginal_price + O_price;
    let newdiscount = priceObj.discount + (O_price - S_price);
    let newtotal = priceObj.total_price + S_price;
    let newPriceObj = {
        orginal_price: newOrgPrice,
        discount: newdiscount,
        total_price: newtotal
    }
    console.log(newPriceObj, "newPriceObj");
    localStorage.setItem('price_bar', JSON.stringify(newPriceObj));

    return newPriceObj;

}


const decrementData = (O_price, S_price) => {
    let priceObj = JSON.parse(localStorage.getItem('price_bar'));
    console.log(priceObj, "priceObj");

    let newOrgPrice = priceObj.orginal_price - O_price;
    let newdiscount = priceObj.discount - (O_price - S_price);
    let newtotal = priceObj.total_price - S_price;
    let newPriceObj = {
        orginal_price: newOrgPrice,
        discount: newdiscount,
        total_price: newtotal
    }
    console.log(newPriceObj, "newPriceObj");
    localStorage.setItem('price_bar', JSON.stringify(newPriceObj));

    return newPriceObj;
}

//if delliver cahres not now future
const priceCalculation = (productdata, type) => {
    let O_price = productdata.orginal_price;
    let S_price = productdata.selling_price;

    let priceObj = {};
    return async (dispatch) =>
        new Promise((resolve, reject) => {
            if (type === "inc") {
                console.log("increment");
                if (localStorage.getItem('price_bar')) {
                    priceObj = incrementData(O_price, S_price);
                    dispatch({
                        type: miscConstants.ISPRICEBARLIST,
                        data: priceObj,
                    });
                }
                else {
                    let newdiscocunt = O_price - S_price;
                    priceObj = {
                        orginal_price: O_price,
                        discount: newdiscocunt,
                        total_price: S_price,
                    }
                    console.log(priceObj, "firsttime_priceObj");
                    localStorage.setItem('price_bar', JSON.stringify(priceObj));
                }
            }
            else {
                console.log("decrement");
                if (localStorage.getItem('price_bar')) {
                    priceObj = decrementData(O_price, S_price);
                    dispatch({
                        type: miscConstants.ISPRICEBARLIST,
                        data: priceObj,
                    });
                }
            }
            return resolve(priceObj);
        });

}

export const miscService = {
    fileUpload, imageList, priceCalculation
}