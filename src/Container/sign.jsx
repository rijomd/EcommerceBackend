import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { AlertBox, } from '../Components';
import { userSighnUp } from "../_Actions/authactions";
import { useDispatch } from 'react-redux';
import { Loader } from '../Components/loader';
import { useNavigate } from "react-router-dom";
import './container.css'

export const SignUp = (props) => {

    const { onLoginPage, islogin } = props;
    const [iserr, setError] = useState(false);
    const [msg, setMsg] = useState('');
    const [isSignsubmit, setSignsubmit] = useState(false);
    const dispatch = useDispatch();
    let navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        let phone = data.get('phone');
        let password = data.get('password');
        // let name = data.get('name');
        // let confirm_password = data.get('confirm_password');

        let user = {
            phone: phone,
            password: password,
            // name: name,
            role: 2
        }

        // if (password !== confirm_password) {
        //     setError(true);
        //     setMsg("Password not match");
        //     setTimeout(function () {
        //         setError(false);
        //     }, 2000);
        //     return null;
        // }
        if (phone) {
            setSignsubmit(true);
            dispatch(userSighnUp(user)).then(function (res) {
                setSignsubmit(false);
                setError(true);
                setMsg("Suuccefully Registered");
                setTimeout(function () {
                    setError(false);
                    navigate('/home')
                }, 2000);
            },
                function (err) {
                    setSignsubmit(false);
                    setError(true);
                    setMsg("Registration failed");
                    setTimeout(function () {
                        setError(false);
                    }, 2000);
                }
            );
        }

    };

    return (
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square className='signup'>
            <Box
                sx={{
                    my: 8,
                    mx: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign Up
                </Typography>
                <Box component="form" Validate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                    {/* <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="name"
                        label="Name"
                        name="name"
                        autoComplete="name"
                        autoFocus
                    /> */}
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="phone"
                        label="Mobile Number"
                        name="phone"
                        autoComplete="phone"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />

                    {/* <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="confirm_password"
                        label="Confirm Password"
                        type="password"
                        id="confirm_password"
                        autoComplete="confirm-password"
                    /> */}
                    {iserr && <AlertBox
                        message={msg}
                    />}
                    {isSignsubmit && <Loader />}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign Up
                    </Button>
                    <Grid container>
                        <Grid item>
                            {!islogin && <Link to="" variant="body2" className="link" onClick={onLoginPage}>
                                {"Alreay an existing user? Login"}
                            </Link>}
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Grid>
    );
}