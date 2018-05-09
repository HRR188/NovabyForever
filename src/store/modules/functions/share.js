/**
 * Created by harryliu on 4/6/17.
 */
import api from '../../../api/api'

const share={
    state:{
        links:{}
    },
    mutations:{
        setLinks:function (state,data) {
            state.links = data
        }
    },
    actions:{
        beforeShare:function (context,id) {
            return new Promise(function (resolve,reject) {
                api.getData('preShare',{id:id}).then(function (response) {
                    resolve(response)
                })
            })
        },
        getShareLinks:function (context,data) {
            api.getData('share',{id:data.id,type:data.type}).then(function (response) {
                context.commit('setLinks',response.data.data.share_urls)
            })
        },
        facebookLinkAc:function (context) {
            return new Promise(function (resolve,reject) {
                api.postData('facebookLink').then(function (response) {
                    resolve(response.data)
                })
            });
        },
        facebookDisconnectAc(context){
            return new Promise(function (resolve,reject) {
                api.postData('facebookDisconnect').then(function (response) {
                    resolve(response.data)
                })
            })
        },
        twitterLinkAc(context){
            return new Promise(function (resolve,reject) {
                api.getData('twitter').then(function (response) {
                    resolve(response.data)
                })
            })
        },
        twitterDisconnectAc(context){
            return new Promise(function (resolve,reject) {
                api.postData('twitterDisconnect').then(function (response) {
                    resolve(response.data)
                })
            })
        },
        linkedinDisconnectAc(context){
            return new Promise(function (resolve,reject) {
                api.postData('linkedinDisconnect').then(function (response) {
                    resolve(response.data)
                })
            })
        },
        pinterestDisconnectAc(context){
            return new Promise(function (resolve,reject) {
                api.postData('pinterestDisconnect').then(function (response) {
                    resolve(response.data)
                })
            })
        }
    }
};

export default share
