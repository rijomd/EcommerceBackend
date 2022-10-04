import React from 'react'
import "./component.css"
import { Box, Grid } from '@mui/material';

export const Footer = () => {

    return (
        <>
            <footer className="footerStyles">
                <div className="linkContainer">
                    <div className="links">
                        <h3>Company</h3>
                        <a href='#' className="aStyles">About Us</a>
                        <a href='#' className="aStyles">Expansion Plan</a>
                        <a href='#' className="aStyles">Careers</a>
                    </div>
                    <div className="links">
                        <h4>Support</h4>
                        <a href='#' className="aStyles">FAQs</a>
                        <a href='#' className="aStyles">Email Us</a>
                        <a href='#' className="aStyles">Refund Policy</a>
                    </div>
                    <div className="links">
                        <h4>Partnerships</h4>
                        <a href='#' className="aStyles">Partner</a>
                        <a href='#' className="aStyles">Check Status</a>
                    </div>
                </div>
                <h5 className="bottom">Find your products, G-SHOP Company</h5>
            </footer>
        </>

    )
}
