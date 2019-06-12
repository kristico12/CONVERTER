//Dependencies
import React, { Fragment } from 'react';

function ShowTable(props) {
    return (
        <Fragment>
            <table>
                <thead>
                    <tr>
                        <th>Archivos</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.infoFiles.map(value => (
                            <tr key={value}>
                                <td>{value}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </Fragment>
    );
}
export default ShowTable;