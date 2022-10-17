import React from 'react';
import { Header } from '../Components/header';
import { Footer } from '../Components/footer';
import { CategoryHome } from '../Category/categoryHome';
import { FlexibleCategories } from '../Category/flexibleCategories';
import { Homebanner } from '../Banners/homebanner';
import { ProductListInHome } from '../Product/productlistInHome';
import { ProductBannersHome } from '../Banners/productBannersHome';

export const Home = () => {
  return (
    <>
      <Header />
      <CategoryHome />

      <Homebanner />

      <ProductListInHome />

      <ProductBannersHome />

      <FlexibleCategories />

      <Footer />

    </>
  )
}
