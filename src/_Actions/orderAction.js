import axios from '../_helpers/axios';
import { orderConstants } from './constants'


export const getOrder = () => {

    return async function saveNewTodoThunk(dispatch, getState) {

        await dispatch({ type: orderConstants.ORDER_REQUEST });
        let response = await axios.post("/getOrder", {});
        if (response.status === 200) {
            let payload = response.data.data.docs;
            await dispatch({
                type: orderConstants.ORDER_SUCCESS,
                payload: payload
            });
        }
        else {
            await dispatch({
                type: orderConstants.ORDER_FAIL,
                payload: "Error"
            });
        }
        return response;
    }

}


export const addOrder = (order) => {

    return async function saveNewTodoThunk(dispatch, getState) {

        await dispatch({ type: orderConstants.ORDERADD_REQUEST });
        if (order) {
            let response = await axios.post("/addOrder", order);
            if (response.status === 200) {
                if (localStorage.getItem('price_bar')) {
                    localStorage.removeItem("price_bar");
                }
                let payload = response.data;
                await dispatch({
                    type: orderConstants.ORDERADD_SUCCESS,
                    payload: payload
                });
            }
            else {
                await dispatch({
                    type: orderConstants.ORDERADD_FAILURE,
                    payload: "Error"
                });
            }
            return response;
        }
    }

}
