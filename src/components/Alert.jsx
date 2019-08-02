//Dependencies
import React, { Fragment } from 'react';


function Alert(props) {
    return (
        <Fragment>
            <div className='alert-container'>
                <div className="alert-content">
                    {props.info.content}
                </div>
            </div>
            <style jsx>{`
                .alert-container{
                    display: flex;
                    align-items: center;
                }
                .alert-content {
                    box-shadow: 7px 2px 16px 0px rgba(194,180,194,1);
                    background-color: ${props.info.type === "error" ? "#e27c79" : "#d9edf7"};
                    border: 1px solid transparent;
                    border-color: ${props.info.type === "error" ? "#dd6864" : "#bce8f1"};
                    color: ${props.info.type === "error" ? "#9f2723" : "#31708f"};
                    width: 98%;
                    height: 80%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    word-break: break-word;
                    padding: ${props.info.type === "error" ? "5px" : "none"}
                }
            `}</style>
        </Fragment>
    )
}
export default Alert;