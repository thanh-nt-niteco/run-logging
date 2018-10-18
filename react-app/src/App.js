import React, { Component } from 'react';
import ChartComponent from './components/ChartComponent';
import TimeFilterComponent from './components/TimeFilterComponent';
import CONST_VALUE from './utils/const';
import FetchActivity from './services/FetchActivity';

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
    console.log(event.target.value)
  }
  onChangeMonth (event) {
    console.log(event.target.value)
  }
  onChangeWeek (event) {
    console.log(event.target.value)
  }

  render() {
    return (
      <div className="app-wrapper container">
        {this.state.hasActivity ? 
        <TimeFilterComponent 
          startYear={this.state.startYear} 
          selectedYear={this.state.selectedYear} 
          selectedMonth={this.state.selectedMonth} 
          selectedWeek={this.state.selectedWeek} 
          onChangeYear={this.onChangeYear}
          onChangeMonth={this.onChangeMonth}
          onChangeWeek={this.onChangeWeek}
        /> : null}
        {this.state.hasActivity ? 
        <ChartComponent 
          activities={this.state.activities}
          year={this.state.selectedYear} 
          month={this.state.selectedMonth} 
          week={this.state.selectedWeek} 
        /> : null
        }
      </div>
    );
  }

  componentDidMount() {
    this.getUserActivities();
  }

  getYearOfFirstActivity (activities) {
    let startDate = activities && activities.length > 0 ? new Date(activities[activities.length-1].start_date_local) : null;
    if(startDate)
      return startDate.getFullYear();
    return CONST_VALUE.NUMBER_NO_VALUE;
  }

  getSelectedYear (activities) {
    let lastDate = activities && activities.length > 0 ? new Date(activities[0].start_date_local) : null;
    if(lastDate)
      return lastDate.getFullYear();
    return CONST_VALUE.SELECT_ALL_OPTIONS;
  }

  updateUserActivity(activities) {
    this.setState((prevState) => {
      var updatedActivities = [...prevState.activities, ...activities];
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
