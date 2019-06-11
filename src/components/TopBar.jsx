//dependencies
import React, { Fragment } from 'react';

function TopBar() {
    return (
        <Fragment>
            <header className="header-container">
                <div className="header-content-logo">
                    <div className="header-wrap-logo">
                        <img src='img\header-bancolombia.jpg' alt="logo-bancolombia" className="header-logo" />
                    </div>
                </div>
                <div className="header-content-logo">
                    <div className="header-wrap-logo">
                        <img src="img\header-letter.png" alt="bancolombia" className="header-logo" />
                    </div>
                </div>
            </header>
            <style jsx>{`
                .header-container {
                    display: grid;
                    grid-template-columns: 20vh auto;
                    background-color: white;
                }
                .header-content-logo {
                    display: flex;
                    justify-content: center;
                    align-items:center;
                }
                .header-wrap-logo {
                    width: 50%; /*or whatever you choose*/
                    margin: auto;
                }
                .header-logo {
                    display: block;
                    width: 100%;
                    max-width: 100%; /*actual image width*/
                    height: auto; /* maintain aspect ratio*/
                    margin: auto; /*optional centering of image*/
                }
            `}</style>
        </Fragment>
    );
}

export default TopBar;