<template>
    <ul class="invite-list">
        <li v-for="item in listData" :class="{'disabled':item.have_paid && type}">
            <div class="input-box" v-if="input">
                <input type="checkbox" name="user" :value="item.user_id" v-model="userId">
            </div>
            <div class="content-box">
                <router-link to="" class="protrait">
                    <div style="width: 75px;height: 75px;">
                        <protrait :portraitUrl="item.avatar" :type="item.user_type" :width="18" :height="20"></protrait>
                    </div>
                </router-link>
                <div class="people-msg">
                    <div class="name">
                        <span class="name">{{item.name}}</span>
                        <span>{{item.user_country}} / {{item.user_city}}</span>
                        <span class="recommended" v-if="item.apply_type === 0" v-lang.recommended></span>
                        <span class="invited" v-if="item.apply_type === 2" v-lang.invited></span>
                        <span class="applied" v-if="item.apply_type === 1" v-lang.applied></span>
                        <p class="subtotal" v-if="item.apply_price">{{translate('subtotal')}} : $<span>{{item.apply_price}}</span></p>
                        <p class="time" v-if="item.apply_time">{{translate('time')}} : <span>{{item.apply_time}}</span>day</p>
                        <p class="rai">RAI : <span>{{item.rai}}</span></p>
                    </div>
                    <a :href="item.user_page_id" target="_blank" class="link" v-if="item.user_page_id">{{item.user_page_id}}</a>
                    <div class="price clearfix">
                        <p v-if="item.project_success">
                            <img src="../../assets/images/projects-success-icon.png" alt="">
                            {{item.project_success}}% projects Success</p>
                        <p v-if="item.hourly_rate">{{item.hourly_rate}} <span> / hr</span></p>
                        <template v-if="item.user_type === 4">
                            <p v-if="item.company_type">{{item.company_type}} <span> / {{translate('ct')}}</span></p>
                            <p v-if="item.year_founded">{{item.year_founded}} <span> / {{translate('yf')}}</span></p>
                        </template>
                        <template v-else>
                            <p v-if="item.user_work_exp">{{item.user_work_exp}} <span> / {{translate('we')}}</span></p>
                        </template>
                        <div>
                            <template v-if="item.status === 0">
                                <button style="float:right" class="btn btn-default-border" v-if="item.re_send" @click="resend(item.user_id)" v-lang.rs></button>
                                <p style="float:right;margin-top: 6px;" v-lang.pending></p>
                            </template>
                            <template v-else-if="item.status === 1">
                                <a @click="createChat(item.user_id)">
                                    <img src="../../assets/images/chat-icon.png" alt="">
                                </a>
                                <button class="btn btn-default" @click="payEmit(item)" v-lang.pay></button>
                            </template>
                            <p v-else-if="item.status === 2" v-lang.awq></p>
                            <p v-else-if="item.status === 3" v-lang.reject></p>
                            <p v-else-if="item.status === 4" v-lang.paid></p>
                            <p v-else-if="item.status === 5"></p>
                        </div>
                    </div>
                    <div class="result">
                        <p v-if="item.projects">{{item.projects}}<span> / {{translate('projects')}}</span></p>
                        <p v-if="item.project_amount">${{item.project_amount}}<span> / {{translate('earned')}}</span></p>
                        <p v-if="item.project_time">{{item.project_time}}<span> / {{translate('time')}}</span></p>
                        <p v-if="item.project_quality">{{item.project_quality}}<span> / {{translate('quality')}}</span></p>
                        <p v-if="item.project_commucation">{{item.project_commucation}}<span> / {{translate('communication')}}</span></p>
                    </div>
                    <div class="tags">
                        <span v-for="tags in item.field">{{tags}}</span>
                        <div class="portfolio">
                            <span class="view" @click="portfolio(item.work_covers)" v-if="item.work_covers.length" v-lang.vp></span>
                            <!--<span class="joined" v-if="item.have_apply">Joined</span>-->
                        </div>
                    </div>
                </div>
            </div>
        </li>
    </ul>
</template>
<script>
    import protrait from '../../components/user/headPortrait.vue'
    export default {
        name:'saasInviteList',
        data(){
            return {
                userId:[]
            }
        },
        messages:{
            en:{
                vp:'View portfolio',
                subtotal:'Subtotal',
                time:'Time',
                invited:'Invited',
                ps:'Project success',
                we:'Working experience',
                projects:'projects',
                earned:'earned',
                quality:'quality',
                communication:'communication',
                paid:'Paid',
                recommended:'Recommended',
                applied:'Applied',
                awq:'Accepted, waiting for quote',
                rejected:'Rejected',
                pay:'Pay',
                rs:'Re-send',
                pending:'Pending',
                ct:'Company type',
                yf:'Year founded'
            },
            zh:{
                vp:'查看作品集',
                subtotal:'总价',
                time:'时间',
                invited:'被邀请',
                ps:'项目成功率',
                we:'工作经验',
                projects:'项目',
                earned:'已完成订单总价',
                quality:'质量',
                communication:'交流',
                paid:'已支付',
                recommended:'推荐',
                applied:'申请',
                awq:'已接受，等待报价',
                reject:'已拒绝',
                pay:'支付',
                rs:'重新发送',
                pending:'处理中',
                ct:'公司类型',
                yf:'创立时间'
            }
        },
        components:{
            protrait
        },
        watch:{
            userId:function (val) {
                this.emitUserId()
            }
        },
        props:{
            input:{  //是否展示input多选框
                required:true
            },
            type:{  //类型  true 用在选择人支付并开始项目   false 用在邀请列表
              required:true,
              type:Boolean
            },
            listData:{
                require:true
            }
        },
        methods:{
            emitUserId(){
                this.$emit('userId',this.userId)
            },
            portfolio(data){
                this.$emit('works',data)
            },
            payEmit(id){
                this.$emit('payId',id)
            },
            resend(id){
                let _this = this;
                this.$store.dispatch('saas/invite/sendInvite',{id:this.$route.params.id,uids:[id]}).then((response) => {
                    if(response.code === 200) {
                        _this.$alert({type:'alert',message:'You have resent an invitaion.'})
                        _this.listData.forEach(item => {
                            if(item.user_id === id){
                                item.re_send = 0
                            }
                        })
                    }
                })
            },
            createChat(userId){
                let id = this.$route.params.id;
                let data = {
                    id:id,
                    uid:userId
                };
                this.$store.dispatch('saas/chat/createChat',data).then((response) => {
                    if(response.code === 200) {
                        this.$router.push({name:'saasChat',params:{userId:userId}})
                    }
                })
            }
        }
    }
</script>
<style lang="scss">
    .saas-invite-wrap{
        .invite-list{
            padding:0 20px;
            max-height:800px;
            overflow: auto;
            >li{
                border-bottom:1px solid #E8E8E8;
                padding:15px 0;
                display: flex;

            }
            .content-box{
                width:100%;
                display: flex;
                .protrait{
                    display: block;
                    width:75px;
                    height:75px;
                    float: left;
                }
                .people-msg{
                    margin-left:25px;
                    width: 100%;
                    .name{
                        font-size: 16px;
                        color: #515254;
                        >span{
                            font-size: 12px;
                            color: #7A7A7A;
                            display: inline-block;
                            margin-left:15px;
                            &.name{
                                font-size: 16px;
                                color: #515254;
                                margin-left:0;
                            }
                            &.invited{
                                font-size: 10px;
                                color: #D8A77B;
                                &:before{
                                    content:url('../../assets/images/saas/icon_invited.png');
                                    margin-right: 5px;
                                    display: block;
                                    float: left;
                                }
                            }
                            &.recommended{
                                font-size: 10px;
                                color: #8CADD3;
                                &:before{
                                    content:url('../../assets/images/saas/icon_recommended.png');
                                    margin-right: 5px;
                                    display: block;
                                    float: left;
                                }
                            }
                            &.applied{
                                font-size: 10px;
                                color: #6F5E7F;
                                &:before{
                                    content:url('../../assets/images/saas/icon_applied.png');
                                    margin-right: 5px;
                                    display: block;
                                    float: left;
                                }
                            }
                        }
                    }
                    .rai,.time,.subtotal{
                        float: right;
                        font-size: 18px;
                        color: #F58323;
                    }
                    .time,.subtotal{
                        margin-left:10px;
                    }
                    .link{
                        font-size: 14px;
                        color: #EA6264;
                        display: block;
                        margin-top:8px;
                    }
                    .price{
                        margin-top:10px;
                        >p{
                            font-size: 14px;
                            color: #4A4A4A;
                            margin-right:30px;
                            float: left;
                            span{
                                color: #7A7A7A;
                            }
                            img{
                                vertical-align: middle;
                            }
                        }
                        div{
                            float: right;
                            button{
                                width:85px;
                                line-height: 30px;
                                font-size: 16px;
                                color: #fff;
                                margin-left:20px;
                            }
                            .btn-default-border{
                                color: #EA6264;
                            }
                            p{
                                font-size: 16px;
                                color: #515254;
                            }
                        }
                    }
                    .result{
                        display: flex;
                        margin-top:5px;
                        p{
                            font-size: 14px;
                            color: #4A4A4A;
                            margin-right:30px;
                            span{
                                color: #7A7A7A;
                            }
                        }
                    }
                    .tags{
                        margin-top:10px;
                        >span{
                            display: inline-block;
                            font-size: 12px;
                            color: #fff;
                            background-color: #9B9B9B;
                            padding:2px 5px;
                            border-radius: 2px;
                            margin-right:20px;
                        }
                        p{
                            float: right;
                            font-size: 12px;
                            color: #EA6264;
                            cursor: pointer;
                        }
                        div{
                            float: right;
                            font-size: 12px;
                            .view{
                                color: #EA6264;
                                cursor: pointer;
                            }
                            .joined{
                                color: #7A7A7A;
                                display: inline-block;
                                margin-left:20px;
                            }
                        }
                    }
                }
            }
            .input-box{
                width:40px;
                padding-top:25px;
                input{
                    width:15px;
                    height:15px;
                    background-color: #fff;
                    border: 1px solid #BFBFBF;
                    border-radius: 2px;
                }
            }
            .disabled{
                .content-box{
                    .rai,.time,.subtotal{
                        color: #7E7E7E;
                    }
                }
            }
        }
    }
</style>