import React from 'react';

const CheckboxArr = ({data}) => {
    let selectValues = [];
    let set = new Set();

    const onCheckAll = (event) => {
        const box = event.target.closest(".check-box");
        const checks = box.querySelectorAll("input");
        if(event.target.checked){
            for(let i = 0; i < checks.length; i++){
                checks[i].checked = true;
            }
            return;
        }

        for(let i = 0; i < checks.length; i++){
            checks[i].checked = false;
        }
    };

    const changeCheckAll = (event) => {
        const box = event.target.closest(".check-box");
        const checks = box.querySelectorAll("input");

        checks.item(0).checked = false;
    };

    data.forEach(row => set.add(row['name']));

    selectValues.push(
        <div>
            <input type="checkbox" id="checkall" name="checkall"  onChange={event => onCheckAll(event)}/>
            <label htmlFor="checkall">Check all</label>
        </div>
    );
    for (let value of set) {
        selectValues.push(
            <div>
                <input type="checkbox" id={value} name={value} onChange={event => changeCheckAll(event)}/>
                <label htmlFor={value}>{value}</label>
            </div>
        );
    }

    return(
        <>
            {selectValues}
        </>
    );
};

export default CheckboxArr;