import { categoryConstants } from './constants'
import { categoryService } from '../_Service/categoryservice'


export const getAllcategoryList = (category) => {
    console.log(category, "category");
    return async (dispatch) =>

        new Promise((resolve, reject) => {
            dispatch({ type: categoryConstants.GETALLCATEGORYLIST_REQUEST });
            categoryService.categoryList(category).then(function (res) {
                const category = res.data.docs;
                console.log(category, "GETALLCATEGORYLIST");
                dispatch({
                    type: categoryConstants.GETALLCATEGORYLIST_SUCCESS,
                    payload: category,
                });
                return resolve(category);
            }, function (err) {
                console.log(err, "err");
                dispatch({
                    type: categoryConstants.GETALLCATEGORYLIST_FAILURE,
                    payload: err
                });
                return reject(err);
            })
        });
}


export const categoryList = (category) => {
    console.log(category, "category");
    return async (dispatch) =>

        new Promise((resolve, reject) => {
            dispatch({ type: categoryConstants.FLEXIBLECATEGORYLIST_REQUEST });
            categoryService.getAllcategoryList(category).then(function (res) {
                const categoryarray = res.data;
                console.log(categoryarray, "category");
                localStorage.setItem('flexible_categoryArray', JSON.stringify(categoryarray)); /////category changable dataaas
                dispatch({
                    type: categoryConstants.FLEXIBLECATEGORYLIST_SUCCESS,
                    payload: categoryarray,
                });
                return resolve(categoryarray);
            }, function (err) {
                console.log(err, "err");
                dispatch({
                    type: categoryConstants.FLEXIBLECATEGORYLIST_FAILURE,
                    payload: err
                });
                return reject(err);
            })
        });
}

