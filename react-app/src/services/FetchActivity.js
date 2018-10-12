import FetchApi from './Fetch';

class FetchActivity {
  constructor () {
    this.dataUrl = "/data/logdata.json?";
  }

  getActivityByUser (userId, page = 0) {
    return FetchApi.getJson(`${this.dataUrl}?userid=${userId}&page=${page}`);
  }
}

export default new FetchActivity();
