import api from '../../../api/api'
const result = {
    namespaced:true,
    actions:{
        async getResult(context,data) {
            let result = await api.getData('checkSubmission',data);
            return result.data;
        },
        async submitResult(context,data){
            let result = await api.postData('submission',data);
            return result.data.data.bill;
        },
        async markFail(context,data){
            let result = await api.postData('saasMarkFail',data);
            return result.data;
        }
    }
};
export default result