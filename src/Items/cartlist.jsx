import React, { useEffect, useState } from 'react'
import { Header, Footer } from '../Components';
import './item.css'
import { useDispatch, useSelector } from 'react-redux';
import { getcartlist } from '../_Actions/itemactions';
import { EmptyCart } from './emptyCart';
import { CartItems } from './cartItems';
import { CartSkeleton } from '../_Skeleton'


export const CartList = () => {

    const [isloading, setLoading] = useState(false);
    const [isEmpty, setEmpty] = useState(false);
    const [mylist, setMylist] = useState([]);

    const dispatch = useDispatch();
    console.log(mylist.length, "length", isloading);
    useEffect(() => {
        let user = {};
        let cartlist = [];
        setLoading(true);
        if (localStorage.getItem('user')) {
            user = JSON.parse(localStorage.getItem('user'));
            if (user) {
                dispatch(getcartlist({ status: 1, })).then(function (res) {
                    setMylist(res);
                    setLoading(false);
                    if (res.length == 0) {
                        setEmpty(true);
                    }
                })
            }
        }
        else {
            if (localStorage.getItem('cartlist_array')) {
                cartlist = JSON.parse(localStorage.getItem('cartlist_array'));
                setMylist(cartlist);
                setLoading(false);
            } else {
                setEmpty(true);
                setLoading(false);
            }
        }

    }, []);

    const renderCartlists = () => {
        if (isloading) {
            return <CartSkeleton />
        }
        if (mylist.length > 0) {
            return < CartItems />
        }
        if (isEmpty) {
            return <EmptyCart />
        }
    }

    return (
        <div>
            <Header />
            {renderCartlists()}
            <Footer />
        </div>
    )
}
