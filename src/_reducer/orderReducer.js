import { orderConstants } from '../_Actions/constants'

const initialState = {
    orderarray: [],
    isListing: false,
    orders: {},
}

export const ordersReducer = (state = initialState, action) => {
    switch (action.type) {

        //listing
        case orderConstants.ORDER_REQUEST:
            state = {
                ...state,
                isListing: true,
                orderarray: [],
            }
            break;
        case orderConstants.ORDER_SUCCESS:
            state = {
                ...state,
                isListing: false,
                orderarray: action.payload,
            }
            break;
        case orderConstants.ORDER_FAIL:
            state = {
                ...state,
                isListing: false,
                orderarray: [],
            }
            break;


        //adding
        case orderConstants.ORDERADD_REQUEST:
            state = {
                ...state,
                isListing: true,
                orders: {},
            }
            break;
        case orderConstants.ORDERADD_SUCCESS:
            state = {
                ...state,
                isListing: false,
                orders: action.payload,
            }
            break;
        case orderConstants.ORDERADD_FAILURE:
            state = {
                ...state,
                isListing: false,
                orders: {},
            }
            break;
    }
    return state;
}