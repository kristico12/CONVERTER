// dependencies
import React, { Fragment, Component } from 'react';

// components
import SelectXml from './SelectXml.jsx';
import ShowTable from './ShowTable.jsx';

//utils
import { List_files } from '../utils/list-files';

class Section extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            isSelected: "",
            infoFiles: [],
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
                const files = List_files(this.state.isSelected);
                //console.log(files);
            })
        }
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
                    <ShowTable
                        infoFiles={this.state.infoFiles}
                    />
                </section>
                <style jsx>{`
                    .section-container {
                        display: grid;
                        grid-template-rows: 100px 350px 50px;
                        background-color: white;
                    }
                `}</style>
            </Fragment>
        )
    }
}

export default Section