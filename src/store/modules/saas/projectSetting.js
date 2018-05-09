import api from '../../../api/api'

const projectSetting = {
    namespaced:true,
    actions:{
        async getProjectSetting(context,data) {
            let response = await api.getData('saasGetProjectInfo',data);
            return response.data
        },
        async saveProjectSetting(context,data){
            let response = await api.postData('saasSaveProjectInfo',data);
            return response.data
        },
        async inviteMembers(context,data){
            let response = await api.postData('saasInviteMembers',data);
            return response.data
        },
        async getTeamMembers(context,data){
            let response = await api.getData('getTeamMembers',data);
            return response.data
        },
        async importMembers(context,data){
            let response = await api.postData('saasImportMembers',data);
            return response.data
        },
        async getMembers(context,data){
            let response = await api.getData('saasGetMembers',data);
            return response.data
        },
        async removeMembers(context,data){
            let response = await api.postData('saasRemoveMember',data);
            return response.data
        },
        async saveMembers(context,data){
            let response = await api.postData('saasSaveMember',data);
            return response.data
        }
    }
};

export default projectSetting