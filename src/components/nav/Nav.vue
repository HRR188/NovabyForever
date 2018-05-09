<template>
    <nav class="w-p-1 nav-warp clearfix position-fixed">
        <div class="logo float-left">
            <router-link to="/home">
                <img src="../../assets/images/logo.png" alt="">
            </router-link>
        </div>
        <template v-if="!openSearch">
            <ul class="nav float-left">
                <li>
                    <router-link :to="{name:'saasHome'}" class="cap">{{translate('novahub')}}</router-link>
                </li>
                <li>
                    <router-link :to="{name:'marketList'}" class="cap">{{translate('models')}}</router-link>
                </li>
                <li>
                    <router-link :to="{name:'biddingGallery'}" class="cap">{{translate('projects')}}</router-link>
                </li>
                <li>
                    <router-link to="/partner" class="cap">{{translate('partners')}}</router-link>
                </li>
                <!--<li>-->
                    <!--<router-link :to="{name:'homeGuide'}" class="cap">{{translate('guide')}}</router-link>-->
                <!--</li>-->
                <li class="quick">
                    <a @click="releaseQuotes" class="pointer" v-lang.freeQuotes></a>
                </li>
            </ul>
            <!--已登陆 start-->
            <div v-if="loginStatus" class="yes-login float-right">
                <msg></msg>
                <div class="alert-msg" v-if="userAlert && userAlert.message">
                    <router-link :to="{name:userAlert.action,params:userAlert.params}">
                        <img class="pointer" @click="goAlert" src="../../assets/images/icon_alert_msg.png" alt="">
                    </router-link>
                    <div class="msg">
                        <p >{{userAlert.message}}</p>
                    </div>
                </div>
                <user></user>
            </div>
            <!--已登陆 end-->
            <!--未登录 start-->
            <div v-else class="no-login float-right" id="no-login">
                <!-- <a href="#" class="shop-car float-left"></a> -->
                <ul>
                    <li>
                        <span @click="signInPop" v-lang.signIn></span>
                    </li>
                    <li class="position-relative">
                        <span @click="sinUpPop" v-lang.signUp></span>
                        <!--<div class="position-absolute" v-show="signUpStatus">-->
                            <!--<p @click="linkToSignUp" v-lang.ca></p>-->
                            <!--<p @click="linkToCreatedBusiness" v-lang.cb></p>-->
                        <!--</div>-->
                    </li>
                </ul>
            </div>
            <!--未登录 end-->
            <div class="search-btn pointer" @click="openSearch = true">
                <img src="../../assets/images/icon_search.png" alt="">
            </div>
        </template>

        <!--搜索 start-->
        <div class="search-warp float-right position-relative" v-else>
            <div class="type-btn pointer" @click="chooseType = !chooseType">
                <img src="../../assets/images/icon_search.png" alt="">
                <div></div>
            </div>
            <input type="text" :placeholder="translate('search')" v-model="navSearchMsg" @keyup.enter="search"/>
            <ul class="position-absolute" v-show="chooseType">
                <li :class="{active:item.status}" v-for="(item,index) in searchType" @click="saveSearchType(index)">{{item.text}}</li>
            </ul>
            <div @click.stop="openSearch = false">
                <img src="../../assets/images/icon-close-white.png" alt="" class="pointer">
            </div>
        </div>
        <!--搜索 end-->
        <div class="mask" v-if="openSearch" @click.stop="openSearch = false"></div>
    </nav>
</template>

<script>
    import user from './user/user'
    import msg from './msg/msg'
    import { mapState,mapGetters,mapMutations,mapActions } from 'vuex'
    export default {
        name: 'Nav',
        data: function () {
            return {
                chooseType:false,
                signUpStatus:false,
                openSearch:false
            }
        },
        messages:{
            en:{
                ca:'Create an account',
                cb:'Create business account'
            },
            zh:{
                ca:'创建新用户',
                cb:'创建商业用户'
            }
        },
        components:{
            user,
            msg
        },
        computed: {
            navSearchMsg:{
                get(){
                    return this.$store.state.search.searchMessage
                },
                set(val){
                    this.$store.commit('search/saveSearch',val)
                }
            },
            loginStatus(){
                return this.$store.state.user.loginStatus
            },
            searchType(){
                const language = this.language
                let searchType = this.$store.state.search.searchType
                if(language === 'zh') {
                    searchType[0].text = '用户'
                    searchType[1].text = '模型'
                    return searchType
                }
                else {
                    return searchType
                }
            },
            userAlert(){
                return this.$store.state.user.userAlert
            }
        },
        watch:{
            language:function () {
                this.getMsgs(1)
            }
        },
        created(){
            // 轮询监听消息
            this.listenNewMsg();
        },
        methods:{
            ...mapActions('message',[
                'getMsgs','removeMsgAc','readMsgAc'
            ]),
            releaseQuotes () {
                let vm = this;
                if(!vm.$store.state.user.loginStatus) {
                    vm.$logPop().then(function (response) {
                        if(response) {
                            vm.addNew()
                        }
                    })
                }
                else{
                    vm.addNew()
                }
            },
            addNew:function () {
                this.$router.push({name:'chooseProjectType'})
            },
            signInPop () {
                this.$logPop()
            },
            sinUpPop () {
                this.$logPop(true)
            },
            search(){
                if(this.navSearchMsg !== '') {
                    this.openSearch = false
                    this.$router.push({name:'search'})
                }
            },
            saveSearchType(index){
                this.$store.commit('search/saveSearchType',index);
                this.chooseType = false
            },
            linkToSignUp(){
                this.signUpStatus = false;
                this.$router.push({name:'signUp'})
            },
            linkToCreatedBusiness(){
                this.signUpStatus = false;
                this.$router.push({name:'joinBusinessOne'})
            },
            listenNewMsg(){
                let token = localStorage.getItem("token");

                if (token) {
                    this.getMsgs(1);
                }

                setTimeout(this.listenNewMsg, 10000);
            },
            goAlert(){
                // this.$router.push({name:this.userAlert.action,params:this.userAlert.params})
                // this.$router.push({name:'chooseProjectType'})
            }
        }
    }
</script>
