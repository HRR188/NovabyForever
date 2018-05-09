/**
 * Created by harryliu on 8/7/17.
 */
import ContactProp from '../components/contactUsPlugin/contactUs.vue'
import store from '../store/store'

let ContactUsPlugin = {
    install:function (Vue) {
        let contactConstrutor = Vue.extend(ContactProp)
        let contactInstance = {}

        Vue.prototype.$contact = function (contactType,id) {
            if(Object.keys(contactInstance).length){
                contactInstance.$el.remove();
                contactInstance = {}
            }
            return new Promise(function (resolve,reject) {
                contactInstance = new contactConstrutor({
                    el:document.createElement('div'),
                    data(){
                        return{
                            type:contactType,
                            id:id
                        }
                    },
                    methods:{
                        closePop(){
                            contactInstance.$el.remove();
                            contactInstance = {};
                            resolve(false)
                        },
                        submit:function () {
                            let data = {
                                content:this.others,
                                title:this.getSelected(),
                                id:this.id
                            }
                            store.dispatch('contact/contactUs',data).then((response) => {
                                console.log(response)
                                if(response.code === 200){
                                    contactInstance.$el.remove();
                                    contactInstance = {};
                                    resolve(true)
                                }
                            })
                        }
                    }
                })
                document.body.appendChild(contactInstance.$el);
            })
        }
    }
}

export default ContactUsPlugin