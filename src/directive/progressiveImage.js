let progressive = {
    install:function (Vue, Opt = {}) {
        Vue.directive('progressive', {
            bind: function(el, binding) {
                let userAgent = window.navigator.userAgent;
                if(!(userAgent.indexOf("Chrome") > -1)) { // chrome下使用webp图片
                    let argMsg = binding.arg.split('_');
                    if (argMsg[0] === 'img') {
                        let str = el.src;
                        let replaceStr = str.replace(/q_10/, `q_${argMsg[1]}`);
                        let imgObj = new Image();
                        imgObj.src = replaceStr;
                        imgObj.onload = function() {
                            el.src = replaceStr
                        }
                    }
                }
            }
        })
    }
};
export default progressive