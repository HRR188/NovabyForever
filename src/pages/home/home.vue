<template>
    <div class="home-container">

        <div class="banner">
            <div class="words-container">
                <h1 style="white-space: pre-line;" v-lang.home1></h1>
                <p style="white-space: pre-line;" v-lang.home2></p>
            </div>
            <div class="threed-container" v-if="model3D.id">
                <!--<img src="../../assets/images/home/banner-img.png" alt="">-->
                <three-d :modelFile="model3D" :hideBtns="true" :transparentBack="true"></three-d>
            </div>
            <p class="author">BB-8 Animation Repost by Lebster4</p>
            <!--<div class="join-container" v-if="userType !== 4 && userType !== 3 ">-->
                <!--<div>-->
                    <!--<h1 v-lang.artistUnique></h1>-->
                    <!--<p v-lang.artistJoin></p>-->
                <!--</div>-->
                <!--<router-link to="/artist/one">-->
                    <!--<div class="btn btn-default-border pointer upp" v-lang.join></div>-->
                <!--</router-link>-->
            <!--</div>-->
        </div>

        <div class="advantages-container">
            <h1>NovaHub</h1>
            <p v-lang.home3></p>
            <div class="advantages">
                <div class="advantage" style="border-top-left-radius: 4px;">
                    <img src="../../assets/images/home/icon_global.png" alt="">
                    <p class="red-p" v-lang.home4t></p>
                    <p class="black-p" v-lang.home4d></p>
                </div>
                <div class="advantage">
                    <img src="../../assets/images/home/icon_algorithm.png" alt="">
                    <p class="red-p" v-lang.home5t></p>
                    <p class="black-p" v-lang.home5d></p>
                </div>
                <div class="advantage" style="border-top-right-radius: 4px;">
                    <img src="../../assets/images/home/icon_project.png" alt="">
                    <p class="red-p" v-lang.home6t></p>
                    <p class="black-p" v-lang.home6d></p>
                </div>
                <div class="advantage" style="border-bottom-left-radius: 4px;">
                    <img src="../../assets/images/home/icon_money.png" alt="">
                    <p class="red-p" v-lang.home7t></p>
                    <p class="black-p" v-lang.home7d></p>
                </div>
                <div class="advantage">
                    <img src="../../assets/images/home/icon_source.png" alt="">
                    <p class="red-p" v-lang.home8t></p>
                    <p class="black-p" v-lang.home8d></p>
                </div>
                <div class="advantage" style="border-bottom-right-radius: 4px;">
                    <img src="../../assets/images/home/icon_feedback.png" alt="">
                    <p class="red-p" v-lang.home9t></p>
                    <p class="black-p" v-lang.home9d></p>
                </div>
            </div>
            <!--<div class="btn btn-default-border pointer">More</div>-->
        </div>

        <div class="editors-pick">
            <h1 v-lang.home10t></h1>
            <P v-lang.home10d></P>
        </div>

        <div class="models">
            <div class="wrapper">
                <!--<div style="padding:0 10px;">-->
                    <router-link  class="model" v-for="pick in picksList"  target="_blank" :to="{name:'model-detail',params:{id:pick.work_id}}" :key="pick.work_id">
                        <div>
                            <div class="img" :style="{backgroundImage : 'url('+pick.cover+')'}"></div>
                            <div class="info">
                                <span class="title">{{pick.work_title}}</span>
                                <div>
                                    <img src="../../assets/images/home/icon_eye.png" alt="">
                                    <span class="">{{pick.work_views}}</span>
                                </div>
                            </div>
                        </div>
                    </router-link>
                <!--</div>-->
            </div>
            <router-link to="/models/market">
                <div class="btn btn-default-border pointer upp" v-lang.more></div>
            </router-link>
        </div>

        <div class="designer-container" >
            <div class="designer-content" v-for="artist in artists" :class="{'d-show':artist.active,'d-hide':!artist.active}">
                <div class="words">
                    <h1 v-lang.talentArtists></h1>
                    <p v-lang.meetArtists></p>
                    <p class="name">{{artist.name}}</p>
                    <p class="tags">
                        <span>{{artist.country}}</span>
                        <span>{{artist.job}}</span>
                        <span>{{artist.work_exp}}</span>
                    </p>
                    <p class="desc">"{{artist.explain}}"</p>
                </div>
                <img :src="artist.avatar" alt="">
            </div>
        </div>

        <div class="partners-container">
            <h1 v-lang.op></h1>
            <div class="partners">
                <img :src="partner.url" alt="" v-for="partner in partners">
            </div>
        </div>

        <custom-footer></custom-footer>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    import CustomFooter from '../../components/footer/Footer.vue'
    import threeD from '../../components/threeD/threeD.vue'

    export default {
        name: 'home',
        created(){
            let vm = this;
            function intervalTrigger() {
                return window.setInterval(function () {
                    vm.activeArtist();
                },7000)
            }
            this.interval = intervalTrigger();
            if(!this.model3D.id){
                this.$store.dispatch('home/getHomePageData');
            }
        },
        components:{
            CustomFooter,
            threeD
        },
        beforeRouteLeave (to, from, next) {
            window.clearInterval(this.interval);
            next()
        },
        data(){
            return{
                interval:function () {},
                hideMsg:false,
                // modelFile:{}
            }
        },
        messages:{
            en:{
                home1:'Hire great 3D artists to work for you now',
                home2:'Make it real with talented artists from around the world and best-in-class collaboration tools',
                home3:'A new way to hire 3D artists, streamline workflows and manage 3D projects.',
                home4t:'Global Modelers',
                home4d:'Hire talented 3D artists from around the world.',
                home5t:'Project Matching Engine',
                home5d:'Be matched with the right modelers for your project in seconds',
                home6t:'Project Management',
                home6d:'Schedule and Monitor Project Milestones',
                home7t:'Transaction Protection',
                home7d:'Deposit before start, pay when complete',
                home8t:'IP Security',
                home8d:'Deliver after money transferred',
                home9t:'State-of-the-Art Collaboration Tools',
                home9d:'Fast, easy browser-based',
                home10t:'EDITOR\'S PICK',
                home10d:'Fantastic models shared by Novaby artists',
                talentArtists:'TALENTED 3D ARTISTS',
                meetArtists:'Share, learn, earn',
                op:'OUR PARTNERS'
            },
            zh:{
                home1:'3 D 在线协作工具 \n，与天才共建 3 D 世界',
                home2:'与数以万计的天才一起梦想成真',
                home3:'加入Novaby模型师社区，分享作品，学习交流，创造价值',
                home4t:'来自全球',
                home4d:'遇见数以千计的天才艺术家',
                home5t:'算法',
                home5d:'一秒匹配最合适的模型师',
                home6t:'项目管理',
                home6d:'降低质量风险和时间风险',
                home7t:'资金监管',
                home7d:'完善的资金保障',
                home8t:'保护源代码',
                home8d:'安全存储，交付后才能下载',
                home9t:'模型反馈',
                home9d:'简单，就在一个浏览器',
                home10t:'编辑精选',
                home10d:'来自Novaby社区艺术家们的杰作',
                talentArtists:'卓越的3D艺术家',
                meetArtists:'遇见天才，分享技能，享受模型人生',
                op:'我们的客户'
            }
        },
        computed:{
            ...mapState('home',[
                'banners','abstract','intro','projects','artists','artistsAbstract','picksAbstract','picksList','partners','model3D'
            ]),
            userType:function(){
                return this.$store.state.user.userType
            }
        },
        methods:{
            activeArtist:function () {
                this.$store.commit('home/changeArtist')
            },
            goto:function (id) {
                this.$router.push({name:'model-detail',params:{id:id}})
            }
        }
    }
</script>

<style scoped lang="scss">
    $min-width: 1920px;
    $max-width: 1441px;
    $model-aspect-ratio:69%;
    .animate{
        -moz-transition: all .8s ease;
        -webkit-transition: all .8s ease;
        -ms-transition: all .8s ease;
        -o-transition: all .8s ease;
        transition: all .8s ease;
    }
    .home-container{
        width: 100%;
        min-height: 100vh;
        padding-top: 50px;
        h1{
            font-family: bebas-neue;
        }
        .author{
            color:white;
            font-size: 12px;
            position: absolute;
            bottom:24px;
            right:44px;
        }
        .banner{
            width: 100%;
            height: 564px;
            background-image: url("../../assets/images/home/banner.png");
            background-size: 100% 100%;
            background-repeat: no-repeat;
            position: relative;
            @media screen and (min-width: $min-width) {
                background-image: url("../../assets/images/home/banner_1920.png");
            }
            .words-container{
                position: absolute;
                top:150px;
                left:146px;
                color: #FFFFFF;
                width: 535px;
                @media screen and (min-width: $min-width) {
                    width: 700px;
                }
                h1{
                    font-size: 58px;
                    color: #FFFFFF;
                }
                p{
                    font-size: 21px;
                    line-height: 30px;
                }
            }
            .threed-container{
                width: 700px;
                height: 564px;
                position: absolute;
                top:0px;
                right:60px;
                @media screen and (min-width: $min-width) {
                    right: 145px;
                }
                img{
                    margin-top: 20px;
                }
            }
            .join-container{
                width: 882px;
                height: 122px;
                background-color: white;
                position: absolute;
                left:50%;
                transform:translateX(-50%);
                bottom:-61px;
                padding:0 40px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                border-radius: 4px;
                box-shadow: 0 2px 14px 0 rgba(100,100,100,0.50);
                border-bottom: 4px solid #EA6264;
                h1{
                    font-size: 26px;
                    color: #4A4A4A;
                    margin-bottom: 8px;
                }
                p{
                    font-size: 16px;
                    color: #7D7D7D;
                }
                .btn{
                    width: 106px;
                    height: 36px;
                    line-height: 36px;
                    font-size: 16px;
                    color: #EA6264;
                }
            }
        }
        .advantages-container{
            background: #FFFFFF;
            text-align: center;
            padding-bottom: 100px;
            h1{
                font-size: 42px;
                color: #515254;
                margin-bottom: 12px;
                padding-top: 120px;
            }
            p{
                font-size: 16px;
                color: #515254;
                margin-bottom: 48px;
            }
            .advantages{
                padding:0 147px;
                display: flex;
                flex-wrap: wrap;
                .advantage{
                    width: 33.33%;
                    border-top: 1px solid #E0E0E0;
                    border-left: 1px solid #E0E0E0;
                    text-align: center;
                    height: 206px;
                    &:nth-child(3n){
                        border-right: 1px solid #E0E0E0;
                    }
                    &:nth-child(4),&:nth-child(5),&:nth-child(6){
                        border-bottom: 1px solid #E0E0E0;
                    }
                    @media screen and (min-width: $min-width) {
                        height: 248px;
                    }
                    img{
                        margin-bottom: 38px;
                        margin-top: 47px;
                        @media screen and (min-width: $min-width) {
                            margin-top: 56px;
                        }
                    }
                    .red-p{
                        font-size: 16px;
                        color: #EA6264;
                        margin-bottom: 10px;
                    }
                    .black-p{
                        font-size: 14px;
                        color: #717171;
                    }
                }
            }
            .btn{
                width: 106px;
                height: 30px;
                line-height: 30px;
                font-size: 14px;
                color: #EA6264;
                margin-bottom: 50px;
            }
        }
        .editors-pick{
            width: 100%;
            height: 260px;
            text-align: center;
            background-image: url("../../assets/images/home/editor.png");
            background-size: 100% 100%;
            @media screen and (min-width: $min-width) {
                background-image: url("../../assets/images/home/editor_1920.png");
            }
            h1{
                font-size: 42px;
                color: #FFFFFF;
                padding-top: 70px;
                margin-bottom: 12px;
            }
            p{
                font-size: 16px;
                color: #FFFFFF;
            }
        }
        .models{
            width: 100%;
            padding:0 138px;
            text-align: center;
            .wrapper{
                overflow: hidden;
                width: 100%;
                height: 558px;
                position: relative;
                margin-top:-56px;
                margin-bottom: 50px;
                display: flex;
                flex-wrap: wrap;
                justify-content: space-between;
                .model{
                    width: 32%;
                    height: 252px;
                    margin-bottom: 27px;
                    border-radius: 4px;
                    overflow: hidden;
                    position: relative;
                    @media screen and (min-width: $max-width) {
                        width: 24%;
                    }
                    &:hover{
                        box-shadow: 0 2px 20px 0 rgba(100,100,100,0.50);
                    }
                    >div{
                        width: 100%;
                        height: 100%;
                        position: absolute;
                        top:0;
                        left:0;
                        .img{
                            width: 100%;
                            height: 100%;
                            background-size: cover;
                            background-position: center;
                        }
                        .info{
                            position: absolute;
                            bottom:0;
                            left:0;
                            width: 100%;
                            height: 46px;
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            padding:0 14px;
                            background: #FFFFFF;
                            .title{
                                font-size: 14px;
                                white-space: nowrap;
                                word-break: break-all;
                                text-overflow: ellipsis;
                                overflow: hidden;
                            }
                            >div{
                                min-width: 42px;
                                margin-left: 20px;
                                span{
                                    font-size: 12px;
                                    color: #515254;
                                }
                                img{
                                    margin-right: 6px;
                                    margin-top: 5px;
                                }
                            }
                        }
                    }
                }
                >div{
                    width: 100%;
                    height: 100%;
                    position: absolute;
                    top:0;
                    left: 0;
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: space-between;
                    .model{
                        /*padding-top: calc(69% * 0.32);*/
                        width: 32%;
                        height: 252px;
                        margin-bottom: 27px;
                        /*height: 0;*/
                        border-radius: 4px;
                        overflow: hidden;
                        position: relative;
                        @media screen and (min-width: $max-width) {
                            width: 24%;
                            /*padding-top: calc(69% * 0.24);*/
                        }
                        &:hover{
                            box-shadow: 0 2px 20px 0 rgba(100,100,100,0.50);
                        }
                        >div{
                            width: 100%;
                            height: 100%;
                            position: absolute;
                            top:0;
                            left:0;
                            .img{
                                width: 100%;
                                height: 100%;
                                background-size: cover;
                                background-position: center;
                            }
                            .info{
                                position: absolute;
                                bottom:0;
                                left:0;
                                width: 100%;
                                height: 46px;
                                display: flex;
                                justify-content: space-between;
                                align-items: center;
                                padding:0 14px;
                                background: #FFFFFF;
                                .title{
                                    font-size: 14px;
                                    white-space: nowrap;
                                    word-break: break-all;
                                    text-overflow: ellipsis;
                                    overflow: hidden;
                                }
                                >div{
                                    min-width: 42px;
                                    margin-left: 20px;
                                    span{
                                        font-size: 12px;
                                        color: #515254;
                                    }
                                    img{
                                        margin-right: 6px;
                                        margin-top: 5px;
                                    }
                                }
                            }
                        }
                    }
                }
            }
            .btn{
                width: 106px;
                height: 30px;
                line-height: 30px;
                margin-bottom: 50px;
                background-color: transparent;
            }
        }
        .designer-container{
            width: 100%;
            height: 510px;
            position: relative;
            overflow: hidden;
            .designer-content{
                position: absolute;
                width:100%;
                height: 510px;
                top:0;
                left: 100%;
                transition: linear ;
                background-color: white;
                &.d-show{
                    animation: 1s designer-show forwards;
                }
                &.d-hide{
                    animation: 1s designer-hide forwards;
                }
                .words{
                    padding-top: 90px;
                    padding-left: 146px;
                    width: 560px;
                    @media screen and (min-width: $min-width) {
                        width: 812px;
                    }
                    h1{
                        font-size: 42px;
                        color: #515254;
                        margin-bottom: 12px;
                    }
                    p{
                        font-size: 16px;
                        color: #515254;
                    }
                    .name{
                        font-size: 20px;
                        margin-top: 78px;
                        @media screen and (min-width: $min-width) {
                            margin-top: 125px;
                        }
                    }
                    .tags{
                        font-size: 14px;
                        color: #9B9B9B;
                        margin-top: 13px;
                        margin-bottom: 24px;
                        span{
                            margin-right: 30px;
                        }
                    }
                    .desc{
                        font-size: 18px;
                        color: #7D7D7D;
                        line-height: 28px;
                    }
                }
                img{
                    height: 100%;
                    position: absolute;
                    top:0;
                    right: 146px;
                    @media screen and (min-width: $min-width) {
                        right: 188px;
                    }
                }
            }

        }
        .partners-container{
            padding-top:70px;
            text-align: center;
            h1{
                font-size: 42px;
                color: #515254;
                margin-bottom: 87px;
            }
            .partners{
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 0 145px 150px;
            }
        }
    }

    @keyframes designer-show {
        0%{left:100%}
        100%{left:0}
    }

    @keyframes designer-hide {
        0%{left:0}
        100%{left:-100%}
    }
</style>
