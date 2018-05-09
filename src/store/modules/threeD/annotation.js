/**
 * Created by harryliu on 27/7/17.
 */
import api from '../../../api/api'

const annotation = {
    namespaced:true,
    state:{
        modelFile:{},
        getModel:false
    },
    mutations:{
        setModelFile:function (state,data) {
            state.modelFile = data;
            state.getModel = true
        }
    },
    actions:{
        async getAnnotationModelData(context,{id,type}) {
            let result = await api.getData('getAnnotationModelData',{id,type});
            if(type){
                context.commit('setModelFile',result.data.data.model);
            }
            else{
                return result.data
            }
        },
        uploadAnnotationList(context,data){
            let dataList = [];
            data.list.forEach(function (an) {
                dataList.push({
                    title:an.title,
                    image:an.image,
                    attachment:an.attachment,
                    desc:an.desc
                })
            });
            return new Promise(function (resolve,reject) {
                api.postData('uploadAnnotationList',{pid:data.id,mark:dataList}).then((response) => {
                    if(response.status === 200){
                        resolve(true)
                    }
                })
            })
        }
    }
};

export default annotation