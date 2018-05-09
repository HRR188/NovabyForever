// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './app-desktop'
import router from './router/index'
import store from './store/store'
// import Vuerify from 'vuerify'
import infiniteScroll from './directive/infiniteScroll'
import AlertPlugin from './plugins/alert'
import LogPopPlugin from './plugins/logPop'
import VerifyPlugin from './plugins/verify'
import FBSignInButton from 'vue-facebook-signin-button'
import Time from './plugins/time'
import ReportPlugin from './plugins/report'
import ContactUsPlugin from './plugins/ContactUs'
import validation from './plugins/validation/validation'
// import AddNewProject from './plugins/AddNewProject'
import money from './directive/money'
import progressive from './directive/progressiveImage'
import multiLanguage from './plugins/multiLanguage'
import checkInternalPermission from './plugins/checkInternalPermission'
import en from './assets/dic/en'
import zh from './assets/dic/zh'
// import modelLayer plugin
import createNewModelLayerPlugin from './plugins/createNewModelLayer'
import fullScreenSliderPlugin from './plugins/fullScreenSlider'

// Vue.use(Vuerify);
Vue.use(AlertPlugin);
Vue.use(infiniteScroll);
Vue.use(LogPopPlugin);
Vue.use(VerifyPlugin);
// Vue.use(AddNewProject);
Vue.use(FBSignInButton);
Vue.use(fullScreenSliderPlugin);
Vue.use(Time);
Vue.use(ReportPlugin);
Vue.use(ContactUsPlugin);
Vue.use(validation);
Vue.use(money);
Vue.use(createNewModelLayerPlugin);
Vue.use(progressive);
Vue.use(checkInternalPermission);

//引入多语言
Vue.use(multiLanguage,{
    default:'en',
    en,
    zh
});

Vue.config.productionTip = false;

let id = process.env.GA_ID;
ga('create', id, 'auto');

router.beforeEach(function(to, from, next) {
    let token = localStorage.getItem('token')

    if (to.meta.hideNav === true) {
        store.commit('hideNav')
    } else {
        store.commit('showNav')
    }
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
    }
    else {
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
    router,
    store,
    template: '<App/>',
    components: { App }
});