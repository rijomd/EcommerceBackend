import React, { useEffect, useState } from 'react'
import { Header } from '../Components/header';
import { Footer } from '../Components/footer';
import {
    useParams,
} from "react-router-dom";
import { Grid } from '@mui/material';
import './category.css'
import { Link } from "react-router-dom";
import { CategoryHeadr_Skeleton } from '../_Skeleton';

export const FlexiblecataoriesList = () => {

    const [categoryList, setCategoryList] = useState([]);
    const [categoryname, setCategoryname] = useState("");

    let { id } = useParams();

    useEffect(() => {
        let flexible_categoryArray = JSON.parse(localStorage.getItem('flexible_categoryArray'));
        if (flexible_categoryArray && flexible_categoryArray.length > 0) {
            for (let category of flexible_categoryArray) {
                if (category._id === id) {
                    setCategoryList(category.childs);
                    setCategoryname(category.name);
                }
            }
        }
    }, []);

    const renderCategories = () => {
        let myarray = [];
        for (let category of categoryList) {
            myarray.push(
                <Grid item xs={6} md={3} className='flexble_gridList'>
                    <Link to={"/ProductListAll/" + category._id} style={{ textDecoration: "none" }}>
                        <div>
                            <img src={category.image} />
                        </div>
                        <div>
                            <p>{category.name}</p>
                        </div>
                    </Link>
                </Grid>
            )
        }
        return myarray;
    }

    return (
        <div>
            <Header />

            <div className="flex_catlist">
                <h1>{categoryname}</h1>
                <Grid container spacing={2}>
                    {categoryList.length > 0 ? renderCategories() : <CategoryHeadr_Skeleton />}
                </Grid>
            </div>

            <Footer />
        </div>
    )
}
