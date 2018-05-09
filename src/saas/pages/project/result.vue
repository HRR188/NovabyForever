<template>
    <div class="saas-result-wrap">
        <loading ref="loading">
            <saas-wrapper>
                <saas-title :title="translate('rate')"></saas-title>
                <template v-if="projectStatus === 2">
                    <template v-if="canMark">
                        <div class="stars-wrap">
                            <p class="pass-icon" v-if="passStatus === 'pass'" v-lang.pass></p>
                            <p class="fail-icon" v-else v-lang.fail></p>
                            <div>
                                <p>{{translate('time')}}:</p>
                                <stars :score="time" :type="true" @startNum="timeScoring"></stars>
                                <p>{{translate('quality')}}:</p>
                                <stars :score="quality" :type="true" @startNum="qualityScoring"></stars>
                                <p>{{translate('communication')}}:</p>
                                <stars :score="communication" :type="true" @startNum="communicationScoring"></stars>
                            </div>
                            <span class="tips" v-lang.p1></span>
                        </div>
                        <div class="file-des">
                            <textarea v-model="failStr" :placeholder="translate('lm')"></textarea>
                        </div>
                        <div class="form-footer flex">
                            <button class="btn btn-default upp" @click="submitResult" v-lang.submit></button>
                        </div>
                    </template>
                    <template v-else>
                        <div class="stars-wrap">
                            <p class="pass-icon" v-if="passStatus === 'pass'" v-lang.pass></p>
                            <p class="fail-icon" v-else v-lang.fail></p>
                            <p class="notice" v-if="projectType" v-lang.p2></p>
                            <p class="notice" v-else v-lang.p3></p>
                        </div>
                    </template>
                </template>
                <div class="result-none" v-if="projectStatus === 1">
                    <div>
                        <p class="text-center">
                            <img src="../../../assets/images/result-none.png" alt="">
                            {{translate('wpc')}}
                        </p>
                    </div>
                </div>
                <div v-if="projectStatus === 4" class="stars-wrap">
                    <p class="pass-icon" v-if="passStatus === 'pass'" v-lang.pass></p>
                    <p class="fail-icon" v-else v-lang.fail></p>
                    <div>
                        <p>{{translate('time')}}:</p>
                        <stars :score="time" :type="false"></stars>
                        <p>{{translate('quality')}}:</p>
                        <stars :score="quality" :type="false"></stars>
                        <p>{{translate('communication')}}:</p>
                        <stars :score="communication" :type="false"></stars>
                    </div>
                    <div class="description">{{failStr}}</div>
                </div>
                <div class="overdue" v-if="projectStatus === 3">
                    <template v-if="canMark">
                        <p class="red" v-lang.p4></p>
                        <p style="margin-top: 8px;" v-lang.notice></p>
                        <p v-lang.p5></p>
                        <button class="btn btn-default" @click="markFail" v-lang.fail></button>
                    </template>
                    <template v-else>
                        <p class="red" v-lang.p6></p>
                        <p  style="margin-top: 8px;" v-lang.notice></p>
                        <p v-lang.p7></p>
                    </template>
                </div>
            </saas-wrapper>
            <saas-wrapper class="download-file" v-if="(projectStatus === 4 || (!projectType && projectStatus === 2)) && canDownload">
                <saas-title :title="translate('download')"></saas-title>
                <template v-if="fileList && fileList.length">
                    <p class="tag">3D model</p>
                    <ul>
                        <li v-for="item in fileList">
                            <a :href="item.url" target="_blank">
                                {{item.name}}({{parseInt(item.size / 1024) + 'kb'}})
                            </a>
                        </li>
                    </ul>
                </template>
                <template v-if="conceptList && conceptList.length">
                    <p class="tag">Renderings and Snapshots</p>
                    <ul>
                        <li v-for="item in conceptList">
                            <a :href="item.url" target="_blank">
                                {{item.name}}({{parseInt(item.size / 1024) + 'kb'}})
                            </a>
                        </li>
                    </ul>
                </template>
                <template v-if="attachmentList && attachmentList.length">
                    <p class="tag">Attachments</p>
                    <ul>
                        <li v-for="item in attachmentList">
                            <a :href="item.url" target="_blank">
                                {{item.name}}({{parseInt(item.size / 1024) + 'kb'}})
                            </a>
                        </li>
                    </ul>
                </template>
            </saas-wrapper>
        </loading>
    </div>
</template>
<script>
    import saasTitle from '../../components/saasTitle.vue'
    import saasWrapper from '../../components/saasWrapper'
    import stars from '../../../components/commons/Stars.vue'
    import loading from '../../components/loading.vue'

    export default {
        name:'saasResult',
        components:{
            saasTitle,
            stars,
            loading,
            saasWrapper
        },
        data(){
            return {
                time:0,
                quality:0,
                communication:0,
                failStr:'',
                fileList:[],
                conceptList:[],
                attachmentList:[],
                projectStatus:0,
                canMark:false,
                canDownload:false,
                passStatus:'',
                projectType:false
            }
        },
        messages:{
            en:{
                wpc:'Waiting for project completion',
                rate:'Rate',
                pass:'Pass',
                fail:'Fail',
                time:'Time',
                quality:'Quality',
                communication:'Communication',
                lm:'leave your comments here',
                download:'Download',
                notice:'Notice: ',
                p1:'Tips：if you don’t review in 5 days, it will be a pass automatically',
                p2:'The current project has been completed, system is waiting for comment.',
                p3:'The current project has been completed.',
                p4:'The current project is overdue, do you want to close the whole project?',
                p5:'You could close the project, which means that the whole project is over. You can not download any model files after project closed, and modeler will not be able to get the payment. It is suggested to negotiate with modeler before you close it.',
                p6:'The current project is overdue, please keep communicate with requestor.',
                p7:'Requestor may close the project, which means that the whole project is over. Requestor can not download any model files after project closed, and you will not be able to get the payment. It is suggested to negotiate with requestor as soon as possible to avoid this happened.'
            },
            zh:{
                wpc:'等待项目完成',
                rate:'评分',
                pass:'通过',
                fail:'失败',
                time:'项目时间',
                quality:'项目质量',
                communication:'项目沟通',
                lm:'在这里写下你的留言',
                download:'下载',
                notice:'注意：',
                p1:'提示：5天后自动会被通过',
                p2:'当前项目已完结，正在等待甲方评价。',
                p3:'当前项目已完结.',
                p4:'当前项目已逾期，是否关闭整个项目？',
                p5:'你可以将已逾期的项目关闭，关闭项目意味着整个项目结束，你将无法下载任何模型文件，模型师也将无法结算款项。建议首先进行协商，再做决定。',
                p6:'当前项目已逾期，请与甲方及时沟通。',
                p7:'甲方可以将已逾期的项目关闭，关闭项目意味着整个项目结束，甲方无法下载任何模型文件，你也将无法结算款项。建议尽快与甲方进行协商，避免误会。'
            }
        },
        props:{
            id:{
                required:true
            }
        },
        created(){
            let data = {
                id:this.id
            };
            this.$store.dispatch('saas/result/getResult',data).then((response) => {
                if(response.code === 200){
                    debugger
                    this.projectStatus = response.data.status;
                    this.canDownload = response.data.functions.downloadModel.read;
                    this.canMark = response.data.functions.score.operate;

                    this.fileList = response.data.file.model;
                    this.conceptList = response.data.file.concept;
                    this.attachmentList = response.data.file.attach;


                    this.time = parseInt(response.data.result.time);
                    this.quality = parseInt(response.data.result.quality);
                    this.communication = parseInt(response.data.result.commucation);
                    this.failStr = response.data.result.comment;
                    this.passStatus = response.data.result.rate;

                    this.projectType = response.data.type;

                    this.$refs.loading.showSlots();
                }
                else{
                    this.$router.replace({name:'permissionDenied'})
                }
            })
        },
        methods:{
            timeScoring(val){
                this.time = parseInt(val)
            },
            qualityScoring(val){
                this.quality = parseInt(val)
            },
            communicationScoring(val){
                this.communication = parseInt(val)
            },
            submitResult(){
                let data = {
                    id:this.id,
                    rate_time:this.time,
                    rate_quality:this.quality,
                    rate_communication:this.communication,
                    comment:this.failStr
                };
                this.$store.dispatch('saas/result/submitResult',data).then((response) => {
                    this.projectStatus = 4
                });
            },
            async markFail(){
                let result = await this.$store.dispatch('saas/result/markFail',{id:this.id});
                if(result.code === 200){
                    this.passStatus = 'fail';
                    this.projectStatus = 2
                }
            }
        }
    }
</script>
<style lang="scss">
    .saas-result-wrap{
        .saas-title{
            background-color:#fff;
        }
        .result-none{
            background-color: #fff;
            div{
                height:868px;
                padding-top:200px;
                p{
                    font-size: 24px;
                    color: #4A4A4A;
                    line-height: 103px;
                    img{
                        margin-right:50px;
                    }
                }
            }
        }
        .stars-wrap{
            padding:35px 20px 22px;
            background-color: #fff;
            .pass-icon{
                font-size: 22px;
                color: #EA6264;
                line-height: 42px;
                margin-bottom:25px;
                &:before{
                    content:'';
                    display: inline-block;
                    width:42px;
                    height:42px;
                    background: url(../../../assets/images/projects-sprite.png) -220px -83px no-repeat;
                    vertical-align: middle;
                    margin-right:25px;
                }
            }
            .fail-icon{
                font-size: 22px;
                color: #2CBE42;
                line-height: 42px;
                margin-bottom:25px;
                &:before{
                    content:'';
                    display: inline-block;
                    width:42px;
                    height:42px;
                    background: url(../../../assets/images/projects-sprite.png) -161px -83px no-repeat;
                    vertical-align: middle;
                    margin-right:25px;
                }
            }
            >div{
                display: flex;
                align-items: center;
                p{
                    font-size: 16px;
                    color: #4A4A4A;
                }
                .stars-container{
                    margin-right:38px;
                }
                img{
                    margin-left:15px;
                }
            }
            .tips{
                font-size: 12px;
                color: #9B9B9B;
                display: block;
                margin-top:50px;
            }
            .description{
                margin-top:25px;
                font-size: 12px;
                color: #7A7A7A;
            }
            .notice{
                font-size: 16px;
                color: #4A4A4A;
                letter-spacing: 0;
                margin:50px 0;
            }
        }
        .download-file{
            margin-top:10px;
            .tag{
                font-size: 16px;
                color: #4A4A4A;
                padding:20px;
            }
            ul{
                padding:0 20px 0;
                background-color: #fff;
                max-height:488px;
                overflow: auto;
                li{
                    font-size: 16px;
                    color: #EA6264;
                    margin-bottom:25px;
                    &:before{
                        content:'';
                        display: inline-block;
                        width:12px;
                        height:22px;
                        vertical-align: middle;
                        background: url(../../../assets/images/attachments.png);
                    }
                }
            }
        }
        .form-footer{
            padding:50px 0 80px;
            button{
                font-size: 16px;
                color: #fff;
                width:108px;
                height:35px;
            }
        }
        .file-des{
            background-color: #fff;
            padding:0 25px 0;
            textarea{
                display: block;
                width:100%;
                height:265px;
                resize: none;
                border: 1px solid #D2D2D2;
                border-radius: 4px;
                font-size: 14px;
                color: #9B9B9B;
                padding:15px;
            }

        }
        .overdue{
            padding:20px;
            p{
                font-size: 16px;
                color: #4A4A4A;
            }
            .red{
                color: #EA6264;
            }
            .btn{
                width: 107px;
                height: 34px;
                margin:65px auto 44px auto;
                font-size: 16px;
                display: block;
            }
        }
    }
</style>