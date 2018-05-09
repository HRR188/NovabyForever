import api from '../../../api/api'
const service = {
    namespaced:true,
    state:{

    },
    mutations:{

    },
    actions:{
        planList:function(){
            return new Promise(function(resolve,reject){
                api.getData('planList').then((response) => {
                    if(response.data.code === 200) {
                        resolve(response.data);
                    }
                })
            })
        },
        planReview:function(context,id){
            return new Promise(function(resolve,reject){
                api.getData('planReview',id).then((response) => {
                    if(response.data.code === 200) {
                        resolve(response.data);
                    }
                })
            })
        },
        planFree:function(context){
            return new Promise(function(resolve,reject){
                api.postData('planFree').then((response) => {
                    if(response.data.code === 200) {
                        resolve(response.data);
                    }
                })
            })
        }
    }
}

export default service
