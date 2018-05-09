import api from '../../../api/api'
const USER = {
    state:{
        loginStatus:false,  //fasle未登录  true 登录
        userName:'',
        userAvatar:'',
        userId:'',
        userEmail:'',
        userType:'',
        userNewMessage:0,
        userNavMessageList:0,  // 用于菜单栏的消息显示,最多只显示10条
        userLanguage:'',
        userAlert:{}
    },
    mutations:{
        saveUserDataMu (state, msg) {
            state.userName = msg.user_name;
            state.userAvatar = msg.user_avatar;
            state.userId = msg.user_id;
            state.loginStatus = true;
            state.userEmail = msg.user_email;
            state.userType = msg.user_type;
            if(msg.user_lang){
                state.userLanguage = msg.user_lang;
            }
            state.userAlert = msg.alert
        },
        initUserDataMu(state){
            state.userName = '';
            state.userAvatar = '';
            state.userId = '';
            state.userEmail = '';
            state.loginStatus = false;
        },
        setUserLanguage:function (state,lang) {
            state.userLanguage = lang
        }
    },
    actions:{
        registerAc(context,data){
            return new Promise(function (resolve,reject) {
                api.postData('register',data).then(function(response){
                    if(response.data.code === 200) {
                        if(data.company_name === undefined) {
                            context.commit('saveUserDataMu', response.data.data.basic_info);
                            localStorage.setItem('token',response.data.data.token);
                            document.cookie="token="+response.data.data.token;
                        }
                    }
                    resolve(response.data)
                })
            })
        },
        loginAc:function (context,data) {
            return new Promise(function(resolve,reject){
                api.postData('login',data).then(function(response){
                    if(response.data.code === 200) {
                        context.commit('saveUserDataMu', response.data.data.basic_info);
                        localStorage.setItem('token',response.data.data.token);
                        document.cookie="token="+response.data.data.token;
                    }
                    resolve(response.data);
                })
            })
        },
        getUserLoginInfoAc:function (context) {
            return new Promise(function (resolve,reject) {
                api.getData('getLoginStatus').then(function (response) {
                    if (response.data.code === 200) {
                        context.commit('saveUserDataMu', response.data.data.basic_info);
                        resolve('success')
                    }
                    else if(response.data.code === -2){
                        localStorage.clear();
                        context.commit('initUserDataMu');
                        resolve('error')
                    }
                })
            })
        },
        userEdit:function(context,data){
            return new Promise(function (resolve,reject) {
                data.cover = context.rootState.imageUpload.userCover;
                data.top = context.rootState.imageUpload.userCoverPosition.top;
                data.left = context.rootState.imageUpload.userCoverPosition.left;
                api.postData('userEdit',data).then(function(response){
                    resolve(response.data)
                })
            })
        },
        getUserInfoAc:function(context){
            return new Promise(function(resolve,reject){
                api.getData('getUserInfo').then(function(response){
                    if(response.data.code === 200) {
                        //context.commit('saveUserInfo',response.data.data.user)
                        resolve(response.data)
                    }
                })
            })

        },
        changePassword:function(content,data){
            return new Promise(function(resolve,reject){
                api.postData('changepasswd',data).then(function(response){
                    resolve(response.data)
                })
            })
        },
        getUserCard:function (content,id) {
            return new Promise(function (resolve, reject) {
                api.getData('getUserCard',id).then(function (response) {
                    resolve(response.data.data)
                })
            })
        },
        editHeadPortraitAc:function(content,data){
            return new Promise(function(resolve,reject){
                api.postData('editHeadPortrait',data).then(function(response){
                    resolve(response.data)
                })
            })
        },
        sendEmailCodeAc(context,data){
            return new Promise(function(resolve,reject){
                api.postData('sendEmailCode',data).then(function(response){
                    resolve(response.data);
                })
            })
        },
        validationCodeAc(context,data){
            return new Promise(function(resolve,reject){
                api.postData('validationCode',data).then(function(response){
                    resolve(response.data);
                })
            })
        },
        resetPasswordAc(context,data){
            return new Promise(function(resolve,reject){
                api.postData('resetPassword',data).then(function(response){
                    resolve(response.data);
                })
            })
        },
        linkStatusAc(context,data){
            return new Promise(function(resolve,reject){
                api.getData('linkStatus',data).then(function(response){
                    resolve(response.data);
                })
            })
        }

    }
};

export default USER
