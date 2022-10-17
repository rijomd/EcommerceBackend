import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';

import { OptionsList } from '../_Actions/optionsactions';

import {  Grid } from '@mui/material';
import "./banners.css";

export const ProductBannersHome = () => {

    const dispatch = useDispatch();
    const [bannerdata, setbannerdata] = useState([]);
    const [isloading, seloading] = useState(false);

    useEffect(() => {
        seloading(true);
        dispatch(OptionsList({ status: 1, key: "slider" })).then(function (res) {
            if (res) {
                seloading(false);
                let newarray = [];
                for (let item of res) {
                    newarray.push(item);
                }
                setbannerdata(newarray);
                seloading(false);
            }
        })
    }, [])


    const renderSliderdata = () => {
        let myarray = [];
        for (let banner of bannerdata) {
            myarray.push(

                <Grid item xs={6} md={6} lg={3} className="productbanner_home">
                    <img src={banner.image} alt="hai"/>
                </Grid>
            )
        }
        return myarray;
    }

    return (
        <div className='productbanner_div'>
            {!isloading && <Grid container spacing={2}>
                {renderSliderdata()}
            </Grid>}
        </div>
    )
}

