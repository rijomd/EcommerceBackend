import React, { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Login } from "./login";
import { SignUp } from "./sign";



const theme = createTheme();

export const LoginPage = () => {

    const [islogin, setLogin] = useState(true);
    // const [islogin, setLogin] = useState(true);

    const onSignupPage = () => {
        setLogin(false)
    }
    const onLoginPage = () => {
        setLogin(true)
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            phone: data.get('phone'),
            password: data.get('password'),
        });
    };

    return (
        <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{ height: '75vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: 'url(https://source.unsplash.com/random)',
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

        </ThemeProvider>

    );
}