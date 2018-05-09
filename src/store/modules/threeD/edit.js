/**
 * Created by harryliu on 24/8/17.
 */
import api from '../../../api/api'

const edit = {
    namespaced:true,
    actions:{
        saveEdit:function (context,data) {
            return new Promise((resolve,reject) => {
                api.postData('editModel',{id:data.id,data:JSON.stringify(data.data)}).then(response => {
                    if(response.data.code === 200){
                        resolve(true)
                    }
                })
            })
        }
    }
};

export default edit