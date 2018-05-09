//路由命名规范-----中横线

import Vue from 'vue'
import Router from 'vue-router'
import novabyMobile from './novaby'
import sassMobile from './saas'

Vue.use(Router);

let VueRouter = new Router({
    mode: 'history',
    routes: novabyMobile.concat(sassMobile),
    scrollBehavior (to, from, savedPosition) {
        // return desired position
        return savedPosition || { x: 0, y: 0 }
    }
});

export default VueRouter