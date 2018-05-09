const nda = resolve => require(['../pages/contract/nda.vue'], resolve);
const ndaSuccess = resolve => require(['../pages/contract/ndaSuccess.vue'], resolve);
const ndaExpired = resolve => require(['../pages/contract/ndaExpired.vue'], resolve);

let saasMobile = [
    {
        path: '/nda/:id/:code?',
        component: nda,
        name: 'nda',
        meta: {
            title: 'NDA',
            requiresAuth: true,
        }
    },
    {
        path: '/nda-success/:id',
        component: ndaSuccess,
        name: 'ndaSuccess',
        meta: {
            title: 'NDA Success',
            requiresAuth: true,
        }
    },
    {
        path: '/novahub/nda-expired',
        component: ndaExpired,
        name: 'ndaExpired',
        meta: {
            title: 'NDA Expired',
        }
    },
];
export default saasMobile