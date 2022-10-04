


const addToWishList = (product) => {
    console.log(product, "addToWishList");
    let wishList = [];
    let newproduct = {
        _id: product._id,
        image: product.productPictures[0],
        name: product.name,
        orginal_price: product.orginal_price,
        sell_price: product.sell_price,
    }

    if (localStorage.getItem('wishlist_array')) {
        wishList = JSON.parse(localStorage.getItem('wishlist_array'));
    }
    console.log(wishList, "wishList");

    if (wishList.length > 0) {
        let exist = wishList.find((x) => x._id === product._id);
        console.log("not empty list", exist);
        if (exist) {
            console.log("existing item");
            return false;
        } else {
            console.log("not existing item");
            wishList.push(
                newproduct
            );
            localStorage.setItem('wishlist_array', JSON.stringify(wishList));
            return true;
        }
    }
    else {
        console.log("empty list");
        wishList = [];
        wishList.push(
            newproduct
        );
        localStorage.setItem('wishlist_array', JSON.stringify(wishList));
        return true;
    }

}


const removefromWishList = (item) => {
    let wishList = JSON.parse(localStorage.getItem('wishlist_array'));

    for (let i = 0; i < wishList.length; i++) {
        if (wishList[i]._id === item._id) {
            wishList.splice(i, 1);
        }
    }
    console.log(wishList, "wishList");
    localStorage.setItem('wishlist_array', JSON.stringify(wishList));

    return wishList;

}

const addToCartList = (singleproduct) => {
    console.log(singleproduct, "addToCartList");

    let cartList = [];
    let newproduct = {
        _id: singleproduct._id,
        image: singleproduct.productPictures[0],
        name: singleproduct.name,
        orginal_price: singleproduct.orginal_price,
        sell_price: singleproduct.sell_price,
    };

    if (localStorage.getItem('cartlist_array')) {
        cartList = JSON.parse(localStorage.getItem('cartlist_array'));
    }
    console.log(cartList, "cartList");

    if (cartList.length > 0) {
        let exist = cartList.find((x) => x._id === singleproduct._id);
        console.log("not empty list", exist);
        if (exist) {
            console.log("existing list");
            return false;
        } else {
            console.log("not existing list");
            cartList.push(
                newproduct
            );
            localStorage.setItem('cartlist_array', JSON.stringify(cartList));
            return true;
        }
    }
    else {
        console.log("empty list");
        cartList.push(
            newproduct
        );
        localStorage.setItem('cartlist_array', JSON.stringify(cartList));
        return true;
    }

}

const removefromCartList = (item) => {
    let cartList = JSON.parse(localStorage.getItem('cartlist_array'));

    for (let i = 0; i < cartList.length; i++) {
        if (cartList[i]._id === item._id) {
            console.log("haaaa")
            cartList.splice(i, 1);
        }
    }
    console.log(cartList, "cartList");
    localStorage.setItem('cartlist_array', JSON.stringify(cartList));

    return cartList;
}

export const cartOrWishListService = {
    addToWishList, removefromWishList, addToCartList, removefromCartList
};