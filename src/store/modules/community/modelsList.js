/**
 * Created by harryliu on 24/5/17.
 */
import api from '../../../api/api'
import lightbox from "../plugins/lightbox";
let columnSize = 3;
let marketHeights = [0, 0, 0];

function dispatchProjects(list) {
    list.sort((a, b) => {
        return b.cover_size.height - a.cover_size.height
    });
    list.forEach((li) => {
        let index = marketHeights.indexOf(Math.min(...marketHeights));
        li.column = index;
        marketHeights[index] += li.cover_size.height
    });
    return list
}

const modelsList = {
    namespaced: true,
    state: {
        marketProjects: [],
        marketPageNumber: 0,
        pageSize: 6,
        marketType: false, //模型列表大小图模式   true大图 false小图
        marketListmaxID:null,
        marketLoading:{
            loadingStatus:true,
            noteText:'No more data',
            noteStatus: false
        }
    },
    getters: {
        marketSmallList(state) {
            let arr = [
                [],
                [],
                []
            ];
            state.marketProjects.forEach((item) => {
                if (item.column === 0) {
                    arr[0].push(item)
                } else if (item.column === 1) {
                    arr[1].push(item)
                } else {
                    arr[2].push(item)
                }
            });
            return arr
        },
        marketBigList(state) {
            return state.marketProjects.filter((item) => {
                return item.whotofollow === 0
            })
        }
    },
    mutations:{
        saveMarketList(state,data){
            state.marketProjects = state.marketProjects.concat(dispatchProjects(data))
        },
        marketPagePlus(state){
            state.marketPageNumber++
        },
        setMarketType(state, type) {
            state.marketType = type
        },
        setMarketLoading(state,status){
            state.marketLoading.noteStatus = status
        },
        saveNewMarketList(state,data){
            state.marketProjects = dispatchProjects(data).concat(state.marketProjects)
        }
    },
    actions:{
        getMarketList(context){
            context.commit('marketPagePlus');
            let data = {
                page:context.state.marketPageNumber,
                pagesize:context.state.pageSize
            };
            return new Promise(function(resolve,reject){
                api.getData('marketList',data).then((response) => {
                    if(response.data.code === 200) {
                        context.commit('saveMarketList',response.data.data.works);
                        if(response.data.data.works.length < context.state.pageSize) {
                            context.commit('setMarketLoading',true)
                        }
                        resolve(response.data);
                    }
                    else {
                        context.commit('setMarketLoading',true)
                    }
                })
            })
        },
        pushMarketList(context){
            context.commit('marketPagePlus');
            let data = {
                page:context.state.marketPageNumber,
                pagesize:context.state.pageSize
            };
            api.getData('marketList',data).then((response) => {
                if(response.data.code === 200) {
                    context.commit('saveMarketList',response.data.data.works);
                    if(response.data.data.works.length < context.state.pageSize) {
                        context.commit('setMarketLoading',true)
                    }
                }
                else {
                    context.commit('setMarketLoading',true)
                }
            })
        },
        getFollowingList(context, data){
            return new Promise(function(resolve,reject){
                api.getData('followingList',data).then((response) => {
                    resolve(response.data);
                })
            })
        },
        getNewMarketNote(context,maxId){
            return new Promise(function(resolve,reject){
                api.getData('newMarketNote',{id:maxId}).then((response) => {
                    resolve(response.data);
                })
            })
        },
        getNewMarketList(context,id){
            return new Promise(function(resolve,reject){
                api.getData('newMarketList',{id:id}).then((response) => {
                    if(response.data.code === 200) {
                        context.commit('saveNewMarketList', response.data.data.works);
                        resolve(response.data);
                    }
                })
            })
        }
    }
};


export default modelsList;