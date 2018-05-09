<template>
    <div class="feedback-wrap">
        <div class="feedback-list">
            <div class="feedback" v-for="feedback in feedbackListP">
                <p class="feedback-name">{{feedback.title}}</p>
                <div>
                    <p v-lang.annotation></p>
                    <div class="bg-img" :style="{'background-image':'url('+ feedback.pics[0].src +')' }" @click="bigImgPop(feedback.pics[0].src)"></div>
                </div>
                <div>
                    <p v-lang.reference></p>
                    <div class="bg-img" :style="{'background-image':'url('+ feedback.pics[1].src +')' }" @click="bigImgPop(feedback.pics[1].src)">
                        <div v-if="!feedback.pics[1].src">
                            <img src="../../../assets/images/feed-back-waiting-upload.png" alt="">
                            <p v-lang.na></p>
                        </div>
                    </div>
                </div>
                <div>
                    <p v-lang.update></p>
                    <div class="bg-img" :style="{'background-image':'url('+ feedback.pics[2].src +')' }" @click="bigImgPop(feedback.pics[2].src)">
                        <div v-if="feedback.pics[2].src === '' || feedback.status === 3" :class="{hover:feedback.pics[2].src}">
                            <img src="../../../assets/images/feed-back-waiting-upload.png" alt="">
                            <p v-lang.wu></p>
                        </div>
                    </div>
                </div>
                <div class="last-div">
                    <p>{{translate('review')}} <img v-if="feedback.has_record" src="../../../assets/images/feedback-history.png" @click="goHistory(feedback.id)"></p>
                    <div class="btns-container">
                        <div v-if="modelAccepted">
                            <p class="close" v-lang.close></p>
                        </div>
                        <div v-else-if="feedback.status === 0">
                            <div v-if="party === 'A'">
                                <button class="btn-pass" disabled v-lang.accept></button>
                                <button class="btn-fail" disabled v-lang.revise></button>
                            </div>
                            <div v-else style="position: relative">
                                <button class="btn upload-btn upp" @click="uploadId = feedback.id" v-lang.upload></button>
                                <div class="img-upload-pop" v-if="uploadId === feedback.id">
                                    <img class="pointer" src="../../../assets/images/remove-msg.png" alt="" @click="closeImgPop()">
                                    <image-upload ref="imgUpload" :multipleImg="false" @imagesChange="imagesChange"></image-upload>
                                    <button class="btn upp" @click="submitImgUrl" v-lang.submit></button>
                                </div>
                            </div>
                        </div>
                        <div v-else-if="feedback.status === 1">
                            <template v-if="party === 'A'">
                                <button class="btn-pass" @click="passFeedback(feedback.id)" v-lang.accept></button>
                                <div style="position: relative">
                                    <div class="fail-pop" v-show="uploadId === feedback.id">
                                        <p>
                                            {{translate('comments')}}
                                            <img class="pointer" src="../../../assets/images/remove-msg.png" alt="" @click="closeFeedbackPop()">
                                        </p>
                                        <div class="flex">
                                            <textarea v-model="failStr"></textarea>
                                            <button class="btn" @click="failSubmit" v-lang.submit>
                                            </button>
                                        </div>
                                    </div>
                                    <button class="btn-fail" @click="uploadId = feedback.id" v-lang.revise></button>
                                </div>
                            </template>
                            <template v-else>
                                <button class="btn upload-btn" v-lang.pending></button>
                            </template>
                        </div>
                        <div v-else-if="feedback.status === 2">
                            <span class="pass-icon"></span>
                        </div>
                        <div v-else-if="feedback.status === 3">
                            <span class="fail-icon"></span>
                            <div style="position: relative" v-if="party === 'B'">
                                <button class="btn upload-btn" @click="uploadId = feedback.id" v-lang.ua></button>
                                <div class="img-upload-pop" v-if="uploadId === feedback.id">
                                    <img class="pointer" src="../../../assets/images/remove-msg.png" alt="" @click="closeImgPop()">
                                    <image-upload ref="imgUpload" :multipleImg="false" @imagesChange="imagesChange"></image-upload>
                                    <button class="btn upp" @click="submitImgUrl" v-lang.submit></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <p class="feedback-desc">{{feedback.description}}</p>
            </div>
        </div>
        <div class="big-review-img flex" v-if="bigImgStatus">
            <span class="pointer" @click="bigImgStatus = false"></span>
            <img :src="reviewBigImg" alt="">
        </div>
    </div>
</template>

<script>
    import ImageUpload from '../../../components/imageUpload/feedBackUpload.vue'
    export default {
        name: 'feedback',
        props:['feedbackList','modelAccepted'],
        components:{
            ImageUpload
        },
        watch:{
            feedbackList:function (val) {
                this.feedbackListP = this.feedbackList
            }
        },
        created(){
            this.feedbackListP = this.feedbackList
        },
        data(){
            return{
                feedbackListP:[],
                uploadId:0,
                uploadImgBase64:'',
                uploadImgSrc:'',
                failStr:'',
                bigImgStatus:false
            }
        },
        messages:{
            en:{
                annotation:'Annotation',
                reference:'Reference',
                update:'Update',
                na:'No  attachment',
                wu:'Waiting for an update',
                review:'Review',
                close:'Close',
                accept:'Accept',
                revise:'Revise',
                comments:'Comments',
                ua:'Upload again',
                pending:'pending'
            },
            zh:{
                annotation:'标注',
                reference:'参考图',
                update:'更新图',
                na:'没有参考图',
                wu:'等待上传',
                review:'评审',
                close:'关闭',
                accept:'接受',
                revise:'修改',
                comments:'留言',
                ua:'再次上传',
                pending:'等待'
            }
        },
        computed:{
            party:function () {
                return this.$store.state.saas.party
            }
        },
        methods:{
            closeImgPop:function () {
                this.uploadId = 0;
                this.uploadImgBase64 = '';
                this.uploadImgSrc = ''
            },
            imagesChange:function (val) {
                if(val[0].base64){
                    this.uploadImgBase64 = val[0].base64
                }
                if(val[0].src){
                    this.uploadImgSrc = val[0].src
                }
            },
            submitImgUrl:function () {
                if(this.uploadImgSrc){
                    let data = {
                        mid:this.uploadId,
                        pic:this.uploadImgSrc
                    };
                    this.feedbackListP.forEach(feedback =>{
                        if(this.uploadId === feedback.id){
                            feedback.pics[2].src = this.uploadImgBase64;
                            feedback.status = 1;
                            this.$store.dispatch('saas/task/saveUploadImg',data).then((response) => {
                                //todo:添加错误提示
                            });
                            this.closeImgPop()
                        }
                    })
                }

            },
            bigImgPop:function (url) {
                if(url) {
                    this.reviewBigImg = url;
                    this.bigImgStatus = true;
                }
            },
            closeFeedbackPop:function () {
                this.uploadId = 0;
                this.failStr = ''
            },
            failSubmit:function () {
                if(this.failStr){
                    let data = {
                        mid:this.uploadId,
                        status:2,
                        desc:this.failStr
                    };
                    this.feedbackListP.forEach(feedback =>{
                        if(this.uploadId === feedback.id){
                            this.$store.dispatch('saas/task/passOrFail',data).then((response) => {
                                if(response.code === 200) {
                                    feedback.status = 3;
                                    feedback.description = this.failStr
                                }
                            })
                        }
                    });

                    this.closeFeedbackPop()
                }
            },
            passFeedback:function (id) {
                let data = {
                    mid:id,
                    status:1
                };
                this.feedbackListP.forEach(feedback =>{
                    if(feedback.id === id){
                        feedback.status = 2;
                        this.$store.dispatch('saas/task/passOrFail',data).then((response) => {
                        })
                    }
                })
            },
            goHistory:function (id) {
                this.$router.push({name:'feedbackList',params:{feedbackId:id}})
            }
        }
    }
</script>

<style scoped lang="scss">
.feedback-wrap{
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
    .feedback-list{
        padding:18px 20px;
        max-height: 500px;
        overflow: auto;
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
                        button{
                            display: block;
                            border-radius: 100px;
                            font-size: 16px;
                            width:100px;
                            height:30px;
                            cursor: pointer;
                            margin:0 auto;
                        }
                        .btn-pass{
                            border: 1px solid #EA6264;
                            color: #EA6264;
                            background-color:#fff;
                        }
                        .btn-fail{
                            background-color: #2CBE42;
                            color: #fff;
                            margin-top:15px;
                            border:none;
                        }
                        .btn-fail,.btn-pass{
                            &[disabled]{
                                background: #D8D8D8;
                                color:#fff;
                                border: none;
                            }
                        }
                        .upload-btn{
                            height:30px;
                            border: 1px solid #EA6264;
                            border-radius: 100px;
                            font-size: 14px;
                            color: #EA6264;
                            background-color:#fff;
                        }
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
                        .close{
                            font-size: 14px;
                            color: #7A7A7A;
                        }
                        .img-upload-pop{
                            position: absolute;
                            width:275px;
                            background-color:#fff;
                            border: 1px solid #E0E0E0;
                            box-shadow: 0 2px 8px 0 rgba(189,189,189,0.50);
                            border-radius: 5px;
                            padding:28px 25px 10px;
                            right:108px;
                            top:50%;
                            transform: translateY(-50%);
                            &:after{
                                content:'';
                                display: block;
                                position: absolute;
                                width:20px;
                                height:12px;
                                background: url(../../../assets/images/triangle.png) no-repeat;
                                top:50%;
                                margin-top:-5px;
                                right:-13px;
                                transform:rotate(90deg);
                            }
                            >img{
                                display: block;
                                width:10px;
                                height:10px;
                                position: absolute;
                                right:12px;
                                top:12px;
                            }
                            >button{
                                display: block;
                                font-size: 14px;
                                color: #EA6264;
                                border: 1px solid #EA6264;
                                border-radius: 5px;
                                background-color:#fff;
                                width:75px;
                                height:25px;
                                margin-top: 10px;
                            }
                        }
                        .fail-pop{
                            position: absolute;
                            right: 0;
                            top: 50%;
                            transform: translateY(23px);
                            z-index: 10;
                            width: 500px;
                            height: 100px;
                            border: 1px solid #E0E0E0;
                            box-shadow: 0 2px 8px 0 rgba(189, 189, 189, 0.5);
                            border-radius: 5px;
                            background-color: #fff;
                            padding: 16px 15px;
                            >p{
                                font-size: 12px;
                                color: #515254;
                                text-align: left;
                                margin-bottom: 0;
                                width: 100%;
                                img{
                                    float: right;
                                    width:10px;
                                    height:10px;
                                }
                            }
                            >div{
                                align-items: center;
                                margin-top:10px;
                            }
                            textarea{
                                background: #fff;
                                border: 1px solid #E0E0E0;
                                border-radius: 4px;
                                padding:5px 10px;
                                font-size: 14px;
                                color: #515254;
                                width:710px;
                                height:50px;
                                resize: none;
                            }
                            button{
                                width:75px;
                                height:25px;
                                line-height: 25px;
                                border: 1px solid #2CBE42;
                                border-radius: 5px;
                                color:#2CBE42;
                                font-size: 14px;
                                background-color: #fff;
                                margin-left:15px;
                            }
                            &:after{
                                content: '';
                                display: block;
                                position: absolute;
                                width:20px;
                                height:12px;
                                background: url(../../../assets/images/triangle.png) no-repeat;
                                top:-9px;
                                right: 38px;
                            }
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
            .feedback-name{
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
}
</style>