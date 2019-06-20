//dependencies
import React, { Fragment } from 'react';

//components
import Loading from './loading.jsx';

function GenerateXml(props) {
    return (
        <Fragment>
            <div className="container">
                <div className="container-buttton">
                    <button className="button-search" onClick={() => props.generateXsl()}>Buscar</button>
                    {
                        props.isLoading && <Loading />
                    }
                </div>
            </div>
            <style jsx>{`
                .container {
                    display: grid;
                    grid-template-columns: 395px 395px;
                }
                .container-buttton {
                    display: flex;
                    justify-content: space-around;
                    align-items: center;
                }
                .button-search {
                    -webkit-border-radius: 28;
                    -moz-border-radius: 28;
                    border-radius: 10px;
                    border: 1px solid #aaa;
                    font-family: sans-serif;
                    color:  black;
                    font-size: 20px;
                    background-color: #e6ecf0;
                    padding: 5px 10px 5px 10px;
                    text-decoration: none;
                }                
                .button-search:hover {
                    background-color: #00448C;
                    text-decoration: none;
                    color: white;
                }
            `}</style>
        </Fragment>
    );
}

export default GenerateXml