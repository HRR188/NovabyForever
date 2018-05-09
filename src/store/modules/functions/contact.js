import api from '../../../api/api'

const contact = {
    namespaced:true,
    actions:{
        contactUs(context,data){
            return new Promise(function(resolve,reject){
                api.postData('modelFeedback',data).then(function(response){
                    resolve(response.data);
                })
            })
        },
    }
};

export default contact
