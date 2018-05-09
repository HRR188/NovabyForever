/**
 * created  by fred
 */

// import createNewModelLayer from '../components/createNewModelPlugin/createNewModelLayer.vue';
import createNewModel from '../components/createNewModelPlugin/createNewModel.vue';

let createNewModelLayerPlugin = {};

createNewModelLayerPlugin.install = function (Vue) {
    let createNewModelLayerConstructor = Vue.extend(createNewModel);
    let createNewModelLayerInstance = {};
    let _deferred = null;
    Object.defineProperty(Vue.prototype, '$createNewModel', {
        get: function () {
            return (reupload_work_id) => {
                _deferred = new Promise(function (resolve, reject) {
                    createNewModelLayerInstance = new createNewModelLayerConstructor({
                        el: document.createElement('div'),
                        data() {
                            return {
                                reupload_work_id: reupload_work_id
                            };
                        },
                        methods: {
                            closeModelLayer() {
                                createNewModelLayerInstance.$el.remove();
                                createNewModelLayerInstance = {};
                                this.$destroy();
                                resolve(true);
                            },
                        }
                    });
                    document.body.appendChild(createNewModelLayerInstance.$el);
                });
                return _deferred
            };
        }
    });

};

export default createNewModelLayerPlugin;