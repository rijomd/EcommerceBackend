import React, { useEffect, useState } from 'react';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';
import './product.css'
import { useMediaQuery } from '@react-hook/media-query';
import Popover from '@mui/material/Popover';

export const FilterBar = (props) => {

    const { openFilter, handlecloseFilter } = props;
    const isDesktop = useMediaQuery('(min-width: 768px)'); //for isDesktop only

    console.log(openFilter, "openFilter")
    //styling
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };
    //items
    const ratings = [
        '4★ & above',
        '3★ & above',
        '2★ & above',
        '1★ & above',
    ];
    const prices = [
        '₹1000', '₹2000', '₹3000', '₹4000'
    ];
    const [rating, setRating] = useState([]);
    const [price, setPrice] = useState([]);


    //handlechange
    const handlerating = (event) => {
        setRating(event.target.value);
    };
    const handlePrice = (event) => {
        setPrice(event.target.value);
    }
    const clearAll = () => {
        setRating([]);
        setPrice([]);
    }



    const renderForm = (
        <div className='filter_bar'>
            <div className='clear_all'>
                <span>Filters</span>
                <p onClick={clearAll}>clear all</p>
            </div>

            <div className='filter_columns'>
                <form autoComplete="off">
                    <FormControl className='formControl'>
                        <InputLabel htmlFor="select-multiple-chip"> Rating</InputLabel>
                        <Select
                            multiple
                            value={rating}
                            onChange={handlerating}
                            input={<Input id="select-multiple-chip" />}
                            renderValue={selected => (
                                <div className='select_type'>
                                    {selected.map(value => (
                                        <Chip key={value} label={value} />
                                    ))}
                                </div>
                            )}
                            MenuProps={MenuProps}
                        >
                            {ratings.map(name => (
                                <MenuItem key={name} value={name} >
                                    {name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </form>
            </div>

            <div className='filter_columns'>
                <form autoComplete="off">
                    <FormControl className='formControl'>
                        <InputLabel htmlFor="select-multiple-chip">Price </InputLabel>
                        <Select
                            multiple
                            value={price}
                            onChange={handlePrice}
                            input={<Input id="select-multiple-chip" />}
                            renderValue={selected => (
                                <div className='select_type' >
                                    {selected.map(value => (
                                        <Chip key={value} label={value} />
                                    ))}
                                </div>
                            )}
                            MenuProps={MenuProps}
                        >
                            {prices.map(name => (
                                <MenuItem key={name} value={name} >
                                    {name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </form>
            </div>
        </div>
    );

    //mobileview
    const renderFilterINMobile = () => {
        return (
            <Popover
                id='simple-popover'
                open={openFilter}
                // anchorEl={anchorEl}
                onClose={handlecloseFilter}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                PaperProps={{
                    style: { width: '100%' },
                }}
            >
                {renderForm}
            </Popover>
        )
    }


    //in desktop view
    const renderFilterINDesktop = () => {
        return (

            <>
                {renderForm}
            </>
        )
    }

    return (
        <div>
            {isDesktop && renderFilterINDesktop()}
            {!isDesktop && renderFilterINMobile()}
        </div>
    )
}
