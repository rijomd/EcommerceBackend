import React from 'react'
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { Grid } from '@mui/material';

export const ProductDetails = (props) => {

  const { productData, varientdata, atribute_value, varientsArray, setAtribute, setVarient,setLoading } = props;


  const changevarient = (value) => {
    setLoading(true);
    if (varientsArray.length > 0) {
      for (let item of varientsArray) {
        if (item.atribute_value && item.atribute_value.length > 0) {
          for (let i of item.atribute_value) {
            if (value === i) {
              setAtribute(item.atribute_value);
              setVarient(item);
            }
          }
        }
      }
    }
    setLoading(false);
  }


  const renderattributevalues = (values) => {
    let myarray = [];
    if (atribute_value && atribute_value.length > 0 && values && values.length > 0) {
      for (let item of values) {
        let checked = false;
        for (let i of atribute_value) {
          if (item === i) {
            checked = true;
          }
        }
        myarray.push(
          <Grid item lg={2} md={2} className="unselected_varient" >
            <a className={checked ? "selected_varient" : ""} onClick={() => changevarient(item)}>
              {item}
            </a>
          </Grid>
        );
      }
    }
    return myarray;
  }

  const renderAttributes = () => {
    let myarray = [];
    if (productData.saved_Attributes && productData.saved_Attributes.length > 0) {
      for (let item of productData.saved_Attributes) {
        myarray.push(
          <Grid container sx={{ margin: "1rem 0px" }}>
            <Grid item lg={1} md={1}>
              <p className='key_product'>
                {item.key}
              </p>
            </Grid>
            <Grid item lg={11} md={11} className='keyvalues_product'>
              <Grid container>
                {renderattributevalues(item.value)}
              </Grid>
            </Grid>
          </Grid>
        )
      }
    }
    return myarray;
  }


  const renderSpecvalues = (values) => {
    let myarray = [];
    if (values.length > 0) {
      for (let item of values) {
        myarray.push(
          <div className="specvalues_singleview">
            <p className="spec_para">{item.spec}</p>
            <p className="spec_field">{item.field}</p>
          </div>
        )
      }

    }
    return myarray;
  }

  const renderSpecifications = () => {
    let myarray = [];
    for (let item of varientdata.specifications) {
      myarray.push(
        <div className="specification_singleview">
          <h3>{item.key}</h3>
          {renderSpecvalues(item.value)}
        </div>
      )
    }

    return myarray;
  }

  const renderProductDetails = () => {
    let myarray = [];
    for (let item of varientdata.product_details) {
      myarray.push(
        <div className="specvalues_singleview">
          <p className="spec_para">{item.key}</p>
          <p className="spec_field">{item.value}</p>
        </div>
      )
    }

    return myarray;
  }

  return (
    <div className="product_details">

      <h2 className="varient_name">
        {varientdata.varient_name}
      </h2>

      <div className='product_subhead'>
        <div className='rating_list'>
          4.4
          <StarBorderIcon sx={{ height: "13px !important", width: "13px !important" }} />
        </div>
        <a>25076 Rtaings,1201 Customer reviews</a>
      </div>


      <div className="price_bar">
        <h3 className="price-container">
          ₹{varientdata.selling_price}
        </h3>
        <h3 className="original">
          ₹{varientdata.orginal_price}
        </h3>
        <h3 className="price-offer">{varientdata.offer}%</h3>
      </div>

      {productData.saved_Attributes && productData.saved_Attributes.length > 0 && <div className="description-tabs" >
        <h3>
          Select Your varients
        </h3>
        {renderAttributes()}
      </div>}

      <div className="description-tabs">
        <h3 className="">
          Description
        </h3>
        <p className="description-container">
          {productData.description}
        </p>
      </div>

      <div className="description-tabs">
        <h3>
          Highlights
        </h3>
        <p className="description-container">
          {productData.short_desc}
        </p>
      </div>

      {varientdata.product_details && varientdata.product_details.length > 0 && varientdata.product_details[0].key &&
        <><div className="specs_all description-tabs">
          <h3 className='Specifications-container'>
            Product Details
          </h3>
          {renderProductDetails()}
        </div>
        </>}


      {varientdata.specifications && varientdata.specifications.length > 0 && varientdata.specifications[0].key &&
        <div className="specs_all description-tabs">
          <h3 className="Specifications-container">
            Specifications
          </h3>
          {renderSpecifications()}
        </div>}


    </div>
  )
}
