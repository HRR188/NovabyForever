import api from '../../../api/api'
const teamInfo = {
    state:{
        teamNembers:[]
    },
    mutations:{
        saveTeamMembers(state, data){
            state.teamNembers = data
        }
    },
    actions:{
        getTeamInfo:function(content, params) {
            return new Promise(function(resolve,reject) {
                api.getData('getTeamInfo', params).then(function(response) {
                    resolve(response.data)
                    if(response.data.code === 200) {
                        content.commit('saveTeamMembers', response.data.data.team_members)
                    }
                })
            })
        },
        deleteMember: function(content, params) {
            return new Promise(function(resolve,reject) {
                api.getData('deleteMember', params).then(function(response) {
                    resolve(response.data)
                })
            })
        },
        createTeam: function(content, params) {
            return new Promise(function(resolve,reject) {
                api.postData('createTeam', params).then(function(response) {
                    resolve(response.data)
                })
            })
        },
        saveTeam: function(content, params) {
            return new Promise(function(resolve,reject) {
                api.postData('saveTeam', params).then(function(response) {
                    resolve(response.data)
                })
            })
        },
        searchUser: function(content, params) {
            return new Promise(function(resolve,reject) {
                api.postData('searchUser', params).then(function(response) {
                    resolve(response.data)
                })
            })
        },
        inviteMembers: function(content, params) {
            return new Promise(function(resolve,reject) {
                api.postData('inviteMembers', params).then(function(response) {
                    resolve(response.data)
                })
            })
        },
        joinMembers: function(content, params) {
            return new Promise(function(resolve,reject) {
                api.getData('joinMembers', params).then(function(response) {
                    resolve(response.data)
                })
            })
        },
        rejectMembers: function(content, params) {
            return new Promise(function(resolve,reject) {
                api.getData('rejectMembers', params).then(function(response) {
                    resolve(response.data)
                })
            })
        }
    }
};

export default teamInfo
