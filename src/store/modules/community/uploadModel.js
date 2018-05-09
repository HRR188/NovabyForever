import api from '../../../api/api'

const uploadModel = {
    namespaced:true,
    state:{

    },
    mutations:{

    },
    actions:{
        uploadModel(context,data){
            return new Promise((resolve,reject) => {
                api.postData('uploadProject',data).then((response) => {
                    resolve(response.data)
                })
            })
        },
        getModelMessage(context,data){
            return new Promise((resolve,reject) => {
                api.getData('editorModel',data).then((response) => {
                    if (response.data.code === 200) {
                        resolve(response.data)
                    }
                })
            })
        },
        postModelMessage(context,data){
            return new Promise((resolve,reject) => {
                api.postData('createModel',data).then((response) => {
                    if (response.data.code === 200) {
                        resolve(response.data)
                    }
                })
            })
        }
    }
}

export default uploadModel
