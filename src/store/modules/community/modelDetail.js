/**
 * Created by harryliu on 24/5/17.
 */
import api from '../../../api/api'

const modelDetail = {
    namespaced: true,
    state:{
        images:[],
        model:{},
        replies:[],
    },
    mutations:{
        setImg(state,imgs) {
            state.images = imgs
        },
        setModel(state,model) {
            state.model = model
        },
        setReplies(state,replies) {
            state.replies = replies
        },
        addReplies(state,reply) {
            state.replies.unshift(reply)
        },
        resterData(state){
            state.images = [];
            state.model = {};
            state.replies = []
        },
    },
    actions:{
        getModelDetail(context,id){
            let promise = new Promise(function (resolve,reject) {
                api.modelDetail(id).then(function (response) {
                    context.commit('setImg',response.data.data.model.photos);
                    context.commit('setModel',response.data.data.model);
                    resolve(response.data.data)
                })
            });
            return promise
        },
        getModelReplies(context,data){
            let promise = new Promise(function(resolve,reject){
                api.modelReplies(data).then(function (response) {
                    if(response.data.code === 200){
                        context.commit('setReplies',response.data.data.comments);
                        resolve(response.data.data)
                    }
                })
            });
            return promise;
        },
        sendReply(context,data){
            let promise = new Promise(function (resolve,reject) {
                api.sendReply(data).then(function (response) {
                    resolve(response.data.data)
                })
            });
            return promise
        }
    }
};

export default modelDetail
