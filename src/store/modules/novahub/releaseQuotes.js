/**
 * Created by harryliu on 15/6/17.
 */
import api from '../../../api/api'

const releaseQuotes = {
    namespaced:true,
    state:{
        tags:[],
        category:[],
        gameCategory:[]
    },
    mutations:{
        setData(state,data) {
            state.category = data.category
            state.gameCategory = data.category_game
        },
        setTags(state,data){
            state.tags = data
        },
        setTagStatus(state,index){
            state.tags[index].status = !state.tags[index].status;
        }
    },
    actions:{
        getReleaseAttr:function (context) {
            return new Promise((reolve,reject)=>{
                api.getData('releaseAttr').then(function (response) {
                    if(response.data.code === 200) {
                        context.commit('setData',response.data.data.attr)
                        reolve(response.data.data.attr)
                    }
                })
            })
        },
        getTags(context,id){
            api.getData('releaseAttrTags',id).then(function (response) {
                if(response.data.code === 200) {
                    context.commit('setTags',response.data.data.tags)
                }
            })
        },
        submitProject(context,data){
            return new Promise(function(resolve,reject){
                api.postData('releaseQuotes',data).then((response) => {
                    resolve(response.data);
                })
            })
        },
        getInvitation(context,data){
            return new Promise(function(resolve,reject){
                api.getData('invitation',data).then((response) => {
                    resolve(response.data)
                })
            })
        }
    }
};

export default releaseQuotes
