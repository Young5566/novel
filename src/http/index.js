/**
 * @author: Young
 * @QQ:403353323
 * @date:2018/7/4
 */

import axios from 'axios';

// http请求拦截
axios.interceptors.request.use(
    function (config) {
        console.log('请求拦截', config);
        // 向请求头中添加token
        if (window.localStorage.getItem('token')) {
            config.headers.common['token'] = window.localStorage.getItem('token');
        }
        return config;
    },
    function (error) {
        console.log('请求错误拦截', error);
        return Promise.reject(error);
    }
);

// http响应拦截
axios.interceptors.response.use(
    function (response) {
        console.log('响应拦截', response);
        return response;
    },
    (error) => {
        console.log('响应错误拦截', error);
        return Promise.reject(error);
    }
);

export default axios;
