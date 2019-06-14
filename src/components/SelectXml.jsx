// dependencies
import React, { Fragment } from 'react';

//components
import Loading from './loading.jsx';

//utils
import { xmlBanco } from '../utils/globals_routes';

function SelectXmls(props) {
    const selectOption = [
        { title: "CONSUMO BANCO", value: xmlBanco },
        { title: "CONSUMO SUFI", value: "CONSUMO_SUFI" }
    ]
    return (
        <Fragment>
            <div className="select-container">
                <label className="select-content">
                    <span className="select-title">Archivos a procesar:</span>
                    <select
                        className="select-css"
                        value={props.isSelected}
                        onChange={(e) => props.handleSelect(e.target.value)}>
                        <option className="select-css-option" value="">Escoja una opcion...</option>
                        {
                            selectOption.map(item => (
                                <option className="select-css-option" key={item.value} value={item.value}>{item.title}</option>
                            ))
                        }
                    </select>
                </label>
                <div className="container-buttton">
                    <button className="button-search" onClick={() => props.search()}>Buscar</button>
                    {
                        props.isLoading && <Loading />
                    }
                </div>
            </div>
            <style jsx>{`
                .select-container {
                    display: grid;
                    grid-template-columns: 600px 190px;
                }
                .select-content {
                    display: flex;
                    justify-content: space-evenly;
                    align-items: center;
                }
                .select-title {
                    font-family: "Lucida Sans Unicode", "Lucida Grande", sans-serif;
                    font-size: 20px;
                    letter-spacing: 2px;
                    word-spacing: 2px;
                    color: #000000;
                    font-weight: normal;
                    text-decoration: none;
                    font-style: normal;
                    font-variant: normal;
                    text-transform: uppercase;
                }
                .select-css {
                    display: block;
                    font-size: 16px;
                    font-family: sans-serif;
                    font-weight: 700;
                    color: #444;
                    line-height: 1.3;
                    padding: .3em 1.4em .3em .4em;
                    width: 50%;
                    max-width: 50%; 
                    box-sizing: border-box;
                    margin: 0;
                    border: 1px solid #aaa;
                    box-shadow: 0 1px 0 1px rgba(0,0,0,.04);
                    border-radius: .5em;
                    -moz-appearance: none;
                    -webkit-appearance: none;
                    appearance: none;
                    background-color: #fff;
                    background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007CB2%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E'),
                      linear-gradient(to bottom, #ffffff 0%,#e5e5e5 50%);
                    background-repeat: no-repeat, repeat;
                    background-position: right .7em top 50%, 0 0;
                    background-size: .65em auto, 50%;
                }
                .select-css:hover {
                    border-color: #00448C;
                }
                .select-css:focus {
                    border-color: #aaa;
                    box-shadow: 0 0 1px 3px rgba(59, 153, 252, .7);
                    box-shadow: 0 0 0 3px -moz-mac-focusring;
                    color: #222; 
                    outline: none;
                }
                .select-css-option {
                    background-color: #e6ecf0;
                }
                .container-buttton {
                    display: flex;
                    justify-content: ${props.isLoading ? "space-evenly" : "center"};
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
    )
}

export default SelectXmls;