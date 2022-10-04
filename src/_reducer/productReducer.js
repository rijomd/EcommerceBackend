import { productconstants } from '../_Actions/constants'

const initialState = {
    productArray: [],
    isListing: false,
    productlisthome: [],

}

export const productReducer = (state = initialState, action) => {
    switch (action.type) {
        //listing
        case productconstants.PRODUCTLIST_REQUEST:
            state = {
                ...state,
                isListing: true,
                productArray: [],
            }
            break;
        case productconstants.PRODUCTLIST_SUCCESS:
            state = {
                ...state,
                isListing: false,
                productArray: action.payload,
            }
            break;
        case productconstants.PRODUCTLIST_FAILURE:
            state = {
                ...state,
                isListing: false,
                productArray: [],
            }
            break;
        //listing producthome
        case productconstants.PRODUCTLISTHOME_REQUEST:
            state = {
                ...state,
                productlisthome: [],
            }
            break;
        case productconstants.PRODUCTLISTHOME_SUCCESS:
            state = {
                ...state,
                isListing: false,
                productlisthome: action.payload,
            }
            break;
        case productconstants.PRODUCTLISTHOME_FAILURE:
            state = {
                ...state,
                productlisthome: [],
            }
            break;
    }
    return state;
}