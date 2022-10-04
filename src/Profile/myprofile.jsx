import React, { useEffect, useState } from 'react'
import { Header, Footer } from '../Components';
import { Grid } from '@mui/material';
import { Box } from '@mui/system';
import images from "../_Images/user.png";
import './profile.css';
import { Link, useParams } from "react-router-dom";
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import PermPhoneMsgIcon from '@mui/icons-material/PermPhoneMsg';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { AddressList } from '../Adress';
import { Wishlist } from '../Items';
import { useMediaQuery } from '@react-hook/media-query';
import EditLocationIcon from '@mui/icons-material/EditLocation';
import StickyNote2Icon from '@mui/icons-material/StickyNote2';
import NotificationsIcon from '@mui/icons-material/Notifications';
import HelpIcon from '@mui/icons-material/Help';

export const Myprofile = () => {

    let { slug } = useParams();
    const [name, setName] = useState("");
    const [isWishlist, setWishlist] = useState(false);
    const [isAccount, setAccount] = useState(false);
    const [isMyAddress, setAddress] = useState(false);
    const isDesktop = useMediaQuery('(min-width: 830px)'); //for isDesktop only

    useEffect(() => {
        if (localStorage.getItem('user')) {
            let user = JSON.parse(localStorage.getItem('user'));
            setName(user.name);
        }
        if (slug === "wishlist") {
            setWishlist(true);
        }
        if (slug === "account") {
            setAccount(true);
        }
    }, []);

    const showProfile = () => {
        setWishlist(false);
        setAddress(false);
        setAccount(true);
    }
    const showAdress = () => {
        setAddress(true);
        setWishlist(false);
        setAccount(false);
    }
    const showWishlists = () => {
        setWishlist(true);
        setAddress(false);
        setAccount(false);
    }



    // headrer bar in mobile 
    const renderHeaders = () => {
        let newArray = [];
        let myarray = ["Orders", "Wishlist", "Help Center", "Logout"];
        for (let i = 0; i < myarray.length; i++) {
            newArray.push(
                <Grid item xs={5}>
                    <div className="profile_headermobile">
                        {i === 0 && <AccountBalanceWalletIcon sx={{ color: "#2874f0" }} />}
                        {i === 1 && <FavoriteIcon sx={{ color: "#2874f0" }} />}
                        {i === 2 && <PermPhoneMsgIcon sx={{ color: "#2874f0" }} />}
                        {i === 3 && <PowerSettingsNewIcon sx={{ color: "#2874f0" }} />}
                        <p>
                            <Link to={'/' + myarray[i]}>
                                {myarray[i]}
                            </Link>
                        </p>
                    </div>
                </Grid>
            )
        }
        return newArray;
    }
    //for mobileview
    const renderMobileview = () => {

        return (
            <>
                <Box className='name'>
                    <img src={images} alt="hai"></img>
                    <div>
                        <p>Hello</p>
                        <h5>{name}</h5>
                    </div>
                </Box>
                <Box sx={{ backgroundColor: "#fff", padding: "1rem 0px" }}>
                    <Grid container spacing={2} sx={{ justifyContent: "center" }}>
                        {renderHeaders()}
                    </Grid >
                </Box>
                <Box sx={{ backgroundColor: "#fff", padding: "1rem 0px" }}>
                    <div className='my_accountmobile'>
                        <p>My Account</p>
                    </div>
                    <div>
                        <Link to='/' className='account_detils_mobile'>
                            <span><ContactPageIcon sx={{ width: "20px", height: "20px", color: "#2874f0" }} /></span>
                            <p>Edit Profile</p>
                        </Link>
                        <Link to='/account' className='account_detils_mobile'>
                            <span><EditLocationIcon sx={{ width: "20px", height: "20px", color: "#2874f0" }} /></span>
                            <p>Manage Addresses</p>
                        </Link>
                    </div>
                </Box>
                <Box sx={{ backgroundColor: "#fff", padding: "1rem 0px" }}>
                    <div className='my_accountmobile'>
                        <p>My Activity</p>
                    </div>
                    <div>
                        <Link to='/' className='account_detils_mobile'>
                            <span><StickyNote2Icon sx={{ width: "20px", height: "20px", color: "#2874f0" }} /></span>
                            <p>My Reviews</p>
                        </Link>
                        <Link to='/' className='account_detils_mobile'>
                            <span><NotificationsIcon sx={{ width: "20px", height: "20px", color: "#2874f0" }} /></span>
                            <p>Notifications</p>
                        </Link>
                    </div>
                </Box>
                <Box sx={{ backgroundColor: "#fff", padding: "1rem 0px" }}>
                    <div className='my_accountmobile'>
                        <p>Feedback</p>
                    </div>
                    <div>
                        <div className='account_detils_mobile'>
                            <span><HelpIcon sx={{ width: "20px", height: "20px", color: "#2874f0" }} /></span>
                            <p>Any Queries</p>
                        </div>
                    </div>
                </Box>
            </>
        )
    }

    //for desktopview sidebar in profile
    const rendersidebar = (
        <div>
            <div className='order'>
                <AccountBalanceWalletIcon sx={{ width: "20px", height: "20px", color: "#2874f0" }} />
                <Link to="">My Orders</Link>
            </div>

            <div className='account_setting'>
                <div className='account'>
                    <AccountBoxIcon sx={{ width: "20px", height: "20px", color: "#2874f0" }} />
                    <Link to="">Account Settings</Link>
                </div>
                <div className='settings'>
                    <Link to="">
                        <p onClick={showProfile}> Profile Informations</p>
                    </Link>
                    <Link to="">
                        <p onClick={showAdress}> Manage Addresses</p>
                    </Link>
                </div>
            </div>

            <div className='account_setting'>
                <div className='account'>
                    <ContactPageIcon sx={{ width: "20px", height: "20px", color: "#2874f0" }} />
                    <Link to="">My Activity</Link>
                </div>
                <div className='settings'>
                    <Link to="">
                        <p> My Reviews</p>
                    </Link>
                    <Link to="">
                        <p onClick={showWishlists}> My Wishlists </p>
                    </Link>
                    <Link to="">
                        <p> Notifications </p>
                    </Link>
                </div>
            </div>

            <div className='logout'>
                <PowerSettingsNewIcon sx={{ width: "20px", height: "20px", color: "#2874f0" }} />
                <Link to="">Logout</Link>
            </div>

        </div>
    );
    //for desktopview
    const renderDesktopviews = (
        <Grid container spacing={2} sx={{ padding: "1rem 3rem" }}>
            <Grid item md={4}>
                <Box className='name'>
                    <img src={images} alt="hai"></img>
                    <div>
                        <p>Hello</p>
                        <h5>{name}</h5>
                    </div>
                </Box>
                <Box className='sidebar'>
                    {rendersidebar}
                </Box>
            </Grid>
            <Grid item md={8}>
                <div className='profile_lists'>
                    {/* addressitems */}
                    {isMyAddress && <AddressList />}
                    {isWishlist && <Wishlist />}
                </div>
            </Grid>
        </Grid>
    );

    return (
        <div>
            <Header />
            {isDesktop ? renderDesktopviews : renderMobileview()}
            <Footer />
        </div>
    )
}
