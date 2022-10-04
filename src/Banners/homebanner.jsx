import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { OptionsList } from '../_Actions/optionsactions';
import Carousel from "react-material-ui-carousel";
import "./banners.css";
import images from "../_Images/chairbanner.jpg";

export const Homebanner = () => {

  const options = useSelector(state => state.options);
  const dispatch = useDispatch();
  const [bannerdata, setbannerdata] = useState([]);
  const [bannerdatamobile, setbannerdataMobile] = useState([]);
  const [isloading, seloading] = useState(false);

  useEffect(() => {
    seloading(true);
    dispatch(OptionsList({ status: 1, key: "banner" })).then(function (res) {
      if (res) {
        seloading(false);
        let newarray = [];
        let newarray2 = [];
        for (let item of res) {
          if (item.ismobile) {
            newarray.push(item);
          }
          else {
            newarray2.push(item);
          }
        }
        setbannerdata(newarray2);
        setbannerdataMobile(newarray);
      }
    })
  }, [])

  const renderBannerdata = () => {
    let width = window.innerWidth;
    if (width > 770) {
      return (<Carousel
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
        className="carousel"
      >
        {bannerdata.map((item) => (
          <img src={item.image} alt="" className="images" />
        ))}
      </Carousel>)
    }
    else {
      return (<Carousel
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
        className="carousel"
      >
        {bannerdatamobile.map((item) => (
          <img src={item.image} alt="" className="images" />
        ))}
      </Carousel>)
    }
  }

  return (
    <>
      {!isloading && renderBannerdata()}
    </>
  )
}
