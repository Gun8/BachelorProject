import React from 'react';
import ReactDOM from 'react-dom';
import EnhancedTable from "../table";
import './analytics.css';
import getJSON from '../../functions/getJSON';
import CircularProgress from '@material-ui/core/CircularProgress';
import AddIcon from '@material-ui/icons/Add';
import FilterRow from '../filterRow';
import GraphData from '../graphDataBalance';
import { saveAs } from 'file-saver';
import renderGraph from '../../functions/renderGraph';


export default class Analytics extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            balance : null,
            isListenedFilter: false
        };
    };

    formData = () => {
        const data = this.state.balance;
        const type = document.querySelector(".select-type select");
        const typeIndex = type.selectedIndex;
        const typeText =  type.options[typeIndex].text;
        const year1 = document.querySelector(".select-year select");
        const year1Index = year1.selectedIndex;
        const year1Text =  year1.options[year1Index].text;
        const year2 = document.querySelector(".select-year select:last-of-type");
        const year2Index = year2.selectedIndex;
        const year2Text =  year2.options[year2Index].text;
        const checked = document.querySelectorAll(".check-box input:checked");
        const checkedValues = [];

        for(let i = 0; i < checked.length; i++ ){
            checkedValues.push(checked[i].name);
        }

        console.log(checkedValues);

        const newData = data.filter(obj => {
            return obj["type"] === typeText && obj["year"] >= year1Text && obj["year"] <= year2Text
                && checkedValues.includes(obj['name']);
        });

        console.log(newData);

        renderGraph(newData);

    };

    resetBalance = (filter) => {
        this.setState({
            balance: filter,
            isListenedFilter :this.state.isListenedFilter
        });
    };

    handleFilterListIcon = () => {

        const filter = document.querySelector('.filter');
        const analytics = document.querySelector('.analytics');

        filter.style.cssText = "display: block";



        const listener = (event) => {
            const modal = event.target.closest('.filter');
            if(!modal && event.target.closest('.analytics')){
                filter.style.cssText = "display: none";
            }
        };

        if(!this.state.isListenedFilter){
            analytics.addEventListener('click',listener);
            this.setState({
                balance : this.state.balance,
                isListenedFilter :true
            });
        }
    };

    exportData = () => {
        function s2ab(s) {
            let buf = new ArrayBuffer(s.length);
            let view = new Uint8Array(buf);
            for (let i=0; i<s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
            return buf;
        }

        getJSON('/xlsx')
            .then(res => {
                saveAs(new Blob([s2ab(res.data)],{type:"application/octet-stream"}), 'balance.xlsx');
            });
    };


    componentDidMount(){
        console.log("didMount");
        const balance = sessionStorage.getItem('balance');

        if(!balance){
            getJSON('/balance')
                .then(res => {
                    sessionStorage.setItem('balance', JSON.stringify(res));
                    this.setState({
                        balance : res,
                        isListenedFilter :this.state.isListenedFilter
                    });
                });
        }
        else {
           this.setState({
               balance: JSON.parse(balance),
               isListenedFilter :this.state.isListenedFilter
           });
        }
    }

    insertFilterRow = () => {
        let div = document.createElement('div');
        const btn = document.querySelector(".add-filter-btn");
        const filter = document.querySelector(".filter");

        div.classList.add("filter-row");
        btn.insertAdjacentHTML(`beforeBegin`, `<div class="filter-row"></div>`);


        ReactDOM.render(
            <FilterRow
                resetBalance = {this.resetBalance}
            />,
            filter.querySelector(".filter-row:nth-last-child(2)")
        );
    };

    render(){
        return(
            <div className="analytics">
                <div className= "analytics-box">
                    <Table
                        balance = {this.state.balance}
                        handleFilterListIcon = {this.handleFilterListIcon}
                        exportData = {this.exportData}
                    />
                    <div className="filter">
                        <div className = "filter-titles">
                            <span>Column</span>
                            <span>Operator</span>
                            <span>Value</span>
                        </div>
                        <div className="filter-row">
                            <FilterRow
                                resetBalance = {this.resetBalance}
                            />
                        </div>
                        <AddFilterBtn onClickHandler = {this.insertFilterRow}/>
                    </div>
                    <GraphData
                        data = {this.state.balance}
                        formData = {this.formData}
                    />
                    <div id="line-graph" ></div>
                </div>
            </div>
        );
    }
}

const Table = (props) => {
    return props.balance?
        <EnhancedTable
            balance = {props.balance}
            handleFilterListIcon = {props.handleFilterListIcon}
            exportData = {props.exportData}
        />
        : <CircularProgress />;
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

