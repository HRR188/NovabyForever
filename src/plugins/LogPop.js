/**
 * Created by harryliu on 31/5/17.
 */
import LogPop from '../components/logPlugIn/logPop.vue'
import store from '../store/store'
import router from '../router/index'

let LogPopPlugin = {
    install: function(Vue) {
        let LogPopConstrustor = Vue.extend(LogPop);
        let LogPopInstance = {};

        Vue.prototype.$logPop = function(showLogUp) {
            if (Object.keys(LogPopInstance).length) {
                LogPopInstance.$el.remove();
                LogPopInstance = {}
            }
            let status;
            status = !!showLogUp;
            let promise = new Promise(function(resolve, reject) {
                LogPopInstance = new LogPopConstrustor({
                    el: document.createElement('div'),
                    data() {
                        return {
                            logInErrorMsg: '',
                            logUpErrorMsg: '',
                            logUpStatus: false,
                            status: !status,
                            artistsList: []
                        }
                    },
                    methods: {
                        closePop: function() {
                            LogPopInstance.$el.remove();
                            LogPopInstance = {};
                            if (window.localStorage.getItem('token')) {
                                resolve(true)
                            } else {
                                resolve(false)
                            }
                        },
                        forgot: function() {
                            LogPopInstance.$el.remove();
                            LogPopInstance = {};
                            resolve(false);
                            router.push('/reset-password')
                        },
                        logIn: function(info) {
                            let vm = this;
                            store.dispatch('loginAc', info).then(function(response) {
                                if (response.code === 200) {
                                    LogPopInstance.$el.remove();
                                    LogPopInstance = {};
                                    resolve(true)
                                } else {
                                    vm.logInErrorMsg = response.msg;
                                }
                            });
                        },
                        logUp: function(info) {
                            let vm = this;
                            store.dispatch('registerAc', info).then(function(response) {
                                if (response.code === 200) {
                                    store.dispatch('getRecommendlist').then(function(response) {
                                        vm.artistsList = response.slice(0, 6);
                                        vm.logUpStatus = true
                                    });
                                    // store.dispatch('navMessageListAc', { page: 1, pagesize: 10, type: 'all' })
                                } else {
                                    vm.logUpErrorMsg = response.msg
                                }
                            });
                        },
                        follow: function(users) {
                            let data = {
                                users: users
                            };
                            store.dispatch('followUser', data).then(function(response) {
                                if (response.code === 200) {}
                                LogPopInstance.$el.remove();
                                LogPopInstance = {};
                                resolve(true)
                            });
                        }
                    }
                });
                document.body.appendChild(LogPopInstance.$el);
            });

            return promise;
        }
    }
};

export default LogPopPlugin