import React, { useState, useEffect } from 'react';
import {  AppBar, Box, Toolbar, IconButton, Badge } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import { useDispatch, useSelector } from 'react-redux';
import { Sidebar } from '../Components/sidebar';
import { Link } from "react-router-dom";
import './component.css';
import { LoutPage, LoginModal } from "../Container";

import SearchIcon from '@mui/icons-material/Search';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MoreIcon from '@mui/icons-material/MoreVert';
import PersonIcon from '@mui/icons-material/Person';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';

export const Header = () => {


    const [isLoggedin, setLoggedin] = useState(false);
    const [loggedUser, setLoggedUser] = useState({});

    const [isMobile, setMobileView] = useState(false);
    const [isdektopview, setDesktopMenuclose] = useState(false);

    const [cartcount, setCartcount] = useState(0);

    const misc = useSelector(state => state.misc);
    const items = useSelector(state => state.items);

    const dispatch = useDispatch();

    useEffect(() => {
        if (localStorage.getItem('cart_count')) {
            setCartcount(localStorage.getItem('cart_count'));
        }
    }, [items.cartcount]);


    useEffect(() => {
        let user = {};
        if (localStorage.getItem('user')) {
            user = JSON.parse(localStorage.getItem('user'));
            if (user) {
                setLoggedin(true); setLoggedUser(user);
            }
        }
        else {
            setLoggedin(false);
        }
    }, [])

    const Search = styled('div')(({ theme }) => ({
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    }));

    const SearchIconWrapper = styled('div')(({ theme }) => ({
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }));

    const StyledInputBase = styled(InputBase)(({ theme }) => ({
        color: 'inherit',
        '& .MuiInputBase-input': {
            padding: theme.spacing(1, 1, 1, 0),
            paddingLeft: `calc(1em + ${theme.spacing(4)})`,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('md')]: {
                width: '20ch',
            },
        },
    }));

    // const handleSearch = (e) => {
    //     console.log(e.target.value);
    // }
    const isMenuOpen = () => {
        dispatch({
            type: "ISMENUBAR_OPEN",
            data: !misc.isMenuopen
        })
    }
    const handleMobileMenuOpen = (event) => {
        setMobileView(true);
    };
    const handleMobileMenuClose = () => {
        setMobileView(false);
    }
  
    const handleDEsktopMenuClose = () => {
        setDesktopMenuclose(false);
    }
    const logOut = () => {
        dispatch({
            type: "IS_LOGOUTMODAL_OPEN",
            data: true
        });
    }
    const openLoginModal = () => {
        dispatch({
            type: "IS_LOGINMODAL_OPEN",
            data: true
        });
    }

    //for mobile menu details
    const renderMobileMenu = (
        <Menu
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMobile}
            onClose={handleMobileMenuClose}
        >
            <MenuItem>
                <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                    <Badge badgeContent={0} color="error">
                        <ShoppingCartOutlinedIcon />
                    </Badge>
                </IconButton>
                <Link to="/cartlist" className="link">
                    <p>Cart</p>
                </Link>
            </MenuItem>
            <MenuItem >
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
                {!isLoggedin && <p className='' onClick={openLoginModal}>Login</p>}
                {isLoggedin && <p >{loggedUser.name}</p>}
            </MenuItem>
        </Menu>
    );


    //desktop menu detils
    const renderDesktopMenu = (
        <Menu
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isdektopview}
            onClose={handleDEsktopMenuClose}
        >
            <MenuItem>
                {isLoggedin && <Link to='/loginpage' className="link"><p>Profile</p></Link>}
            </MenuItem>
            <MenuItem >
                {isLoggedin && <p onClick={logOut}>Logout</p>}
            </MenuItem>
        </Menu>
    );

    return (
        <Box sx={{ flexGrow: 1, backgroundColor: "#2874f0" }} >
            <AppBar position="static">
                <Toolbar className='header_box'>
                    <IconButton
                        className='menubar'
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        sx={{ mr: 2 }}
                        onClick={isMenuOpen}
                    >
                        <MenuOutlinedIcon />
                    </IconButton>

                    <div className='headbar_content'>
                        <Link className='head' to="/">
                            {/* <img src={images} alt="hai"/> */}
                            <p>G-SHOPIFY</p>
                        </Link>
                    </div>


                    <Search sx={{ backgroundColor: "#fff" }} className='searchbaer'>
                        <SearchIconWrapper>
                            <SearchIcon sx={{ color: "blue" }} />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search for products and brand more"
                            inputProps={{ 'aria-label': 'search', 'width': '35ch', color: "black" }}
                            sx={{ color: "black" }}
                        />
                    </Search>

                    <Box sx={{ flexGrow: 1 }} />

                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <IconButton
                            size="large"
                            edge="end"
                            aria-label="account of current user"
                            aria-controls="primary-search-account-menus"
                            aria-haspopup="true"
                            color="inherit"
                        >
                            {!isLoggedin && <p className='loginButton' onClick={openLoginModal}>Login</p>}
                            {isLoggedin &&
                                <Box className="dropdown">
                                    <p style={{ fontSize: "15px" }}>{loggedUser.name}</p>
                                    <KeyboardArrowDownIcon />
                                    <Box className="dropdown-content">
                                        <ul className='drop_list'>
                                            <li className='drop_linelist'>
                                                <Link to='/profile/account'>
                                                    <PersonIcon sx={{ color: "#1976d2", width: "16px", height: "16px" }} />
                                                    <p>My Profile</p>
                                                </Link>

                                            </li>
                                        </ul>
                                        <ul className='drop_list'>
                                            <li className='drop_linelist'>
                                                <Link to='/profile/wishlist'>
                                                    <FavoriteIcon sx={{ color: "#1976d2", width: "16px", height: "16px" }} />
                                                    <p>Wishlist</p>
                                                </Link>

                                            </li>
                                        </ul>
                                        <ul className='drop_list'>
                                            <li className='drop_linelist'>
                                                <Link to='/cartlist'>
                                                    <ShoppingCartIcon sx={{ color: "#1976d2", width: "16px", height: "16px" }} />
                                                    <p>My Cart</p>
                                                </Link>

                                            </li>
                                        </ul>
                                        <ul className='drop_list'>
                                            <li className='drop_linelist'>
                                                <Link to=''>
                                                    <PowerSettingsNewIcon sx={{ color: "#1976d2", width: "16px", height: "16px" }} />
                                                    <p onClick={logOut}>Logout</p>
                                                </Link>

                                            </li>
                                        </ul>
                                    </Box>
                                </Box>}
                        </IconButton>
                        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                            <Badge badgeContent={cartcount} color="error">
                                <Link to="/cartlist" className="cart_home">
                                    <ShoppingCartOutlinedIcon />
                                    <p style={{ fontSize: "15px" }}>Cart</p>
                                </Link>
                            </Badge>
                        </IconButton>
                    </Box>

                    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="show more"
                            aria-controls="primary-search-account-menu"
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MoreIcon />
                        </IconButton>
                    </Box>

                </Toolbar>
            </AppBar>

            {/* for mobile menu */}
            {isMobile && renderMobileMenu}
            {misc.isMenuopen && <Sidebar isLoggedin={isLoggedin} />}

            {/* for desktop menu */}
            {isdektopview && renderDesktopMenu}

            {misc.isLogoutmodalOpen && <LoutPage />}
            {misc.isLoginmodalOpen && <LoginModal />}

        </Box>
    )
}



