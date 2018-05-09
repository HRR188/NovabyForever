import qs from 'qs'
import apiUrl from './config'
import store from '../store/store'
import instance from './instance'

function getLang() {
    return store.state.user.userLanguage || 'en'
}

export default {
    getData:function (url,params) {
        return instance({
            url:apiUrl[url]+'?lang='+getLang(),
            params:params
        })
    },
    postData:function (url,data) {
        return instance({
            method:'post',
            url:apiUrl[url]+'?lang='+getLang(),
            data:qs.stringify(data)
        })
    },
    ossToken(){
        return instance({
            "url":apiUrl.ossToken
        })
    },
    tag(){
        return instance({  //字典 模型标签
            "url":apiUrl.tag
        })
    },
    format(){
        return instance({  //字典 模型格式
            "url":apiUrl.format
        })
    },
    modelDetail(id){
        return instance({
            url:apiUrl.modelDetail+id
        })
    },
    modelReplies(data){
        return instance({
            url:apiUrl.modelReplies,
            params:{
                model:data.model,
                page:data.page,
                pagesize:data.pagesize
            }
        })
    },
    sendReply(data){
        return instance({
            url:apiUrl.sendReply,
            method:'post',
            data:qs.stringify(data)
        })
    }
}
