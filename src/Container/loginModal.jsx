import React, { useState, useEffect } from 'react';
import Modal from '@mui/material/Modal';
import { useDispatch, useSelector } from 'react-redux';
import './container.css';
import { LoginPage } from "./loginPage";
import { OptionsList } from '../_Actions/optionsactions';

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

export const LoginModal = () => {

    const misc = useSelector(state => state.misc);
    const dispatch = useDispatch();
    const [login_image, setLoginImage] = useState('');

    const handleClose = () => {
        dispatch({
            type: "IS_LOGINMODAL_OPEN",
            data: false
        })
    }
    useEffect(() => {
        dispatch(OptionsList({ status: 1, key: "loginimage" }, "login")).then(function (res) {
            if (res) {
                console.log(res, "image")
                setLoginImage(res.valueobject[0].image)
            }
        })
    }, [])
    return (
        <div>
            <Modal
                open={misc.isLoginmodalOpen}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <LoginPage login_image={login_image} />

            </Modal>
        </div>
    );
}
