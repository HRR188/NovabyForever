/**
 * created  by fred 4/21/2018
 */

import fullScreen from '../components/community/fullScreenSlider.vue';

let fullScreenSliderPlugin = {};

fullScreenSliderPlugin.install = function (Vue) {
    let fullScreenSliderConstructor = Vue.extend(fullScreen);
    let fullScreenSliderInstance = {};
    let _deferred = null;
    Object.defineProperty(Vue.prototype, '$fullScreen', {
        get: function () {
            return (config) => {
                _deferred = new Promise(function (resolve, reject) {
                    fullScreenSliderInstance = new fullScreenSliderConstructor({
                        el: document.createElement('div'),
                        data() {
                            return {
                                slideList: config.slideList,
                                imageIndex: config.imageIndex,
                            };
                        },
                        computed:{
                            btnBoxStatus(){
                                return this.slideList.length > 1;
                            },
                            resultImgList(){
                                let arr = [];
                                if(typeof config.imageIndex === 'undefined'){
                                    this.imageIndex = 0;
                                }
                                this.slideList.forEach((item,index) => {
                                    if( index === this.imageIndex) {
                                        let data = {
                                            url:item,
                                            index:index,
                                            status:true
                                        };
                                        arr.push(data)
                                    } else {
                                        let data = {
                                            url:item,
                                            index:index,
                                            status:false
                                        };
                                        arr.push(data)
                                    }
                                });
                                return arr
                            }
                        },
                        methods: {
                            closeFullScreen() {
                                fullScreenSliderInstance.$el.remove();
                                fullScreenSliderInstance = {};
                                this.$destroy();
                                resolve(true);
                            },
                            prev(){
                                this.modelDetailScroll('prev')
                            },
                            next(){
                                this.modelDetailScroll('next')
                            },
                            modelDetailScroll(action){
                                if(action === 'prev'){
                                    this.resultImgList.forEach((item)=>{
                                        if(item.status === true){
                                            item.status = false;
                                            if(this.imageIndex === 0){
                                                let len = this.slideList.length;
                                                this.imageIndex = len - 1;
                                            }else{
                                                this.imageIndex--;
                                            }
                                        }
                                    })
                                }else{
                                    this.resultImgList.forEach((item)=>{
                                        if(item.status === true){
                                            item.status = false;
                                            if(this.imageIndex === (this.slideList.length-1)){
                                                this.imageIndex = 0;
                                            }else{
                                                this.imageIndex++;
                                            }
                                        }
                                    })
                                }
                            },
                        }
                    });
                    document.body.appendChild(fullScreenSliderInstance.$el);
                });
                return _deferred
            };
        }
    });

};

export default fullScreenSliderPlugin;