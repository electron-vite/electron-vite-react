import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://180.191.51.65:9130/api', 
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosInstance;
