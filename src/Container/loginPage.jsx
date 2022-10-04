import React, { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Login } from "./login";
import { SignUp } from "./sign";
import './container.css'

export const LoginPage = (props) => {
    const { login_image } = props;
    console.log(login_image,"login_image")
    const [islogin, setLogin] = useState(true);
    const onSignupPage = () => {
        setLogin(false)
    }
    const onLoginPage = () => {
        setLogin(true)
    }
    return (
        <Grid container className='logn_page'>
            <CssBaseline />
            <Grid
                item
                xs={false}
                sm={4}
                md={7}
                sx={{
                    backgroundImage: login_image ? `url(${login_image})` : 'url(https://source.unsplash.com/random)',
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: (t) =>
                        t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            />

            {islogin && <Login
                islogin={islogin}
                onSignupPage={onSignupPage}
            />}
            {!islogin && <SignUp
                islogin={islogin}
                onLoginPage={onLoginPage}
            />}
        </Grid>

    );
}