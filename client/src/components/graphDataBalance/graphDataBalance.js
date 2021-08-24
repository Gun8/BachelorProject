import React from 'react';
import SelectValues from '../selectValues';
import CheckboxArr from '../checkBoxArr';
import CircularProgress from '@material-ui/core/CircularProgress';

const GraphDataBalance = ({formData}) => {
    const data = JSON.parse(sessionStorage.getItem('balance'));
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
            <div className = "select-type">
                <p>Select indicator: </p>
                <select defaultValue={'1'}>
                    <SelectValues data = {data} val = "type"/>
                </select>
            </div>
            <p>Select type of energy:</p>
            <div className = "check-box">
                <CheckboxArr data = {data}/>
            </div>
            <div className = "select-year">
                <p>Select year range: </p>
                <select defaultValue={'1'}>
                    <SelectValues data = {data} val = "year" reverse = {true}/>
                </select>
                <span>&nbsp;-&nbsp;</span>
                <select defaultValue={'1'}>
                    <SelectValues data = {data} val = "year"/>
                </select>
            </div>
        </>
    );
};


export default GraphDataBalance;