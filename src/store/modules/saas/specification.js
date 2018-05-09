import api from '../../../api/api'

const specification = {
    namespaced:true,
    actions:{
        async submitSpecification (context,data) {
            let result = await api.postData('saasSubmitSpecification',data);
            return result.data
        },
        async getSpecification (context,data) {
            let result = await api.getData('saasGetSpecification',data);
            return result.data
        }
    }
};

export default specification