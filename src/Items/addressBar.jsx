import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Typography, Box } from '@mui/material';
import './item.css'
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Checkbox from '@mui/material/Checkbox';
import { getAllAdress } from '../_Actions/addressAction';
import { Loader } from "../Components/loader";
import { Link } from 'react-router-dom';

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

export const AddressBar = () => {

    const [isopen, setChangeModal] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [selected_address, setAddress] = useState({});
    const dispatch = useDispatch();
    const addresses = useSelector(state => state.addresses);

    useEffect(() => {
        setLoading(true);
        dispatch(getAllAdress({ status: 1 })).then(function (res) {
            setLoading(false);
            if (res.length > 0) {
                setAddress(res[0]);//setting selectable list
            }
        })
    }, [])

    const openChangeModal = () => {
        setChangeModal(true);
    }
    const handleClose = () => {
        setChangeModal(false);
    }
    const selectAddress = (address) => {
        setAddress(address);
        setChangeModal(false);
    }

    //selectable list
    const renderAddress = () => {
        let myArray = [];
        let address = selected_address;
        if(address._id){
            myArray.push(
                <Box className="">
                    <Box className='single_address'>
                        <p>Deliver to:</p>
                        <span className=''>{address.name},</span>
                        <span className=''>{address.phone}</span>
                        <Box className='type_address'>
                            Home
                        </Box>
                    </Box>
                    <Box className='address_all'>
                        <p className='adress_adres'>{address.address}</p>
                    </Box>
                </Box>
            );
        }
        return myArray;
    }

    //shows my addresslist
    const rendermyarray = (adrressArray) => {
        let myArray = [];

        for (let address of adrressArray) {
            let isSelected = false;
            if (address._id === selected_address._id) {
                isSelected = true;
            }
            myArray.push(
                <div style={{ display: "flex" }}>
                    <div className="">
                        <div className='single_address'>
                            <p>Deliver to:</p>
                            <span className=''>{address.name},</span>
                            <span className=''>{address.phone}</span>
                            <div className='type_address'>
                                Home
                            </div>
                        </div>
                        <div className='address_all'>
                            <p className='adress_adres'>{address.address}</p>
                        </div>
                    </div>
                    <div className="">
                        <Checkbox defaultChecked={isSelected} onClick={() => selectAddress(address)} />
                    </div>
                </div>
            );
        }
        return myArray;
    }

    //shows empty selected adres (no adres)
    const renderButtons = () => {
        if (selected_address && selected_address._id) {
            return <Button variant="outlined" onClick={openChangeModal}>Change</Button>
        }
        else {
            return <Link to='/profile' style={{ textDecoration: "none" }}>
                <Button variant="contained">Add Address</Button>
            </Link>
        }
    }

    return (
        <div>
            <Grid container spacing={2} className='adress_bar'>
                <Grid item md={7} xs={12} className="addres_namebar" >
                    {!isLoading ? renderAddress(addresses.adressarray) : <Loader />}
                </Grid>
                <Grid item md={4} xs={12} className="addres_button" >
                    {renderButtons()}
                </Grid>
            </Grid>


            <Modal
                open={isopen}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Box sx={{ display: "flex" }}>
                        <Typography id="modal-modal-title" sx={{ padding: "1rem 0px", fontSize: "18px", flex: "1" }}>
                            Select Delivery Address
                        </Typography>
                        <Typography sx={{ padding: "1rem 0px", fontSize: "22px" }} onClick={handleClose}>
                            X
                        </Typography>
                    </Box>
                    {rendermyarray(addresses.adressarray)}
                </Box>
            </Modal >

        </div >
    )
}


