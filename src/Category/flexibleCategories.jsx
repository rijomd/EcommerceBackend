import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { categoryList } from '../_Actions/categoryactions';
import { Box, Grid, Button } from '@mui/material';
import { Link } from "react-router-dom";
import './category.css'
import { CategoryHeadr_Skeleton } from '../_Skeleton'
import { useMediaQuery } from '@react-hook/media-query'

export const FlexibleCategories = () => {

  const category = useSelector(state => state.category);
  const dispatch = useDispatch();

  let query = {
    status: 1,
    type: 2,
    home_visibility: true,
    flexible: true
  }

  useEffect(() => {
    dispatch(categoryList(query));
  }, []);

  const isMobile = useMediaQuery('(max-width: 768px)'); //for mobiles only

  const rendermainCategories = (categories) => {
    let myarray = [];
    for (let category of categories) {
      myarray.push(
        < Box className='rendermainCategories' style={{ backgroundColor: isMobile ? category.background_color : '#fff' }}>
          <div className='flex_div_cateory'>
            <p className="flexible_category_para">{category.name}</p>
            <Link to={"/flexiblecategoryList/" + category._id} style={{ textDecoration: "none" }}>
              <Button sx={{ margin: "10px" }} variant="contained">View All</Button>
            </Link>

          </div>

          <Grid container spacing={2} sx={{ paddingTop: "25px" ,width:"100%",justifyContent:"center",margin:"auto" }}>
            {category.childs && category.childs.length > 0 ?
              renderCategories(category.childs) : null}
          </Grid>
        </Box>
      )
    }
    return myarray;
  }

  const renderCategories = (categories) => {
    let myarray = [];
   
    let length =  isMobile ? 4 : 6 ;

    for (let category of categories) { 
      myarray.push(
        <Grid xs={5} md={2} item className="flexble_grid">
          <Link to={"/ProductListAll/" + category._id} style={{ textDecoration: "none" }}>
            <img src={category.image} />
            <p>
              {category.name}
            </p>
          </Link>
        </Grid>
      )
    }
    return myarray.slice(0, length);
  }

  return (
    <>
      {category.flexiblecategory.length > 0 ? rendermainCategories(category.flexiblecategory) : <CategoryHeadr_Skeleton />}

    </>
  )
}
