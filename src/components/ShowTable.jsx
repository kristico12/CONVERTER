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
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            props.infoFiles.map((value, i) => (
                                <tr key={value}>
                                    <td>{value}</td>
                                    <td className="delete-item" onClick={() => props.delete(value)}><img src="img\delete.png" alt="Eliminar" /></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
            <style jsx>{`
                .container {
                    display: flex;
                    justify-content: center;
                    padding: 1em;
                }
                .table-container {
                    font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
                    border-collapse: collapse;
                    background-color: #fff;
                    max-width: 794px;
                    max-height: 300px;
                    width: 100%;
                }
                .table-container thead, .table-container tbody {
                    display: block;
                    max-width: 794px;
                    width: 100%;
                }
                .table-container tbody {
                    max-height: 261px;
                    height: 261px;
                    overflow: auto;
                    border-top: 0.8px solid rgba(0, 0, 0, 0.12);
                }
                .table-container tbody td {
                    transition: all 0.3s ease;
                    color: #212121;
                }
                .table-container td, .table-container th {
                    width: 100%;
                    text-align: center;
                    padding: 8px;
                    transition: all 0.3s ease;
                }
                .table-container tr:hover {background-color: rgba(0, 0, 0, 0.12);}
                .table-container th {
                    background-color: #fff;
                    color: #757575;
                    font-size: 20px;
                    text-transform: uppercase;
                    transition: all 0.3s ease;
                }
                .delete-item:hover {
                    cursor: pointer;
                }
            `}</style>
        </Fragment>
    );
}
export default ShowTable;