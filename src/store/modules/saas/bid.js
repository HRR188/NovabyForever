import api from '../../../api/api'
const bid = {
    namespaced:true,
    state:{

    },
    mutations:{

    },
    actions:{
        sendBid(context,data){
            return new Promise(function(resolve,reject){
                api.postData('saasBid',data).then((response) => {
                    if(response.data.code === 200) {
                        resolve(response.data);
                    }
                })
            })
        },
        getBidStatus(context,data){
            return new Promise(function(resolve,reject){
                api.getData('saasBidStatus',data).then((response) => {
                    if(response.data.code === 200) {
                        resolve(response.data.data);
                    }
                })
            })
        }
    }
};
export default bid