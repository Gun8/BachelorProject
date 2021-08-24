import React from 'react';

const SelectValues = ({data,val,reverse}) => {
    let selectValues = [];
    let values = [];

    let set = new Set();
    data.forEach(row => set.add(row[val]));

    for (let value of set) {
        values.push(value);
    }

    if(reverse) {
        values.reverse();
    }

    let i = 1;
    for (let value of values) {
        selectValues.push(<option value={i++}>{value}</option>);
    }

    return(
        <>
            {selectValues}
        </>
    );
};

export default SelectValues;