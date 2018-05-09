import api from '../../../api/api'

const checkPermission = {
    namespaced:true,
    actions:{
        async checkInternalPermission(context){
            let result = await api.getData('checkPermission');
            return result.data.code
        },
        async testInternalPermission(context,data){
            let result = await api.postData('testInternalPermission',data);
            return result.data
        }
    }
};

export default checkPermission
