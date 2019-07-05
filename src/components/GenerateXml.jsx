//dependencies
import React, { Fragment } from 'react';

//components
import Loading from './loading.jsx';
import AlertSuccess from './AlertSuccess.jsx';

function GenerateXml(props) {
    return (
        <Fragment>
            <div className="container">
                <div className="container-buttton">
                    <div className="container-flex">
                        <button className="button-search" onClick={() => props.generateXsl()}>Generar Excel</button>
                    </div>
                    <div className="container-flex">
                        {
                            props.isLoading && <Loading size={45} />
                        }
                    </div>
                </div>
                {
                    props.info.show &&
                    <AlertSuccess
                        info={props.info}
                    />
                }
            </div>
            <style jsx>{`
                .container {
                    display: grid;
                    grid-template-columns: 395px 395px;
                }
                .container-buttton {
                    display: grid;
                    grid-template-columns: 198px 197px;                    
                }
                .container-flex {
                    display: flex;
                    justify-content: center;
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
GenerateXml.defaultProps = {
    info: {
        show: false
    }
}

export default GenerateXml