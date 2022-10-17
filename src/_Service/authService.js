import axios from '../_helpers/axios';

const callBackResponse = (response) => {
    console.log(response.data, "data");
    if (response.data && response.data.error_code != 0) {
        const error = response && response.data.message;
        return Promise.reject(error);
    }
    return response.data;
}

const Login = async (data) => {
    return axios.post("/login", data).then(callBackResponse);
}

const userSighnUp = (data) => {
    console.log(data, "data")
    return axios.post("/signup", data).then(callBackResponse);
}
const removeitems = () => {
    setTimeout(function () {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("cartlist_array");
        localStorage.removeItem("cart_count");
        localStorage.removeItem("price_bar");
    }, 1000);
    return true;
}
const logOut = () => {
    if (localStorage.getItem('user')) {
        let user = JSON.parse(localStorage.getItem('user'));
        // if (localStorage.getItem('price_bar')) {
        //     let priceObj = JSON.parse(localStorage.getItem('price_bar'));
        //     user.priceDetails_cart = priceObj;
        //     axios.post("/addUser", user).then((res) => {
        //         if (res.data.error_code === 0) {
        //             console.log(res.data.data, "data")
        //            return removeitems();
        //         }
        //         else {
        //             return false;
        //         }
        //     });
        // }
        // else {
          return removeitems();
        // }
    }

}

export const authService = {
    Login, userSighnUp, logOut
};