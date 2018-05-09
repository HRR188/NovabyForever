/**
 * Created by harryliu on 8/8/17.
 */
import api from '../../../api/api'

const message = {
    namespaced:true,
    state:{
        messages:[]
    },
    getters:{
        systemMsgs:function (state) {
            return state.messages.filter(message => {
                return message.action === 'SYSTEM'
            })
        },
        unreadMsgs:function (state) {
            return state.messages.filter(message => {
                return message.msg_read
            })
        },
        allMsgs:function (state) {
            return state.messages
        }
    },
    mutations:{
        saveMsgs:function (state,data) {
            state.messages = state.messages.concat(data)
            state.messages.sort((a,b) => {
                return b.msg_time - a.msg_time
            })
            let dupList = []
            state.messages.forEach((msg,index) => {
                if(index < state.messages.length-1 && msg.msg_id === state.messages[index+1].msg_id){
                    dupList.push(index)
                }
            })
            dupList.map((id) => {
                state.messages.splice(id,1)
            })
        },
        removeMsg:function (state,id) {
            if(id){
                let index = 0
                for(let i = 0;i < state.messages.length;i++){
                    if(state.messages[i].msg_id === id){
                        index = i
                    }
                }
                state.messages.splice(index,1)
            }
            else{
                state.messages = []
            }
        },
        readMessage:function (state,id) {
            if(id){
                let index = 0
                for(let i = 0;i < state.messages.length;i++){
                    if(state.messages[i].msg_id === id){
                        index = i
                    }
                }
                state.messages[index].msg_read = 0
            }
            else{
                state.messages.forEach(msg => {
                    msg.msg_read = 0
                })
            }
        },
        resterMessage(state){
            state.messages = []
        }
    },
    actions:{
        getMsgs:function (context,type) {
            let data = {
                status:type
            }
            return new Promise((resolve,reject)=>{
                api.getData('messageList',data).then(function(response){
                    if(response.data.code === 200) {
                        context.commit('saveMsgs', response.data.data.messages)
                    }
                    resolve(true)
                })
            })
        },
        removeMsgAc:function (context,id) {
            api.postData('messageDelete',{ids:[id]}).then(function(response){
                if(response.data.code === 200) {
                    context.commit('removeMsg', id)
                }
            })
        },
        readMsgAc:function (context,id) {
            api.postData('messageReading',{ids:[id]}).then(function(response){
                if(response.data.code === 200) {
                    context.commit('readMessage',id)
                }
            })
        }
    }
}

export default message