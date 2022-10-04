import axios from '../_helpers/axios';

const callBackResponse = (response) => {
    console.log(response.data, "data");
    if (response.data && response.data.error_code != 0) {
        const error = response && response.data.message;
        return Promise.reject(error);
    }
    return response.data;
}

const getAllAdress = async (data) => {
    return axios.post("/addressList", data).then(callBackResponse);
}

const addAdress = async (data) => {
    return axios.post("/addressAdd", data).then(callBackResponse);
}
export const adressService = {
    getAllAdress, addAdress
};