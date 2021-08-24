import React from 'react';
import './subNav.css';

const SubNav = ({resetType}) => {
    const onClickHandler = (event) => {
        document.querySelector('ul.subnav li.active').classList.remove('active');
        event.target.classList.add("active");

        resetType(event.target.innerHTML.toLowerCase());
    };

  return(
      <nav>
          <ul className="subnav">
              <li id = "table" className="active" onClick={(event) => onClickHandler(event)}>Table</li>
              <li id = "graph" onClick={(event) => onClickHandler(event)}>Graph</li>
          </ul>
      </nav>
  );
};

export default SubNav;