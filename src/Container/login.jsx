import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { login } from "../_Actions/authactions";
import { useDispatch } from 'react-redux';
import { Loader } from '../Components/loader';
import { useNavigate } from "react-router-dom";
import './container.css'


// function Copyright(props) {
//     return (
//         <Typography variant="body2" color="text.secondary" align="center" {...props}>
//             {'Copyright © '}
//             <Link color="inherit" href="####">
//                 G-SHOP
//             </Link>{' '}
//             {new Date().getFullYear()}
//             {'.'}
//         </Typography>
//     );
// }


export const Login = (props) => {

    const { onSignupPage, islogin } = props;
    const [isLoginsubmit, setLoginsubmit] = useState(false);
    const [isError, setError] = useState(false);
    const [msg, setErrMsg] = useState("");

    let navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        let phone = data.get('phone');
        let password = data.get('password');
        let user = {
            phone: phone,
            password: password,
            role: 2
        }
        console.log(user, "user");
        setLoginsubmit(true);
        dispatch(login(user))
            .then(function (res) {
                setLoginsubmit(false);
                navigate('/home');
            },
                function (err) {
                    setLoginsubmit(false);
                    setError(true);
                    setErrMsg("Authentification failed");
                });
    };

    return (
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square className='login'>
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
                    Login in
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
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
                    {/* <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    /> */}
                    {isLoginsubmit && Loader}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2" className="link">
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            {islogin && <Link to="" variant="body2" className="link" onClick={onSignupPage}>
                                {"Don't have an account? Sign Up"}
                            </Link>}
                        </Grid>
                    </Grid>
                    {/* <Copyright sx={{ mt: 5 }} /> */}
                </Box>
            </Box>
        </Grid>
    );
}