import React, { Component } from 'react';
import ChartComponent from './components/ChartComponent';
import Filter from './components/FilterComponent';

import FetchActivity from './services/FetchActivity';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: '0',
      userActivities: [],
      pageActivity: 0
    }
  }
  render() {
    return (
      <div>
        <Filter activities={this.userActivities} />
        <ChartComponent />
      </div>
    );
  }

  componentDidMount() {
    this.getUserActivity();
  }

  getUserActivity () {
    const fetchActivityUser = FetchActivity.getActivityByUser(this.state.userId, this.state.pageActivity);
    fetchActivityUser.then(result => {
      if(!result && result.length > 0) {
          this.setStage((prevStat) => {
            return {userActivities: [...prevStat.userActivities, ...result]};
          } );
      }
    }).catch(error => {
      console.log(error);
    });
  }
}

export default App;
