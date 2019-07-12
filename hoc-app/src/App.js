import React from 'react';
import './App.css';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import config from'./chart-config.json';
import data from'./data.json';
import Card from "@material-ui/core/Card";
import CardContent from '@material-ui/core/CardContent';

am4core.useTheme(am4themes_animated);

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        };

        this.createWaterFallChart = this.createWaterFallChart.bind(this);
        this.openDrawer = this.openDrawer.bind(this);
    }

    componentDidMount() {
        this.createWaterFallChart(data);
    }

    componentWillUnmount() {
        if(this.chart)
            this.chart= null ;
    }

    openDrawer() {
        this.setState({open : !this.state.open});
    }

    createWaterFallChart() {
        config.data = data.data;
        config.series[0].columns.events.hit = (event) => this.openDrawer(event);
        config.xAxes[0].renderer.labels.events.hit = (event) => this.openDrawer(event);

        this.chart = am4core.createFromConfig(config, `chart`, am4charts.XYChart);
    }

    render(){
        return (
            <div style={{display:"flex", justifyContent: "flex-start", alignItems: "flex-start",
                padding: "24px"}}>
                <div id="chart"
                     style={{width:"100%", height: "300px",position:"relative"}}/>
                { this.state.open ? <Card style={{width: "50%"}}>
                    <CardContent>
                        {`open card`}
                    </CardContent>
                </Card> : null}
            </div>
        )
    }
}

export default  App;
