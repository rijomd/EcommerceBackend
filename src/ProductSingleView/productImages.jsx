import React, { useState } from 'react';
import './productsingle.css';
import Carousel from "react-material-ui-carousel";
import { useMediaQuery } from '@react-hook/media-query';

import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';


export const ProductImages = (props) => {

    const { productData } = props;
    const [imagesingle, setImageSingle] = useState('');

    const changeImage = (image) => {
        setImageSingle(image);
    }
    const isMobile = useMediaQuery('(max-width: 830px)'); //for mobiles only


    const renderImages = () => {
        let myarray = [];
        if (productData.productPictures && productData.productPictures.length > 0) {
            for (let product of productData.productPictures) {
                myarray.push(
                    <div className=''>
                        <img src={product} />
                    </div>
                )
            }
        }
        return myarray;
    }



    return (
        <div className='renderImages'>

            {!isMobile &&
                <div className='productimages_outline'>
                    <Carousel
                        autoplay={true}
                        animation="slide"
                        indicators={false}
                        navButtonsAlwaysVisible={true}
                        cycleNavigation={true}
                        navButtonsProps={{
                            style: {
                                background: "#fff",
                                color: "#494949",
                                borderRadius: 0,
                                margin: 0,
                            },
                        }}
                        className="prosuct_images"
                    >
                        {renderImages()}
                    </Carousel>
                </div>}


            {isMobile &&
                <div className=''>
                    <AwesomeSlider>
                        {renderImages()}
                    </AwesomeSlider>
                </div>}
        </div>
    )
}




















