import api from '../../../api/api'
const DICT = {
    state:{
        countryList:[],
        jobList:[],
        fieldList:[],
        citylist:[]
    },
    mutations:{
        saveCountryList(state, country){
            state.countryList = country
        },
        saveCityList(state, city){
            state.citylist = city
        },
        saveJobList(state,job){
            state.jobList = job
        },
        saveFieldList(state,field){
            state.fieldList = field
        }
    },
    actions:{
        companyBasicInfo(){
            return new Promise(function(resolve,reject){
                api.getData('companyBasicInfo').then(function(response){
                    if (response.data.code === 200) {
                        resolve(response.data)
                    }
                })
            })
        },
        countryAc(context){
            return new Promise(function(resolve,reject){
                api.getData('country').then(function(response){
                    if (response.data.code === 200) {
                        context.commit('saveCountryList', response.data.data.country)
                        resolve(response.data)
                    }
                })
            })

        },
        cityAc(context,data){
            return new Promise(function(resolve,reject){
                api.getData('city',data).then(function(response){
                    if(response.data.code === 200) {
                        context.commit('saveCityList', response.data.data.cities);
                        resolve(response.data)
                    }
                })
            })
        },
        jobAc(context){
            api.getData('job').then(function (response) {
                if (response.data.code === 200) {
                    context.commit('saveJobList', response.data.data.job)
                }
            })
        },
        fieldAc(context){
            return new Promise(function(resolve,reject){
                api.getData('field').then(function (response) {
                    if (response.data.code === 200) {
                        resolve(response.data);
                        context.commit('saveFieldList', response.data.data.field)
                    }
                })
            })
        },
        modelAttr (context) {
            return new Promise(function(resolve,reject){
                api.getData('modelAttr').then(function (response) {
                    if(response.data.code === 200) {
                        resolve(response.data)
                    }
                })
            })
        },
        modelFormat:function () {
            return new Promise(function(resolve,reject){
                api.getData('modelFormat').then(function (response) {
                    if(response.data.code === 200) {
                        resolve(response.data)
                    }
                })
            })
        }
    }
};

export default DICT
