import axios from '../_helpers/axios';

const callBackResponse = (response) => {
    console.log(response.data, "data");
    if (response.data && response.data.error_code !== 0) {
        const error = response && response.data.message;
        return Promise.reject(error);
    }
    return response.data;
}

const getWishlists = async (data) => {
    return axios.post("/getWishlist", data).then(callBackResponse);
}
const addWishlists = async (data) => {
    return axios.post("/wishlistadd", data).then(callBackResponse);
}
const getcartlist = async (data) => {
    return axios.post("/cartList", data).then(callBackResponse);
}
const addToCart = async (data) => {
    return axios.post("/cartadd", data).then(callBackResponse);
}

export const itemService = {
    getWishlists, addWishlists, getcartlist, addToCart
};