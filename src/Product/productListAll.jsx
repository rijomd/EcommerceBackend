import React, { useState } from 'react'
import { useParams, } from "react-router-dom";
import { ProductList } from './productList';
import { FilterBar } from './filterbar';
import { SortBar } from './sortBar';
import { Grid } from '@mui/material';
import { Header } from '../Components/header';
import { Footer } from '../Components/footer';
import SortIcon from '@mui/icons-material/Sort';
import FilterListIcon from '@mui/icons-material/FilterList';
import { useMediaQuery } from '@react-hook/media-query';

export const ProductListAll = () => {

    let { id } = useParams();
    const [openSort, setOpenSortbar] = useState(false);
    const [openFilter, setOpenFilter] = useState(false);

    const isDesktop = useMediaQuery('(min-width: 768px)'); //for desktops only

    const openSortbar = () => {
        setOpenFilter(false);
        setOpenSortbar(true);
    }
    const handleCloseSort = () => {
        setOpenSortbar(false);
    }
    const openFilterbar = () => {
        setOpenSortbar(false);
        setOpenFilter(true);
    }
    const handlecloseFilter = () => {
        setOpenFilter(false);
    }
    const renderproductLisAll = () => {
        console.log(window.innerWidth, "width");
        let width = window.innerWidth;
        //desktop
        if (width > 770) {
            return (<div className='productList_allDesktop'>
                <Grid container spacing={2} >
                    <Grid item md={3} >
                        <FilterBar />
                    </Grid>
                    <Grid item md={9}>
                        <div className='product_category'>
                            {/* <p >{c_name}</p> */}
                            <p >Related Items</p>
                            <span className=''>(Showing all products)</span>
                        </div>
                        <SortBar />
                        <ProductList id={id} />
                        {/* <ProductList id={id} categoryname={(c_name) => setCategoryname(c_name)} /> */}
                    </Grid>
                </Grid>
            </div>)
        }
        //mobiles
        else {
            return (<div className='productList_mobile'>
                <Grid container spacing={2} sx={{ backgroundColor: "#fff" }} >
                    <Grid item xs={6} >
                        <div className='productList_allmobile' onClick={openFilterbar}>
                            <p><FilterListIcon /></p>
                            <p>Filter</p>
                        </div>
                    </Grid>
                    <Grid item xs={6}>
                        <div className='productList_allmobile' onClick={openSortbar}>
                            <p><SortIcon /></p>
                            <p>Sort</p>
                        </div>
                    </Grid>
                </Grid>
                {openSort && <SortBar openSort={openSort} handleCloseSort={handleCloseSort} />}
                {openFilter && <FilterBar openFilter={openFilter} handlecloseFilter={handlecloseFilter} />}
                <div>
                    <ProductList id={id} />
                </div>
            </div>)
        }
    }

    return (
        <div>
            <Header />
            {renderproductLisAll()}
            {isDesktop ? <Footer /> : null}
        </div>
    )
}
