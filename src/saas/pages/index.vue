<template>
    <div class="saas-page-warp" :class="{'sass-submenu':showAddButton}">
        <nav class="sass-nav flex">
            <div class="flex type-search">
                <router-link to="/home">
                    <img src="../../assets/images/logo-black.png" alt="">
                </router-link>
                <div class="add-new-project btn btn-default" @click="addNew">
                    <div class="icon-plus">+</div>
                    <span v-lang.an></span>
                </div>
            </div>
            <div class="yes-login float-right">
                <msg></msg>
                <user></user>
            </div>
        </nav>
        <div class="children-page-warp">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    import user from '../../components/nav/user/user'
    import msg from '../../components/nav/msg/msg'
    import { mapState } from 'vuex'
    export default {
        name: 'saas-index',
        data(){
            return{
                showAddButton:true
            }
        },
        messages:{
            en:{
                an:'Add new'
            },
            zh:{
                an:'创建新项目'
            }
        },
        components:{
            user,
            msg
        },
        computed:{
            ...mapState('saas',[
                'showSideNav'
            ])
        },
        watch:{
            $route: 'init'
        },
        created(){
            this.init()
        },
        methods:{
            addNew:function () {
                this.$router.push({name:'chooseProjectType'})
            },
            init(){
                this.showAddButton = this.$route.name !== 'saasProjectsList'
            }
        }
    }
</script>

<style lang="scss">
    .saas-page-warp{
        width: 100%;
        height: 100%;
        .sass-nav{
            height:50px;
            background-color:#fff;
            align-items: center;
            padding:0 25px;
            justify-content: space-between;
            width:100%;
            position: fixed;
            left:0;
            right:0;
            z-index: 100;
            .type-search{
                align-items: center;
                a{
                    display: inline-block;
                    margin-right:50px;
                }
                input{
                    width:300px;
                    height:35px;
                    background: #d5d5d5;
                    border-radius: 100px;
                    border: none;
                    padding: 5px 12px 5px 45px;
                    font-size: 14px;
                    color: #161616;
                }
                .add-new-project{
                    width: 106px;
                    height: 28px;
                    font-size: 14px;
                    color: #FFFFFF;
                    line-height: 28px;
                    margin-left:28px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    .icon-plus{
                        width: 18px;
                        height: 18px;
                        border: 2px solid white;
                        line-height: -1px;
                        border-radius: 100%;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        padding-bottom: 2px;
                        margin-right: 5px;
                    }
                }
            }
            .type-path{
                display: none;
                font-size: 14px;
                color: #4A4A4A;
            }
            .link-all {
                display: block;
                width: 100%;
                height: 35px;
                line-height: 35px;
                margin: 0 auto;
                text-align: center;
                font-size: 14px;
                color: #9B9B9B;
                border-top: 1px solid #EFEFF1;
            }
            .yes-login{
                padding-right: 0;
            }
            .message {
                padding-top: 16px;
                position: relative;
                >a {
                    display: inline-block;
                    width: 15px;
                    height: 18px;
                    background: url(../../assets/images/black-message.png);
                    &:hover {
                        background: url(../../assets/images/blue-message.png);
                    }
                }
                >p {
                    position: absolute;
                    right: -10px;
                    top: 5px;
                    width: 12px;
                    height: 12px;
                    line-height: 12px;
                    text-align: center;
                    color: #fff;
                    border-radius: 100%;
                    background: #4990E2;
                    display: none;
                    span{
                        display: block;
                        font-size: 12px;
                        transform: scale(0.65);
                    }
                }
            }
            .newmsg{
                >p{
                    display: block;
                }
            }
            .people {
                padding-top: 15px;
                >span {
                    display: inline-block;
                    margin-left: 12px;
                    color: #4A4A4A;
                    font-size: 16px;
                    line-height: 23px;
                    cursor: pointer;
                    max-width: 128px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    min-width: 50px;
                }
                &:hover {
                    >span {
                        color: #EA6264;
                    }
                    >em {
                        background: url(../../assets/images/nav-top.png);
                    }
                }
                em {
                    display: inline-block;
                    width: 9px;
                    height: 5px;
                    margin-left: 5px;
                    vertical-align: middle;
                    margin-top: -8px;
                    background: url(../../assets/images/nav-black-bottom.png);
                }
            }
        }
        .children-page-warp{
            padding:75px 0 0 0;
            width:100%;
        }
        &.sass-submenu{
            .sass-nav{
                .add-new-project{
                    display: none;
                }
                .type-user{
                    margin-left: auto;
                }
            }
        }
    }
</style>