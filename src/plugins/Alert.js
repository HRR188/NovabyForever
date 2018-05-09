/**
 * Created by harryliu on 14/5/17.
 */
import Alert from '../components/alertPlugin/alert.vue'

let AlertPlugin = {};
AlertPlugin.install = function(Vue) {
    let AlertConstructor = Vue.extend(Alert);
    let alertInstance = null;
    let _deferred = null;

    Object.defineProperty(Vue.prototype, '$alert', {
        get: function() {
            return (config) => {
                if (alertInstance) return;
                _deferred = new Promise(function(resolve, reject) {
                    alertInstance = new AlertConstructor({
                        el: document.createElement('div'),
                        data() {
                            return {
                                type: config.type,
                                message: config.message,
                                confirmTxt: config.confirmTxt || 'Yes',
                                cancelTxt: config.cancelTxt || 'No',
                                redMsg:config.redMsg || ''
                            };
                        },
                        methods: {
                            confirm() {
                                alertInstance.$el.remove();
                                alertInstance = null;
                                resolve({ data: 'confirm' })
                                this.$destroy();
                            },
                            cancel() {
                                alertInstance.$el.remove();
                                alertInstance = null;
                                resolve({ data: 'cancel' })
                                this.$destroy();
                            }
                        }
                    });
                    document.body.appendChild(alertInstance.$el);
                });
                return _deferred
            };
        }
    });
};

export default AlertPlugin;