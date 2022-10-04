import axios from '../_helpers/axios';

const callBackResponse = (response) => {
    console.log(response.data, "data");
    if (response.data && response.data.error_code != 0) {
        const error = response && response.data.message;
        return Promise.reject(error);
    }
    return response.data;
}

const getAllcategoryList = async (data) => {
    return axios.post("/categoryAllList", data).then(callBackResponse);
}


export const categoryService = {
    getAllcategoryList
};