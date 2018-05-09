import api from '../../../api/api'

const RECOMMEND = {
  actions:{
    getRecommendlist:function(context){
      let promise = new Promise(function (resolve,reject) {
          api.getData('recommend').then(function (response) {
            if (response.data.code === 200) {
              let list = [];
              response.data.data.users.forEach(function(item,index){
                list.push(item)
              });
              resolve(list)
            }
          })
      });
      return promise
    }
  }
};

export default RECOMMEND
