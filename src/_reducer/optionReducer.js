import { optionConstants } from '../_Actions/constants'

const initialState = {
    options: [],
    isListing: false,
    isAddOptions: false,
}

export const optionsReducer = (state = initialState, action) => {

    switch (action.type) {

        //LISTING
        case optionConstants.OPTIONSLIST_REQUEST:
            state = {
                ...state,
                isListing: true,
                options: {},
            }
            break;
        case optionConstants.OPTIONSLIST_SUCCESS:
            state = {
                ...state,
                isListing: false,
                options: action.payload,
            }
            break;
        case optionConstants.OPTIONSLIST_FAILURE:
            state = {
                ...state,
                isListing: false,
                options: {},
            }
            break;
        default: state = {};

    }
    return state;
}