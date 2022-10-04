import React, { useState, useEffect } from 'react';
import '../Profile/profile.css'
import { useDispatch, useSelector } from 'react-redux';
import { Box } from '@mui/material';
import { getAllAdress, addAdress } from '../_Actions/addressAction';
import AddIcon from '@mui/icons-material/Add';
import ListIcon from '@mui/icons-material/List';
import { AddressAdd } from './addAdress';
import { EditAddress } from './editAddress';
import loadingimage from "../_Images/loader1.gif";
import { useMediaQuery } from '@react-hook/media-query';
import { Header } from '../Components';


export const AddressList = () => {

    const addresses = useSelector(state => state.addresses);
    const dispatch = useDispatch();
    const [isAddnew, setAddNew] = useState(false);
    const [isEdit, setEditModal] = useState(false);
    const [add_id, setAddressId] = useState({});
    const [isLoading, setLoading] = useState(false);
    const isMobile = useMediaQuery('(max-width: 830px)'); //for isDesktop only

    useEffect(() => {
        setLoading(true);
        dispatch(getAllAdress({ status: 1 })).then((res) => {
            setLoading(false);
        });
    }, []);


    const editAddress = (address) => {
        setAddressId(address);
        setEditModal(true);
    }
    const closeEditModal = () => {
        setEditModal(false);
        setAddressId('');
    }
    const deleteAddress = (address_id) => {
        dispatch(addAdress({ address_id: address_id, delete: true }))
    }

    const openAddModal = () => {
        setAddNew(true);
    }
    const closeModal = () => {
        setAddNew(false);
    }

    const rendermylists = () => {
        if (isLoading) {
            return <img src={loadingimage} style={{ width: "100%", objectFit: "contain" }} />
        }
        if (addresses.adressarray && addresses.adressarray.length > 0) {
            return renderAsressess(addresses.adressarray)
        }
    }

    const renderAsressess = (addressess) => {
        let myArray = [];
        console.log(addressess, "addresses.adressarray")
        let hide;
        for (let address of addressess) {
            if (add_id._id === address._id) { hide = true }
            myArray.push(
                <Box item className={"row" + (hide ? "hide" : "")}>
                    <Box className="adressbar">
                        <div class="dropdown_profile">
                            <ListIcon />
                            <div class="dropdown_profile-content">
                                <p onClick={() => editAddress(address)}>Edit</p>
                                <p onClick={() => deleteAddress(address._id)}>Delete </p>
                            </div>
                        </div>
                        <div className='type_adress'>
                            <span>Home</span>
                        </div>
                        <p>
                            <span className='add_name'>{address.name}</span>
                            <span className='add_phone'>{address.phone}</span>
                        </p>
                        <p className='adress_adres'>{address.address}</p>
                        <p className='adress_adres'>{address.pin}</p>
                    </Box>
                </Box>
            )
        }
        return myArray;
    }

    return (
        <>
            {isMobile && <Header />}
            
            <Box className="adresslist">
                <p className="adress_head">Manage Addresses</p>
                {!isAddnew && <Box className="add_adres_div">
                    <div className='add_adres' onClick={openAddModal}>
                        <p style={{ padding: "0px 8px" }}>  <AddIcon /></p>
                        <p>ADD A NEW ADDRESS</p>
                    </div>
                </Box>}
                {isAddnew && <AddressAdd closeModal={closeModal} />}
                {isEdit && <EditAddress closeEditModal={closeEditModal} address={add_id} />}
                <Box>
                    {rendermylists()}
                </Box>
            </Box>
        </>

    )
}
