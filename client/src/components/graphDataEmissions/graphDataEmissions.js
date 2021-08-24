import React from 'react';
import SelectValues from '../selectValues';
import CheckboxArr from '../checkBoxArr';
import CircularProgress from '@material-ui/core/CircularProgress';

const GraphDataEmissions = ({formData}) => {
    const data = JSON.parse(sessionStorage.getItem('emissions'));
    return data?
        (
            <>
                <Selects data = {data}/>
                <button onClick={() => formData()}>show graph</button>
            </>
        )
        : <CircularProgress/>
};

const Selects = ({data}) => {
    return(
        <>
            <p>Select type of emission:</p>
            <div className = "check-box">
                <CheckboxArr data = {data}/>
            </div>
            <div className = "select-year">
                <p>Select year range: </p>
                <select defaultValue={'1'}>
                    <SelectValues data = {data} val = "year"/>
                </select>
                <span>&nbsp;-&nbsp;</span>
                <select defaultValue={'1'}>
                    <SelectValues data = {data} val = "year" reverse = {true}/>
                </select>
            </div>
        </>
    );
};


export default GraphDataEmissions;