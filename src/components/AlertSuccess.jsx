//Dependencies
import React, { Fragment } from 'react';


function AlertSuccess(props) {
    return (
        <Fragment>
            <div className='alert-container'>
                <div className="alert-content">
                    <span>{props.info.content}</span>
                </div>
            </div>
            <style jsx>{`
                .alert-container{
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .alert-content {
                    box-shadow: 7px 2px 16px 0px rgba(194,180,194,1);
                    background-color: ${props.info.type === "error" ? "#ff4040" : "#72dc72"};
                    border-radius: 1em;
                    width: 98%;
                    height: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: space-evenly;
                }
            `}</style>
        </Fragment>
    )
}
export default AlertSuccess;