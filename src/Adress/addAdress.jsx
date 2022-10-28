import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import '../Profile/profile.css'
import { useDispatch, useSelector } from 'react-redux';
import { addAdress } from '../_Actions/addressAction';
import { LoadingButton } from '@mui/lab';
import Button from '@mui/material/Button';
import { useMediaQuery } from '@react-hook/media-query';

export const AddressAdd = (props) => {

    const { closeModal } = props;

    const [iserror, setError] = useState(false);
    const [errmsg, setMsg] = useState(false);
    const [isloading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const isDesktop = useMediaQuery('(min-width: 830px)'); //for isDesktop only



    const validateForm = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        let phone = data.get('phone');
        let name = data.get('name');
        let locality = data.get('locality');
        let pin = data.get('pin');
        let address = data.get('address');
        let landmark = data.get('landmark');
        let city = data.get('city');
        let state = data.get('state');
        let a_phone = data.get('a_phone');

        let addressess = {
            phone: phone,
            name: name,
            locality: locality,
            pin: pin,
            address: address,
            landmark: landmark,
            city: city,
            state: state,
            a_phone: a_phone,
        }

        console.log(addressess);
        if (addressess.phone && addressess.phone.length !== 10) {
            setError(true);
            setMsg("Invalid Phone");
            return null;
        }
        else if (addressess.pin && addressess.pin.length !== 6) {
            setError(true);
            setMsg("Invalid Pin");
            return null;
        }
        else {
            handleSubmit(addressess);
        }

    };

    const handleSubmit = (adress) => {
        setError(false);
        setLoading(true);
        dispatch(addAdress(adress)).then(function (res) {
            if (res) {
                setLoading(false);
                closeModal();
            }
        })
    }


    return (
        <Box className='add_addressForm'>
            <div className='add_form'>
                <p>ADD A NEW ADDRESS</p>
                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: isDesktop ? '40%' : '100%' },
                    }}
                    Validate
                    autoComplete="off"
                    onSubmit={validateForm}
                >
                    <div>
                        <TextField
                            label="Name"
                            id="name"
                            name="name"
                            required={true}
                            sx={{ backgroundColor: "#fff" }}
                        />
                        <TextField
                            id="phone"
                            name="phone"
                            label="Phone"
                            required
                            sx={{ backgroundColor: "#fff" }}

                        // helperText="Incorrect entry."
                        />
                    </div>

                    <div>
                        <TextField
                            id="pin"
                            name="pin"
                            label="Pincode"
                            required
                            sx={{ backgroundColor: "#fff" }}

                        />
                        <TextField
                            id="locality"
                            name="locality"
                            label="Locality"
                            sx={{ backgroundColor: "#fff" }}

                        />
                    </div>

                    <div>
                        <div className="adress">
                            <textarea
                                id="address"
                                name="address"
                                label="Address"
                                placeholder="Address"
                                className="address_text"
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <TextField
                            id="city"
                            name="city"
                            label="City"
                            required
                            sx={{ backgroundColor: "#fff" }}

                        />
                        <TextField
                            id="state"
                            name="state"
                            label="State"
                            required
                            sx={{ backgroundColor: "#fff" }}

                        // variant="filled"
                        />
                    </div>
                    <div>
                        <TextField
                            id="landmark"
                            name="landmark"
                            label="Landmark (Optional)"
                            sx={{ backgroundColor: "#fff" }}

                        />
                        <TextField
                            id="a_phone"
                            name="a_phone"
                            label="Alternate Phone"
                            variant="filled"
                        />
                    </div>
                    {iserror && <>
                        <p className="error_par">{errmsg}</p>
                    </>}
                    <div className='address_button'>
                        <LoadingButton type="submit" isloading={isloading} variant="contained" sx={{ mt: 3, mb: 2 }}>Save</LoadingButton>
                        <Button variant="text" onClick={closeModal}>Cancel</Button>
                    </div>
                </Box>
            </div >
        </Box >

    );
}
