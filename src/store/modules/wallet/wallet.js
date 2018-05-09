import api from '../../../api/api'

const wallet = {
    namespaced:true,
    actions:{
        withdrawalList(context,data){
            return new Promise(function(resolve,reject){
                api.getData('withdrawHistory',data).then(function(response){
                    resolve(response.data)
                })
            })
        },
        changePayPal(context,data){
            return new Promise(function(resolve,reject){
                api.postData('modifyPaypal',data).then(function(response){
                    resolve(response.data);
                })
            })
        },
        PayPalMessage(){
            return new Promise(function(resolve,reject){
                api.getData('payPalInfo').then(function(response){
                    resolve(response.data);
                })
            })
        },
        withdrawal(context,data){
            return new Promise(function(resolve,reject){
                api.postData('cashWithdrawal',data).then(function(response){
                    resolve(response.data)
                })
            })
        }
    }
};

export default wallet
