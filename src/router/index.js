//路由命名规范-----中横线

import Vue from 'vue'
import Router from 'vue-router'
import novaby from './novaby'
import saas from './saas'

Vue.use(Router);

let VueRouter = new Router({
    mode: 'history',
    routes: novaby.concat(saas),
    scrollBehavior (to, from, savedPosition) {
        // return desired position
        return savedPosition || { x: 0, y: 0 }
    }
});

export default VueRouter
