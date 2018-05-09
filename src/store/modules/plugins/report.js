/**
 * Created by harryliu on 15/7/17.
 */
import api from '../../../api/api'

function getType(type) {
    if(type === 'comment'){
        return 2
    }
    else{
        return 1
    }
}

const report = {
    namespaced:true,
    state:{
        reportReasons:[]
    },
    mutations:{
        setReportReasons:function (state,list) {
            state.reportReasons = list
        }
    },
    actions:{
        getReportReasons:function (context,type) {
            let rtype = getType(type)

            return new Promise(function (resolve,reject) {
                api.getData('reportGetReason',{type:rtype}).then(function (response) {
                    //context.commit('setReportReasons',response.data.data)
                    let data = response.data.data.data.map(function (da) {
                        da.selected = false
                        return da
                    })
                    resolve(data)
                })
            })
        },
        submitReport:function (context,data) {
            let reason
            reason = {
                type:getType(data.type),
                content:data.content,
                reason:data.reason,
                id:data.id
            }
            return new Promise(function (resolve,reject) {
                api.postData('submitReport',reason).then(function (response) {
                    resolve(response.data.data)
                })
            })
        }
    }
}

export default report