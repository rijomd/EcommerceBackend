import { authconstants, miscConstants } from './constants'
import { authService } from '../_Service/authService'

export const login = (user) => {
    console.log(user, "user")
    return async (dispatch) =>
        new Promise((resolve, reject) => {
            dispatch({ type: authconstants.LOGIN_REQUEST });
            authService.Login(user).then(function (res) {
                const { token, user } = res.data;
                let pricebar = user.priceDetails_cart;
                console.log(pricebar, "pricebar");
                if (typeof (pricebar) !== "undefined") {
                    console.log(pricebar, "pricebar11111111111");
                    localStorage.setItem('price_bar', JSON.stringify(pricebar))
                }
                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify(user));
                localStorage.removeItem("cartlist_array");
                dispatch({
                    type: authconstants.LOGIN_SUCCESS,
                    payload: {
                        token, user
                    }
                });
                dispatch({
                    type: miscConstants.ISPRICEBARLIST,
                    data: pricebar,
                });
                resolve(user);
            }, function (err) {
                console.log(err, "err");
                dispatch({
                    type: authconstants.LOGIN_FAILURE,
                    payload: { err }
                });
                reject(err)
            })
        });

}

export const userSighnUp = (user) => {
    console.log(user, "user");

    return async (dispatch) =>

        new Promise((resolve, reject) => {

            dispatch({ type: authconstants.SIGHNUP_REQUEST });
            authService.userSighnUp(user).then(function (res) {
                console.log(res, "res");
                const { user, token } = res.data;
                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify(user));
                localStorage.removeItem("cartlist_array");
                dispatch({
                    type: authconstants.SIGHNUP_SUCCESS,
                    payload: user
                });
                resolve(user);
            }, function (err) {
                console.log(err, "err");
                dispatch({
                    type: authconstants.SIGHNUP_FAILURE,
                    payload: err
                });
                reject(err)
            })

        });
}

