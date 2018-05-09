/**
 * Created by harryliu on 8/7/17.
 */
import addNewProject from 'Saas/components/addNewProject/addNewProject.vue'
import store from '../store/store'

let AddNewProjectPlugin = {
    install:function (Vue) {
        let addNewProjectConstrutor = Vue.extend(addNewProject)
        let addNewProjectInstance = {}

        Vue.prototype.$addNewProject = function () {
            if(Object.keys(addNewProjectInstance).length){
                addNewProjectInstance.$el.remove();
                addNewProjectInstance = {}
            }
            return new Promise(function (resolve,reject) {
                addNewProjectInstance = new addNewProjectConstrutor({
                    el:document.createElement('div'),
                    data(){
                        return{
                            title:'Get free quotes'
                        }
                    },
                    methods:{
                        closePop(){
                            addNewProjectInstance.$el.remove();
                            addNewProjectInstance = {};
                            resolve(0)
                        },
                        createProject:function () {
                            if(this.creatable){
                                let categorys = []
                                if(this.industry === 43){
                                    categorys = this.getCategoryId(this.$refs.projectCategory.selectedValue,this.gameCategory)
                                }
                                else{
                                    categorys = this.getCategoryId(this.$refs.projectCategory.selectedValue,this.category)
                                }

                                // let range = this.rangeString.indexOf(this.$refs.projectRange.selectedValue)?3:1
                                let range = 3
                                let data = {
                                    name:this.projectName,
                                    industry:this.industry,
                                    categorys:categorys,
                                    tags:this.tags,
                                    permission:range,
                                    type:this.projectType
                                }
                                store.dispatch('novahub/releaseQuotes/submitProject',data).then(response => {
                                    if(response.code === 200){
                                        addNewProjectInstance.$el.remove();
                                        addNewProjectInstance = {};
                                        resolve(response.data.prj_id)
                                    }
                                })
                            }
                        },
                    }
                })
                document.body.appendChild(addNewProjectInstance.$el);
            })
        }
    }
}

export default AddNewProjectPlugin