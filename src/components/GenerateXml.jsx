//dependencies
import React, { Fragment } from 'react';

//components
import Loading from './loading.jsx';

function GenerateXml(props) {
    return (
        <Fragment>
            <div className="container-buttton">
                <button className="button-search" onClick={() => props.generateXsl()}>Buscar</button>
                {
                    props.isLoading && <Loading />
                }
            </div>
            <style jsx>{`
                    .section-container {
                        display: grid;
                        grid-template-rows: 100px 300px 100px;
                        background-color: white;
                    }
                `}</style>
        </Fragment>
    );
}

export default GenerateXml