<template>
    <div class="people" @mouseover="slideShow" @mouseout="slideHide"> <!--hover类 控制子菜单的显示-->
        <div class="pointer">
            <people-portrait :portraitUrl="userAvatar" :type="userType" :width="9" :height="9"></people-portrait>
        </div>
        <span>{{userName}}</span>
        <em></em>
        <!--下拉 start-->
        <ul v-show="slideDown">
            <li>
                <router-link :to="{name:'personalAbout',params:{id:userId}}" v-lang.mp></router-link>
            </li>
            <li>
                <router-link :to="{name:'personalProtfolio',params:{id:userId}}" v-lang.mpt></router-link>
            </li>
            <li>
                <router-link to="/wallet" v-lang.mw></router-link>
            </li>
            <li @click="clearlocalStorage">
                <a v-lang.lo></a>
            </li>
        </ul>
        <!--下拉 end-->
    </div>
</template>

<script>
    import peoplePortrait from '../../user/headPortrait'
    export default {
        name: "user",
        components:{
            peoplePortrait
        },
        data(){
            return{
                slideDown:false
            }
        },
        messages:{
            en:{
                mp:'My profile',
                mpt:'My portfolio',
                mw:'My wallet',
                lo:'Logout'
            },
            zh:{
                mp:'个人主页',
                mpt:'作品集',
                mw:'钱包',
                lo:'退出登录'
            }
        },
        computed:{
            userName(){
                return this.$store.state.user.userName
            },
            userAvatar(){
                return this.$store.state.user.userAvatar
            },
            userId(){
                return this.$store.state.user.userId
            },
            userType(){
                return this.$store.state.user.userType
            },
        },
        methods:{
            slideShow(){
                this.slideDown = true
            },
            slideHide(){
                this.slideDown = false
            },
            clearlocalStorage(){
                localStorage.clear();
                this.$store.commit('initUserDataMu');
                this.$store.commit('message/resterMessage');
                this.$router.push({path:'/sign-in'})
            },
        }
    }
</script>

<style scoped lang="scss">

</style>