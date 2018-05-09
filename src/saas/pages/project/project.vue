<template>
    <div class="project-container">
        <div class="slide-left-bar">
            <div class="slide-left-bar-scroll">
                <router-link to="/home" class="logo-warp">
                    <img src="../../../assets/images/logo.png" alt="" class="img-max">
                </router-link>
                <router-link :to="{name:'saasProjectsList'}" class="btn btn-default">
                    <img src="../../../assets/images/home-icon.png" alt="">
                    {{translate('ap')}}
                </router-link>
                <ul>
                    <li v-for="menuType in menu">
                        <a :class="{active:menuType.active}">
                            <img :src="menuType.image" alt="">
                            <span class="upp">{{menuType.name}}</span>
                        </a>
                        <ul>
                            <li v-for="menuChild in menuType.value">
                                <router-link :to="{name:menuChild.url}">
                                    {{menuChild.name}}
                                </router-link>
                            </li>
                        </ul>
                    </li>
                </ul>
                <router-link :to="{name:'saasHelp'}" class="help" v-lang.hp>
                </router-link>
            </div>
        </div>
        <div class="children-page-warp">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    import store from '../../../store/store'

    import {mapState} from 'vuex'
    export default {
        name: 'saas-project',
        beforeRouteEnter (to, from, next) {
            store.dispatch('saas/getUserBaseData',to.params.id).then(response => {
                let data = response.data.data;
                if(response.data.code === 200){
                    if(data.have_agree === 1){
                        next( vm => {
                            vm.menu = response.data.data.menu;
                            vm.updateMenu(to.name)
                        })
                    }
                    else if(data.have_agree === 2){
                        next({name:'partyBRefuse'})
                    }
                    else{
                        next({name:'saasNda',params:{id:to.params.id}})
                    }
                }
                else{
                    next({name:'home'})
                }
            })
        },
        watch:{
            $route:function () {
                this.updateMenu(this.$route.name)
            }
        },
        data(){
            return{
                menu:{}
            }
        },
        messages:{
            en:{
                ap:'All projects',
                project:'project',
                ms:'messages',
                hp:'help',
                cp:'Completed project',
                task:'Task',
                payment:'Payment',
                ps:'Project specifications',
                bid:'Bid',
                bs:'Bid & Select',
                ib:'Invite to bid'
            },
            zh:{
                ap:'所有项目',
                project:'项目',
                ms:'消息',
                hp:'帮助',
                cp:'项目完成',
                task:'项目任务',
                payment:'支付信息',
                ps:'项目需求',
                bid:'参与报价',
                bs:'选择报价',
                ib:'邀请报价'
            }
        },
        methods:{
            updateMenu:function (name) {
                for(let me in this.menu){
                    let inThisMe = false;
                    for(let ch in this.menu[me].value){
                        if(this.menu[me].value[ch].url === name){
                            inThisMe = true
                        }
                    }
                    this.menu[me].active = inThisMe
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    .project-container{
        width: 100%;
        .slide-left-bar{
            position: fixed;
            left:0;
            top:0;
            width:240px;
            height:100%;
            background-color: #2A2A36;
            z-index: 101;
            overflow: auto;
            .slide-left-bar-scroll{
                width: 100%;
                height: 100%;
                /*min-height: 900px;*/
                position: relative;
                >.logo-warp{
                    display: block;
                    width:105px;
                    height:30px;
                    margin:22px 0 0 30px;
                }
                >.btn{
                    font-size: 14px;
                    color: #fff;
                    width:150px;
                    line-height: 35px;
                    margin:32px 0 0 30px;
                    img{
                        vertical-align: sub;
                        margin-right: 8px;
                    }
                }
                >ul{
                    margin-top:30px;
                    margin-bottom: 70px;
                    >li{
                        >a{
                            display: flex;
                            font-size: 18px;
                            color: #ACACB2;
                            height: 45px;
                            padding-left: 30px;
                            align-items: center;
                            &.active span{
                                color:#ffffff;
                            }
                            >img{
                                margin-right: 10px;
                                width: 20px;
                                height: 20px;
                            }
                            >span{
                                font-size: 18px;
                                color: #ACACB2;
                                letter-spacing: 0;
                            }
                            &.router-link-active{
                                color:#fff;
                                background: linear-gradient(90deg, rgba(255,255,255,.2), rgba(42,42,54,.2));
                                &:before{
                                    content:'';
                                    display: inline-block;
                                    height:45px;
                                    width:3px;
                                    background-color: #EA6264;
                                }
                            }
                        }
                        >ul{
                            >li{
                                display: block;
                                font-size: 14px;
                                color: #ACACB2;
                                letter-spacing: 0;
                                height: 40px;
                                line-height: 40px;
                                position: relative;
                                &:first-child{
                                    margin-top:0;
                                }
                                &:last-child{
                                    margin-bottom: 14px;
                                }
                                a{
                                    padding-left: 30px;
                                    display: block;
                                    &.router-link-active{
                                        color:#fff;
                                        background: linear-gradient(90deg, rgba(255,255,255,.2), rgba(42,42,54,.2));
                                        &:before{
                                            content:'';
                                            display: inline-block;
                                            height:100%;
                                            width:3px;
                                            background-color: #EA6264;
                                            position: absolute;
                                            left:0;
                                            top:0;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                .help{
                    position: relative;
                    /*bottom:30px;*/
                    left:30px;
                    padding-bottom: 30px;
                    margin-top: 70px;
                    font-size: 14px;
                    color: #ACACB2;
                    letter-spacing: 0;
                }
            }
        }
        .children-page-warp{
            padding: 0 30px 25px 270px;
            width:100%;
        }
    }
</style>