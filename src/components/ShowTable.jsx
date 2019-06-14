//Dependencies
import React, { Fragment } from 'react';

function ShowTable(props) {
    return (
        <Fragment>
            <div className="container">
                <table className="table-container">
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
            </div>
            <style jsx>{`
                .container, .table-container, .table-container tbody {
                    max-width: 794px;
                    max-height: 300px;
                    height: 100%;
                    width: 100%;
                }
                .table-container {
                    font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
                    border-collapse: collapse;
                }
                .table-container tbody {
                    display: block;
                    overflow: auto;
                }
                .table-container tbody td {
                    width: 794px;
                    text-align: center;
                }
                .table-container td, .table-container th {
                    border: 1px solid #ddd;
                    padding: 8px;
                }
                .table-container tr:hover {background-color: #ddd;}
                .table-container tr:nth-child(even){background-color: #f2f2f2;}
                .table-container th {
                    background-color: #00448C;
                    color: white;
                    font-size: 20px;
                    text-transform: uppercase;
                }
            `}</style>
        </Fragment>
    );
}
export default ShowTable;