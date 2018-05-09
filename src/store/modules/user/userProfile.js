import api from '../../../api/api'
const userProfile = {
  state:{
      personalInfo:false
  },
  mutations:{
      savePersonalType(state,data){
        state.personalInfo = data
      }
  },
  actions:{
      myDownloadsAc:function(content,data){
          return new Promise(function(resolve,reject){
              api.getData('myDownloads',data).then(function(response){
                  resolve(response.data)
              })
          })
      },
      myUploadsAc:function(content,data){
          return new Promise(function(resolve,reject){
              api.getData('myuploads',data).then(function(response){
                  resolve(response.data)
              })
          })
      },
      deleteMyUploadsAc:function(content,id){
          return new Promise(function(resolve,reject){
              api.postData('deleteModel',id).then(function(response){
                  resolve(response.data)
              })
          })
      },
      pageUsersAc:function(content,data){
          return new Promise(function(resolve,reject){
              api.getData('pageUsers',data).then(function(response){
                  if(response.data.code === 200) {
                      resolve(response.data)
                      content.commit('savePersonalType',response.data.data.user_info)
                  }
              })
          })
      },
      pageFollowersAc:function(content,data){
          return new Promise(function(resolve,reject){
              api.getData('pageFollowers',data).then(function(response){
                  resolve(response.data)
              })
          })
      },
      pageFollowingsAc:function(content,data){
          return new Promise(function(resolve,reject){
              api.getData('pageFollowings',data).then(function(response){
                  resolve(response.data)
              })
          })
      },
      pageUserWorksAc:function(content,data){
          return new Promise(function(resolve,reject){
              api.getData('pageUserWorks',data).then(function(response){
                  resolve(response.data)
              })
          })
      },
      pageLikedWorksAc:function(content,data){
          return new Promise(function(resolve,reject){
              api.getData('pageLikedWorks',data).then(function(response){
                  resolve(response.data)
              })
          })
      },
      redirectRoutegGetUserId(content,data){
          return new Promise(function(resolve,reject){
              api.getData('finduser',data).then(function(response){
                  resolve(response.data)
              })
          })
      },
      userSaveLanguage:function (content,data) {
          return new Promise(function (resolve,reject) {
              api.postData('userSaveLanguage',{lang:data}).then(response => {
                  resolve(response.data)
              })
          })
      }
  }
};

export default userProfile
