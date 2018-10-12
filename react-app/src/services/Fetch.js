import axios from 'axios';

class Fetch {
  getJson(url) {
    return axios.get(url);
  }
}

export default new Fetch();
