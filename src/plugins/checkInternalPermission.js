/**
 * Created by harryliu on 14/5/17.
 */
import checkPermission from '../components/checkInternalPermission/checkInternalPermission.vue'
import store from '../store/store'

let checkInternalPermission = {};
checkInternalPermission.install = function(Vue) {
    let checkConstructor = Vue.extend(checkPermission);
    let checkInstance = null;
    let _deferred = null;

    Object.defineProperty(Vue.prototype, '$checkInternalPermission', {
        get: function() {
            return () => {
                if (checkInstance) return;
                _deferred = new Promise(function(resolve, reject) {
                    checkInstance = new checkConstructor({
                        el: document.createElement('div'),
                        data(){
                            return{
                                alertMsg:'',
                                keyChain:''
                            }
                        },
                        watch:{
                            keyChain() {
                                this.alertMsg = ''
                            }
                        },
                        methods: {
                            async confirm() {
                                if(this.keyChain.length){
                                    let result = await store.dispatch('checkPermission/testInternalPermission',{
                                        key:this.keyChain
                                    });
                                    if(result.code === 200){
                                        checkInstance.$el.remove();
                                        checkInstance = null;
                                        resolve({ data: 'confirm' })
                                    }
                                    else{
                                        this.alertMsg = result.msg
                                    }
                                }
                                else{
                                    this.alertMsg = 'please input the key chain'
                                }

                            },
                            cancel() {
                                checkInstance.$el.remove();
                                checkInstance = null;
                                resolve({ data: 'cancel' })
                            }
                        }
                    });
                    document.body.appendChild(checkInstance.$el);
                });
                return _deferred
            };
        }
    });
};

export default checkInternalPermission;