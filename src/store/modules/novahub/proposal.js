/**
 * Created by harryliu on 19/6/17.
 */
import api from '../../../api/api'

const proposal = {
    namespaced:true,
    state:{
        proposalStep:0,
        aProposal:{},
        aProposalStatus:false
    },
    mutations:{
        setProposalState:function (state,step) {
            state.proposalStep = step
        },
        setAProposal:function (state,po) {
            state.aProposal = po
            if(po.proposalLists.tot === 0) {  // 没有人报价
                state.aProposalStatus = false
            }
            else {  // 有人报价
                state.aProposalStatus = true
            }
        }
    },
    actions:{
        getBProposalStep:function (context,id) {
            let data = {
                id:id
            };
            api.getData('bProposalStep',data).then(function (response) {
                context.commit('setProposalState',response.data.data.state)
            })
        },
        getAProposal:function (context,id) {
            let data = {
                id:id
            };
            api.getData('aProposalStep',data).then(function (response) {
                context.commit('setAProposal',response.data.data.proposal)
            })
        },
        bSubmitPrice:function (context,data) {
            api.postData('bSubmitPrice',data).then(function (response) {
                if(response.data.code === 200){
                    context.commit('setProposalState',1)
                }
            })
        },
        proposalListAc:function(context,data){
            let promise = new Promise(function(resolve,reject){
                api.getData('proposalList',data).then(function (response) {
                    resolve(response.data);
                })
            });
            return promise
        },
        proposalResultsAc:function(context,data){
            let promise = new Promise(function(resolve,reject){
                api.getData('proposalResults',data).then(function (response) {
                    resolve(response.data);
                })
            });
            return promise
        },
        aChooseArtist:function (context,ids) {
            return new Promise(function (resolve,reject) {
                api.postData('aChooseArtist',ids).then(function (response) {
                    if(response.data.code === 200){
                        resolve('ok')
                    }
                })
            })
        },
        payMsgAc(context,data){
            let dataMsg = {
                uid:data.uid,
                pid:data.pid
            };
            return new Promise(function(resolve,reject){
                api.getData('prevContract',dataMsg).then(function (response) {
                    resolve(response.data)
                })
            })
        },
        uploadAttachment(context,data){
            return new Promise(function(resolve,reject){
                api.postData('aUploadFile',data).then(function (response) {
                    resolve(response.data)
                })
            })
        }
    }
};

export default proposal
