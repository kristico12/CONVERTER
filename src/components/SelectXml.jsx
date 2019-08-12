// dependencies
import React, { Fragment } from 'react';

//utils
import { xmlBanco, xmlBancoHipotecario } from '../utils/globals_routes';

function SelectXmls(props) {
    const selectOption = [
        { title: "CONSUMO BANCO", value: xmlBanco },
        { title: "HIPOTECARIO BANCO", value: xmlBancoHipotecario },
    ]
    return (
        <Fragment>
            <div className="select-container">
                <label className="select-content">
                    <div className="select">
                        <select
                            className="select-text"
                            required
                            value={props.isSelected}
                            onChange={(e) => props.handleSelect(e.target.value)}
                        >
                            <option value=""></option>
                            {
                                selectOption.map(item => (
                                    <option className="select-css-option" key={item.value} value={item.value}>{item.title}</option>
                                ))
                            }
                        </select>
                        <span className="select-highlight"></span>
                        <span className="select-bar"></span>
                        <label className="select-label">Producto</label>
                    </div>
                </label>
                <div className="container-buttton">
                    <button className="button-search" onClick={() => props.search()}>Buscar</button>
                </div>
            </div>
            <style jsx>{`
                .select-container {
                    display: grid;
                    grid-template-columns: 600px 190px;
                }
                .select-content {
                    display: flex;
                      justify-content: center;
                      align-items: center;
                }
                .container-buttton {
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
                .select {
                    font-family:'Roboto','Helvetica','Arial',sans-serif;
                    position: relative;
                    width: 350px;
                }
                .select-text {
                    position: relative;
                    font-family: inherit;
                    background-color: transparent;
                    width: 350px;
                    padding: 10px 10px 10px 0;
                    font-size: 18px;
                    border-radius: 0;
                    border: none;
                    border-bottom: 1px solid rgba(0,0,0, 0.12);
                } 
                /* Remove focus */
                .select-text:focus {
                    outline: none;
                    border-bottom: 1px solid rgba(0,0,0, 0);
                }
                /* Use custom arrow */
                .select .select-text {
                    appearance: none;
                    -webkit-appearance:none
                }
                .select:after {
                    position: absolute;
                    top: 18px;
                    right: 10px;
                    /* Styling the down arrow */
                    width: 0;
                    height: 0;
                    padding: 0;
                    content: '';
                    border-left: 6px solid transparent;
                    border-right: 6px solid transparent;
                    border-top: 6px solid rgba(0, 0, 0, 0.12);
                    pointer-events: none;
                } 
                /* LABEL ======================================= */
                .select-label {
                    color: rgba(0,0,0, 0.50);
                    font-size: 18px;
                    font-weight: normal;
                    position: absolute;
                    pointer-events: none;
                    left: 0;
                    top: 10px;
                    transition: 0.2s ease all;
                }
                /* active state */
                .select-text:focus ~ .select-label, .select-text:valid ~ .select-label {
                    color: #00448C;
                    top: -20px;
                    transition: 0.2s ease all;
                    font-size: 14px;
                }
                /* BOTTOM BARS ================================= */
                .select-bar {
                    position: relative;
                    display: block;
                    width: 350px;
                }
                .select-bar:before, .select-bar:after {
                    content: '';
                    height: 2px;
                    width: 0;
                    bottom: 1px;
                    position: absolute;
                    background: #84b4f4;
                    transition: 0.2s ease all;
                }
                .select-bar:before {
                    left: 50%;
                }  
                .select-bar:after {
                    right: 50%;
                }  
                /* active state */
                .select-text:focus ~ .select-bar:before, .select-text:focus ~ .select-bar:after {
                    width: 50%;
                } 
                /* HIGHLIGHTER ================================== */
                .select-highlight {
                    position: absolute;
                    height: 60%;
                    width: 100px;
                    top: 25%;
                    left: 0;
                    pointer-events: none;
                    opacity: 0.5;
                }
            `}</style>
        </Fragment>
    )
}

export default SelectXmls;