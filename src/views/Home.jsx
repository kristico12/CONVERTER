// dependencies
import React, { Fragment } from 'react';

function Home(props) {
    return (
        <Fragment>
            <h1>Hola mundo</h1>
            <style jsx>{`
                h1 {
                    color: red;
                }
            `}</style>
        </Fragment>
    )
}

export default Home;
/*
const ALL_TYPES_XML = {
    SUFI_CONSUMO: 'SUFI CONSUMO',
    SUFI_VEHICULOS: 'SUFI VEHICULOS',
    BANCO_INMOBILIARIO: 'BANCO INMOBILIARIO',
    BANCO_HIPOTECARIO: 'BANCO HIPOTECARIO'
}

export {
    ALL_TYPES_XML
}
*/