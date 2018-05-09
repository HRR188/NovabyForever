import api from '../../../api/api'
const requirement = {
    namespaced:true,
    actions:{
        async getRequirement(context,data) {
            let result = await api.getData('saasGetQuote',data);
            return result.data
        }
    }
};
export default requirement