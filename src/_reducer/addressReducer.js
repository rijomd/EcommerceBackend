import { adressConstants } from '../_Actions/constants'

const initialState = {
    adressarray: [],
    isListing: false,
    adress: {},
}

export const adressReducer = (state = initialState, action) => {
    switch (action.type) {

        //listing
        case adressConstants.ADDRESSLIST_REQUEST:
            state = {
                ...state,
                isListing: true,
                adressarray: [],
            }
            break;
        case adressConstants.ADDRESSLIST_SUCCESS:
            state = {
                ...state,
                isListing: false,
                adressarray: action.payload,
            }
            break;
        case adressConstants.ADDRESSLIST_FAILURE:
            state = {
                ...state,
                isListing: false,
                adressarray: [],
            }
            break;


        //adding
        case adressConstants.ADDRESSADD_REQUEST:
            state = {
                ...state,
                isListing: true,
                adress: {},
            }
            break;
        case adressConstants.ADDRESSADD_SUCCESS:
            state = {
                ...state,
                isListing: false,
                adress: action.payload,
            }
            break;
        case adressConstants.ADDRESSLIST_FAILURE:
            state = {
                ...state,
                isListing: false,
                adress: {},
            }
            break;
    }
    return state;
}