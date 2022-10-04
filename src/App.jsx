import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import React from "react";

import { LoginPage } from './Container';
import { Home } from './Home';
import { FlexiblecataoriesList } from './Category';
import { ProductListFromHome,  ProductListAll } from './Product';
import { ProductSingleview } from './ProductSingleView';
import { Wishlist, CartList } from './Items';
import { Myprofile } from './Profile';
import { AddressList } from './Adress';
import { Ordersummery } from './CheckOut';





// ******************************************************************//
const App = () => {

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/" element={<Home />} />
          <Route exact path="/flexiblecategoryList/:id" element={<FlexiblecataoriesList />} />
          <Route exact path="/ProductListfromHome/:id" element={<ProductListFromHome />} />
          <Route exact path="/productSingleview/:id" element={<ProductSingleview />} />
          <Route exact path="/ProductListAll/:id" element={<ProductListAll />} />
          <Route exact path="/cartlist" element={<CartList />} />
          <Route exact path="/loginpage" element={<LoginPage />} />


          <Route path="/wishlist"
            element={<PrivateRoutes> <Wishlist /> </PrivateRoutes>}
          />
          <Route path="/profile/:slug"
            element={<PrivateRoutes> <Myprofile /> </PrivateRoutes>}
          />
          <Route path="/checkoutlist"
            element={<PrivateRoutes> <Ordersummery /> </PrivateRoutes>}
          />
          <Route path="/account"
            element={<PrivateRoutes> <AddressList /> </PrivateRoutes>}
          />

        </Routes>
      </Router>
    </div>
  );
};

function PrivateRoutes({ children, ...rest }) {
  return localStorage.getItem("user") ? children : <Navigate to="/" />;
}

export default App;
