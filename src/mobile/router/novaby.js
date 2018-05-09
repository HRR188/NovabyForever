const signUp = resolve => require(['../pages/userLogFunctions/signup.vue'], resolve);
const signIn = resolve => require(['../pages/userLogFunctions/signin.vue'], resolve);

let novabyMobile = [
    {
        path: '/',
        redirect: '/sign-in'
    },
    {
        path:'/sign-in',
        name:'sign-in',
        component:signIn,
        meta: {
            title: 'signIn',
            requiresAuth: false
        }
    },
    {
        path: '/sign-up',
        name: 'sign-up',
        component: signUp,
        meta: {
            title: 'Sign up',
            requiresAuth: false
        }
    },
    {
        path: '*',
        redirect:'/sign-in'
    }
];

export default novabyMobile