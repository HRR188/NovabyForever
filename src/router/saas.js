const saasIndex = resolve => require(['Saas/pages/index.vue'], resolve);
const projectsList = resolve => require(['Saas/pages/projects.vue'], resolve);
const partyBRefuse = resolve => require(['Saas/pages/partyBRefuse.vue'], resolve);
const saasNda = resolve => require(['Saas/pages/nda.vue'], resolve);
const saasNdaExpired = resolve => require(['Saas/pages/ndaExpired.vue'], resolve);

const project = resolve => require(['Saas/pages/project/project.vue'], resolve);
const feedbackList = resolve => require(['Saas/pages/project/feedbackList.vue'],resolve);
const saasChat = resolve => require(['Saas/pages/project/chat.vue'], resolve);
const saasResult = resolve => require(['Saas/pages/project/result.vue'], resolve);
const saasPayment = resolve => require(['Saas/pages/project/payment.vue'], resolve);
const saasHelp = resolve => require(['Saas/pages/project/help.vue'], resolve);
const saasInvite = resolve => require(['Saas/pages/project/invite.vue'], resolve);
const saasSelect = resolve => require(['Saas/pages/project/select.vue'], resolve);
const saasBid = resolve => require(['Saas/pages/project/bid.vue'], resolve);
const modelSpecification = resolve => require(['Saas/pages/project/modelSpecification.vue'], resolve);
const task = resolve => require(['Saas/pages/project/task.vue'], resolve);
const permissionDenied = resolve => require(['Saas/pages/project/permissionDenied.vue'], resolve);
const projectSetting = resolve => require(['Saas/pages/project/projectSetting.vue'], resolve);
const feedback = resolve => require(['Saas/pages/project/feedback.vue'], resolve);
const feedbackDetail = resolve => require(['Saas/pages/project/feedbackDetail.vue'], resolve);
// const requirement = resolve => require(['Saas/pages/project/requirement.vue'], resolve);

const chooseProjectType = resolve => require(['Saas/pages/create/chooseProjectType.vue'],resolve);
const createProject = resolve => require(['Saas/pages/create/createProject.vue'],resolve);
const releaseQuote = resolve => require(['Saas/pages/create/releaseQuote.vue'],resolve);

let saas = [
    {
        path:'/novahub',
        component:saasIndex,
        name:'saasIndex',
        redirect:'/novahub/projects-list',
        children:[
            {
                path: 'projects-list',
                component: projectsList,
                name: 'saasProjectsList',
                meta: {
                    title: 'Novahub',
                    requiresAuth: true,
                    hideNav: true,
                }
            },
            {
                path: 'refuse',
                component: partyBRefuse,
                name: 'partyBRefuse',
                meta: {
                    title: 'Novahub',
                    requiresAuth: true,
                    hideNav: true,
                }
            },
            {
                path: 'nda/:id/:code?',
                component: saasNda,
                name: 'saasNda',
                meta: {
                    title: 'NDA',
                    requiresAuth: true,
                    hideNav: true,
                }
            },
            {
                path:'project/:id',
                component:project,
                name:'saasProject',
                redirect:'project/:id/task',
                children:[
                    {
                        path:'permission-denied',
                        component:permissionDenied,
                        name:'permissionDenied',
                        props:true,
                        meta:{
                            title:'Permission denied',
                            requiresAuth: true,
                            hideNav: true,
                        }
                    },
                    {
                        path:'project-setting',
                        component:projectSetting,
                        name:'saasProjectSetting',
                        props:true,
                        meta:{
                            title:'Project setting',
                            requiresAuth: true,
                            hideNav: true,
                        }
                    },
                    {
                        path:'feedback',
                        component:feedback,
                        name:'saasFeedback',
                        props:true,
                        meta:{
                            title:'Feedback',
                            requiresAuth: true,
                            hideNav: true,
                        }
                    },
                    {
                        path:'feedback-detail/:feedbackId',
                        component:feedbackDetail,
                        name:'saasFeedbackDetail',
                        props:true,
                        meta:{
                            title:'Feedback detail',
                            requiresAuth: true,
                            hideNav: true,
                        }
                    },
                    // {
                    //     path:'requirement',
                    //     component:requirement,
                    //     name:'saasRequirement',
                    //     props:true,
                    //     meta:{
                    //         title:'Requirement',
                    //         requiresAuth: true,
                    //         hideNav: true,
                    //     }
                    // },
                    {
                        path:'work-bench',
                        component:task,
                        name:'task',
                        props:true,
                        meta:{
                            title:'Task',
                            requiresAuth: true,
                            hideNav: true,
                        }
                    },
                    {
                        path:'work-bench/:modelId',
                        component:task,
                        name:'saasTask',
                        props:true,
                        meta:{
                            title:'Task',
                            requiresAuth: true,
                            hideNav: true,
                        }
                    },
                    {
                        path:'task/feedback/:feedbackId',
                        component:feedbackList,
                        name:'feedbackList',
                        meta:{
                            title:'Feedback list',
                            requiresAuth: true,
                            hideNav: true,
                        }
                    },
                    {
                        path:'model-specification',
                        component:modelSpecification,
                        name:'saasModelSpecification',
                        meta:{
                            title:'Model specification',
                            requiresAuth: true,
                            hideNav: true,
                        }
                    },
                    {
                        path:'result',
                        component:saasResult,
                        name:'saasResult',
                        props:true,
                        meta:{
                            title:'Result',
                            requiresAuth: true,
                            hideNav: true,
                        }
                    },
                    {
                        path:'payment',
                        component:saasPayment,
                        name:'saasPayment',
                        props:true,
                        meta:{
                            title:'Payment',
                            requiresAuth: true,
                            hideNav: true,
                        }
                    },
                    {
                        path:'help',
                        component:saasHelp,
                        name:'saasHelp',
                        props:true,
                        meta:{
                            title:'Help',
                            requiresAuth: true,
                            hideNav: true,
                        }
                    },
                    {
                        path:'invite',
                        component:saasInvite,
                        name:'saasInvite',
                        props:true,
                        meta:{
                            title:'Invite',
                            requiresAuth: true,
                            hideNav: true,
                        }
                    },
                    {
                        path:'select',
                        component:saasSelect,
                        name:'saasSelect',
                        props:true,
                        meta:{
                            title:'select',
                            requiresAuth: true,
                            hideNav: true,
                        }
                    },
                    {
                        path:'bid',
                        component:saasBid,
                        name:'saasBid',
                        props:true,
                        meta:{
                            title:'bid',
                            requiresAuth: true,
                            hideNav: true,
                        }
                    },
                    {
                        path:'chat/:userId',
                        component:saasChat,
                        name:'saasChatUser',
                        props:true,
                        meta:{
                            title:'Chat',
                            requiresAuth: true,
                            hideNav: true,
                        }
                    },
                    {
                        path:'chat',
                        component:saasChat,
                        name:'saasChat',
                        props:true,
                        meta:{
                            title:'Chat',
                            requiresAuth: true,
                            hideNav: true,
                        }
                    },
                ]
            },
            {
                path:'choose-project',
                component:chooseProjectType,
                name:'chooseProjectType',
                meta: {
                    title: 'Choose project',
                    requiresAuth: true,
                    hideNav: true,
                }
            },
            {
                path:'create-project/:type',
                component:createProject,
                name:'createProject',
                meta: {
                    title: 'Create project',
                    requiresAuth: true,
                    hideNav: true,
                }
            },
            {
                path:'release-quote/:id',
                component:releaseQuote,
                name:'releaseQuote',
                meta: {
                    title: 'Release quote',
                    requiresAuth: true,
                    hideNav: true,
                }
            }
        ]
    },
    {
        path: '/novahub/nda-expired',
        component: saasNdaExpired,
        name: 'saasNdaExpired',
        meta: {
            title: 'NDA Expired',
            hideNav: true,
        }
    },
];
export default saas