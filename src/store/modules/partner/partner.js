import api from '../../../api/api'
const partner = {
    namespaced:true,
    actions:{
        partnerList(context,data){
            return new Promise(function(resolve,reject){
                api.getData('partnerList',data).then(function(response){
                    resolve(response.data);
                })
            })
        },
        partnerListWorks(context,data){
            return new Promise(function(resolve,reject){
                let page = data.page++;
                let requestData = {
                    id:data.user_id,
                    pagesize:1,
                    page:page
                };
                api.getData('partnerItem',requestData).then(function(response){
                    resolve(response.data);
                })
            })
        }
    }
}

export default partner
