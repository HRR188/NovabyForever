<template>
    <div class="feedback-list">
        <saas-wrapper>
            <p class="title" @click="goBack()">< {{feedbackName}}</p>
            <div style="padding:0 20px;">
                <div class="feedback" v-for="feedback in feedbackList">
                    <div>
                        <p>{{feedback.pics[0].name}}</p>
                        <div class="bg-img" :style="{'background-image':'url('+ feedback.pics[0].src +')' }">
                        </div>
                    </div>
                    <div>
                        <p>{{feedback.pics[1].name}}</p>
                        <div class="bg-img" :style="{'background-image':'url('+ feedback.pics[1].src +')' }">
                            <div v-if="!feedback.pics[1].src">
                                <img src="../../../assets/images/feed-back-waiting-upload.png" alt="">
                                <p>
                                    No  attachment
                                </p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <p>{{feedback.pics[2].name}}</p>
                        <div class="bg-img" :style="{'background-image':'url('+ feedback.pics[2].src +')' }">
                        </div>
                    </div>
                    <div class="last-div">
                        <p>Review</p>
                        <div class="btns-container">
                            <div v-if="feedback.status === 1">
                                <span class="pass-icon"></span>
                            </div>
                            <div v-else-if="feedback.status === 0">
                                <span class="fail-icon"></span>
                            </div>
                        </div>
                    </div>
                    <p class="feedback-desc">{{feedback.description}}</p>
                </div>
            </div>
        </saas-wrapper>
    </div>
</template>

<script>
    import saasWrapper from '../../components/saasWrapper.vue'
    export default {
        name: 'feedback-list',
        components:{
            saasWrapper
        },
        created(){
            this.$store.dispatch('saas/task/getHistory',this.$route.params.feedbackId).then(response => {
                this.feedbackName = response.title
                this.feedbackList = response.list
            })
        },
        data(){
            return{
                feedbackList:[],
                feedbackName:''
            }
        },
        methods:{
            goBack:function () {
                this.$router.go(-1)
            }
        }
    }
</script>

<style scoped lang="scss">
    .feedback-list{
        .title{
            height: 47px;
            width: 100%;
            font-size: 16px;
            color: #4A4A4A;
            line-height: 47px;
            border-bottom: 1px solid #e8e8e8;
            padding-left: 20px;
            margin-bottom: 20px;
        }
        .feedback{
            display: flex;
            flex-wrap: wrap;
            border-bottom: 1px solid #E8E8E8;
            margin-bottom: 18px;
            position: relative;
            >div{
                flex: 1;
                margin-right: 10px;
                &.last-div{
                    margin-right: 0;
                    flex:0;
                    width: 100px;
                    margin-left: 17px;
                    display: flex;
                    flex-direction: column;
                    p{
                        width: 100px;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                    }
                    .btns-container{
                        flex: 1;
                        width: 100px;
                        display: flex;
                        flex-flow: column;
                        justify-content: center;
                        align-content: center;
                        align-items: center;
                        .pass-icon,.fail-icon{
                            width:42px;
                            height:42px;
                            display: block;
                            background: url(../../../assets/images/projects-sprite.png) no-repeat;
                            margin:0 auto 10px;
                        }
                        .pass-icon{
                            background-position: -220px -83px;
                        }
                        .fail-icon{
                            background-position: -161px -83px;
                        }
                    }
                }
                p{
                    margin-bottom: 16px;
                    font-size: 12px;
                    color: #515254;
                }
                .bg-img{
                    border-radius: 4px;
                    padding-top: 62%;
                    background-size: cover;
                    background-position: center;
                    position: relative;
                    >div{
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        display: -webkit-box;
                        display: -ms-flexbox;
                        display: flex;
                        -webkit-box-pack: center;
                        -ms-flex-pack: center;
                        justify-content: center;
                        -webkit-box-align: center;
                        -ms-flex-align: center;
                        align-items: center;
                        flex-direction: column;
                        text-align: center;
                        background: #EEEFF3;
                        p{
                            width: 100%;
                            font-size: 12px;
                            color: #959595;
                            margin-top: 6px;
                        }
                        &.hover{
                            background: rgba(0,0,0,.5)
                        }
                    }
                }
            }
            .feedback-time{
                font-size: 14px;
                color: #4A4A4A;
                letter-spacing: 0;
                margin-bottom: 8px;
                width: 100%;
            }
            .feedback-desc{
                font-size: 12px;
                color: #7A7A7A;
                line-height: 20px;
                margin-top: 15px;
                width: 100%;
                margin-bottom: 18px;
            }
            &:last-child{
                border-bottom: none;
                margin-bottom: 0;
            }
        }
    }
</style>