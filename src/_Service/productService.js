import axios from '../_helpers/axios';

const callBackResponse = (response) => {
    console.log(response.data, "data");
    if (response.data && response.data.error_code != 0) {
        const error = response && response.data.message;
        return Promise.reject(error);
    }
    return response.data;
}

const productList = async (data) => {
    return axios.post("/productlist", data).then(callBackResponse);
}
const productListHome = async (data) => {
    return axios.post("/getproductlisthome", data).then(callBackResponse);
}
export const productService = {
    productList, productListHome
}