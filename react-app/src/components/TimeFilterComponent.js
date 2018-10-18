import React, { Component } from 'react';
import CONST_VALUE from '../utils/const';
import SelectComponent from './childcomponents/SelectComponent';

class TimeFilterComponent extends Component {
  
  createListYears(startYear, selectedYear) {
    const today = new Date();
    const currentYear = today.getFullYear();

    const years = [{
      value: CONST_VALUE.SELECT_ALL_OPTIONS,
      text: 'All Years',
      selected: CONST_VALUE.SELECT_ALL_OPTIONS === selectedYear
    }];
    for(let year = currentYear; year >= startYear; year--) {
      years.push({
        value: year,
        text: year,
        selected: year === selectedYear
      });
    }
    return years;
  }

  createListMonths(selectedMonth) {
    const months = [{
      value: CONST_VALUE.SELECT_ALL_OPTIONS,
      text: 'All Months',
      selected: CONST_VALUE.SELECT_ALL_OPTIONS === selectedMonth
    }];
    for(let month = 1; month <= 12; month++) {
      months.push({
        value: month,
        text: month,
        selected: month === selectedMonth
      });
    }
    return months;
  }

  createListWeeks(selectedWeek) {
    const weeks = [{
      value: CONST_VALUE.SELECT_ALL_OPTIONS,
      text: 'All Weeks',
      selected: CONST_VALUE.SELECT_ALL_OPTIONS === selectedWeek
    }];
    for(let week = 1; week <= 6; week++) {
      weeks.push({
        value: week,
        text: week,
        selected: CONST_VALUE.SELECT_ALL_OPTIONS === week
      });
    }
    return weeks;
  }

  render () {
    const {
      startYear, selectedYear, selectedMonth, selectedWeek,
      onChangeYear, onChangeMonth, onChangeWeek
    } = this.props;
    const years = this.createListYears(startYear, selectedYear);
    const months = this.createListMonths(selectedMonth);
    const weeks = this.createListWeeks(selectedWeek);

    return (
      <div>
        <SelectComponent list={years} onChange={onChangeYear} />
        <SelectComponent list={months} onChange={onChangeMonth} />
        <SelectComponent list={weeks} onChange={onChangeWeek} />
      </div>
    );
  }
}

export default TimeFilterComponent;
