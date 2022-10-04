import axios from '../_helpers/axios';


const callBackResponse = (response) => {
    console.log(response.data, "data");
    if (response.data && response.data.error_code !== 0) {
        const error = response && response.data.message;
        return Promise.reject(error);
    }
    return response.data;
}

const optionList = async (data) => {
    return axios.post("/optionList", data).then(callBackResponse);
}

export const optionService = {
    optionList
};