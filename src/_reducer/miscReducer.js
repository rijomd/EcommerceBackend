import { miscConstants } from '../_Actions/constants'

const initialState = {
    isMenuopen: false,
    isLogoutmodalOpen: false,
    isLoginmodalOpen: false,
    priceData:{},
}

export const miscReducer = (state = initialState, action) => {
    switch (action.type) {
        case miscConstants.ISMENUBAR_OPEN:
            state = {
                ...state,
                isMenuopen: action.data
            }
            break;
        case miscConstants.IS_LOGOUTMODAL_OPEN:
            state = {
                ...state,
                isLogoutmodalOpen: action.data
            }
            break;
        case miscConstants.IS_LOGINMODAL_OPEN:
            state = {
                ...state,
                isLoginmodalOpen: action.data
            }
            break;
        case miscConstants.ISPRICEBARLIST:
            state = {
                ...state,
                priceData: action.data
            }
            break;
    }
    return state;
}