import apiUrl from '../../../api/config'

const paypal = {
    namespaced:true,
    mutations:{
        openPayPalWindow(state,data) {
            // window.open(apiUrl.paypal+'?token='+localStorage.getItem('token')+'&id='+data.proposalId+'&b_id='+data.selectedId,'__blank')
            window.location.href = apiUrl.paypal+'?token='+localStorage.getItem('token')+'&id='+data.proposalId+'&b_id='+data.selectedId
        },
        servicePay(state,data){
            window.open(apiUrl.planBuy+'?token='+localStorage.getItem('token')+'&plan_id='+data.plan_id+'&month='+data.month,'__blank')
        }
    },
    actions:{
    }
};

export default paypal