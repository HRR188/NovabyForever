import axios from 'axios'

let instance = axios.create({
    "headers":{
        'Content-Type':'application/x-www-form-urlencoded;charset=utf-8'
    }
});

function getToken() {
    return localStorage.getItem('token') || ''
}

instance.interceptors.request.use(config => {
    config.headers.token = getToken();
    return config;
},  error => {
    // Do something with request error
    return Promise.reject(error);
});

// response 拦截器
instance.interceptors.response.use(
    response => {
        const code = response.data.code;
        if (code === 200) {
            return response
        } else {
            // console.warn('error:'+JSON.stringify(response));
            return response
        }
    },
    error => {
        console.warn('err' + JSON.stringify(error));// for debug
        return Promise.reject(error);
    }
);

export default instance