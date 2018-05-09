import api from '../../../api/api'
const chat = {
    namespaced:true,
    actions:{
        getChat(context,data){
            return new Promise(function(resolve,reject){
                api.getData('saasChat',data).then((response) => {
                    if(response.data.code === 200) {
                        resolve(response.data);
                    }
                })
            })
        },
        senChatContext(context,data){
            return new Promise(function(resolve,reject){
                api.postData('saasSendChat',data).then((response) => {
                    if(response.data.code === 200) {
                        resolve(response.data);
                    }
                })
            })
        },
        createChat(context,data){
            return new Promise(function(resolve,reject){
                api.postData('saasCreateChat',data).then((response) => {
                    if(response.data.code === 200) {
                        resolve(response.data);
                    }
                })
            })
        },
        async getChatUserList(context,data){
            let response = await api.getData('getChatUserList',data);
            return response.data
        },
        async getChatUserHistory(context,data){
            let response = await api.getData('getChatUserHistory',data);
            return response.data
        }
    }
};
export default chat