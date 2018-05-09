import api from '../../../api/api'
const task = {
    namespaced:true,
    state:{
        modelNameList:[],
        modelDetails:'',
        uploadModelId:0,
        feedbackList:[],
        feedBackStatus:false,
        historyList:[],
        isOver:false, //项目是否已经结束 false没有  true 是
        isToggle:true,
        modelIsStart:false
    },
    mutations:{
        updataToggle(state,status){
            state.isToggle = status
        },
        setFeedBackStatus(state,status){
            state.feedBackStatus = status
        },
        saveModelNameList(state,data){
            let arr = [];
            data.forEach((item,index) => {
                index ? item.status = false : item.status = true;
                arr.push(item)
            });
            state.modelNameList = arr;
        },
        setModelStatus(state,index){
            state.modelNameList.forEach((item) => {
                item.status = false
            });
            state.modelNameList[index].status = true
        },
        setModelListStatus(state,data){
            state.modelNameList[data.index].bd_pub = data.status
        },
        saveModelDetails(state,data){
            state.modelDetails = data;
            if(data) {  //只有当有模型相关数据的时候才去保存数据
                state.modelDetails.time = new Date(data.submitted_time*1000).toTimeString();
                state.feedbackList = data.marks
            }
            else {
                state.feedbackList = []
            }
        },
        setStatusPublish(state,num){
            state.modelDetails.bd_pub = num
        },
        setUploadModelId(state,id){
            state.uploadModelId = id
        },
        setModelDetailsStatus(state,status){
            if(state.modelDetails) {
                state.modelDetails.bd_pub = status
            }
            else {
                state.modelDetails = {};
                state.modelDetails.bd_pub = status
            }
            state.modelNameList.forEach((item) => {
                if(item.bd_id === state.uploadModelId) {
                    item.bd_pub = status
                }
            })
        },
        setFeedBackItem(state,data){
            state.feedbackList[data.index].status = data.status;
            state.feedbackList[data.index].pics[2].src = `https://element2.oss-cn-shanghai.aliyuncs.com/${data.url}`
        },
        setFeedBackDes(state,data){
            state.feedbackList[data.index].description = data.description
        },
        setPassOrFailStatus(state,data){
            state.feedbackList[data.index].status = data.status
        },
        saveHistory(state,data){
            state.historyList = data;
            data.list.forEach((item,index) => {
                let newDate = new Date(item.create_time*1000);
                item.time = `${newDate.toLocaleDateString()} ${newDate.toTimeString()}`
            })
        },
        saveAaccept(state,data){
            state.modelNameList.forEach((item) => {
                if(item.bd_id === data.id) {
                    item.bd_pub = 5;
                    state.modelDetails.accept = 0
                }
            })
        },
        saveProStatus(state,status){
            state.isOver = status
        },
        setModelIsStart:function (state,status) {
            state.modelIsStart = status
        },
        clearTask:function (state) {
            state.modelNameList = []
            state.modelDetails = ''
            state.uploadModelId = 0
            state.feedbackList = []
            state.feedBackStatus = false
            state.historyList = []
            state.isOver = false //项目是否已经结束 false没有  true 是
            state.isToggle = true
            state.modelIsStart = false
        }
    },
    actions:{
        checkProjectStart:function (context,id) {
            return new Promise((resolve,reject)=>{
                api.getData('saasCheckProjectStart',{id:id}).then(response => {
                    context.commit('setModelIsStart',response.data.data.status)
                })
            })
        },
        async getList(context,id) {
            let response = await api.postData('saasModelList',{id});
            return response.data
        },
        getModelDetails(context,id){
            return new Promise((resolve,reject) => {
                api.getData('saasModelDetails',{id}).then((response) => {
                    // context.commit('setUploadModelId',data.id);
                    if(response.data.code === 200) {
                        // context.commit('saveModelDetails',response.data.data.work)
                        resolve(response.data.data.work)
                    }
                })
            })
        },
        modelPublish(context,data){
            return new Promise((resolve,reject) => {
                api.postData('taskPublish',data).then((response) => {
                    if(response.data.code === 200) {
                        // context.commit('setStatusPublish',4)
                        resolve(response.data.data)
                    }
                })
            })

        },
        taskPartyBSubmit(context,data) {
            return new Promise((resolve,reject) => {
                api.postData('taskPartyBSubmit',data).then((response) => {
                    if(response.data.code) {
                        // context.commit('setModelDetailsStatus',1)
                        resolve(response.data.data)
                    }
                })
            })

        },
        saveUploadImg(context,data){
            return new Promise(function(resolve,reject){
                api.postData('buildingFeedBackModify',data).then(function (response) {
                    resolve(response.data);
                })
            })
        },
        passOrFail(context,data){
            return new Promise(function(resolve,reject){
                api.postData('buildingFeedBackChecked',data).then(function (response) {
                    resolve(response.data);
                })
            })
        },
        getHistory(context,id){
            return new Promise((resolve,reject)=>{
                api.getData('buildingFeedBackHistory',{mid:id}).then(function(response){
                    if(response.data.code === 200) {
                        resolve(response.data.data)
                    }
                })
            })
        },
        partyAaccept(context,data){
            return new Promise(function(resolve,reject){
                api.postData('taskModelAccept',data).then(function (response) {
                    if(response.data.code === 200) {
                        resolve(response.data);
                    }
                })
            })
        },
        getProjectStatus(context,data){
            api.getData('saasOverProject',data).then((response) => {
                if(response.data.code === 200) {
                    context.commit('saveProStatus',response.data.data.status)
                }
            })
        },
        partyAFailPro(context,data){
            return new Promise(function(resolve,reject){
                api.postData('sassPartyAFail',data).then(function (response) {
                    resolve(response.data);
                })
            })
        },
        getTimeMsg(context,id){
            let proId = {
                id:id
            };
            return new Promise((resolve,reject) => {
                api.getData('calendarData',proId).then(function (response) {
                    if(response.data.code === 200) {
                        resolve(response.data.data.data)
                    }
                })
            })
        }
    }
};
export default task