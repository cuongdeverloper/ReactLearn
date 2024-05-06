import axios from "axios";
import  NProgress  from "nprogress";
import {store} from '../redux/store'
const instance = axios.create({
    baseURL: 'http://localhost:8081/',
    // timeout: 1000,
    // headers: {'X-Custom-Header': 'foobar'}
});
// Add a request interceptor
instance.interceptors.request.use(function (config) {
    // console.log('checkstore', store.getState())
    const access_token_api = store?.getState()?.user?.account?.access_token // optional chaining (?.) để tránh lỗi nếu một trong các thuộc tính trên đường dẫn không tồn tại.
    config.headers["Authorization"] = "Bearer " +  access_token_api;
    NProgress.start();
    // Do something before request is sent
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use(function (response) {
    NProgress.done();
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response && response.data ? response.data : response;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    NProgress.done();
    
    //token expired(EC === -999)
    if(error.response.data && error.response.data.EC === -999) {
        window.location.href='/login'
    }
    return error && error.response && error.response.data ? error.response.data : Promise.reject(error);
});
export default instance