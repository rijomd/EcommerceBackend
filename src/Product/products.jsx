import React from 'react'
import './product.css'
import { Link } from "react-router-dom";
import StarBorderIcon from '@mui/icons-material/StarBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import images from "../_Images/placholder.png";

export const Products = (props) => {
    const { product, addToWishList, exist, myrating, wishstyle } = props;

    // const calculateOffer = (sellerprice, original) => {
    //     let i = (original - sellerprice) / original;
    //     let offer = i * 100;
    //     return offer;
    // }
    // let offer = calculateOffer(product.sell_price, product.orginal_price);

    return (
        <div className='product_div'>
            <div className='product_wishlist'>
                <Link to={"/productSingleview/" + product._id} style={{ textDecoration: "none", flex: 1 }}>
                    {product.productPictures && product.productPictures.length > 0 ? <img src={product.productPictures[0]} alt="haai" /> : <img src={images} alt="hai"></img>}
                </Link>
                <h2 onClick={() => addToWishList(product)}><FavoriteIcon className={exist ? "color" : ""} style={{ display: wishstyle ? 'none' : 'block' }} /></h2>
            </div>
            <div>
                <p className="product_name">{product.name}</p>
            </div>
            <div className="product_rating">
                <span className='rate_span'>
                    <div className='rating_list'>
                        {myrating}
                        <StarBorderIcon sx={{ height: "13px !important", width: "13px !important" }} />
                    </div>
                </span>
                <span className='rate_total'>
                    (12,353)
                </span>
            </div>
            <div className="product_pricetag">
                <p className='original_price'>Rs:{product.selling_price}</p>
                <p className='sell_price'>Rs:{product.orginal_price}</p>
                <p className='ofeer_product'>{product.offer}% off</p>
            </div>

        </div>
    )
}
