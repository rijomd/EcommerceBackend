import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { authService } from '../_Service/authService';
import { useDispatch, useSelector } from 'react-redux';
import './container.css';
import { AlertBox, } from '../Components';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export const LoutPage = () => {

    const misc = useSelector(state => state.misc);
    const dispatch = useDispatch();
    const [ismsg, setSuccess] = useState(false);
    const [msg, setMsg] = useState(false);

    const handleClose = () => {
        dispatch({
            type: "IS_LOGOUTMODAL_OPEN",
            data: false
        })
    }
    const logOut = () => {
        let data = authService.logOut();
        if (data) {
            setSuccess(true);
            setMsg("Suuccess!");
            setTimeout(function () {
                dispatch({
                    type: "IS_LOGOUTMODAL_OPEN",
                    data: false
                })
            }, 1000);

        }
    }


    return (
        <div>
            <Modal
                open={misc.isLogoutmodalOpen}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} className="logoutmodal">
                    {!ismsg && <Box sx={{ display: "flex" }}>
                        <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ flex: "1" }}>
                            Are You sure to Logout?
                        </Typography>
                        <Typography id="modal-modal-title" variant="h6" component="h2" onClick={handleClose}>
                            X
                        </Typography>
                    </Box>}

                    {!ismsg && <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <Button variant="contained" onClick={logOut}>Continue</Button>
                    </Typography>}
                    {ismsg && <AlertBox
                        message={msg}
                    />}
                </Box>
            </Modal>
        </div>
    );
}
