import api from '../../../api/api'

const projects = {
    namespaced:true,
    actions:{
        async getProjects(context,type) {
            let data = {
                pagesize:100,
                pages:1,
                type:type
            };
            let response = await api.getData('myProjects',data);
            return response.data
        },
        async removeProject(context,id){
            let data = {
                id
            };
            let response = await api.getData('removeInternalProject',data);
            return response.data
        }
    }
};

export default projects