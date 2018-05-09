/**
 * Created by harryliu on 8/7/17.
 */
import ReportPop from '../components/reportPlugin/Report.vue'
import store from '../store/store'

let ReportPlugin = {
    install:function (Vue) {
        let reportConstrutor = Vue.extend(ReportPop)
        let reportInstance = {}

        Vue.prototype.$report = function (reportType,id) {
            if(Object.keys(reportInstance).length){
                reportInstance.$el.remove();
                reportInstance = {}
            }
            return new Promise(function (resolve,reject) {
                reportInstance = new reportConstrutor({
                    el:document.createElement('div'),
                    data(){
                        return{
                            type:reportType,
                            id:id
                        }
                    },
                    methods:{
                        closePop(){
                            reportInstance.$el.remove();
                            reportInstance = {};
                            resolve(false)
                        },
                        submit:function () {
                            let data = {
                                type:this.type,
                                content:this.others,
                                reason:this.getSelected(),
                                id:this.id
                            }
                            store.dispatch('report/submitReport',data).then((response) => {
                                if(response.mag === 'report successful!'){
                                    reportInstance.$el.remove();
                                    reportInstance = {};
                                    resolve(true)
                                }
                            })
                        }
                    }
                })
                document.body.appendChild(reportInstance.$el);
            })
        }
    }
}

export default ReportPlugin