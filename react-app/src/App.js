import React, { Component } from 'react';
import ChartComponent from './components/ChartComponent';
import TimeFilterComponent from './components/TimeFilterComponent';
import CONST_VALUE from './utils/const';
import FetchActivity from './services/FetchActivity';
import {isNullComponent} from './components/UtilsComponent';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: '0',
      activities: [],
      pageActivity: 0,

      selectedYear: CONST_VALUE.SELECT_ALL_OPTIONS,
      selectedMonth: CONST_VALUE.SELECT_ALL_OPTIONS,
      selectedWeek: CONST_VALUE.SELECT_ALL_OPTIONS,
      
      startYear: CONST_VALUE.NUMBER_NO_VALUE,

      hasActivity: false
    }

    this.onChangeYear = this.onChangeYear.bind(this);
    this.onChangeMonth = this.onChangeMonth.bind(this);
    this.onChangeWeek = this.onChangeWeek.bind(this);
  }

  onChangeYear (event) {
    this.setState({
      selectedYear: parseInt(event.target.value, 10)
    });
  }
  onChangeMonth (event) {
    console.log(event.target.value)
  }
  onChangeWeek (event) {
    console.log(event.target.value)
  }

  render() {
    const TimeFilterComponentCheckedNull = isNullComponent(TimeFilterComponent);
    const ChartComponentCheckedNull = isNullComponent(ChartComponent);

    return (
      <div className="app-wrapper container">
        <TimeFilterComponentCheckedNull 
          isNull={!this.state.hasActivity} 
          startYear={this.state.startYear} 
          selectedYear={this.state.selectedYear} 
          selectedMonth={this.state.selectedMonth} 
          selectedWeek={this.state.selectedWeek} 
          onChangeYear={this.onChangeYear}
          onChangeMonth={this.onChangeMonth}
          onChangeWeek={this.onChangeWeek}
        />
        <ChartComponentCheckedNull 
          isNull={!this.state.hasActivity} 
          activities={this.state.activities}
          year={this.state.selectedYear} 
          month={this.state.selectedMonth} 
          week={this.state.selectedWeek} 
        />
      </div>
    );
  }

  componentDidMount() {
    this.getUserActivities();
  }

  getYearOfFirstActivity (activities) {
    let yearOfFirstActivity = activities && activities.length > 0 ? activities[activities.length-1].year : null;
    if(yearOfFirstActivity)
      return yearOfFirstActivity;
    return CONST_VALUE.NUMBER_NO_VALUE;
  }

  getSelectedYear (activities) {
    let yearOfLastActivty = activities && activities.length > 0 ? activities[0].year : null;
    if(yearOfLastActivty)
      return yearOfLastActivty;
    return CONST_VALUE.NUMBER_NO_VALUE;
  }

  updateUserActivity(activities) {
    this.setState((prevState) => {
      const newActivities = [];
      if(activities && activities.length > 0) {
        for(let i=0; i<activities.length; i++) {
          newActivities.push({
            start_date: activities[i].start_date,
            year: activities[i].year,
            month:activities[i].month,
            sport: activities[i].sport,
            distance: activities[i].distance
          });
        }
      }

      const updatedActivities = [...prevState.activities, ...newActivities];
      const startYear = this.getYearOfFirstActivity(updatedActivities);
      const selectedYear = this.getSelectedYear(updatedActivities);

      return {
        activities: updatedActivities,
        hasActivity: updatedActivities && updatedActivities.length > 0,
        startYear: startYear,
        selectedYear: selectedYear
      };
    } );
  }

  getUserActivities () {
    const fetchActivityUser = FetchActivity.getActivityByUser(this.state.userId, this.state.pageActivity);
    fetchActivityUser.then(result => {
      if(result && result.data && result.data.length > 0) {
        this.updateUserActivity(result.data);
      }
    }).catch(error => {
      console.log(error);
    });
  }
}

export default App;
