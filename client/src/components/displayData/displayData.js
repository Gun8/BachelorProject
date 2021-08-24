import React from 'react';
import DynamicTable from "../table";
import GraphDataBalance from '../graphDataBalance';
import Filter from '../filter';
import CircularProgress from '@material-ui/core/CircularProgress';
import GraphDataEmissions from "../graphDataEmissions/graphDataEmissions";

const DisplayData = (props) => {
    if(!props.data) return <CircularProgress/>;

    const GraphData = () => {
      return props.name === "balance"?
          <GraphDataBalance formData = {props.formData}/>
          :<GraphDataEmissions formData = {props.formData}/>
    };

    return props.type === 'table'?
        <>
            <DynamicTable
                data = {props.data}
                exportData = {props.exportData}
                headCells = {props.headCells}
                title = {props.title}
            />
            <Filter
                resetData = {props.resetData}
                name = {props.name}
            />
        </>: <>
            <GraphData/>
            <div id="line-graph" ></div>
        </>
};

export default DisplayData;