import api from '../../../api/api'
const qiNiu = {
    namespaced:true,
    actions:{
        async getQiNiuToken() {
            let response = await api.getData('getQiNiuToken');
            return response.data
        }
    }
};
export default qiNiu