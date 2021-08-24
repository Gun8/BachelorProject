import React from 'react';
import getJSON from '../../functions/getJSON';
import renderGraph from '../../functions/renderGraph';
import exportData from '../../functions/exportData';
import SubNav from '../subNav';
import DisplayData from '../displayData';

export default class Emissions extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            emissions : null,
            type : 'table'
        };
    };

    componentDidMount(){
        const emissions = sessionStorage.getItem('emissions');

        if(!emissions){
            getJSON('/emissions')
                .then(res => {
                    sessionStorage.setItem('emissions', JSON.stringify(res));
                    this.setState({
                        emissions : res
                    });
                });
        }
        else {
            this.setState({
                emissions: JSON.parse(emissions)
            });
        }
    }

    resetData = (filter) => {
        this.setState({
            emissions: filter
        });
    };

    resetType = (type) => {
        this.setState({
            type: type
        });
    };

    exportXLSX = () => {
        exportData("/emxlsx", "emissions");
    };

    formData = () => {
        const data = this.state.emissions;
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
            return  obj["year"] >= year1Text && obj["year"] <= year2Text && checkedValues.includes(obj['name']);
        });

        renderGraph(newData.reverse(),"Викиди окремих забруднюючих речовин");

    };

    render(){

        const headCells = [
            { id: 'id', numeric: true, disablePadding: true, label: 'Id' },
            { id: 'name', numeric: false, disablePadding: false, label: 'Name' },
            { id: 'value', numeric: false, disablePadding: false, label: 'Value' },
            { id: 'year', numeric: true, disablePadding: false, label: 'Year' },
        ];

        return(
            <div className="analytics">
                <SubNav resetType = {this.resetType}/>
                <div className= "analytics-box">
                    <DisplayData
                        data = {this.state.emissions}
                        exportData = {this.exportXLSX}
                        headCells = {headCells}
                        title = "Emissions"
                        resetData = {this.resetData}
                        name = "emissions"
                        formData = {this.formData}
                        type = {this.state.type}
                    />
                </div>
            </div>
        );
    }
}