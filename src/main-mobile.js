// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './app-mobile'
import router from './mobile/router/index'
import store from './store/store'
import multiLanguage from './plugins/multiLanguage'
import en from './assets/dic/en'
import zh from './assets/dic/zh'
import validation from './plugins/validation/validation'
import VerifyPlugin from './plugins/verify'
import progressive from './directive/progressiveImage'

Vue.use(validation);
Vue.use(progressive);
Vue.use(VerifyPlugin);

Vue.config.productionTip = false;

//引入多语言
Vue.use(multiLanguage,{
    default:'en',
    en,
    zh
});

let id = process.env.GA_ID;
ga('create', id, 'auto');

router.beforeEach(function(to, from, next) {
    let token = localStorage.getItem('token')

    document.title = to.meta.title || 'Novaby';

    ga('set', 'page', to.name);
    ga('send', 'pageview');

    if (!to.meta.requiresAuth) {
        //不需要登录
        if (token) {
            store.dispatch('getUserLoginInfoAc').then((response) => {
                if(response === 'success'){
                    next();
                }
                else{
                    next({ path: '/sign-in' })
                }
            })
        } else {
            next()
        }
    } else {
        //需要登录
        if (token) {
            store.dispatch('getUserLoginInfoAc').then((response) => {
                if(response === 'success'){
                    next();
                }
                else{
                    next({ path: '/sign-in' })
                }
            })
        } else {
            next({ path: '/sign-in' })
        }
    }
});

/* eslint-disable no-new */
new Vue({
    el: '#app',
    template: '<App/>',
    router,
    store,
    components: { App }
});