import React, { Component } from 'react';
import CONST_VALUE from '../utils/const';

const MONTH_MAP = [
  { value: 1, text: 'Jan'}, { value: 2, text: 'Feb'}, { value: 3, text: 'Mar'}, { value: 4, text: 'Apr'},
  { value: 5, text: 'May'}, { value: 6, text: 'Jun'}, { value: 7, text: 'Jul'}, { value: 8, text: 'Aug'},
  { value: 9, text: 'Sep'}, { value: 10, text: 'Oct'}, { value: 11, text: 'Nov'}, { value: 12, text: 'Dec'},
]

const formatDistance = function(distance, format = "km") {
  if(format === "km")
    return parseInt(distance/1000, 10);
}

class ChartColumnComponent extends Component {
  renderMonths() {
    return MONTH_MAP.map(month => <div className="col-1" key={month.value}>{month.text}</div>);
  }

  renderMonthData(data, month, week) {
    return data.map(monthData => {
      const distance = formatDistance(monthData.distance);
      return <div className="col-1" key={monthData.value}><span className="column-data" title={distance + "km"} style={{height: distance}}></span></div>;
    });
  }

  processActivityData(activities, year) {
    let dataByMonth = [...MONTH_MAP];
    dataByMonth.map(data => data.distance = 0);
    for(let i in activities) {
      dataByMonth[activities[i].month].distance += CONST_VALUE.SPORT_RUN === activities[i].sport && activities[i].year === year ? activities[i].distance : 0;
    }

    return dataByMonth;
  }

  render () {
    const {year, month, week, activities} = this.props;
    const dataByMonth = this.processActivityData(activities, year);

    return (
      <div>
        <div className="row text-align-center align-items-end column-data-container">
          {this.renderMonthData(dataByMonth, month, week)}
        </div>
        <div className="row text-align-center">
          {this.renderMonths()}
        </div>  
      </div>
    );
  }
}

export default ChartColumnComponent;
