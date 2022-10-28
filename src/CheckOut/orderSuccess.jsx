import React from 'react'
import Grid from '@material-ui/core/Grid';
import { Header, Footer } from '../Components';
import images from "../_Images/order.jpg";
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import './order.css';

export const OrderSuccess = () => {
    return (
        <div>
            <Header />

            <div className='ordersucces' >
                <Grid container spacing={16} className='justify' >
                    <img src={images}></img>
                </Grid>

                <Grid container spacing={16} className='justify'>
                    <Link to="/" className='link'>
                        <Button variant="contained">Continue</Button>
                    </Link>
                </Grid>
            </div>


            <Footer />
        </div>
    )
}

