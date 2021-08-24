import React from 'react';
import ReactDOM from 'react-dom';
import LineGraph from '../components/graphs';

const renderGraph = (data,title) => {
    ReactDOM.unmountComponentAtNode(document.querySelector("#line-graph"));

    ReactDOM.render(
        <LineGraph
            data = {data}
            title = {title}
        />,
        document.querySelector("#line-graph")
    );
};

export default renderGraph;