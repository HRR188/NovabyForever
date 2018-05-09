/**
 * Created by harryliu on 20/6/17.
 */
import api from '../../../api/api'

const contract = {
    namespaced:true,
    state:{
        contract:{}
    },
    mutations:{
        setContract:function (state,contract) {
            state.contract = contract
        }
    },
    actions:{
        getContract:function (context,id) {
            let data = {
                id:id
            }
            api.getData('aBContract',data).then(function (response) {
                if(response.data.code === 200) {
                    context.commit('setContract',response.data.data.bill)
                }

            })
        },
        getPaypalResult:function (context,id) {
            return new Promise(function (resolve,reject) {
                api.getData('checkPaypalResult',{id:id}).then(function (response) {
                    if(response.data.data.pay_result){
                        resolve(true)
                    }
                    else{
                        resolve(false)
                    }
                })
            })
        }
    }
}

export default contract
