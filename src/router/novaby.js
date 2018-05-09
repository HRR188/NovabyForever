const signUp = resolve => require(['../pages/userLogFunctions/signup.vue'], resolve);
const signIn = resolve => require(['../pages/userLogFunctions/signin.vue'], resolve);
const guide = resolve => require(['../pages/userLogFunctions/guide.vue'], resolve);
const modelsHeader = resolve => require(['../pages/community/modelsHeader.vue'], resolve);
const marketList = resolve => require(['../pages/community/marketList.vue'], resolve);
const followingList = resolve => require(['../pages/community/followingList.vue'], resolve);
const ModelDetail = resolve => require(['../pages/community/modelDetail.vue'], resolve);
const UploadNewModel = resolve => require(['../pages/community/upload-new-model.vue'], resolve);
const search = resolve => require(['../pages/search/search.vue'], resolve);
const searchUser = resolve => require(['../pages/search/user.vue'], resolve);
const searchModels = resolve => require(['../pages/search/models.vue'], resolve);
const resetPassword = resolve => require(['../pages/userLogFunctions/resetPassword.vue'], resolve);
const message = resolve => require(['../pages/message/messageCenter.vue'], resolve);
const home = resolve => require(['../pages/home/home.vue'], resolve);
const projectsHeader = resolve => require(['../pages/novahub/projectsHeader.vue'], resolve);
const biddingGallery = resolve => require(['../pages/novahub/biddingGallery.vue'], resolve);
// const myProjects = resolve => require(['../pages/novahub/myProjects.vue'], resolve);
const partner = resolve => require(['../pages/partner/partner.vue'], resolve);
const partnerCompany = resolve => require(['../pages/partner/company.vue'],resolve);
const partnerArtist = resolve => require(['../pages/partner/artist.vue'],resolve);
const projectHallDetail = resolve => require(['../pages/novahub/project-hall-detail.vue'], resolve);
// const ReleaseQuotes = resolve => require(['../pages/novahub/release-quotes.vue'], resolve);
// const ProjectProposalDetail = resolve => require(['../pages/novahub/project-proposal-detail.vue'], resolve);
// const PartyABProposal = resolve => require(['../pages/novahub/party-ab-proposal.vue'], resolve);
// const ProposalChangeRecord = resolve => require(['../pages/novahub/changeRecord.vue'], resolve);
const wallet = resolve => require(['../pages/wallet/wallet.vue'], resolve);
const walletList = resolve => require(['../pages/wallet/walletList.vue'], resolve);
const aboutUs = resolve => require(['../pages/footer/aboutUs.vue'], resolve);
const termsAndConditions = resolve => require(['../pages/footer/termsAndConditions.vue'], resolve);
const license = resolve => require(['../pages/footer/license.vue'], resolve);
const privacyPolicy = resolve => require(['../pages/footer/privacyPolicy.vue'], resolve);
const copyrightPolicy = resolve => require(['../pages/footer/copyrightPolicy.vue'], resolve);
const refundPolicy = resolve => require(['../pages/footer/refundPolicy.vue'], resolve);
const feedback = resolve => require(['../pages/feedback/feedback.vue'], resolve);
const joinBusinessHeader = resolve => require(['../pages/join/business/businessHeader.vue'], resolve);
const joinBusinessOne = resolve => require(['../pages/join/business/step1.vue'], resolve);
const joinBusinessTwo = resolve => require(['../pages/join/business/step2.vue'], resolve);
const joinBusinessThree = resolve => require(['../pages/join/business/step3.vue'], resolve);
const joinBusinessFour = resolve => require(['../pages/join/business/step4.vue'], resolve);
const joinArtistHeader = resolve => require(['../pages/join/artist/artistHeader.vue'], resolve);
const joinArtistOne = resolve => require(['../pages/join/artist/step1.vue'], resolve);
const joinArtistTwo = resolve => require(['../pages/join/artist/step2.vue'], resolve);
const joinArtistThree = resolve => require(['../pages/join/artist/step3.vue'], resolve);
const joinArtistFour = resolve => require(['../pages/join/artist/step4.vue'], resolve);
const joinArtistFive = resolve => require(['../pages/join/artist/step5.vue'], resolve);
const success = resolve => require(['../pages/successPromptPages/successPrompt.vue'], resolve);
const artistSuccess = resolve => require(['../pages/successPromptPages/artistSuccess.vue'], resolve);
const UploadNewModelSuccess = resolve => require(['../pages/successPromptPages/uploadNewModelSuccess.vue'], resolve);
const uploadNotModelSuccess = resolve => require(['../pages/successPromptPages/uploadNotModelSuccess.vue'], resolve);
const UploadNewModelSuccess2 = resolve => require(['../pages/successPromptPages/uploadNewModel.vue'], resolve);
const newProjectsSuccess = resolve => require(['../pages/successPromptPages/newProjectsSuccess.vue'], resolve);
// const serviceSuccess = resolve => require(['../pages/successPromptPages/serviceSuccess.vue'], resolve)
const personal = resolve => require(['../pages/profile/header.vue'], resolve);
const personalAbout = resolve => require(['../pages/profile/about.vue'], resolve);
const personalEdit = resolve => require(['../pages/profile/personalEdit.vue'], resolve);
const businessEdit = resolve => require(['../pages/profile/businessEdit.vue'], resolve);
const personalProtfolio = resolve => require(['../pages/profile/protfolio.vue'], resolve);
const personalLikes = resolve => require(['../pages/profile/likes.vue'], resolve);
const personalFollowers = resolve => require(['../pages/profile/followers.vue'], resolve);
const personalFollowing = resolve => require(['../pages/profile/following.vue'], resolve);
const personalDownloads = resolve => require(['../pages/profile/downloads.vue'], resolve);
const personalSocial = resolve => require(['../pages/profile/social.vue'], resolve);
const personalPassword = resolve => require(['../pages/profile/password.vue'], resolve);
const personalPayMent = resolve => require(['../pages/profile/payments.vue'], resolve);
const personalLanguage = resolve => require(['../pages/profile/language.vue'], resolve);
const personalTeam = resolve => require(['../pages/profile/team.vue'], resolve);
const personalEditTeam = resolve => require(['../pages/profile/editTeam.vue'], resolve);
const annotation = resolve => require(['../pages/annotation/annotation.vue'], resolve);
// const personalService = resolve => require(['../pages/profile/service.vue'], resolve)
// const service = resolve => require(['../pages/service/service.vue'], resolve)
// const servicePlans = resolve => require(['../pages/service/plans.vue'], resolve)
const test = resolve => require(['../pages/test/test.vue'], resolve);
const homePage = resolve => require(['../pages/profile/homePage.vue'], resolve);
const editModel = resolve => require(['../pages/community/editModel.vue'], resolve);
const saasHome = resolve => require(['../saas/saasHome.vue'], resolve);
const homeGuide = resolve => require(['../pages/guide/guide.vue'], resolve);
const editorModel = resolve => require(['../pages/community/editorModel.vue'], resolve);
const createModel = resolve => require(['../pages/community/editorModel.vue'], resolve);
const twoDAnno = resolve => require(['../components/twoD/twoDAnno.vue'],resolve);

let novaby = [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path:'/home',
        name:'home',
        component:home,
        meta: {
            title: 'Home',
            requiresAuth: false
        }
    },
    {
        path: '/sign-up',
        name: 'signUp',
        component: signUp,
        meta: {
            title: 'Sign up',
            requiresAuth: false
        }
    },
    {
        path: '/sign-in',
        name: 'signIn',
        component: signIn,
        meta: {
            title: 'Sign in',
            requiresAuth: false
        }
    },
    {
        path: '/guide',
        name: 'guide',
        component: guide,
        meta: {
            title: 'Guide',
            requiresAuth: true
        }
    },
    {
        path: '/home-guide',
        name: 'homeGuide',
        component: homeGuide,
        meta: {
            title: 'Guide',
            requiresAuth: false
        }
    },
    {
        path: '/personal/:id',
        name: 'personalHeader',
        component: personal,
        children:[
            {
                path: 'about',
                component: personalAbout,
                name: 'personalAbout',
                meta: {
                    title: 'About',
                    requiresAuth: false
                }
            },
            {
                path: 'personalEdit',
                component: personalEdit,
                name: 'personalEdit',
                meta: {
                    title: 'Edit',
                    requiresAuth: true
                }
            },
            {
                path: 'businessEdit',
                component: businessEdit,
                name: 'businessEdit',
                meta: {
                    title: 'Edit',
                    requiresAuth: true
                }
            },
            {
                path: 'portfolio',
                component: personalProtfolio,
                name: 'personalProtfolio',
                meta: {
                    title: 'Portfolio',
                    requiresAuth: false
                }
            },
            {
                path: 'likes',
                component: personalLikes,
                name: 'personalLikes',
                meta: {
                    title: 'Likes',
                    requiresAuth: false
                }
            },
            {
                path: 'follower',
                component: personalFollowers,
                name: 'personalFollowers',
                meta: {
                    title: 'Follower',
                    requiresAuth: true
                }
            },
            {
                path: 'following',
                component: personalFollowing,
                name: 'personalFollowing',
                meta: {
                    title: 'Following',
                    requiresAuth: true
                }
            },
            {
                path: 'downloads',
                component: personalDownloads,
                name: 'personalDownloads',
                meta: {
                    title: 'Downloads',
                    requiresAuth: true
                }
            },
            {
                path: 'social',
                component: personalSocial,
                name: 'personalSocial',
                meta: {
                    title: 'Social',
                    requiresAuth: true
                }
            },
            {
                path: 'password',
                component: personalPassword,
                name: 'personalPassword',
                meta: {
                    title: 'Password',
                    requiresAuth: true
                }
            },
            {
                path: 'payments',
                component: personalPayMent,
                name: 'personalPayMent',
                meta: {
                    title: 'Payments',
                    requiresAuth: true
                }
            },
            {
                path: 'language',
                component: personalLanguage,
                name: 'personalLanguage',
                meta: {
                    title: 'Language',
                    requiresAuth: true
                }
            },
            {
                path: 'team',
                component: personalTeam,
                name: 'personalTeam',
                meta: {
                    title: 'team',
                    requiresAuth: true
                }
            },
            {
                path: 'editTeam',
                component: personalEditTeam,
                name: 'personalEditTeam',
                meta: {
                    title: 'editTeam',
                    requiresAuth: true
                }
            },
            // {   增值服务类暂时隐藏
            //     path: 'plans',
            //     component: personalService,
            //     name: 'personalService',
            //     meta: {
            //         title: 'service',
            //         requiresAuth: true
            //     }
            // }
        ]
    },
    {
        path: '/upload-a-new-model',
        name: 'uploadNewModel',
        component: UploadNewModel,
        meta: {
            title: 'Models',
            requiresAuth: true
        }
    },
    {
        path:'/edit-model/:id/:type?',
        name:'editModel',
        component: editModel,
        meta:{
            requiresAuth: true,
            hideNav: true
        }
    },
    {
        path: '/create-model/:id',
        name: 'createModel',
        component: editorModel,
        meta: {
            title: 'Models',
            requiresAuth: true
        }
    },
    {
        path: '/editor-model/:id/:type?',
        name: 'editorModel',
        component: editorModel,
        meta: {
            title: 'Models',
            requiresAuth: true
        }
    },
    {
        path: '/models',
        name: 'modelsHeader',
        component: modelsHeader,
        children:[
            {
                path: 'market',
                component: marketList,
                name: 'marketList',
                meta: {
                    title: 'Market',
                    requiresAuth: false
                }
            },
            {
                path: 'following',
                component: followingList,
                name: 'followingList',
                meta: {
                    title: 'Following',
                    requiresAuth: true
                }
            }
        ]
    },
    {
        path: '/partner',
        name: 'partner',
        component: partner,
        redirect:{name:'partnerCompany'},
        meta: {
            title: 'Partner',
            requiresAuth: false
        },
        children:[
            {
                path: 'company',
                component: partnerCompany,
                name: 'partnerCompany',
                meta: {
                    title: 'Partner',
                    requiresAuth: false
                }
            },
            {
                path: 'artist',
                component: partnerArtist,
                name: 'partnerArtist',
                meta: {
                    title: 'Partner',
                    requiresAuth: false
                }
            }
        ]

    },
    {
        path: '/model-detail/:id',
        name: 'model-detail',
        component: ModelDetail,
        meta: {
            title: 'Models',
        }
    },
    {
        path: '/search',
        name: 'search',
        component: search,
        children:[
            {
                path: 'user',
                component: searchUser,
                name: 'searchUser',
                meta: {
                    title: 'Search',
                    requiresAuth: false
                }
            },
            {
                path: 'models',
                component: searchModels,
                name: 'searchModels',
                meta: {
                    title: 'Search',
                    requiresAuth: false
                }
            }
        ]
    },
    {
        path: '/reset-password',
        name: 'resetPassword',
        component: resetPassword,
        meta: {
            title: 'Reset password',
            requiresAuth: false
        }
    },
    {
        path: '/message-center/:id',
        name: 'message-center',
        component: message,
        meta: {
            title: 'Message center',
            requiresAuth: true
        }
    },
    {
        path:'/projects',
        name:'projectsHeader',
        component:projectsHeader,
        children:[
            {
                path: 'bidding-gallery',
                component: biddingGallery,
                name: 'biddingGallery',
                meta: {
                    title: 'Projects',
                    requiresAuth: false
                }
            },
            // {
            //     path: 'my-projects',
            //     component: myProjects,
            //     name: 'myProjects',
            //     meta: {
            //         title: 'Projects',
            //         requiresAuth: true
            //     }
            // }
        ]
    },
    {
        path:'/project-hall/project-details/:id',
        name:'projectHallDetails',
        component:projectHallDetail,
        meta: {
            title: 'Bidding gallery',
            requiresAuth: false
        }
    },
    // {
    //     path:'/project-private/:id',
    //     name:'privateProject',
    //     component:projectHallDetail,
    //     meta: {
    //         title: 'projects hall',
    //         requiresAuth: false,
    //         hideNav: true
    //     }
    // },
    // {
    //     path:'/release-quotes',
    //     name:'releaseQuotes',
    //     component:ReleaseQuotes,
    //     meta:{
    //         title: 'Release quotes',
    //         requiresAuth:true
    //     }
    // },
    // {
    //     path:'/project-proposal-detail/:id',
    //     name:'projectProposalDetail',
    //     component:ProjectProposalDetail,
    //     meta:{
    //         title: 'Novahub',
    //         requiresAuth:true
    //     }
    // },
    // {
    //     path:'/proposal-b/:id',
    //     name:'partyBProposal',
    //     component:PartyABProposal,
    //     meta:{
    //         requiresAuth:true
    //     }
    // },
    // {
    //     path:'/proposal-a/:id',
    //     name:'partyAProposal',
    //     component:PartyABProposal,
    //     meta:{
    //         requiresAuth:true
    //     }
    // },
    // {
    //     path:'/building-record/:id',
    //     name:'ProposalChangeRecord',
    //     component:ProposalChangeRecord,
    //     meta:{
    //         requiresAuth:true
    //     }
    // },
    {
        path:'/wallet',
        name:'wallet',
        component:wallet,
        meta:{
            title: 'Wallet',
            requiresAuth:true
        }
    },
    {
        path: '/walletList',
        component: walletList,
        name: 'walletList',
        meta: {
            title: 'Withdraw history',
            requiresAuth: true
        }
    },
    {
        path: '/aboutus',
        component: aboutUs,
        name: 'aboutUs',
        meta: {
            title: 'About us',
            requiresAuth: false
        }
    },
    {
        path: '/termsAndConditions',
        component: termsAndConditions,
        name: 'termsAndConditions',
        meta: {
            title: 'Terms and Conditions',
            requiresAuth: false
        }
    },
    {
        path: '/license',
        component: license,
        name: 'license',
        meta: {
            title: 'License',
            requiresAuth: false
        }
    },
    {
        path: '/privacyPolicy',
        component: privacyPolicy,
        name: 'privacyPolicy',
        meta: {
            title: 'Privacy Policy',
            requiresAuth: false
        }
    },
    {
        path: '/copyrightPolicy',
        component: copyrightPolicy,
        name: 'copyrightPolicy',
        meta: {
            title: 'Copyright infringement policy',
            requiresAuth: false
        }
    },
    {
        path: '/refundPolicy',
        component: refundPolicy,
        name: 'refundPolicy',
        meta: {
            title: 'Cancellation and refund policy',
            requiresAuth: false
        }
    },
    {
        path: '/feedback',
        component: feedback,
        name: 'feedback',
        meta: {
            title: 'Feedback',
            requiresAuth: false
        }
    },
    {
        path: '/business',
        component: joinBusinessHeader,
        name: 'joinBusinessHeader',
        children:[
            {
                path: 'one',
                component: joinBusinessTwo,
                name: 'joinBusinessOne',
                meta: {
                    title: 'Novaby business account',
                    requiresAuth: false
                }
            },
            {
                path:'two',
                component:joinBusinessTwo,
                name:'joinBusinessTwo',
                meta: {
                    title: 'Novaby business account',
                    requiresAuth: false
                }
            },
            {
                path:'three',
                component:joinBusinessThree,
                name:'joinBusinessThree',
                meta: {
                    title: 'Novaby business account',
                    requiresAuth: false
                }
            },
            {
                path:'four',
                component:joinBusinessFour,
                name:'joinBusinessFour',
                meta: {
                    title: 'Novaby business account',
                    requiresAuth: true
                }
            }
        ]
    },
    {
        path: '/artist',
        component: joinArtistHeader,
        name: 'joinArtistHeader',
        children:[
            {
                path: 'one',
                component: joinArtistOne,
                name: 'joinArtistOne',
                meta: {
                    title: 'Novaby artist',
                    requiresAuth: true
                }
            },
            {
                path:'two',
                component:joinArtistTwo,
                name:'joinArtistTwo',
                meta: {
                    title: 'Novaby artist',
                    requiresAuth: true
                }
            },
            {
                path:'three',
                component:joinArtistThree,
                name:'joinArtistThree',
                meta: {
                    title: 'Novaby artist',
                    requiresAuth: true
                }
            },
            {
                path:'four',
                component:joinArtistFour,
                name:'joinArtistFour',
                meta: {
                    title: 'Novaby artist',
                    requiresAuth: true
                }
            },
            {
                path:'five',
                component:joinArtistFive,
                name:'joinArtistFive',
                meta: {
                    title: 'Novaby artist',
                    requiresAuth: true
                }
            }
        ]
    },
    {
        path: '/success',
        name: 'success',
        component: success,
        children: [
            {
                path: 'artistSuccess',
                component: artistSuccess,
                name: 'artistSuccess',
                meta: {
                    title: 'Success',
                    requiresAuth: true
                }
            },
            {
                path:'new-projects-success',
                name:'newProjectsSuccess',
                component:newProjectsSuccess,
                meta:{
                    title: 'Projects',
                    requiresAuth:true
                }
            },
            {
                path: 'upload-model-success',
                name: 'UploadNewModelSuccess',
                component: UploadNewModelSuccess,
                meta: {
                    title: 'Models',
                    requiresAuth: true
                }
            },
            {
                path: 'upload-model-success/:id',
                name: 'UploadNewModelSuccess2',
                component: UploadNewModelSuccess2,
                meta: {
                    title: 'Models',
                    requiresAuth: true
                }
            },
            {
                path: 'upload-model-images-success',
                name: 'uploadNotModelSuccess',
                component: uploadNotModelSuccess,
                meta: {
                    title: 'Models',
                    requiresAuth: true
                }
            },
            // {   增值服务类，暂时隐藏
            //     path: 'serviceSuccess',
            //     component: serviceSuccess,
            //     name: 'serviceSuccess',
            //     meta: {
            //         title: 'success',
            //         requiresAuth: true
            //     }
            // },
        ]
    },
    // {   增值服务类，暂时隐藏
    //     path: '/service',
    //     name: 'service',
    //     component: service,
    //     children:[
    //         {
    //             path: 'plans',
    //             component: servicePlans,
    //             name: 'servicePlans',
    //             meta: {
    //                 title: 'plans',
    //                 requiresAuth: false
    //             }
    //         }
    //     ]
    // },
    {
        path:'/annotation/:id',
        name:'setAnnotation',
        component: annotation,
        meta: {
            title: 'Annotation',
            requiresAuth: true,
            hideNav: true
        }
    },
    {
        path:'/annotation-2d/:id',
        component:twoDAnno,
        name:'twoDAnno',
        meta: {
            title: 'Two d annotation',
            requiresAuth: true,
            hideNav: true
        }
    },
    {
        path:'/test',
        name:'test',
        component:test,
        meta:{
            requiresAuth: false,
            hideNav: true
        }
    },
    {
        //homePage
        // redirect:{name:'personalAbout'}
        path:'/homepage',
        name:'homePage',
        component:homePage,
        meta:{
            title:'Home page',
            requiresAuth: false,
        },
        children: [
            {
                path: '*',
                name:'homePageChild',
                component: homePage,
                meta: {
                    title:'About',
                    requiresAuth: false
                }
            }
        ]
    },
    {
        path:'/sassHome',
        name:'saasHome',
        component:saasHome,
        meta:{
            title:'Novahub',
            requiresAuth: false,
        }
    },
    {
        path: '*',
        redirect:'/home'
    }
];

export default novaby