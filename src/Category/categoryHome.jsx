import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllcategoryList } from '../_Actions/categoryactions';
import { Box, Grid } from '@mui/material';
import './category.css'
import { CategoryHeaderSkeleton } from '../_Skeleton'
export const CategoryHome = () => {

    const category = useSelector(state => state.category);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllcategoryList({ status: 1 }));
    }, [])

    const renderCategories = (categories) => {
        let myarray = [];

        for (let category of categories) {
            myarray.push(

                <Grid item className="box">
                    <img src={category.image} />
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
                {category.categoryfullData && category.categoryfullData.length > 0 ? renderCategories(category.categoryfullData) :   <CategoryHeaderSkeleton />}
            </Grid>
          
        </Box>
    )
}
