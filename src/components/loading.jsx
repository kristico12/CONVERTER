// Dependencies
import React, { Fragment } from 'react';

function Loading(props) {
    return (
        <Fragment>
            <div className="loader">
                <svg className="circular" viewBox="25 25 50 50">
                    <circle className="path" cx="50" cy="50" r="20" fill="none" strokeWidth="2" strokeMiterlimit="10" />
                </svg>
            </div>
            <style jsx>{`
                .loader {
                    width: ${props.size}px;
                }
                .loader:before {
                    content: '';
                    display: block;
                }
                  
                .circular {
                    animation: rotate 2s linear infinite;
                    height: 100%;
                    transform-origin: center center;
                    width: 100%;
                }
                  
                .path {
                    stroke-dasharray: 1, 200;
                    stroke-dashoffset: 0;
                    animation: dash 1s ease-in-out infinite, color 1s ease-in-out infinite;
                    stroke-linecap: round;
                }                  
                @keyframes rotate {
                    100% {
                        transform: rotate(360deg);
                    }
                }
                @keyframes dash {
                    0% {
                        stroke-dasharray: 30, 200;
                    }
                    50% {
                        stroke-dasharray: 89, 200;
                    }
                    100% {
                        stroke-dasharray: 89, 200;
                    }
                }
                @keyframes color {
                    0% {
                        stroke: #00448C;
                    }
                    50% {
                        stroke: #00448C;
                    }
                    100% {
                        stroke: #00448C;
                    }
                }             
            `}</style>
        </Fragment>
    );
}

Loading.defaultProps = {
    size: 30
}

export default Loading;
