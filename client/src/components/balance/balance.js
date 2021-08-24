import React from 'react';
import getJSON from '../../functions/getJSON';
import renderGraph from '../../functions/renderGraph';
import exportData from '../../functions/exportData';
import SubNav from '../subNav';
import DisplayData from '../displayData';



export default class Balance extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            balance : null,
            type : 'table'
        };
    };

    componentDidMount(){
        const balance = sessionStorage.getItem('balance');

        if(!balance){
            getJSON('/balance')
                .then(res => {
                    sessionStorage.setItem('balance', JSON.stringify(res));
                    this.setState({
                        balance : res,
                    });
                });
        }
        else {
            this.setState({
                balance: JSON.parse(balance)
            });
        }
    }

    resetData = (filter) => {
        this.setState({
            balance: filter
        });
    };

    resetType = (type) => {
        this.setState({
            type: type
        });
    };

     exportXLSX = () => {
        exportData("/xlsx", "balance");
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

        const newData = data.filter(obj => {
            return obj["type"] === typeText && obj["year"] >= year1Text && obj["year"] <= year2Text
                && checkedValues.includes(obj['name']);
        });

        renderGraph(newData,typeText);

    };

    render(){

        const headCells = [
            { id: 'id', numeric: true, disablePadding: true, label: 'Id' },
            { id: 'name', numeric: false, disablePadding: false, label: 'Name' },
            { id: 'type', numeric: false, disablePadding: false, label: 'Type' },
            { id: 'value', numeric: false, disablePadding: false, label: 'Value' },
            { id: 'year', numeric: true, disablePadding: false, label: 'Year' },
        ];

        return(
            <div className="analytics">
                <SubNav resetType = {this.resetType}/>
                <div className= "analytics-box">
                    <DisplayData
                        data = {this.state.balance}
                        exportData = {this.exportXLSX}
                        headCells = {headCells}
                        title = "Energy balance"
                        resetData = {this.resetData}
                        name = "balance"
                        formData = {this.formData}
                        type = {this.state.type}
                    />
                </div>
            </div>
        );
    }
}






