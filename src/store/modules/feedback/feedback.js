import api from '../../../api/api'

const feedback = {
    actions:{
        feedbackAc(context,data){
            return new Promise(function(resolve,reject){
                api.postData('feedback',data).then(function(response){
                    resolve(response.data);
                })
            })
        },
    }
};

export default feedback
