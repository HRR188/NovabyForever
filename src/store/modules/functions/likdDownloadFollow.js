/**
 * Created by harryliu on 26/5/17.
 */
import api from '../../../api/api'

const likeDownloadFollow = {
    actions:{
        followUser:function(context,data){
            return new Promise(function(resolve,reject){
                api.postData('followUser',data).then(function(response){
                    if(response.data.code == 200) {
                        resolve(response.data);
                    }
                })
            });
        },
        downloadModel:function (context,id) {
            let data = {
                work_id:id
            };
            return new Promise(function (resolve,reject) {
                api.postData('downloadModel',data).then(function (response) {
                    resolve(response.data.data)
                })
            });
        },
        likeModel:function (context,id) {
            let data ={
                work_id:id
            };
            return  new Promise(function (resolve,reject) {
                api.postData('likeModel',data).then(function (response) {
                    resolve(response.data.data)
                })
            });
        }
    }
};

export default likeDownloadFollow