import React, {useState} from 'react';
import CloseIcon from '@material-ui/icons/Close';

const FilterRow = (props) => {

    const [isNumeric, setIsNumeric] = useState(true);
    const {resetData, tableName} = props;
    const data = JSON.parse(sessionStorage.getItem(tableName));


    const isNumericFunc = (event, data) => {
        const index = event.target.selectedIndex;
        const text =  event.target.options[index].text.toLowerCase();

        if (isNaN(+{...data}[0][text])){
            setIsNumeric(false);
        }
        else {
            setIsNumeric(true);
        }

        onFilterChange(data);

    };

    const delRow = (event, data) => {
        let filterRow = event.target;

        while (!filterRow.classList.contains("filter-row")){
            filterRow = filterRow.parentElement;
        }

        filterRow.remove();
        onFilterChange(data);
    };

    const onFilterChange = (data) =>{
        const rows = document.querySelectorAll('.filter-row');
        let filter = data;
        for(let i = 0; i < rows.length; i++){
            filter = filterTable(rows[i], filter);
        }

        resetData(filter);

    };

    const filterTable = (row, filter) => {
        const val = row.querySelector("input").value.toLowerCase();
        const col = row.querySelector("select");
        const colIndex = col.selectedIndex;
        const field =  col.options[colIndex].text.toLowerCase();
        const option = row.querySelector(".filter-select:nth-child(2) select");
        const optionIndex = option.selectedIndex;
        const optionType = option.options[optionIndex].text;

        if(!filter[0]){
            return filter;
        }

        if(optionType === 'contains' && isNaN(+filter[0][field])){
            filter = filter.filter(obj => obj[field].toLowerCase().includes(val));
        }
        else if (optionType === 'equals' && isNaN(+filter[0][field])){
            filter = filter.filter(obj => obj[field].toLowerCase() === val);
        }
        else if (optionType === 'starts with' && isNaN(+filter[0][field])){
            filter = filter.filter(obj => obj[field].toLowerCase().startsWith(val));
        }
        else if (optionType === '='){
            if(val){
                filter = filter.filter(obj => Math.trunc(+obj[field])  === +val);
            }
        }
        else if (optionType === '>'){
            if(val){
                filter = filter.filter(obj => Math.trunc(+obj[field]) > +val);
            }
        }
        else if (optionType === '>='){
            if(val){
                filter = filter.filter(obj => Math.trunc(+obj[field]) >= +val);
            }
        }
        else if (optionType === '<'){
            if(val){
                filter = filter.filter(obj => Math.trunc(+obj[field]) < +val);
            }
        }
        else if (optionType === '<='){
            if(val){
                filter = filter.filter(obj => Math.trunc(+obj[field]) <= +val);
            }
        }

        return filter;
    };


    const operatorSelect = isNumeric?<OperatorSelectNum/>:<OperatorSelectString/>;

    return(
        <>
            <div className="filter-del" onClick={event => delRow(event, data)}>
                <CloseIcon/>
            </div>
            <div className = "filter-content">
                <div className = "filter-select">
                    <select defaultValue={'1'} onChange={(event) => isNumericFunc(event,data)}>
                        <ColSelect data = {data}/>
                    </select>
                </div>
                <div className = "filter-select" onChange={() => onFilterChange(data)}>
                    {operatorSelect}
                </div>
                <div className = "filter-input">
                    <input
                        spellCheck="false"
                        type="text"
                        placeholder = "Filter value"
                        onInput={() => onFilterChange(data)}
                    />
                </div>
            </div>
        </>
    );
};

const OperatorSelectString = () => {
    return(
        <>
            <select defaultValue={'contains'}>
                <option selected="contains">contains</option>
                <option>equals</option>
                <option>starts with</option>
            </select>
        </>
    );
};

const OperatorSelectNum = () => {
    return(
        <>
            <select defaultValue={'equals'}>
                <option value="equals">=</option>
                <option >{'>'}</option>
                <option>{'>='}</option>
                <option>{`<`}</option>
                <option>{'<='}</option>
            </select>
        </>
    );
};

const ColSelect = (props) => {
    const selectValues = [];
    const {data} = props;

    let i = 1;
    for (let key in {...data}[0]) {
        // noinspection JSUnfilteredForInLoop
        selectValues.push(<option value={i++}>{key.charAt(0).toUpperCase() + key.slice(1)}</option>);
    }



    return(
        <>
            {selectValues}
        </>
    );
};

export default FilterRow;