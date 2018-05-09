/**
 * Created by harryliu on 13/6/17.
 */
import api from '../../../api/api'

const projects = {
    namespaced:true,
    state:{

    },
    mutations:{

    },
    actions:{
        getProjectsHallData(context,data){
            return new Promise(function(resolve,reject){
                api.getData('projectsHall',data).then(function(response){
                    resolve(response.data);
                })
            })
        },
        getMyProjectsData(context,data){
            return new Promise(function(resolve,reject){
                api.getData('myProjects',data).then(function(response){
                    resolve(response.data);
                })
            })
        },
        deleteProject(context,id){
            return new Promise(function(resolve,reject){
                api.postData('deleteProject',id).then(function(response){
                    resolve(response.data);
                })
            })
        }
    }
};
export default projects
