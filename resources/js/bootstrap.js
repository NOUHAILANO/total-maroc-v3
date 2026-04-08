import axios from 'axios';
window.axios = axios;

window.axios.defaults.baseURL = window.location.origin;
