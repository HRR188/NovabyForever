/*
    多语言逻辑，用户设置>浏览器语言>默认语言
    用户语言设置存储在store里面
 */
import store from '../store/store'

let MultiLanguage = {
    _language:'',
    init:function (_languages) {
        this.languages = _languages;
        let defaultLanguage = '';

        /*
        判断是否浏览器
         */
        let isBrowser = false;
        try {
            isBrowser = typeof navigator !== 'undefined'
        }
        catch(e) {}

        /*
        判断浏览器语言是否在语言列表内
         */
        if(isBrowser){
            let lang = navigator.language || navigator.userLanguage;
            defaultLanguage = this.matchLanguage(lang) || this.matchLanguage(lang.substr(0, 2))
        }

        /*
        如果浏览器语言没在语言列表内，使用默认语言
         */
        if(!defaultLanguage){
            defaultLanguage = _languages.default || Object.keys(_languages[0])[0];
        }

        store.commit('setUserLanguage',defaultLanguage)
    },
    relaunchByDirective:function (el, binding, vnode) {
        let lang = store.state.user.userLanguage;

        let hasParams = typeof binding.value !== 'undefined';
        let current, params = [];

        if( hasParams ) {
            params = binding.value;

            if( typeof params !== 'object' ){
                params = [ params ]
            }
        }

        function getLanguage(current) {
            if( !current ){
                return;
            }

            let find = current;

            Object.keys(binding.modifiers).forEach((path) => {
                let f = find[ path.trim() ];
                if( f ){
                    find = f
                }
            });

            return typeof find === 'string' ? find : ''
        }

        if( !vnode.context.$options.messages || !(current = getLanguage(vnode.context.$options.messages[ lang ])) ){
            current = getLanguage(this.languages[ lang ])
        }

        if( !current ) {
            let val = el.innerHTML.trim();
            if( val !== '' ) {
                if ( !vnode.context.$options.messages ){
                    vnode.context.$options.messages = {}
                }

                let optionPath = vnode.context.$options.messages[ lang ];

                if ( !optionPath ){
                    optionPath = vnode.context.$options.messages[ lang ] = {}
                }

                let modifiers = Object.keys(binding.modifiers);

                modifiers.forEach((path, idx) => {
                    if( (idx + 1) === modifiers.length ) {
                        optionPath[path] = {};
                        optionPath = optionPath[path]
                    }
                    else
                        optionPath[path] = val
                });

                current = val
            }
        }

        if( current && hasParams ) {
            Object.keys(params).forEach((path) => {
                current = current.replace(`{${path}}`, params[path])
            })
        }

        el.innerHTML = current
    },
    search:function (current, path, params){
        if(path.indexOf('.') !== -1){
            path = path.split('.')
        }
        else{
            path = [path]
        }

        if( typeof params !== 'object' ){
            params = [ params ]
        }

        let find = current;
        path.forEach( (p) => find = find[ p.trim() ] );

        Object.keys(params).forEach((path) => {
            find = find.replace(`{${path}}`, params[path])
        });

        return find
    },
    matchLanguage:function (lang) {
        let match = '';
        Object.keys(this.languages).forEach((path) => {
            path = path.toLowerCase();
            if(lang.toLowerCase() === path){
                match = path
            }
        });

        return match
    },
    install:function (Vue,languages) {
        this.init(languages);
        let _this = this;
        Vue.mixin({
            computed:{
                language:function () {
                    return store.state.user.userLanguage
                }
            },
            watch:{
                language:function () {
                    this.$forceUpdate()
                }
            },
            methods:{
                translate(path, params = {}) {
                    let result = '';

                    if (this.$options.messages && this.$options.messages[ this.language ]){
                        result = _this.search(this.$options.messages[ this.language ], path, params)
                    }

                    if (!result){
                        result = _this.search(_this.languages[ this.language ], path, params)
                    }
                    return result
                }
            }
        });

        Vue.directive('lang',{
            bind: function (el, binding, vnode) {
                _this.relaunchByDirective(el, binding, vnode)
            },
            componentUpdated: function (el, binding, vnode) {
                _this.relaunchByDirective(el, binding, vnode)
            }
        })
    }
};

export default MultiLanguage