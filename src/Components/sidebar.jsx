import React from 'react'
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import HomeIcon from '@mui/icons-material/Home';
import PropTypes from 'prop-types';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Link } from "react-router-dom";
import './component.css'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import { LoutPage } from "../Container";

export const Sidebar = (props) => {
    const { window, isLoggedin } = props;
    const misc = useSelector(state => state.misc);
    const dispatch = useDispatch();

    const handleDrawerToggle = () => {
        dispatch({
            type: "ISMENUBAR_OPEN",
            data: !misc.isMenuopen
        })
    };
    console.log(misc.isMenuopen, "isMenuopen")
    const container = window !== undefined ? () => window().document.body : undefined;
    const drawerWidth = 240;

    const logOut = () => {
        dispatch({
            type: "IS_LOGOUTMODAL_OPEN",
            data: true
        });
    }

    const drawer = (
        <div>
            <Toolbar style={{ background: '#2874f0', display: "flex" }}>
                <Typography variant="h6" noWrap sx={{ color: "#fff", flex: 1 }}>
                    G-SHOP
                </Typography>
                <Typography className='typo' onClick={handleDrawerToggle}>
                    X
                </Typography>
            </Toolbar>
            <Divider />
            {isLoggedin && <List>
                {['Home', 'Wishlist', 'Cartlist', 'Account', 'Logout'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                {index === 0 && <HomeIcon />}
                                {index === 1 && <FavoriteIcon />}
                                {index === 2 && <ShoppingCartIcon />}
                                {index === 3 && <PersonIcon />}
                                {index === 4 && <PowerSettingsNewIcon />}
                            </ListItemIcon>
                            {index === 4 ?
                                <ListItemText primary={text} onClick={logOut} sx={{ color: "rgba(0, 0, 0, 0.54)" }}/>
                                :
                                <Link to={"/profile/" + text} style={{ textDecoration: "none", color: "rgba(0, 0, 0, 0.54)" }}>
                                    <ListItemText primary={text} />
                                </Link>}


                        </ListItemButton>
                    </ListItem>
                ))}
            </List>}
            {!isLoggedin && <List>
                {['Home', 'Cartlist'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                {index === 0 && <HomeIcon />}
                                {index === 1 && <ShoppingCartIcon />}
                            </ListItemIcon>
                            <Link to={"/" + text} style={{ textDecoration: "none", color: "rgba(0, 0, 0, 0.54)" }}>
                                <ListItemText primary={text} />
                            </Link>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>}
        </div>
    );

    return (
        <>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                <Drawer
                    container={container}
                    variant="temporary"
                    open={misc.isMenuopen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            {misc.isLogoutmodalOpen && <LoutPage />}

        </>
    )
}


Sidebar.propTypes = {
    window: PropTypes.func,
};
