/**
 * @author: Young
 * @QQ:403353323
 * @date:2018/7/4
 */
import Vue from 'vue';
import Vuex from 'Vuex';
import * as types from './type';

Vue.use(Vuex);

const state = {
    user: {},
    token: {}
};

const mutations = {
    // 登陆时用户信息状态管理
    [types.LOGIN]: (state, data) => {
        if (data.userInfo) {
            state.user = data.userInfo;
            window.localStorage.setItem('user', JSON.stringify(data.userInfo));
        }
        if (data.token) {
            state.token = data.token;
            window.localStorage.setItem('token', data.token);
        }
    },

    // 注销时用户信息状态管理
    [types.LOGOUT]: (state) => {
        state.user = {};
        state.token = null;
        console.log('come logout');
        window.localStorage.removeItem('user');
        window.localStorage.removeItem('token');
        console.log(localStorage.getItem('token'));
        console.log('已注销');
    }
};

export default new Vuex.Store({
    state: state,
    mutations: mutations
});
