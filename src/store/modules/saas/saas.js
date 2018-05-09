import api from '../../../api/api'
import task from './task'
import projects from './projects'
import result from './result'
import invite from './invite'
import bid from './bid'
import specification from './specification'
import chat from './chat'
import nda from './nda'
import project from './project'
import releaseQuote from './releaseQuote'
import requirement from './requirement'
import projectSetting from './projectSetting'
import feedback from './feedback'

const saas = {
    namespaced:true,
    modules:{
        task,
        projects,
        result,
        invite,
        bid,
        specification,
        chat,
        nda,
        project,
        releaseQuote,
        requirement,
        projectSetting,
        feedback
    },
    state:{
        party:'', //区分出甲方还是乙方 'A','B,
        step:0, //当前项目的进度0：未开始；1:项目开始；2：项目结束
    },
    mutations:{
        setUserBaseData:function (state,data) {
            state.party = data.role;
            state.step = data.project_status
        }
    },
    actions:{
        markAsRead:function (context,data) {
            api.getData('saasMarkProjectAsRead',{id:data})
        },
        getUserBaseData:function (context,id) {
            let data = {id:id}
            return new Promise((resolve,reject) => {
                api.getData('saasGetUserBaseData',data).then(response => {
                    context.commit('setUserBaseData',response.data.data)
                    resolve(response)
                })
            })
        },
        getPayment(context,data){
            return new Promise(function(resolve,reject){
                api.getData('saasPayment',data).then((response) => {
                    if(response.data.code === 200) {
                        resolve(response.data.data.bill);
                    }
                })
            })
        },
        help(context,data){
            return new Promise(function(resolve,reject){
                api.postData('saasHelp',data).then((response) => {
                    if(response.data.code === 200) {
                        resolve(response.data);
                    }
                })
            })
        }
    }
};

export default saas