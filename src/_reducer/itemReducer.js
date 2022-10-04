import { wishlistsConstants, cartConstatnts } from '../_Actions/constants'

const initialState = {
    wishlistArray: [],
    isWishlist: false,
    isWishadd: false,
    wishlistAdddata: {},
    wishlistdeletedata: {},

    cartArray: [],
    isCartadd: false,
    isCartlist: false,
    cartaddData: {},

    cartcount:""
}

export const itemReducer = (state = initialState, action) => {

    switch (action.type) {

        //wishlist adding
        case wishlistsConstants.ADDWISHLIST_REQUEST:
            state = {
                ...state,
                isWishadd: true,
            }
            break;
        case wishlistsConstants.ADDWISHLIST_SUCCESS:
            state = {
                ...state,
                isWishadd: false,
                wishlistAdddata: action.payload,
            }
            break;
        case wishlistsConstants.ADDWISHLIST_FAILURE:
            state = {
                ...state,
                isWishadd: false,
            }
            break;
        case wishlistsConstants.DELETEWISHLIST_SUCCESS:
            state = {
                ...state,
                isWishadd: false,
                wishlistdeletedata: action.payload,
            }
            break;
        //wishlist listing
        case wishlistsConstants.GETWISHLISTS_REQUEST:
            state = {
                ...state,
                isWishlist: true,
                wishlistArray: [],
            }
            break;
        case wishlistsConstants.GETWISHLISTS_SUCCESS:
            state = {
                ...state,
                isWishlist: false,
                wishlistArray: action.payload,
            }
            break;
        case wishlistsConstants.GETWISHLISTS_FAILURE:
            state = {
                ...state,
                isWishlist: false,
                wishlistArray: [],
            }
            break;


        //cart add
        case cartConstatnts.ADDTOCART_REQUEST:
            state = {
                ...state,
                isCartadd: true,
                cartaddData: {},
            }
            break;
        case cartConstatnts.ADDTOCART_SUCCESS:
            state = {
                ...state,
                isCartadd: false,
                cartaddData: action.payload,
            }
            break;
        case cartConstatnts.ADDTOCART_FAILURE:
            state = {
                ...state,
                isCartadd: false,
                cartaddData: {},
            }
            break;

        //cart listing
        case cartConstatnts.GETCARTLIST_REQUEST:
            state = {
                ...state,
                isCartlist: true,
                cartArray: [],
            }
            break;
        case cartConstatnts.GETCARTLIST_SUCCESS:
            state = {
                ...state,
                isCartlist: false,
                cartArray: action.payload,
            }
            break;
        case cartConstatnts.GETCARTLIST_FAILURE:
            state = {
                ...state,
                isCartlist: false,
                cartArray: [],
            }
            break;

        //cart count
        case cartConstatnts.CART_COUNT:
            state = {
                ...state,
                cartcount:action.data
            }
            break;
    }
    return state;
}