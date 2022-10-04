import { authconstants } from '../_Actions/constants'

const initState = {
    token: localStorage.getItem("token") ? localStorage.getItem('token') : null,
    user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
    failed: false,
    authenticating: false,
    authenticate: false,
    loading: false,
    message: ''
};

export const authReducer = (state = initState, action) => {
    switch (action.type) {
        case authconstants.LOGIN_REQUEST:
            state = {
                ...state,
                authenticating: true
            }
            break;
        case authconstants.LOGIN_FAILURE:
            state = {
                ...state,
                message: action.payload.err,
                failed: true
            }
            break;
        case authconstants.LOGIN_SUCCESS:
            state = {
                ...state,
                user: action.payload.user,
                token: action.payload.token,
                authenticate: true,
                authenticating: false,
                message: "Success"
            }
            break;


        case authconstants.SIGHNUP_REQUEST:
            state = {
                ...state,
                authenticating: true
            }
            break;
        case authconstants.SIGHNUP_FAILURE:
            state = {
                ...state,
                message: action.payload.err,
                failed: true
            }
            break;
        case authconstants.SIGHNUP_SUCCESS:
            state = {
                ...state,
                authenticate: true,
                authenticating: false,
                message: "Success"
            }
            break;

        default: state = {};
    }
    return state;
}