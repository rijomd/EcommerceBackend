import React, { useEffect, useState } from 'react'
import './item.css'
import images from "../_Images/cart.png";
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';


export const EmptyCart = () => {

    const [isLoggedin, setLoggedin] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        if (localStorage.getItem('user')) {
            setLoggedin(true);
        }
        else {
            setLoggedin(false);
        }
    }, []);
    const openLoginModal = () => {
        dispatch({
            type: "IS_LOGINMODAL_OPEN",
            data: true
        });
    }
    return (
        <div className="no_item" style={{backgroundColor:"#fff"}}>
            <img src={images} alt="hello" />
            {!isLoggedin && <h1>Missing Your Cart Items ?</h1>}
            {!isLoggedin && <p>Login to see you added previously</p>}
            {!isLoggedin &&
                <Button variant="contained" onClick={openLoginModal}>Login</Button>
            }

            {isLoggedin && <h1>Lets continue your shoping!</h1>}
            {isLoggedin && <Link to="/" className='link'>
                <Button variant="contained">Shop Now</Button>
            </Link>}
        </div>
    )
}
