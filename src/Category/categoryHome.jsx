import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllcategoryList } from '../_Actions/categoryactions';
import { Box, Grid } from '@mui/material';
import './category.css'
import { CategoryHeaderSkeleton } from '../_Skeleton';
import images from "../_Images/placholder.png";

export const CategoryHome = () => {

    const category = useSelector(state => state.category);
    const dispatch = useDispatch();

    useEffect(() => {
        let query = {
            pageVo: {
                pageNo: 1,
                noOfItems: 30,
            },
            name: "MenuHeader",
            status: 1
        }
        dispatch(getAllcategoryList(query));
    }, [])

    const renderCategories = (items) => {
        console.log(items, "items");
        let categories = items.length > 0 && items[0].childs && items[0].childs.length > 0 && items[0].childs;

        let myarray = [];

        for (let category of categories) {
            myarray.push(

                <Grid item className="box">
                    {category.image ? <img src={category.image} alt="hai"/> : <img src={images} alt="hai"></img>}
                    <p>
                        {category.name}
                    </p>
                </Grid>
            )
        }
        return myarray;
    }

    return (
        <Box sx={{ marginTop: "17px" }}>
            <Grid container wrap='nowrap' spacing={2} sx={{ overflowY: { xs: 'scroll', md: 'hidden' }, backgroundColor: "#fff" }}>
                {category.categoryfullData && category.categoryfullData.length > 0 ? renderCategories(category.categoryfullData) : <CategoryHeaderSkeleton />}
            </Grid>

        </Box>
    )
}
