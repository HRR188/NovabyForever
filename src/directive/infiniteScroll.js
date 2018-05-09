/*无限下拉刷新指令
* 修改信息:4/18/2018 FredChen
* 使用标签:v-infinite-scroll加载需要下拉刷新的数据
* 使用标签:infinite-scroll-disabled判断是否需要加执行载函数
* 使用标签:infinite-scroll-distance一次下拉刷新该html元素与视窗底部的距离,默认为0
* */
//获取滚动条的位置
const getScrollTop = function (e) {
    if (e === window) {return Math.max(window.pageYOffset || 0, document.documentElement.scrollTop)}
    return e.scrollTop;
};
//获取视窗高度
const getVisibleHeight = function (e) {
    if (e === window) {return document.documentElement.clientHeight}
    return e.clientHeight;
};
//获得页面中某个元素的左,上,右和下分别相对浏览器视窗的位置
const getElementTop = function (e) {
    if (e === window) {return getScrollTop(window)}
    return e.getBoundingClientRect().top + getScrollTop(window);
};
//下拉速率限制
const scrollSpeedLimit = (fn, delay) => {
    let now, lastExecute, timer, args;
    let execute = () => {fn(...args);lastExecute = now};
    return ()=>{
        args = arguments;
        now = Date.now();
        timer ? clearTimeout(timer) : null;
        lastExecute? (delay - (now - lastExecute) < 0? execute(): timer = setTimeout(() => {execute()}, delay - (now - lastExecute))):execute();
    };
};
const initBindInfiniteScroll = function () {
    if (this.binded) return;
    this.binded = true;
    let directive = this;
    directive.scrollSpeedDelay = 200;  //加载一次延迟时间ms
    directive.scrollEventTarget = window;//下拉滚动默认事件对象为window
    directive.scrollListener = scrollSpeedLimit(canContinueInfiniteScroll.bind(directive), directive.scrollSpeedDelay);
    directive.scrollEventTarget.addEventListener('scroll', directive.scrollListener);
    //实例销毁前必须解除此监听绑定
    this.vm.$on('hook:beforeDestroy', function () {
        directive.scrollEventTarget.removeEventListener('scroll', directive.scrollListener);
    });
    //是否阻止执行加载函数
    let disabled = false;
    let isDisabled= this.el.getAttribute('infinite-scroll-disabled');
    if (isDisabled) {
        this.vm.$watch(isDisabled, function (value) {directive.disabled = value});
        disabled = Boolean(directive.vm[isDisabled]);
    }
    directive.disabled = disabled;
    //元素与视窗底部的距离
    let distance = 0;
    let isDistance = this.el.getAttribute('infinite-scroll-distance');
    if (isDistance) {
        distance = Number(directive.vm[isDistance] || isDistance);
        if (isNaN(distance)) {distance = 0}
    }
    directive.distance = distance;
    canContinueInfiniteScroll.call(directive);
};
//判断是否可以继续下拉刷新
const canContinueInfiniteScroll = function () {
    let scrollEventTarget = this.scrollEventTarget;
    let distance = this.distance;
    let viewportBottom = getScrollTop(scrollEventTarget) + getVisibleHeight(scrollEventTarget);
    let shouldTrigger = false;
    if (scrollEventTarget === this.el) {
        shouldTrigger = scrollEventTarget.scrollHeight - viewportBottom <= distance;
    } else {
        let eventToBottom = getElementTop(this.el) - getElementTop(scrollEventTarget) + this.el.offsetHeight + getScrollTop(scrollEventTarget);
        shouldTrigger = viewportBottom + distance >= eventToBottom;
    }
    if (shouldTrigger && this.expression) {
        this.expression();
    }
};
const InfiniteScroll = {
    install(Vue){
        Vue.directive('InfiniteScroll', {
            bind(el, binding, vnode) {
                el = {
                    el,
                    vm: vnode.context,
                    expression: binding.value
                };
                let args = arguments;
                el.vm.$on('hook:mounted',()=>{
                    el.vm.$nextTick(function () {
                        initBindInfiniteScroll.call(el, args);
                        el.bindTryCount = 0;
                        let tryBind = ()=>{
                            if (el.bindTryCount > 10) return;
                            el.bindTryCount++;
                            initBindInfiniteScroll.call(el, args);
                        };
                        tryBind();
                    });
                });
            },
        })
    }
};
export default InfiniteScroll
 