import { categoryConstants } from '../_Actions/constants'

const initialState = {
    categoryfullData: [],
    isListing: false,
    flexiblecategory: [],
}

export const categoryReducer = (state = initialState, action) => {

    switch (action.type) {

        //listing
        case categoryConstants.GETALLCATEGORYLIST_REQUEST:
            state = {
                ...state,
                isListing: true,
                categoryfullData: [],
            }
            break;
        case categoryConstants.GETALLCATEGORYLIST_SUCCESS:
            state = {
                ...state,
                isListing: false,
                categoryfullData: action.payload,
            }
            break;
        case categoryConstants.GETALLCATEGORYLIST_FAILURE:
            state = {
                ...state,
                isListing: false,
                categoryfullData: [],
            }
            break;


        //listing
        case categoryConstants.FLEXIBLECATEGORYLIST_REQUEST:
            state = {
                ...state,
                isListing: true,
                flexiblecategory: [],
            }
            break;
        case categoryConstants.FLEXIBLECATEGORYLIST_SUCCESS:
            state = {
                ...state,
                isListing: false,
                flexiblecategory: action.payload,
            }
            break;
        case categoryConstants.FLEXIBLECATEGORYLIST_FAILURE:
            state = {
                ...state,
                isListing: false,
                flexiblecategory: [],
            }
            break;

    }
    return state;
}