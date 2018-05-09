import api from '../../../api/api'

const SEARCH = {
    namespaced: true,
    state:{
        searchMessage:'',
        searchType:[
            {
                status:false,
                text:'user'
            },
            {
                status:false,
                text:'model'
            }
        ],
        userList:[],
        modelsList:[],
        userNum:'',
        userPageNum:0,
        modelNum:'',
        modelPageNum:0
    },
    mutations:{
        saveSearch(state, text){
            state.searchMessage = text
        },
        saveSearchType(state,index){
            state.searchType.forEach((item) => {
                item.status = false
            });
            state.searchType[index].status = true
        },
        saveUserList(state,data){
            state.userList = data
        },
        saveModelsList(state,data){
            state.modelsList = data
        },
        saveNum(state,data){
            if(data.type === 'user') {
                state.userNum = data.num
            }
            else {
                state.modelNum = data.num
            }
        },
        savePage(stata,data){
            if(data.type === 'user') {
                stata.userPageNum = data.num
            }
            else {
                stata.modelPageNum = data.num
            }
        }
    },
    actions:{
        search(context,data){
            return new Promise(function(resolve,reject){
                api.getData('search',data).then(function(response){
                    resolve(response.data);
                    if(data.act === 'user') {  //如果搜索的是user
                        // console.log(response.data.data)
                        context.commit('saveNum',{type:'user',num:response.data.data.count});
                        context.commit('saveUserList',response.data.data.data);
                        context.commit('savePage',{type:'user',num:response.data.data.page_count})
                    }
                    else {  // 如果搜索的是model
                        // console.log(response.data.data)
                        context.commit('saveNum',{type:'model',num:response.data.data.count});
                        context.commit('saveModelsList',response.data.data.data);
                        context.commit('savePage',{type:'model',num:response.data.data.page_count})
                    }
                })
            });
        },
        getRecommend(context,data){
            return  new Promise(function(resolve,reject){
                api.getData('recommendMsg',data).then(function(response){
                    resolve(response.data);
                })
            });
        },
        guessLikeUserAc(context,data){
            let parameter = {
                size:data
            };
            return new Promise(function(resolve,reject){
                api.getData('guessLikeUser',parameter).then(function(response){
                    resolve(response.data);
                })
            });
        },
        getUserFilter(context){
            return new Promise(function(resolve,reject){
                api.getData('searchUserFilter').then((response) => {
                    resolve(response.data);
                })
            })
        },
        getModelFilter(context){
            return new Promise(function(resolve,reject){
                api.getData('searchModelFilter').then((response) => {
                    resolve(response.data);
                })
            })
        },

    }
};

export default SEARCH
