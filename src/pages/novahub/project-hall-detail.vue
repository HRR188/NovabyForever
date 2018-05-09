<template>
    <div class="project-detail-warp">
        <div class="detail-content w-940 auto flex">
            <div class="detail-left">
                <div class="cover-img" :style="{backgroundImage:'url('+projectHallDetail.prj_photos+')'}">
                    <div class="name-wrapper">
                        <h1>{{projectHallDetail.prj_name}}</h1>
                    </div>
                </div>
                <div class="project-detail">
                    <ul>
                        <li>
                            <p class="upp"><img src="../../assets/images/icon_Industry.png" alt="">{{translate('industry')}}: <span>{{projectHallDetail.prj_industry}}</span></p>
                        </li>
                        <li>
                            <p class="upp"><img src="../../assets/images/icon_Category.png" alt="">{{translate('category')}}: <span>{{projectHallDetail.prj_category}}</span></p>
                        </li>
                        <li>
                            <p class="upp"><img src="../../assets/images/icon_tag.png" alt="">{{translate('tag')}}:
                                <span v-for="(tag,index) in projectHallDetail.prj_tags">{{index < projectHallDetail.prj_tags.length - 1?tag + ', ':tag}}</span>
                            </p>
                        </li>
                        <li>
                            <p class="upp"><img src="../../assets/images/icon_Resolution.png" alt="">{{translate('resolution')}}: <span>{{projectHallDetail.prj_resolution}}</span></p>
                        </li>
                        <li>
                            <p><img src="../../assets/images/icon_model_number.png" alt="">{{translate('modelNumber')}}: <span>{{projectHallDetail.prj_model_number}}</span></p>
                        </li>
                        <li>
                            <p><img src="../../assets/images/icon_Budget.png" alt="">{{translate('budget')+'('+translate('averagePerModel')+')'}}: <span>{{projectHallDetail.prj_budget+' USD'}}</span></p>
                        </li>
                        <li>
                            <p><img src="../../assets/images/icon_Project_duration.png" alt="">{{translate('projectDuration')}}: <span>{{projectHallDetail.prj_duration}}</span></p>
                        </li>
                    </ul>
                    <div class="apply-box text-center position-relative">
                        <button class="btn btn-default upp" @click="apply" v-if="!projectHallDetail.status">{{translate('apply')}}</button>
                        <button class="btn btn-default upp" disabled v-else>{{translate('applied')}}</button>
                    </div>
                </div>
            </div>
            <div class="detail-right">
                <div class="digital-container flex">
                    <div>
                        <span v-lang.views class="upp"></span>
                        <p>{{projectHallDetail.prj_view}}</p>
                    </div>
                    <div>
                        <span v-lang.participants class="upp"></span>
                        <p>{{projectHallDetail.prj_apply}}</p>
                    </div>
                </div>
                <share-links :id="id" type="2"></share-links>
                <!--<recommend type="C"></recommend>-->
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState,mapActions,mapMutations} from 'vuex'
    import countdown from '../../components/novahub/time.vue'
    import slider from '../../components/community/unslider'
    import recommend from '../../components/whoToFollow/recommend.vue'
    import ShareLinks from '../../components/commons/ShareLinks.vue'
    export default {
        name: 'project-hall-detail',
        data(){
            return{
                agree:true,
                unSliderConfig:{
                    time:1000,
                    backgroundColor:'rgba(0,0,0,0)'
                },
                animationStatus:false,
                applyStatus:true,
                noteStatus:false,  //如果不是入驻模型师或者企业号将会弹出提示
                id:0
            }
        },
        messages:{
            en:{
                budget:'Budget',
                as:'Apply successful!'
            },
            zh:{
                budget:'预算',
                as:'申请成功！'
            }
        },
        watch:{
            '$route.params.id': function () {
                this.getProjectDetail(this.$route.params.id);
            }
        },
        components:{
            slider,
            countdown,
            recommend,
            ShareLinks
        },
        created(){
            this.id = this.$route.params.id
            this.getProjectDetail(this.$route.params.id);
        },
        computed:{
            ...mapState('novahub/projectDetail',[
                'images','projectHallDetail','isPrivate'
            ]),
            userType(){
                return this.$store.state.user.userType
            }
        },
        methods:{
            ...mapActions('novahub/projectDetail',[
                'getProjectDetail'
            ]),
            ...mapMutations('novahub/projectDetail',[
                'resterProjectHallData'
            ]),
            back(){
                this.$router.go(-1)
            },
            apply(){
                if(this.$store.state.user.loginStatus){
                    this.$store.dispatch('novahub/projectDetail/projectApply',this.id).then(response => {
                        if(response.code === 200){
                            this.$alert({type:'alert',message:this.translate('as')});
                            this.$store.commit('novahub/projectDetail/applySuccess')
                        }
                    })
                }
                else{
                    this.$logPop().then( response => {
                        if(response){
                            this.$store.dispatch('novahub/projectDetail/projectApply',this.id).then(response => {
                                if(response.code === 200){
                                    this.$alert({type:'alert',message:this.translate('as')});
                                    this.$store.commit('novahub/projectDetail/applySuccess')
                                }
                            })
                        }
                    })
                }
            }
        },
        beforeRouteLeave(to, from, next){
            this.resterProjectHallData();
            next()
        }
    }
</script>

<style lang="scss">
    .project-detail-warp{
        .detail-content{
            padding-top:50px;
            justify-content: space-between;
            .detail-left{
                width:640px;
                margin:30px 0;
                padding-bottom:50px;
                .cover-img{
                    width: 100%;
                    height: 217px;
                    border-radius: 4px;
                    background-size: cover;
                    background-position: center;
                    position: relative;
                    margin-bottom: 12px;
                    .name-wrapper{
                        width: 100%;
                        height: 100%;
                        position: absolute;
                        left:0;
                        top:0;
                        background: rgba(0,0,0,0.40);
                        h1{
                            font-size: 24px;
                            color: #fff;
                            font-weight: normal;
                            padding:30px;
                        }
                    }
                }
                .project-detail{
                    background-color: #fff;
                    padding:22px 34px;
                    border-radius: 4px;
                    ul{
                        padding:0 22px;
                        li{
                            border-bottom: 1px solid #e8e8e8;
                            display: flex;
                            align-items: center;
                            height: 56px;
                            p{
                                font-size: 14px;
                                color: #515254;
                                line-height: 32px;
                                span{
                                    color: #7A7A7A;
                                    margin-right:5px;
                                }
                                img{
                                    margin-right: 20px;
                                }
                            }
                        }
                    }
                    .apply-box{
                        margin-top:44px;
                        margin-bottom: 22px;
                        .btn{
                            width: 144px;
                            height: 34px;
                            line-height: 34px;
                            font-size: 16px;
                            color: #FFFFFF;
                        }
                    }
                }
            }
            .detail-right{
                width:288px;
                margin-top:30px;
                .digital-container{
                    padding:18px 24px;
                    background-color: #fff;
                    border-radius: 5px;
                    justify-content: space-between;
                    margin-bottom:12px;
                    border: 1px solid #F1F1F1;
                    >div{
                        flex: 1;
                    }
                    span{
                        font-size: 16px;
                        color: #2A2A36;
                    }
                    p{
                        margin-top:5px;
                        font-size: 24px;
                        color: #2A2A36;
                    }
                }
            }
        }
    }
</style>
