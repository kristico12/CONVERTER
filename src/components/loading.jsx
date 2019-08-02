// Dependencies
import React, { Fragment } from 'react';

function Loading() {
    return (
        <Fragment>
            <div className="wrapper">
                <div className="blue ball"></div>
                <div className="yellow ball"></div>
                <div className="red ball"></div>
            </div>
            <style jsx>{`
               .wrapper {
                    display: flex;
                    justify-content: space-evenly;
                    align-items: center;
                }
                .ball {
                    width: 22px;
                    height: 22px;
                    border-radius: 11px;                
                    animation: 1.3s bounce ease infinite;
                }
                .blue {
                    background-color: #00448C;
                    animation-delay: .2s;
                }
                .red {
                    background-color: #eb1c2d;
                    animation-delay: .6s;
                }
                .yellow {
                    background-color: #ffc902;
                    animation-delay: .4s;
                }
                @keyframes bounce {  
                    50% {
                        transform: translateY(25px);
                    }
                }
            `}</style>
        </Fragment>
    );
}

export default Loading;
