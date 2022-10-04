import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import '../Profile/profile.css'
import { useDispatch, useSelector } from 'react-redux';
import { addAdress } from '../_Actions/addressAction';
import { LoadingButton } from '@mui/lab';
import Button from '@mui/material/Button';

export const EditAddress = (props) => {

    const { closeEditModal, address } = props;

    const [iserror, setError] = useState(false);
    const [errmsg, setMsg] = useState(false);
    const [isloading, setLoading] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {

    }, []);

    const validateForm = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        let phone = data.get('phone');
        let name = data.get('name');
        let locality = data.get('locality');
        let pin = data.get('pin');
        let adres = data.get('address');
        let landmark = data.get('landmark');
        let city = data.get('city');
        let state = data.get('state');
        let a_phone = data.get('a_phone');

        let addressess = {
            _id:address._id,
            phone: phone,
            name: name,
            locality: locality,
            pin: pin,
            address: adres,
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
                        '& .MuiTextField-root': { m: 1, width: '25ch' },
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
                            defaultValue={address.name}
                        />
                        <TextField
                            id="phone"
                            name="phone"
                            label="Phone"
                            required
                            sx={{ backgroundColor: "#fff" }}
                            defaultValue={address.phone}

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
                            defaultValue={address.pin}

                        />
                        <TextField
                            id="locality"
                            name="locality"
                            label="Locality"
                            sx={{ backgroundColor: "#fff" }}
                            defaultValue={address.Locality}
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
                                defaultValue={address.address}
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
                            defaultValue={address.city}
                        />
                        <TextField
                            id="state"
                            name="state"
                            label="State"
                            required
                            sx={{ backgroundColor: "#fff" }}
                            defaultValue={address.state}
                        />
                    </div>
                    <div>
                        <TextField
                            id="landmark"
                            name="landmark"
                            label="Landmark (Optional)"
                            sx={{ backgroundColor: "#fff" }}
                            defaultValue={address.landmark}
                        />
                        <TextField
                            id="a_phone"
                            name="a_phone"
                            label="Alternate Phone"
                            variant="filled"
                            defaultValue={address.a_phone}
                        />
                    </div>
                    {iserror && <>
                        <p className="error_par">{errmsg}</p>
                    </>}
                    <div className='address_button'>
                        <LoadingButton type="submit" isloading={isloading} variant="contained" sx={{ mt: 3, mb: 2 }}>Save</LoadingButton>
                        <Button variant="text" onClick={closeEditModal}>Cancel</Button>
                    </div>
                </Box>
            </div>
        </Box>

    );
}
