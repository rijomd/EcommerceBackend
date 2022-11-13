import React from 'react'
import { LoadingButton } from '@mui/lab';

export const PaymentOptions = (props) => {

    const { cashOnDelivery, onlinPayment } = props;

    return (
        <div className='payment'>
            <LoadingButton variant="outlined" onClick={cashOnDelivery}>
                COD
            </LoadingButton >

            <LoadingButton variant="outlined" onClick={onlinPayment} >
                ONLINE
            </LoadingButton >
        </div>
    )
}

