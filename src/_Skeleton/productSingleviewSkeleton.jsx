import React from 'react';
import { Grid } from '@mui/material';

import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import "../ProductSingleView/productsingle.css";

export const ProductSingleviewSkeleton = () => {


    const renderBlocks = () => {
        let myarray = [];
        for (let i = 0; i < 4; i++) {
            myarray.push(
                <Grid item md={3} xs={6} sx={{ padding: "5px" }}>
                    <Skeleton height={75} />
                </Grid >
            )
        }
        return myarray;
    }

    return (

        <Grid container spacing={2} sx={{ backgroundColor: "#fff", marginTop: "auto" }} >
            <Grid item md={6} className="skelton_images" >
                <SkeletonTheme baseColor="#ebebeb" highlightColor="#f5f5f5">
                    <p>
                        <Skeleton height={450} />
                    </p>
                </SkeletonTheme>
            </Grid>
            <Grid item md={6}>
                <SkeletonTheme baseColor="#ebebeb" highlightColor="#f5f5f5">
                    <p>
                        <Grid container>
                            {renderBlocks()}

                        </Grid>
                        <Skeleton height={110} sx={{ padding: "5px" }}/>
                        <Skeleton count={13} sx={{ padding: "5px" }}/>
                    </p>
                </SkeletonTheme>
            </Grid>
        </Grid>
    )
}

