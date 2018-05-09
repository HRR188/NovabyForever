<template>
    <div class="about-container">
        <p class="text-right">
            <template v-if="personalInfo.user_type === 4 && isMeStatus">
                <router-link :to="{name:'businessEdit',params:{id:userId}}" class="edit-btn">
                    <img src="../../assets/images/icon_edit.png" alt="">
                    {{translate('editPortfolio')}}
                </router-link>
            </template>
            <template v-if="personalInfo.user_type !== 4 && isMeStatus">
                <router-link :to="{name:'personalEdit',params:{id:userId}}" class="edit-btn">
                    <img src="../../assets/images/icon_edit.png" alt="">
                    {{translate('editPortfolio')}}
                </router-link>
            </template>
        </p>
        <!-- 如果是企业的主页 start -->
        <template v-if="personalInfo.user_type === 4 && personalInfo">
            <div class="padding-box">
                <ul class="flex">
                    <li style="margin-right:70px;">
                        <p class="tag-title" v-lang.englishLevel></p>
                        <p class="tag-description">{{personalInfo.english}}</p>
                    </li>
                    <li style="margin-right:70px;">
                        <p class="tag-title" v-lang.cs></p>
                        <p class="tag-description">{{personalInfo.company_size}}</p>
                    </li>
                    <li style="margin-right:70px;">
                        <p class="tag-title" v-lang.ct></p>
                        <p class="tag-description">{{personalInfo.company_type}}</p>
                    </li>
                    <li>
                        <p class="tag-title" v-lang.yf></p>
                        <p class="tag-description">{{personalInfo.year_founded}}</p>
                    </li>
                </ul>
                <ul style="margin-top: 30px">
                    <li>
                        <p class="tag-title" v-lang.website></p>
                        <a target="_blank" :href="personalInfo.home_page" class="web-address">{{personalInfo.home_page}}</a>
                    </li>
                </ul>
            </div>
        </template>
        <!-- 如果是企业的主页 end -->
        <!-- 如果是个人的主页 start -->
        <template v-if="personalInfo.user_type !== 4 && personalInfo">
            <div class="padding-box">
                <ul class="flex">
                    <li style="margin-right:70px;">
                        <p class="tag-title" v-lang.englishLevel></p>
                        <p class="tag-description">{{personalInfo.english}}</p>
                    </li>
                    <li style="margin-right:70px;">
                        <p class="tag-title" v-lang.workingExperience></p>
                        <p class="tag-description">{{personalInfo.work_exp}}</p>
                    </li>
                    <li>
                        <p class="tag-title" v-lang.hourlyRate></p>
                        <p class="tag-description">{{personalInfo.hourly_rate}}</p>
                    </li>
                </ul>
                <ul style="margin-top: 30px">
                    <li>
                        <p class="tag-title" v-lang.homepage></p>
                        <a target="_blank" :href="personalInfo.home_page" class="web-address">{{personalInfo.home_page}}</a>
                    </li>
                </ul>
            </div>
        </template>
        <!-- 如果是个人的主页 end -->
        <div class="padding-box">
            <p class="tag-title" v-lang.specialities></p>
            <div>
                <span class="note-label" v-for="item in personalInfo.user_fileds">{{item}}</span>
            </div>
        </div>
        <div class="padding-box">
            <p class="tag-title" v-lang.briefIntroduction></p>
            <p class="tag-description">{{personalInfo.user_description}}</p>
        </div>
        <div class="padding-box" v-if="personalInfo.projects">
            <p class="tag-title">Projects work</p>
            <ul class="project-works">
                <li v-for="item in personalInfo.projects">
                    <div class="pro-name">
                        <p>{{item.name}}</p>
                        <p>{{item.hour}} hours</p>
                    </div>
                    <div class="pro-time">
                        <p>{{new Date(item.start*1000).toString()}}</p>
                        <p>${{item.price}} / hr</p>
                    </div>
                    <div class="pro-scoring clearfix">
                        <p class="float-left"><span>{{item.result_time}}</span> / Time</p>
                        <p class="float-left"><span>{{item.result_quality}}</span> / Quality</p>
                        <p class="float-left"><span>{{item.result_commucation}}</span> / Commucation</p>
                        <p class="float-right">${{item.project_hourlyRate}} / earned</p>
                    </div>
                    <p v-if="item.description">{{item.description}}</p>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
    name:"personalAbout",
    data(){
        return {
            isMeStatus:false
        }
    },
    messages:{
        en:{
            editPortfolio:'Edit profile',
            cs:'Company size',
            ct:'Company type',
            yf:'Year founded',
            website:'Website'
        },
        zh:{
            editPortfolio:'修改个人信息',
            cs:'公司规模',
            ct:'公司类型',
            yf:'成立时间',
            website:'网站'
        }
    },
    created(){
        this.isMeStatus = +this.$route.params.id === this.userId;
    },
    computed:mapState({
        userId:state => state.user.userId,
        personalInfo:state => state.userProfile.personalInfo
    })
}
</script>

<style lang="scss">
.personal-warp{
    .about-container{
        margin-top:10px;
        .edit-btn{
            display: inline-block;
            width:100px;
            height:25px;
            line-height: 25px;
            text-align: center;
            font-size: 12px;
            color: #515254;
            margin-bottom:10px;
            background: #fff;
            border: 1px solid #C8C8C8;
            border-radius: 100px;
            img{
                vertical-align: middle;
            }
        }
        .web-address{
            margin-top:10px;
            font-size: 16px;
            color: #EA6264;
            display: block;
        }
        .note-label{
            display: inline-block;
            margin:15px 20px 0 0;
            padding:0 12px;
            line-height: 32px;
            border: 1px solid #EA6264;
            border-radius: 2px;
            color:#EA6264;
        }
        .project-works{
           li{
               margin-top:35px;
               border-bottom:1px solid #E1E1E1;
               padding-bottom:35px;
               p{
                   font-size: 14px;
                   color: #7A7A7A;
               }
               >p{
                   margin-top:10px;
               }
               &:last-child{
                   border-bottom:none;
               }
           }
            .pro-name{
                display: flex;
                justify-content: space-between;
                font-size: 16px;
                color: #515254;
            }
            .pro-time{
                display: flex;
                justify-content: space-between;
                font-size: 14px;
                color: #7A7A7A;
                margin-top:10px;
            }
            .pro-scoring{
                margin-top:10px;
                p{
                    margin-right:35px;
                    &:last-child{
                        margin-right:0;
                    }
                }
                span{
                    color: #515254;
                }
            }
        }
    }

}
</style>
