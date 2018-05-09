/**
 * Created by harryliu on 14/6/17.
 */
import api from '../../../api/api'


const projectDetail = {
    namespaced:true,
    state:{
        images:[],
        projectHallDetail:{},
        isPrivate:true,  // 是否有权限查看项目  true有权限  false没有
    },
    mutations:{
        setProjectHallData (state,data) {
            console.log(data)
            state.projectHallDetail = data.project;
            //state.images = setImg(data.prj_photos)
            state.images = data.prj_photos
        },
        resterProjectHallData(state,data){
            state.projectHallDetail = {};
            state.images = [];
            state.isPrivate = true
        },
        saveIsPrivate(state,data){
            state.isPrivate = data
        },
        applySuccess(state) {
            state.projectHallDetail.status = 1
        }
    },
    actions:{
        getProjectDetail:function (context,id) {
            let data = {
                id:id
            };
            api.getData('projectHallDetail',data).then(function (response) {
                if(response.data.code === 200) {  //有权限查看
                    context.commit('setProjectHallData',response.data.data.detail);
                    context.commit('saveIsPrivate',true)
                }
                else if(response.data.code === -10) {  //没有权限查看
                    context.commit('saveIsPrivate',false)
                }
            })
        },
        projectApply:function (context,id) {
            return new Promise((resolve,reject)=>{
                api.getData('projectApply',{id}).then(response => {
                    resolve(response.data)
                })
            })
        }
    }
};

export default projectDetail
