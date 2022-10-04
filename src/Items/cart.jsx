import React, { useEffect, useState, useRef } from 'react'
import { addToCart } from '../_Actions/itemactions';
import DeleteIcon from '@mui/icons-material/Delete';
import { Grid } from '@mui/material';
import { Link } from "react-router-dom";
import './item.css'
import { cartOrWishListService } from '../_Service/cartandwishService'
import { useDispatch, useSelector } from 'react-redux';
import images from "../_Images/assure.png";
import Button from '@mui/material/Button';
import { Deletemodal } from '../Components/deletemodal'
import { AlertBox } from '../Components/alertbox';
import { miscService } from '../_Service/miscService'
import { LoginModal } from "../Container";

export const Cart = (props) => {

    const { classStyle } = props;
    console.log(classStyle, "classStyle")
    const dispatch = useDispatch();
    const [myCart, setMyCart] = useState([]);
    const ref = useRef(null);
    const [isError, setError] = useState(false);
    const items = useSelector(state => state.items);
    const [isdeleteOpen, DeleteModalOpen] = useState(false);
    const [deleteCartitem, setDeletecartItem] = useState({});
    const [message, setAlertMsg] = useState("");
    const [showalert, setAlert] = useState(false);
    const [isLoggedUser, setLoggedUser] = useState(false);

    // //if user logged in  need if not logged 
    useEffect(() => {
        if (localStorage.getItem('user')) {
            setLoggedUser(false);
        }
        else {
            setLoggedUser(true);
        }
    }, []);

    const misc = useSelector(state => state.misc);
    const openLoginModal = () => {
        dispatch({
            type: "IS_LOGINMODAL_OPEN",
            data: true
        });
    }

    //increase quantity
    const reduceItem = (item, cartid) => {
        let no = cartid.quantity - 1;
        if (no === 0) {
            setError(true);
            setTimeout(function () {
                setError(false);
            }, 3000);
        }
        else {
            dispatch(addToCart({ _id: cartid._id, quantity: no })).then(function (res) {
                let price = dispatch(miscService.priceCalculation(item, "dec")); //price calculation for cart pprice bar
                console.log(price, "price123");
            });
        }
    }
    const incrementItem = (item, cartid) => {
        console.log(cartid, "id")
        let no = cartid.quantity + 1;
        dispatch(addToCart({ _id: cartid._id, quantity: no })).then(function (res) {
            let price = dispatch(miscService.priceCalculation(item, "inc")); //price calculation for cart pprice bar
            console.log(price, "price123")
        });
    }

    //close deletemodal
    const handleClose = () => {
        setDeletecartItem({});
        DeleteModalOpen(false);
    }

    //checking logged or not
    const deletecartItems = () => {
        DeleteModalOpen(false);
        if (localStorage.getItem('user')) {
            deleteFromCart(deleteCartitem._id);
        }
        else {
            let data = cartOrWishListService.removefromCartList(deleteCartitem);  //chnage props 
            if (data) {
                setMyCart(data);
                setAlert(true);
                setTimeout(function () {
                    setAlert(false);
                }, 2000);
                setAlertMsg("Item removed successfully");
            }
        }
    }
    //open deletemodal
    const removefromCartList = (item) => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        setDeletecartItem(item);
        DeleteModalOpen(true);
    }

    //dleteing if loggedin
    const deleteFromCart = (cartid) => {
        dispatch(addToCart({ _id: cartid, delete: true })).then(function (res) {
            if (res.length > 0) {
                setAlert(true);
                setTimeout(function () {
                    setAlert(false);
                }, 2000);
                setAlertMsg("Item removed successfully");
            }
            else {
                window.location.reload();

            }
        });
    }

    //need yo check logined or not (if yes call from database else localstorage)
    const renderCartlists = () => {
        if (localStorage.getItem('user')) {
            return renderLogginedCarts();
        }
        else {
            return renderNouserCart();
        }
    }


    const calculateOffer = (sellerprice, original) => {
        let i = (original - sellerprice) / original;
        let offer = i * 100;
        return offer;
    }

    //if  logged user
    const renderLogginedCarts = () => {
        let myarray = [];
        if (items.cartArray.length > 0 && items.cartArray[0].product_id && items.cartArray[0].product_id._id) {
            for (let cart of items.cartArray) {
                let offer = calculateOffer(cart.product_id.sell_price, cart.product_id.orginal_price);
                myarray.push(
                    <Grid container ref={ref} spacing={2} className='cart_block'>
                        <Grid item md={8} xs={12} >
                            <Grid container spacing={2} >
                                <Grid item xs={4} className="cart_imgblock" >
                                    <img src={cart.product_id && cart.product_id.productPictures[0]} />
                                    <div className='cart_quantitybar'>
                                        <span onClick={() => reduceItem(cart.product_id, cart)}>-</span>
                                        <p>{cart.quantity}</p>
                                        <span onClick={() => incrementItem(cart.product_id, cart)}>+</span>
                                    </div>
                                </Grid>
                                <Grid item xs={8}  >
                                    <div className='head_prduct'>
                                        <h3>{cart.product_id.name}</h3>
                                    </div>
                                    <div className="seller_crt">
                                        <h4>Seller :{cart.user_id.name} </h4>
                                        <img className="img_assured" src={images} />
                                    </div>
                                    <div className='cart_price'>
                                        <p className='cart_p1'>₹{cart.product_id && cart.product_id.orginal_price}</p>
                                        <p className='cart_p2'>₹{cart.product_id && cart.product_id.sell_price}</p>
                                        <p className='cart_p3'>{Math.round(offer)}% off</p>
                                    </div>
                                    <div className="cart_savelater">
                                        {/* <h1>SAVE FOR LATER</h1> */}
                                        <h1 onClick={() => removefromCartList(cart)}>REMOVE</h1>
                                    </div>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item md={4} xs={12} className='delivery' >
                            <ul>
                                <li>
                                    <div>
                                        Delivery in 2 days,
                                    </div>
                                    <span>
                                        Sun | Free ₹40
                                    </span>
                                </li>
                            </ul>
                            <Button variant="contained" className='cart_savelater_mobile'
                                onClick={() => removefromCartList(cart)}>REMOVE
                            </Button>
                        </Grid>
                    </Grid >


                )
            }
        }
        return myarray;
    }

    //     <Link to={"/productpage/" + cart.product_id && cart.product_id._id} style={{ textDecoration: "none", flex: 1 }}>
    //     <img src={cart.product_id && cart.product_id.productPictures[0]} />
    // </Link>

    //if not logged
    const renderNouserCart = () => {
        let myarray = [];
        for (let cart of myCart) {
            myarray.push(
                <Grid container spacing={2} className='cart_block'>
                    <Grid item xs={6} md={3} sx={{ padding: "0px" }} >
                        <div className='wish_div'>
                            <div className='wish_wishlist'>
                                <Link to={"/productpage/" + cart._id} style={{ textDecoration: "none", flex: 1 }}>
                                    <img src={cart.image} />
                                </Link>

                                <h2 onClick={() => removefromCartList(cart)}><DeleteIcon /></h2>
                            </div>
                            <div className="ofeer_wish">
                                <p>{cart.name}</p>
                                <h3>Rs:{cart.sell_price}</h3>
                            </div>
                        </div>
                    </Grid>
                </Grid>
            )
        }
        return myarray;
    }


    return (
        <>
            {showalert && <AlertBox
                message={message}
            />}
            {isError && <div className='alert_div'>
                <p>Minmimun item required</p>
            </div>}
            {renderCartlists()}
            <div className='place_order' style={classStyle ? classStyle : {}} >
                <div className='place_order_button'>
                    <Link to='/checkoutlist' style={{ textDecoration: "none" }}>
                        <Button variant="contained">PLACE ORDER</Button>
                    </Link>
                </div>
                {isLoggedUser && <div className='place_order_button'>
                    <Button variant="contained" onClick={openLoginModal}>PLACE ORDER</Button>
                </div>}
            </div>
            <Deletemodal
                titile="Delete item"
                message="Are you sure to continue ?"
                isdeleteOpen={isdeleteOpen}
                handleClose={handleClose}
                deleteitem={deletecartItems}
            />

            {misc.isLoginmodalOpen && <LoginModal />}

        </>
    )
}
