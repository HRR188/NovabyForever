import api from '../../../api/api'
const invite = {
    namespaced:true,
    state:{
        inviteList:[],
        bidList:[]
    },
    mutations:{
        saveInvite(state,data){
            state.inviteList = data
        },
        saveBid(state,data){
            state.bidList = data
        }
    },
    actions:{
        async getInvite(context,data){
            let response = await api.getData('saasInvite',data);
            if(response.data.code === 200) {
                context.commit('saveInvite',response.data.data.users)
            }
            return response.data
        },
        async getBidList(context,data){
            let response = await api.getData('saasApply',data);
            if(response.data.code === 200) {
                context.commit('saveBid',response.data.data.users)
            }
            return true
        },
        sendInvite(context,data){
            return new Promise(function(resolve,reject){
                api.postData('saasSendInvite',data).then((response) => {
                    if(response.data.code === 200) {
                        resolve(response.data);
                    }
                })
            })
        },
        getContract(context){
            return new Promise(function(resolve,reject){
                api.getData('saasContract').then((response) => {
                    if(response.data.code === 200) {
                        resolve(response.data.data);
                    }
                })
            })
        },
        consentContract(content,data){
            return new Promise(function(resolve,reject){
                api.postData('saascConsentContract',data).then((response) => {
                    if(response.data.code === 200) {
                        resolve(response.data.data);
                    }
                })
            })
        }
    }
};
export default invite