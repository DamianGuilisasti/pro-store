import axios from 'axios';

const Api = axios.create({
    baseURL: 'http://localhost:3005/api'
});

export default Api;