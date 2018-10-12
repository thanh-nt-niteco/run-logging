import React, { Component } from 'react';
import SelectComponent from './childcomponents/SelectComponent';

class FilterComponent extends Component {
  constructor(props) {
      super(props);
      this.onChangeYear = this.onChangeYear.bind(this);
  }

  getStartDay (activities) {

  }

  getStartDate (activities) {
    if(!activities) {
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - 14); // back 2 weeks
      startDate.setDate(startDate.getDate() + 1 - startDate.getDay()); // the start day is Monday

      return startDate;
    }
  }

  createListYears(startDate, endDate) {
    const startYear = startDate.getFullYear();
    const endYear = endDate.getFullYear();
    if(endYear > startYear) {
      const years = [];
      for(let year=endYear; year>=startYear; year--) {
        years.push({
          value: year,
          text: year
        });
      }
      return years;
    } else {
      return [{
        value: startYear,
        text: startYear
      }];
    }
  }

  onChangeYear () {

  }

  render () {
    const {activities} = this.props;
    const endDate = new Date();
    const startDate = this.getStartDate(activities);

    const years = this.createListYears(startDate, endDate);

    return (
      <div>
        <SelectComponent list={years} selectedValue={years[0].value} onChange={this.onChangeYear} />
      </div>
    );
  }
}

export default FilterComponent;
