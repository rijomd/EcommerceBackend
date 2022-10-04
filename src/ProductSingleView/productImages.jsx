import React from 'react'
import './productsingle.css'
import ReactImageMagnify from "react-image-magnify";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export const ProductImages = (props) => {

    const { productData } = props;

    const renderImages = () => {
        let myarray = [];
        if (productData.productPictures && productData.productPictures.length > 0) {
            myarray.push(
                <div className='productimages_outline'>
                    <div className='side_imageview'>
                        <ul>
                            {productArray(productData.productPictures)}
                        </ul>
                        <div classNm></div>
                        
                    </div>
                    <div className='image_view'>
                        <div className="magnifyimage">
                            <ReactImageMagnify
                                {...{
                                    smallImage: {
                                        alt: "Wristwatch by Ted Baker London",
                                        isFluidWidth: true,
                                        src: productData.productPictures[0],
                                        srcSet: productData.productPictures[0],
                                        sizes:
                                            "(min-width: 800px) 33.5vw, (min-width: 415px) 50vw, 100vw"
                                    },
                                    largeImage: {
                                        alt: "",
                                        src: productData.productPictures[0],
                                        width: 1200,
                                        height: 1800
                                    },
                                    isHintEnabled: true
                                }}
                            />
                        </div>

                    </div>
                </div>
            );
        }
        return myarray;
    }

    const productArray = (imagearray) => {
        let images = [];
        for (let i = 0; i < imagearray.length; i++) {
            images.push(
                <li className='side_imagelist'>
                    <div className='imagelist_div'>
                        <img src={imagearray[i]} />
                    </div>
                </li>
            )
        }
        return images;
    }


    return (
        <div className='renderImages'>
            {renderImages()}
        </div>
    )
}




















