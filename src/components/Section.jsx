// dependencies
import React, { Fragment, Component } from 'react';
const fs = window.require('fs');
import convertObject from 'xml-js';
const { dialog } = window.require('electron').remote;

// components
import SelectXml from './SelectXml.jsx';
import ShowTable from './ShowTable.jsx';
import GenerateXml from './GenerateXml.jsx';

//utils
import { List_files, Rename_files } from '../utils/list-files';
import { Generate_Data } from '../utils/utils';
import {
    ATTRIBUTES_BANCO_CONSUMO,
    STRUCTURE_BANCO_CONSUMO,
    STRUCTURE_BANCO_HIPOTECARIO,
    ATTRIBUTES_BANCO_HIPOTECARIO,
    STRUCTURE_BANCO_EMPLEADO,
    ATTRIBUTES_BANCO_EMPLEADO
} from '../utils/globals_variables';

class Section extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSelected: "",
            infoFiles: [],
            isLoadingTow: false,
            allStringXml: [],
            info: {},
        }
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.state.isSelected !== prevState.isSelected) {
            this.setState({
                infoFiles: [],
                isLoadingTow: false,
                allStringXml: []
            });
        }
        if (this.state.allStringXml !== prevState.allStringXml) {
            if (this.state.allStringXml.length !== 0) {
                const arrayDict = this.state.allStringXml.map(item => (
                    JSON.parse(convertObject.xml2json(item, { compact: true, spaces: 4 }))
                ));
                let nameModelread, structureModel, titlefile;
                if (this.state.isSelected.includes('CONSUMO_BANCO')) {
                    nameModelread = ATTRIBUTES_BANCO_CONSUMO();
                    structureModel = STRUCTURE_BANCO_CONSUMO();
                    titlefile = 'CONSUMO_BANCO';
                } else if (this.state.isSelected.includes('HIPOTECARIO_BANCO')) {
                    nameModelread = ATTRIBUTES_BANCO_HIPOTECARIO();
                    structureModel = STRUCTURE_BANCO_HIPOTECARIO();
                    titlefile = 'HIPOTECARIO_BANCO';
                } else {
                    nameModelread = ATTRIBUTES_BANCO_EMPLEADO();
                    structureModel = STRUCTURE_BANCO_EMPLEADO();
                    titlefile = 'EMPLEADO_BANCO';
                }
                // generate data
                const isSucesfull = Generate_Data(nameModelread, arrayDict, structureModel, titlefile);
                window.setTimeout(() => {
                    if (isSucesfull.bool) {
                        this.state.infoFiles.slice().forEach((value) => {
                            Rename_files(
                                `${this.state.isSelected}/${value}`,
                                `${this.state.isSelected}/read-${value}`
                            )
                        })
                        this.setState({
                            isLoadingTow: false,
                            info: {
                                show: true,
                                content: "Excel Exitoso",
                                type: "success"
                            }
                        }, () => {
                            window.setTimeout(() => {
                                this.setState({
                                    isSelected: "",
                                    infoFiles: [],
                                    isLoadingTow: false,
                                    allStringXml: [],
                                    info: {},
                                });
                            }, 3500);
                        });
                    } else {
                        this.setState({
                            isLoadingTow: false,
                            info: {
                                show: true,
                                content: `${isSucesfull.error}`,
                                type: "error"
                            }
                        }, () => {
                            window.setTimeout(() => {
                                this.setState({
                                    isSelected: "",
                                    infoFiles: [],
                                    isLoadingTow: false,
                                    allStringXml: [],
                                    info: {},
                                });
                            }, 8500);
                        });
                    }
                }, 3000);
            } else if (this.state.isLoadingTow) {
                this.setState({
                    isLoadingTow: false,
                });
            }
        }
    }
    search() {
        if (this.state.isSelected.length === 0) {
            window.setTimeout(() => dialog.showMessageBox(null, { type: 'info', title: 'Info', message: 'Por favor Escoja una opcion' }), 50);
        } else {
            try {
                const files = List_files(this.state.isSelected).filter((name) => !name.includes("read"));
                if (files.length > 0) {
                    this.setState({
                        infoFiles: files,
                    });
                } else {
                    dialog.showMessageBox(null, { type: 'info', title: 'Info', message: 'No hay archivo(s) a procesar' })
                }
            } catch (error) {
                dialog.showErrorBox('Error', `A ocurrido un error por favor intenta de nuevo: ${error}`);
            }
        }
    }
    generateXsl() {
        this.setState({
            isLoadingTow: true
        }, () => {
            const alltemp = [];
            for (const i in this.state.infoFiles) {
                try {
                    const data = fs.readFileSync(`${this.state.isSelected}/${this.state.infoFiles[i]}`, { encoding: 'utf-8' });
                    alltemp.push(data);
                } catch (error) {
                    dialog.showErrorBox('Error', `A ocurrido un error por favor intenta de nuevo: ${error}`);
                    this.setState({ isLoadingTow: false });
                }
            }
            if (alltemp.length === this.state.infoFiles.length && alltemp.length !== 0) {
                this.setState({
                    allStringXml: alltemp.slice(),
                });
            }

        })
    }
    render() {
        return (
            <Fragment>
                <section className="section-container">
                    <SelectXml
                        search={() => this.search()}
                        handleSelect={(value) => this.setState({ isSelected: value })}
                        isSelected={this.state.isSelected}
                    />
                    {
                        this.state.infoFiles.length > 0 &&
                        <ShowTable
                            infoFiles={this.state.infoFiles}
                            delete={(data) => this.setState({ infoFiles: this.state.infoFiles.filter(item => item !== data) })}
                        />
                    }
                    {
                        this.state.infoFiles.length > 0 &&
                        <GenerateXml
                            isLoading={this.state.isLoadingTow}
                            generateXsl={() => this.generateXsl()}
                            info={this.state.info}
                        />
                    }
                </section>
                <style jsx>{`
                    .section-container {
                        display: grid;
                        grid-template-rows: 100px 300px 100px;
                        background-color: white;
                    }
                `}</style>
            </Fragment>
        )
    }
}

export default Section