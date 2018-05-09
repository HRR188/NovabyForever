<template>
    <section class="main personal-warp position-relative">
        <div class="header-bg-warp position-relative">
            <image-upload
                    v-show="!routerStatus"
                    :multipleFile="false"
                    :maxQuantity="1"
                    :type="'image'"
                    :uploadTo="'cloud'"
                    :saveImageSrc="true"
                    :compressionImage="false"
                    @fileStatusChange="changeUserCover"
            ></image-upload>
            <div class="bg-container position-relative" ref="imgCr">
                <img :src="bgImg.src"
                     :style="{top:bgImg.top+'px',left:bgImg.left+'px',height:bgImg.height,width:bgImg.width}"
                     :class="{move:!routerStatus}"
                     @mousedown="mouseDown($event)"
                     @mouseup="mouseUp($event)"
                     @mousemove="mouseMove($event)"
                     @mouseout="mouseUp($event)"
                     draggable="false"
                     ref="img"
                >
                <div class="back-transparent-bottom" style="height: 120px;" v-show="routerStatus"></div>
            </div>
        </div>
        <div class="personal-nav-warp" v-show="routerStatus">
            <div class="w-940 auto position-relative">
                <div class="people-msg clearfix">
                    <div class="portrait-box float-left position-relative">
                        <img :src="personalInfo.user_avatar" alt="" class="img-max portrait-img">
                        <template v-if="personalInfo.user_type === 4">
                            <img src="../../assets/images/business-icon.png" class="user-status">
                        </template>
                        <template v-else-if="personalInfo.user_type === 3">
                            <img src="../../assets/images/user-model-icon.png" class="user-status">
                        </template>
                    </div>
                    <div class="people-name flex float-left">
                        <div>
                            <p style="font-size:24px;">
                                <template v-if="personalInfo.user_type === 4">
                                    {{personalInfo.company_name}}
                                </template>
                                <template v-else>
                                    {{personalInfo.user_name}}
                                </template>
                                <follow-btn :btnstyle="followBtnStyle" :followId="personalInfo.user_id" :followBtnStatus="personalInfo.user_isfollow" v-if="!isMeStatus"></follow-btn>
                            </p>
                            <p style="font-size:14px;margin-top: 10px;">
                                {{personalInfo.user_country}}&nbsp;/&nbsp;{{personalInfo.user_city}}
                            </p>
                        </div>
                    </div>
                    <ul class="people-links float-right flex">
                        <li class="fackbook" v-show="personalInfo.user_facebook"></li>
                        <li class="twitter" v-show="personalInfo.user_twitter"></li>
                        <li class="linkedin" v-show="personalInfo.user_linkedin"></li>
                        <li class="pinterest" v-show="personalInfo.user_pinterest"></li>
                    </ul>
                </div>
                <ul class="personal-nav flex">
                    <li>
                        <router-link :to="{name:'personalAbout',params:{id:linkId}}" v-lang.about class="upp"></router-link>
                    </li>
                    <li>
                        <router-link :to="{name:'personalProtfolio',params:{id:linkId}}" v-lang.portfolio class="upp"></router-link>
                    </li>
                    <li>
                        <router-link :to="{name:'personalLikes',params:{id:linkId}}" v-lang.likes class="upp"></router-link>
                    </li>
                    <template v-if="!isMeStatus">
                        <li>
                            <router-link :to="{name:'personalTeam',params:{id:linkId}}" v-lang.team class="upp"></router-link>
                        </li>
                    </template>
                    <template v-if="isMeStatus">
                        <li>
                            <router-link :to="{name:'personalFollowers',params:{id:linkId}}" v-lang.follower class="upp"></router-link>
                        </li>
                        <li>
                            <router-link :to="{name:'personalFollowing',params:{id:linkId}}" v-lang.following class="upp"></router-link>
                        </li>
                        <!--<li>-->
                            <!--<router-link :to="{name:'personalTeam',params:{id:linkId}}" v-lang.team class="upp"></router-link>-->
                        <!--</li>-->
                        <li>
                            <router-link :to="{name:'personalDownloads',params:{id:linkId}}" v-lang.downloads class="upp"></router-link>
                        </li>
                        <li class="more" @mouseover="menuShow" @mouseout="menuHide">
                            {{translate('more')}}
                            <ul class="sub-meanu" v-show="subMenu">
                                <li>
                                    <router-link :to="{name:'personalSocial',params:{id:linkId}}">{{translate('social')}}</router-link>
                                </li>
                                <li>
                                    <router-link :to="{name:'personalPassword',params:{id:linkId}}">{{translate('password')}}</router-link>
                                </li>
                                <li>
                                    <router-link :to="{name:'personalPayMent',params:{id:linkId}}">{{translate('payments')}}</router-link>
                                </li>
                                <li>
                                    <router-link :to="{name:'personalLanguage',params:{id:linkId}}">{{translate('language')}}</router-link>
                                </li>
                                <!-- <li>
                                    <router-link :to="{name:'personalService',params:{id:linkId}}">Service</router-link>
                                </li> -->
                            </ul>
                        </li>
                    </template>
                </ul>
            </div>
        </div>
        <div class="w-940 auto">
            <router-view></router-view>
        </div>
    </section>
</template>
<script>
    import {mapState,mapMutations,mapActions,mapGetters} from 'vuex'
    import imageUpload from '../../components/imageUpload/protfolioCoverImgUpload'
    import followBtn from '../../components/commons/FollowBtn'
    export default {
        name:'personal',
        data(){
            return {
                //bgImgUrl:require('../../assets/images/personal-default.png'),
                followBtnStyle:{
                    width:'75px',
                    height:'25px'
                },
                subMenu:false,
                routerStatus:true,
                isMeStatus:false,
                linkId:'',
                dropStatus:false,
                // bgTop:0,
                resultTop:0,
                eventY:0,
                eventX:0,
                bgImg:{
                    top:0,
                    left:0,
                    height:'100%',
                    width:'100%',
                    src:'',
                    moveType:0 //0 上下移动 1 左右移动
                }
            }
        },
        messages:{
            en:{
                social:'Social',
                payments:'Payments'
            },
            zh:{
                social:'社交网络',
                payments:'支付信息'
            }
        },
        watch:{
            $route:'rester',
            personalInfo:function () {
                if(this.personalInfo.cover){
                    this.loadBGImg(this.personalInfo.cover)
                }
            }
        },
        computed:{
            personalInfo:function(){
                return this.$store.state.userProfile.personalInfo
            },
            userId:function(){
                return this.$store.state.user.userId
            },
            imgCanMove:function () {
                return this.$route.name === 'businessEdit' || this.$route.name === 'personalEdit';
            }
        },
        created(){
            this.rester()
        },
        components:{
            followBtn,
            imageUpload
        },
        methods:{
            menuShow(){
                this.subMenu = true
            },
            menuHide(){
                this.subMenu = false
            },
            rester(){
                this.linkId = this.$route.params.id;
                this.$store.dispatch('pageUsersAc',{uid:this.linkId});
                this.isMeStatus = (this.userId === parseInt(this.linkId));
                this.routerStatus = !(this.$route.name === 'personalEdit' || this.$route.name === 'businessEdit');
            },
            changeUserCover({data,status}){
                if(status){
                    this.$store.commit('imageUpload/changeUserCover',data[0].getSrc);
                    this.loadBGImg(data[0].src)
                }
            },
            loadBGImg(url){
                this.$store.commit('imageUpload/changeUserCoverPosition',{top:this.personalInfo.cover_top,left:this.personalInfo.cover_left});
                let containerWidth = this.$refs.imgCr.offsetWidth;
                let containerHeight = this.$refs.imgCr.offsetHeight;
                let image = new Image();
                image.src = url;
                // image.src = this.personalInfo.cover
                image.onload = () => {
                    if(containerWidth/containerHeight < image.width/image.height){
                        this.bgImg = {
                            top:this.personalInfo.cover_top || 0,
                            left:this.personalInfo.cover_left || 0,
                            height:'100%',
                            width:'auto',
                            src:image.src,
                            moveType:1
                        }
                    }
                    else{
                        this.bgImg = {
                            top:Number(this.personalInfo.cover_top) || 0,
                            left:Number(this.personalInfo.cover_left) || 0,
                            height:'auto',
                            width:'100%',
                            src:image.src,
                            moveType:0
                        }
                    }
                }
            },
            mouseDown(event){
                event.preventDefault();
                if(this.imgCanMove){
                    this.dropStatus = true
                }
                this.eventY = event.screenY;
                this.eventX = event.screenX
            },
            mouseUp(event){
                event.preventDefault();
                this.dropStatus = false
            },
            mouseMove(event){
                event.preventDefault();
                if(this.dropStatus){
                    let distance;
                    if(this.bgImg.moveType){
                        distance = event.screenX - this.eventX;
                        if(distance > 0){
                            if(this.bgImg.left <= 0 && Math.abs(this.bgImg.left) >= distance){
                                this.bgImg.left += distance
                            }
                        }
                        else if(distance < 0){
                            if(Math.abs(this.bgImg.left) + this.$refs.imgCr.offsetWidth <= this.$refs.img.offsetWidth && Math.abs(this.bgImg.left) + this.$refs.imgCr.offsetWidth + Math.abs(distance) <= this.$refs.img.offsetWidth) {
                                this.bgImg.left += distance
                            }
                        }
                        this.$store.commit('imageUpload/changeUserCoverPosition',{top:this.bgImg.top,left:this.bgImg.left});
                        this.eventX = event.screenX
                    }
                    else{
                        distance = event.screenY - this.eventY;
                        if(distance > 0){
                            if(this.bgImg.top <= 0 && Math.abs(this.bgImg.top) >= distance){
                                this.bgImg.top += distance
                            }
                        }
                        else if(distance < 0){
                            if(Math.abs(this.bgImg.top) + this.$refs.imgCr.offsetHeight <= this.$refs.img.offsetHeight && Math.abs(this.bgImg.top) + this.$refs.imgCr.offsetHeight + Math.abs(distance) <= this.$refs.img.offsetHeight) {
                                this.bgImg.top += distance
                            }
                        }
                        this.$store.commit('imageUpload/changeUserCoverPosition',{top:this.bgImg.top,left:this.bgImg.left});
                        this.eventY = event.screenY
                    }
                }
            }
        }
    }
</script>

<style lang="scss">
    .personal-warp{
        .header-bg-warp{
            width:100%;
            height:315px;
            overflow: hidden;
            .bg-container{
                width:100%;
                height:100%;
                img{
                    position: absolute;
                    display: block;
                    left:0;
                    width:100%;
                    height: 100%;
                }
                .move{
                    cursor: move;
                }
            }
            .image-upload-container{
                position: absolute;
                top:10px;
                left:18px;
                z-index:5;
            }

        }
        .personal-nav-warp{
            width:100%;
            height:40px;
            background-color:#fff;
            >div{
                height:100%;
            }
            .people-msg{
                position: absolute;
                width:100%;
                left:0;
                bottom:20px;
                .portrait-box{
                    width: 120px;
                    height:120px;
                }
                .people-name{
                    height:120px;
                    align-items: center;
                    color:#fff;
                    margin-left:15px;
                    button{
                        margin-left:25px;
                    }
                }
                .people-links{
                    height:120px;
                    align-items: center;
                    li{
                        width:40px;
                        height:40px;
                        background-image: url(../../assets/images/links-sprite.png);
                        background-repeat: no-repeat;
                        margin-right:15px;
                        &:last-child{
                            margin-right: 0;
                        }
                    }
                    .fackbook{
                        background-position: 0 0;
                    }
                    .twitter{
                        background-position: 0 -50px;
                    }
                    .linkedin{
                        background-position: 0 -101px;
                    }
                    .pinterest{
                        background-position: 0 -155px;
                    }
                }
            }
            .personal-nav{
                padding-left:138px;
                >li{
                    line-height:40px;
                    position: relative;
                    margin-right:45px;
                    font-size: 14px;
                    color: #7A7A7A;
                    a{
                        display: block;
                    }
                    a:hover{
                        color: #EA6264;
                    }
                    >.router-link-active{
                        color: #EA6264;
                        &:after{
                            content:'';
                            display: inline-block;
                            width:30px;
                            height:2px;
                            background-color:#EA6264;
                            position: absolute;
                            left:50%;
                            bottom:0;
                            transform: translateX(-50%);
                            vertical-align: middle;
                        }
                    }
                }
                >li.more{
                    margin-right:0;
                    cursor: pointer;
                    &:after{
                        content:'';
                        display: inline-block;
                        width:15px;
                        height:5px;
                        background: url(../../assets/images/projects-sprite.png) -83px 0 no-repeat;
                    }
                }
                .sub-meanu{
                    position: absolute;
                    left:-25px;
                    top:40px;
                    min-width:95px;
                    min-height:105px;
                    background-color: #fff;
                    border: 1px solid #F1F1F1;
                    border-radius: 2px;
                    z-index:10;
                    li{
                        text-align: center;
                        font-size: 14px;
                        color: #7A7A7A;
                    }
                    .router-link-active{
                        color: #EA6264;
                    }
                }
            }
        }
        .padding-box{
            padding:30px 42px;
            background-color:#fff;
            margin-bottom:20px;
        }
        .portrait-img{
            border-radius: 100%;
        }
        .user-status{
            position:absolute;
            right:0;
            top:0;
        }
        .tag-title{
            font-size: 18px;
            color: #515254;
        }
        .tag-description{
            font-size: 16px;
            color: #7A7A7A;
            line-height: 22px;
            margin-top:10px;
        }
        .save-btn{
            width:54px;
            height:25px;
            line-height: 25px;
            margin:10px 0;
        }
        .edit-container{
            .save-btn{
                width:54px;
                height:25px;
                line-height: 25px;
                margin:10px 0;
            }
            .head-portrait{
                width: 120px;
                height:120px;
                >div{
                    width:100%;
                    height:100%;
                    overflow: hidden;
                    border-radius: 100%;
                    position: absolute;
                    left:0;
                    top:0;
                }
                .file-warp{
                    background-color: rgba(42, 42, 54, 0.85);
                    position: absolute;
                    width: 100%;
                    height: 26px;
                    line-height: 26px;
                    font-size: 12px;
                    color: #AAAAAA;
                    text-align: center;
                    left: 0;
                    bottom: 0;
                    cursor: pointer;
                    z-index: 3;
                }
                [type=file]{
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: 100%;
                    height: 26px;
                    opacity: 0;
                    cursor: pointer;
                }
            }
            .fist-name,.last-name,.sex,.country,.city{
                padding-top:25px;
            }
            .fist-name{
                margin-left:40px;
            }
            .last-name,{
                margin-left:35px;
            }
            .sex{
                margin-left: 40px;
            }
            .country,.city{
                margin-left:20px;
            }
            .fist-name,.last-name{
                [type=text]{
                    display: block;
                    margin-top:8px;
                    width:330px;
                    height:35px;
                    padding:5px 10px;
                    font-size: 16px;
                    color: #515254;
                    background: #fff;
                    border: 1px solid #D2D2D2;
                    border-radius: 2px;
                }
            }
            .sex,.country,.city{
                select{
                    display: block;
                    margin-top:8px;
                    width:218px;
                    height:35px;
                    padding:5px 10px;
                    font-size: 16px;
                    color: #515254;
                    background: #fff;
                    border: 1px solid #D2D2D2;
                    border-radius: 2px;
                }
            }
            .english{
                margin:15px 0 30px 0;
                label{
                    margin-right:60px;
                }
            }
            textarea{
                margin-top:15px;
                display: block;
                width:100%;
                height:208px;
                resize: none;
                border: 1px solid #D2D2D2;
                border-radius: 4px;
                padding:15px;
                font-size: 16px;
                color: #9B9B9B;
            }
            .work-msg{
                ul{
                    justify-content: space-between;
                }
                li{
                    font-size: 16px;
                    color: #515254;
                    select,input{
                        width:258px;
                        height:35px;
                        background-color:#fff;
                        font-size: 16px;
                        color: #515254;
                        margin-top:8px;
                        padding:5px 10px;
                        border: 1px solid #D2D2D2;
                    }
                    .personal-country{
                        width:315px;
                    }
                    .personal-homepage{
                        width:130px;
                    }
                }
            }
            .pro-field{
                span{
                    cursor: pointer;
                    display: inline-block;
                    margin:15px 20px 0 0;
                    padding:0 12px;
                    line-height: 32px;
                    border: 1px solid #9B9B9B;
                    border-radius: 2px;
                    color:#9B9B9B;
                    &:hover{
                        background-color: #EA6264;
                        color:#fff;
                        border:1px solid #EA6264;
                    }
                }
                span.active{
                    background-color: #EA6264;
                    color:#fff;
                    border:1px solid #EA6264;
                }
            }
            .company-name,.company-country,.company-city{
                padding-top:25px;
                input,select{
                    background: #fff;
                    border: 1px solid #D2D2D2;
                    border-radius: 2px;
                    height:35px;
                    display: block;
                    margin-top:8px;
                    padding:10px;
                    font-size: 16px;
                    color: #515254;
                }

            }
            .company-name{
                margin-left:25px;
                input{
                    width:710px;
                }
            }
            .company-country,.company-city{
                margin-left:25px;
                select{
                    width:340px;
                }
            }
        }
    }
</style>
