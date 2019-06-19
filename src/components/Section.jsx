// dependencies
import React, { Fragment, Component } from 'react';
const fs = window.require('fs');
import convertObject from 'xml-js';

// components
import SelectXml from './SelectXml.jsx';
import ShowTable from './ShowTable.jsx';
import GenerateXml from './GenerateXml.jsx';

//utils
import { List_files } from '../utils/list-files';
import { Generate_Data } from '../utils/utils';
import { ATTRIBUTES_BANCO_CONSUMO, STRUCTURE_BANCO_CONSUMO } from '../utils/globals_variables';

class Section extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            isSelected: "",
            infoFiles: [],
            isLoadingTow: false,
            allStringXml: []
        }
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.state.isSelected !== prevState.isSelected) {
            this.setState({
                infoFiles: []
            });
        }
        if (this.state.allStringXml !== prevState.allStringXml) {
            if (this.state.allStringXml.length === this.state.infoFiles.length) {
                const arrayDict = this.state.allStringXml.map(item => (
                    JSON.parse(convertObject.xml2json(item, { compact: true, spaces: 4 }))
                ));
                let nameModelread, structureModel;
                if (this.state.isSelected.includes('CONSUMO_BANCO')) {
                    nameModelread = ATTRIBUTES_BANCO_CONSUMO;
                    structureModel = STRUCTURE_BANCO_CONSUMO;
                }
                // generate data
                Generate_Data(nameModelread, arrayDict, structureModel);
                this.setState({ isLoadingTow: false });
            }
        }
    }
    search() {
        if (this.state.isSelected.length === 0) {
            this.setState({
                isLoading: this.state.isLoading && false
            }, () => {
                window.setTimeout(() => alert("Por favor Escoja una opcion"), 50);
            })
        } else {
            this.setState({ isLoading: true }, () => {
                try {
                    const files = List_files(this.state.isSelected).filter((name) => !name.includes("read"));
                    this.setState({
                        infoFiles: files,
                        isLoading: false
                    })
                } catch (error) {
                    alert("A ocurrido un error, por favor intente de nuevo!" + error);
                }
            })
        }
    }
    generateXsl() {
        this.setState({
            isLoadingTow: true
        }, () => {
            for (const i in this.state.infoFiles) {
                try {
                    fs.readFile(`${this.state.isSelected}/${this.state.infoFiles[i]}`, { encoding: 'utf-8' }, (err, data) => {
                        const alltemp = this.state.allStringXml.slice();
                        alltemp.push(data);
                        this.setState({
                            allStringXml: alltemp
                        })
                    });
                } catch (error) {
                    alert(`A ocurrido un error por favor intenta de nuevo: ${error}`);
                    this.setState({ isLoadingTow: false });
                    break;
                }
            }
        })
    }
    render() {
        return (
            <Fragment>
                <section className="section-container">
                    <SelectXml
                        isLoading={this.state.isLoading}
                        search={() => this.search()}
                        handleSelect={(value) => this.setState({ isSelected: value })}
                        isSelected={this.state.isSelected}
                    />
                    {
                        this.state.infoFiles.length > 0 &&
                        <ShowTable
                            infoFiles={this.state.infoFiles}
                        />
                    }
                    {
                        this.state.infoFiles.length > 0 &&
                        <GenerateXml
                            isLoading={this.state.isLoadingTow}
                            generateXsl={() => this.generateXsl()}
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