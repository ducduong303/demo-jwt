import axios from "axios";
// import { NotificationError } from "../common/Notification";

// let BASE_URL = "http://localhost:5000/user"
let BASE_URL = "https://loggindemo.herokuapp.com/user"
const http = axios.create({
    baseURL: BASE_URL,
});

http.interceptors.request.use(function (config) {
    const token = localStorage.getItem("access_token");
    config.headers.Authorization = token ? token : '';
    config.headers['Accept-Language'] = "vi";
    return config;
}, function (error) {
    // Do something with request error
    if (error.response && error.response.data) {
        return Promise.reject(error.response.data);
    } else {
        return Promise.reject(error);
    }
});
http.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    if (error.response && error.response.data) {
        return Promise.reject(error.response.data);
    } else {
        return Promise.reject(error);
    }
});
export default http;

