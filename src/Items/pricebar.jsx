import React, { useEffect, useState } from 'react'
import './item.css'
import { useDispatch, useSelector } from 'react-redux';

export const PriceBar = () => {

    const [priceObject, setPricebar] = useState({});
    const misc = useSelector(state => state.misc);

    useEffect(() => {
        if (localStorage.getItem('price_bar')) {
            let priceObj = JSON.parse(localStorage.getItem('price_bar'));
            setPricebar(priceObj);
        }
        console.log('haaaai')
    }, [misc.priceData]);

    return (
        <div className='pricebar'>
            <div className='pricebar_head'>
                <p>PRICE DETAILS</p>
            </div>
            <div className=''>
                <div className='pricebar_price'>
                    <p>Price</p>
                    <h2>₹{priceObject.orginal_price}</h2>
                </div>
                <div className='pricebar_price'>
                    <p>Discount</p>
                    <span>-₹{priceObject.discount}</span>
                </div>
                <div className='pricebar_price'>
                    <p>Delivery Charges</p>
                    <span>Free</span>
                </div>
                <div className='pricebar_total'>
                    <h3 style={{ flex: 1 }}>Total Amount</h3>
                    <h3>₹{priceObject.total_price}</h3>
                </div>
            </div>
            <div className='pric_saves'>
                <p>You will save ₹{priceObject.discount} on this order</p>
            </div>
        </div>
    )
}
