import api from '../../../api/api'

const submission = {
    namespaced:true,
    state:{
        finalAttachMsg:{},
        timeStart:5,
        qualityStart:5,
        commucationStart:5,
        failText:'',
        passOrFail:false, // false 是fail true 是pass
        orderResults:true,  // 是否有了结果  true 没有结果  false 有了结果
        timeSeconds:null //七天的倒计时秒数
    },
    mutations:{
        setFileMsg(state,fileMsg){
            state.finalAttachMsg = fileMsg
        },
        setEvaluationMsg(state,message){
            if(message.result !== 0) {
                if(message.result === 2 ) {  //  是通过
                    state.passOrFail = true
                    state.orderResults = false
                }
                else if (message.result === 1 ) { // 是不通过
                    state.passOrFail = false
                    state.orderResults = false
                }
                state.timeStart = message.submission.rate_time;
                state.qualityStart = message.submission.rate_quality;
                state.commucationStart = message.submission.rate_commucation;
                state.failText = message.submission.rate_comment;
            }
            state.timeSeconds = message.time
        },
        setPartyAEvaluationMsg(state,msg){
            state.timeStart = msg.rate_time
            state.qualityStart = msg.rate_quality
            state.commucationStart = msg.rate_commucation
            state.failText = msg.comment
            state.orderResults = false
            if(msg.action === 2) {
                state.passOrFail = false
            }
            else {
                state.passOrFail = true
            }
        }
    },
    actions:{
        getFileAc(context,id){
            let data = {
                id:id
            }
            api.getData('finalAttach',data).then(function (response) {
                context.commit('setFileMsg',response.data.data.attachment)
            })
        },
        auditProjectAc(context,data){
            return new Promise(function(resolve,reject){
                api.postData('submission',data).then(function (response) {
                    resolve(response.data);
                })
            })
        },
        getProgressAc(context,id){
            let data = {
                id:id
            }
            api.getData('checkSubmission',data).then(function (response) {
                context.commit('setEvaluationMsg',response.data.data)
            })
        }
    }
}

export default submission
