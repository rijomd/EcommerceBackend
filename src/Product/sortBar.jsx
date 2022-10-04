import * as React from 'react';
import './product.css';
import { useMediaQuery } from '@react-hook/media-query';
import Popover from '@mui/material/Popover';

export const SortBar = (props) => {

    const { openSort, handleCloseSort } = props;
    const isDesktop = useMediaQuery('(min-width: 768px)'); //for mobiles only
    const [anchorEl, setAnchorEl] = React.useState(null);
    console.log(openSort,"openSort")

    let sortarray = ['Sort By', 'Popularity', 'Price-- Low to High', 'Price-- High to Low', 'Newest First'];
    let sortarraymobile = ['Popularity', 'Price-- Low to High', 'Price-- High to Low', 'Newest First'];

    const rendersortINDesktop = () => {
        return (sortarray.map((text, index) => (
            <div key={index} >
                {index === 0 ? <span>Sort By</span> : <p>{text}</p>}
            </div >
        ))
        )
    }
    const rendersortINmobile = () => {
        return (
            <div>
                <Popover
                    id='simple-popover'
                    open={openSort}
                    // anchorEl={anchorEl}
                    onClose={handleCloseSort}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                    PaperProps={{
                        style: { width: '100%' },
                    }}
                >
                    <div style={{ padding: "1rem" }}>
                        <div className='sort_hedder'>
                            <p>Sort By</p>
                        </div>
                        {sortarraymobile && sortarraymobile.map((text, index) => (
                            <div className='sort_body' key={index} >
                                <p>{text}</p>
                            </div >
                        ))}
                    </div>
                </Popover>
            </div>
        )
    }

    return (
        <div className='sortbar'>
            {isDesktop && rendersortINDesktop()}
            {!isDesktop && rendersortINmobile()}
        </div>
    )
}
