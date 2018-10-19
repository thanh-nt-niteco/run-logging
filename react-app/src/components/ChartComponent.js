import React, { Component } from 'react';
import ActivityTableComponent from './ActivityTableComponent';
import ChartColumnComponent from './ChartColumnComponent';
import ChartTimelineComponent from './ChartTimelineComponent';
import './ChartComponent.css';

const CHART_TYPE = {
  column: 'column',
  table: 'table',
  timeline: 'timeline'
};

class ChartComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chart: CHART_TYPE.column
    };
  }

  render () {
    const {year, month, week, activities} = this.props;
    const SelectedChartComponent = selectComponent(ChartColumnComponent, ActivityTableComponent, ChartTimelineComponent);
    return (
      <div>
        <SelectedChartComponent 
          year={year}
          month={month}
          week={week}
          activities={activities}
          selectedChart={this.state.chart}
        />
      </div>
    );
  }
}

const selectComponent = (ChartComponent, TableComponent, TimelineComponent) => ({selectedChart, ...rest}) => {
  switch (selectedChart) {
    case CHART_TYPE.column:
      return <ChartComponent {...rest}/>;
    case CHART_TYPE.table:
      return <TableComponent {...rest}/>;
    case CHART_TYPE.timeline:
      return <TimelineComponent {...rest}/>;
    default:
      return null;
  }
};

export default ChartComponent;
