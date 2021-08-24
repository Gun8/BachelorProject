import React from 'react';

import Chart, {
    Legend,
    SeriesTemplate,
    Title,
    Subtitle,
    CommonSeriesSettings,
    Export,
    Tooltip
} from 'devextreme-react/chart';

import "./graphs.css";

class LineGraph extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: props.data,
            title: props.title,
        };
    }

    customizeTooltip = (arg) => {
        return {
            html: `<div><div class="tooltip-header">${
                arg.argumentText
                }</div><div class="tooltip-body"><div class="series-name"><span class='top-series-name'>${
                arg.seriesName
                }</span>: </div><div class="value-text"><span class='top-series-value'>${
                arg.valueText
                }</span></div></div></div>`
        };
    };


    render() {
        const {data, title} = this.state;
        if(!data[0]){
            return <p>Lack data</p>
        }
        let years = new Set();

        data.forEach(obj => years.add(obj.year));

        const type = (data.length <= 100 && years.size < 10)?'bar':'stackedbar';

        data.forEach(obj => obj.value = (Math.trunc(obj.value * 10) /10));

        const formedData = data.map(obj => {return {
            name: obj.name,
            value: obj.value,
            year:  obj.year + ''
        }});

        return (
            <Chart
                id="chart"
                palette="Default"
                dataSource={formedData.reverse()}>
                <SeriesTemplate
                    nameField="name"
                />
                <CommonSeriesSettings
                    argumentField="year"
                    valueField="value"
                    type={type}
                />
                <Title text= {title}>
                    <Subtitle text="(Тисяч тонн нафтового еквівалентa)" />
                </Title>
                <Tooltip
                    enabled={true}
                    location="edge"
                    customizeTooltip={this.customizeTooltip}
                />
                <Legend
                    verticalAlignment="bottom"
                    horizontalAlignment="center"
                />
                <Export enabled={true} />
            </Chart>
        );
    }
}


export default LineGraph;


