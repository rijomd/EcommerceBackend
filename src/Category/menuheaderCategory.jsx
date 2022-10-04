import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllcategoryList } from '../_Actions/categoryactions';
import './category.css'
import { Link } from "react-router-dom";

export const MenuCategoryHeader = () => {

    const category = useSelector(state => state.category);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllcategoryList({ status: 1 }));
    }, [])

    const renderCategories = (categories) => {
        let myCategories = [];
        for (let category of categories) {
            myCategories.push(
                <li key={category.name}>
                    {
                        category.parentId ? <Link to=''>
                            {category.name}
                        </Link> :
                            <span>{category.name}</span>
                    }
                    {category.children.length > 0 ? (<ul>{renderCategories(category.children)}</ul>) : null}
                </li>
            );
        }
        return myCategories;
    }

    return (
        <div >
            <ul>
                {category.categoryfullData.length > 0 ? renderCategories(category.categoryfullData) : null}
            </ul>
        </div>
    )
}
