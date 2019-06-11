// dependencies
import React, { Fragment } from 'react';

//components
import TopBar from '../components/TopBar.jsx';
import Section from '../components/Section.jsx';

function Home() {
    return (
        <Fragment>
            <div className="container">
                <TopBar />
                <Section />
            </div>
            <style jsx>{`
                .container {
                    overflow-y: hidden;
                    display: grid;
                    grid-template-rows: 63.52px 500px;
                    background-color: #e6ecf0;       
                }
            `}</style>
        </Fragment>
    )
}

export default Home;