<template>
    <div class="feedback-detail-container" :style="{backgroundImage:'url('+feedbackDetail.annotation+')'+',url(https://model-static.oss-cn-shanghai.aliyuncs.com/dev/background/IMAGE1.png)'}">
        <img class="back pointer" src="../../../assets/images/saas/icon_back.png" alt="" @click='goBack'>
        <button class="btn btn-default pointer" @click="showContent = true" v-show="!showContent" v-lang.content></button>
        <div class="content" v-show="showContent">
            <img @click="showContent = false" class="close" src="../../../assets/images/saas/icon_close.png" alt="">
            <p class="feedback-name">
                {{feedbackDetail.title}}
                <span class="pointer" v-show="feedbackDetail.is_me"  @click="deleteFeedback(feedbackDetail.id)">Delete</span>
            </p>
            <p class="feedback-id">AA-{{feedbackDetail.id}}</p>
            <p class="model-name">{{feedbackDetail.name}}</p>
            <div class="selects">
                <div class="select" v-show="auditionAuth.read">
                    <p class="tag" v-lang.audition></p>
                    <select name="" v-model="audition" v-if="auditionAuth.read" :disabled="!auditionAuth.operate">
                        <option v-for="aud in auditionList" :value="aud.id">{{aud.name}}</option>
                    </select>
                </div>
                <div class="select" v-show="statusAuth.read">
                    <p class="tag" v-lang.status></p>
                    <select name="" v-model="status" v-if="statusAuth.read" :disabled="!statusAuth.operate">
                        <option v-for="sta in statusList" :value="sta.id">{{sta.name}}</option>
                    </select>
                </div>
            </div>
            <p class="tag" v-lang.desc></p>
            <p class="desc">{{feedbackDetail.description}}</p>
            <p class="tag" v-lang.ref></p>
            <div class="ref pointer" :style="{backgroundImage:'url('+feedbackDetail.reference+')'}" @click="bigImgPop(feedbackDetail.reference)">
                <img src="../../../assets/images/feed-back-waiting-upload.png" alt="" v-if="!feedbackDetail.reference">
            </div>
            <p class="tag" v-lang.rf></p>
            <image-upload
                    ref="imgUpload"
                    :img-url="feedbackDetail.update"
                    :can-update="!!canUpdateFeedbackImage"
                    :multipleFile="false"
                    :maxQuantity="1"
                    :type="'image'"
                    :uploadTo="'cloud'"
                    :saveImageSrc="true"
                    @fileStatusChange="imagesChange"
                    @showBigImg="bigImgPop"
            ></image-upload>
            <div class="comments-container">
                <p class="tag" v-lang.comments></p>
                <div class="input-comment">
                    <input type="text" v-model="comment">
                    <button class="btn btn-default upp" v-lang.send @click="leaveComment"></button>
                </div>
                <template v-if="comments.length">
                    <div class="comment" v-for="com in comments">
                        <div class="user">
                            <div style="width: 26px;height: 26px;display: inline-block">
                                <head-portrait :height="10" :width="10" :type="com.user_type" :portraitUrl="com.user_avatar"></head-portrait>
                            </div>
                            <span class="name">{{com.user_name}}</span>
                            <span class="time">{{getTime(com.create_time)}}</span>
                        </div>
                        <p class="comment-content">{{com.content}}</p>
                    </div>
                </template>
                <div class="none-comment" v-else>
                    <img src="../../../assets/images/saas/icon_none_comment.png" alt="">
                    <p v-lang.lu></p>
                </div>
            </div>
            <div class="big-review-img flex" v-if="bigImgStatus">
                <span class="pointer" @click="bigImgStatus = false"></span>
                <img :src="reviewBigImg" alt="">
            </div>
        </div>
    </div>
</template>

<script>
    import loading from '../../components/loading.vue'
    import ImageUpload from '../../../components/imageUpload/feedBackUpload.vue'
    import headPortrait from '../../../components/user/headPortrait'

    export default {
        name: "feedback-detail",
        components:{
            loading,
            ImageUpload,
            headPortrait
        },
        data(){
            return{
                showContent:true,
                feedbackDetail:{},
                auditionAuth:{},
                audition:0,
                auditionList:[],
                statusAuth:{},
                status:0,
                statusList:[],
                canUpdateFeedbackImage:false,
                bigImgStatus:false,
                reviewBigImg:'',
                commentAuth:false,
                comment:'',
                comments:[]
            }
        },
        messages:{
            en:{
                content:'Content',
                audition:'Audition',
                status:'Status',
                desc:'Description',
                ref:'Reference',
                rf:'Revised figure',
                comments:'Comments',
                lu:'Leave your comments on the update'
            },
            zh:{
                content:'详情',
                audition:'审核状态',
                status:'标记状态',
                desc:'描述',
                ref:'参考图',
                rf:'修改图',
                comments:'留言',
                lu:'请在这里留言'
            }
        },
        props:{
            feedbackId:{
                required:true
            }
        },
        watch:{
            audition:function (val) {
                this.updateStatus('audition',val)
            },
            status:function (val) {
                this.updateStatus('status',val)
            }
        },
        async created(){
            let result = await this.$store.dispatch('saas/feedback/getFeedbackDetail',{id:this.feedbackId});
            this.feedbackDetail = result.data.detail;
            this.auditionList = result.data.audition;
            this.statusList = result.data.status;
            this.statusAuth = result.data.functions.updateStatus;
            this.auditionAuth = result.data.functions.updateAudition;
            this.status = result.data.detail.status;
            this.audition = result.data.detail.mark;
            this.canUpdateFeedbackImage = result.data.functions.updateRevised.operate;
            this.comments = result.data.comments;
            this.commentAuth = result.data.functions.comment.operate
        },
        methods:{
            goBack:function () {
                this.$router.go(-1)
            },
            updateStatus:function (type,result) {
                this.$store.dispatch('saas/feedback/updateFeedbackDetail',{
                    id:this.feedbackId,
                    result,
                    type
                })
            },
            imagesChange:function ({data,status}) {
                if(status){
                    let _data = {
                        mid:this.feedbackId,
                        pic:data[0].getSrc
                    };
                    this.$store.dispatch('saas/task/saveUploadImg',_data).then((response) => {
                        //todo:添加错误提示
                    });
                }
            },
            bigImgPop(url){
                if(url) {
                    this.reviewBigImg = url;
                    this.bigImgStatus = true;
                }
            },
            leaveComment(){
                if(this.commentAuth && this.comment){
                    let data = {
                        content:this.comment,
                        mid:this.feedbackId
                    };
                    this.$store.dispatch('saas/feedback/leaveComment',data);
                    this.comments.unshift({
                        user_name:this.$store.state.user.userName,
                        create_time:new Date() / 1000,
                        content:this.comment,
                        user_avatar:this.$store.state.user.userAvatar,
                        user_type:this.$store.state.user.userType
                    });
                    this.comment = ''
                }
            },
            getTime:function (time) {
                let reg = new RegExp('"',"g");
                let date = new Date(time*1000);
                return date.toString().replace(reg, "")
            },
            async deleteFeedback(id){
                let result = await this.$alert({type:'confirm',message:'Are you sure you want to delete this feedback?'});
                if(result.data === 'confirm'){
                    let respo = await this.$store.dispatch('saas/feedback/deleteFeedback',{id});
                    if(respo.code === 200){
                        this.goBack()
                    }
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    .big-review-img{
        position: fixed;
        top:0;
        left:0;
        width:100%;
        height:100%;
        background: rgba(0,0,0,0.70);
        z-index:1000;
        align-items: center;
        justify-content: center;
        >img{
            max-width:100%;
            max-height:100%;
        }
        span{
            display: block;
            position: absolute;
            top:45px;
            right:50px;
            width:25px;
            height:25px;
            background-image:url(../../../assets/images/feedback-close.png);
            background-size: contain;
            background-repeat: no-repeat;
        }
    }
    .feedback-detail-container{
        position: fixed;
        background-color: white;
        background-size: cover;
        background-position: center;
        width: 100%;
        height: 100%;
        z-index: 102;
        top:0;
        left:0;
        .back{
            width: 40px;
            height: 40px;
            position: absolute;
            top:30px;
            left: 30px;
        }
        >.btn{
            width: 90px;
            height: 34px;
            position: absolute;
            top:30px;
            right: 30px;
        }
        .content{
            position: absolute;
            height: 100%;
            width: 550px;
            background-color: white;
            top:0;
            right:0;
            padding:60px 40px;
            overflow-y: auto;
            .close{
                width: 23px;
                height: 23px;
                position: absolute;
                top:24px;
                right:24px;
            }
            .feedback-name{
                position: relative;
                font-size: 20px;
                color: #4A4A4A;
                line-height: 24px;
                margin-bottom: 10px;
                padding-right: 70px;
                span{
                    position: absolute;
                    top:0;
                    right:0;
                    font-size: 14px;
                    color: #858585;
                }
            }
            .feedback-id{
                font-size: 12px;
                color: #A7A2A2;
                margin-bottom: 17px;
            }
            .model-name{
                font-size: 16px;
                color: #858585;
                margin-bottom: 34px;
            }
            .tag{
                font-size: 16px;
                color: #4A4A4A;
                line-height: 24px;
                margin-bottom: 5px;
            }
            .desc{
                font-size: 14px;
                color: #8B8B8B;
                line-height: 20px;
                margin-bottom: 34px;
            }
            .ref{
                width: 228px;
                height: 128px;
                margin-bottom: 34px;
                background-size: cover;
                background-position: center;
                display: flex;
                justify-content: center;
                align-items: center;
                background-color: #EEEFF3;
            }
            .selects{
                display: flex;
                margin-bottom: 34px;
                .select{
                    width: 112px;

                }
            }
            .comments-container{
                margin-top: 34px;
                .input-comment{
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-top: 10px;
                    input{
                        background: #FFFFFF;
                        border: 1px solid #EFEFF1;
                        border-radius: 100px;
                        font-size: 14px;
                        color: #CACACA;
                        padding: 6px 16px;
                        width: 100%;
                        margin-right: 5px;
                        height: 30px;
                    }
                    button{
                        background: #4A90E2;
                        border-radius: 100px;
                        width: 67px;
                        height: 30px;
                    }
                }
                .comment{
                    border-bottom: #E8E8E8 solid 1px;
                    .user{
                        display: flex;
                        align-items: center;
                        margin-top: 15px;
                        span{
                            margin-left: 12px;
                        }
                        .name{
                            font-size: 14px;
                            color: #4A90E2;
                            letter-spacing: 0;
                        }
                        .time{
                            font-size: 12px;
                            color: #9B9B9B;
                            text-align: left;
                        }
                    }
                    .comment-content{
                        font-size: 14px;
                        color: #8B8B8B;
                        letter-spacing: 0;
                        text-align: justify;
                        line-height: 20px;
                        padding-top: 7px;
                        padding-bottom: 18px;
                    }
                    &:last-child{
                        border-bottom: none;
                    }
                }
                .none-comment{
                    height: 200px;
                    width: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    img{
                        width: 34px;
                        margin-right: 30px;
                    }
                    p{
                        font-size: 14px;
                        color: #AEAEAE;
                        letter-spacing: 0;
                        line-height: 9px;
                    }
                }
            }
        }
    }
</style>