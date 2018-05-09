import api from '../../../api/api'

const building = {
    namespaced:true,
    state:{

    },
    mutations:{

    },
    actions:{
        worksDayAc(context,parameter){
            let data = {
                id:parameter.id,
                time:parameter.time
            };
            return new Promise(function (resolve,reject) {
                api.getData('dayworks',data).then(function (response) {
                    resolve(response.data);
                })
            })
        },
        UploadMsgAc(context,parameter){
            let data = {
                id:parameter.id,
                photos:parameter.photos,
                file:parameter.file,
                final:parameter.isFinal,
                model_id:parameter.model_id,
                zip_id:parameter.zip_id
            };
            // console.log(data)
            return new Promise(function(resolve,reject){
                api.postData('uploadDaily',data).then(function (response) {
                    resolve(response.data);
                })
            })
        },
        submitModelConvertFinish:function (context,data) {
            return new Promise((resolve,reject) => {
                api.postData('submitModelConvertFinish',{pid:data}).then((response) => {
                    if (response.status === 200) {
                        resolve(true)
                    }
                })
            })
        }

    }
}

export default building
