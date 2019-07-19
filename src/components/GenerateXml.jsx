//dependencies
import React, { Fragment } from 'react';

//components
import Loading from './loading.jsx';
import Alert from './Alert.jsx';

function GenerateXml(props) {
    return (
        <Fragment>
            <div className="container">
                <div className="container-buttton">
                    <div className="container-flex">
                        <button className="button-search" onClick={() => props.generateXsl()}>Generar Excel</button>
                    </div>
                    <Fragment>
                        {
                            props.isLoading && <Loading />
                        }
                    </Fragment>
                </div>
                {
                    !props.info.show &&
                    <Alert
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
                    color: white;
                    font-size: 20px;
                    background-color: #00448C;
                    padding: 5px 10px 5px 10px;
                    text-decoration: none;
                }
                .button-search:hover {
                    background-color: #00448C;
                    opacity: 0.9;
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