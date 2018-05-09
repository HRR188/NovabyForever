import api from '../../../api/api'
const nda = {
    namespaced:true,
    actions:{
        getNda:function (context,id) {
            return new Promise((resolve,reject) =>{
                api.getData('sassGetNda',{id:id}).then(response => {
                    resolve(response.data.data)
                })
            })
        },
        setNda:function (context,pr) {
            let data = {
                id:pr.id,
                act:pr.isAgree,
                code:pr.code
            }
            return new Promise((resolve,reject) => {
                api.postData('sassSetNda',data).then(response => {
                    resolve(response.data.data)
                })
            })
        }
    }
}

export default nda