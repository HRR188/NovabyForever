import api from "../../../api/api";

const project = {
    namespaced:true,
    actions:{
        async createProject(context,data){
            let result = await api.postData('createProject',data);
            if(result.data.code === 200){
                return result.data.data
            }
            else {
                //todo:add error tips
                return false
            }
        }
    }
};

export default project