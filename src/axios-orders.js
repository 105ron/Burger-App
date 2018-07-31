import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://buger-app-react.firebaseio.com/',
});

export default instance;
