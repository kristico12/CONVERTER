// dependencies
import React, { Fragment, Component } from 'react';

// components
import SelectXml from './SelectXml.jsx';
import ShowTable from './ShowTable.jsx';
import GenerateXml from './GenerateXml.jsx';

//utils
import { List_files } from '../utils/list-files';

class Section extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            isSelected: "",
            infoFiles: [],
            isLoadingTow: false,
        }
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.state.isSelected !== prevState.isSelected) {
            this.setState({
                infoFiles: []
            });
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