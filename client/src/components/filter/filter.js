import React from 'react';
import ReactDOM from 'react-dom';
import FilterRow from '../filterRow';
import AddIcon from '@material-ui/icons/Add';


const Filter = ({resetData, name}) => {

    const insertFilterRow = () => {
        let div = document.createElement('div');
        const btn = document.querySelector(".add-filter-btn");
        const filter = document.querySelector(".filter");

        div.classList.add("filter-row");
        btn.insertAdjacentHTML(`beforeBegin`, `<div class="filter-row"></div>`);


        ReactDOM.render(
            <FilterRow
                resetData = {resetData}
                tableName = {name}
            />,
            filter.querySelector(".filter-row:nth-last-child(2)")
        );
    };

  return(
      <div className="filter">
          <div className = "filter-titles">
              <span>Column</span>
              <span>Operator</span>
              <span>Value</span>
          </div>
          <div className="filter-row">
              <FilterRow
                  resetData = {resetData}
                  tableName = {name}
              />
          </div>
          <AddFilterBtn onClickHandler = {insertFilterRow}/>
      </div>
  );
};

const AddFilterBtn = (props) => {
    const {onClickHandler} = props;

    return(
        <div className="add-filter-btn" onClick={() => onClickHandler()}>
            <span className="add-filter-icon"><AddIcon/></span>
            <span className="add-filter-text">ADD FILTER</span>
        </div>
    );
};

export default Filter;

