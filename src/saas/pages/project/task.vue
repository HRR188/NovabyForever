<template>
    <div class="saas-task-wrap">
        <loading ref="loading" class="flex" style="flex-wrap: wrap">
            <template v-if="models.length">
                <saas-wrapper v-if="projectMessage.length" style="margin-bottom: 10px;">
                    <saas-title title="Delivery Status"></saas-title>
                    <div class="msg-container">
                        <p>{{projectMessage}}</p>
                        <router-link :to="{name:'saasResult'}">Go Result</router-link>
                    </div>
                </saas-wrapper>
                <saas-wrapper class="model-list">
                    <p class="p-title">{{translate('ml')}} ({{models.length}})</p>
                    <ul>
                        <li
                                class="pointer p-one-line"
                                v-for="model in models"
                                :class="{active:selectedModelId === model.id}"
                                @click="selectModel(model.id,model.status)"
                        >
                            <p>{{model.name}}</p>
                            <button v-if="getModelStatus(model.status)">{{getModelStatus(model.status)}}</button>
                        </li>
                    </ul>
                </saas-wrapper>
                <saas-wrapper class="model-detail">
                    <saas-title :title="translate('mv')"></saas-title>
                    <div style="padding:10px 20px 10px;">
                        <template v-if="!projectStatus">
                            <div class="model-none flex" style="display: flex;justify-content: center;align-items: center;height: 100%">
                                <p v-lang.p3></p>
                            </div>
                        </template>
                        <template v-else>
                            <div v-if="modelStatus === 0 && !canUploadModel" class="model-none flex" style="display: flex;justify-content: center;align-items: center;height: 100%">
                                <p v-lang.p1></p>
                            </div>
                            <div class="upload-box"  v-if="(modelStatus === 0 || modelStatus === 7) && canUploadModel">
                                <saas-model-upload
                                        ref="fileupload"
                                        :maxQuantity="1"
                                        :uploadTo="'backend'"
                                        :autoUpload="false"
                                        :type="'model'"
                                        :checkFilesInZip="true"
                                        @fileStatusChange="modelStatusChange"
                                >
                                </saas-model-upload>
                                <div class="concepts">
                                    <p class="tag-name">Rendering and Snapshots</p>
                                    <project-image
                                            :maxQuantity="1000"
                                            :type="'image'"
                                            :uploadTo="'cloud'"
                                            :saveImageSrc="true"
                                            :atLeastOneFile="false"
                                            @fileStatusChange="imagesChange"
                                    >
                                    </project-image>
                                </div>
                                <p v-show="isFinal" class="tag-name" style="margin-bottom: 20px">Drag or upload attachment</p>
                                <project-file-upload
                                        v-show="isFinal"
                                        ref="attachUpload"
                                        :type="'file'"
                                        :uploadTo="'cloud'"
                                        :maxQuantity="100"
                                        @fileStatusChange="attachFilesStatusChange"
                                ></project-file-upload>
                                <div class="is-submission">
                                    <label class="input-checkbox-sm">
                                        <input type="checkbox" name="final" v-model="isFinal">{{translate('asf')}}
                                    </label>
                                </div>
                            </div>
                            <div v-if="modelStatus === 1"  class="model-processing flex">
                                <p v-lang.p4></p>
                            </div>
                            <div v-if="modelStatus === 3" class="model-convert-fail flex">
                                <p>Model conversion failed, please upload again</p>
                                <button class="btn btn-default-border" @click="updateModel">Re-upload</button>
                            </div>
                            <template v-if="modelStatus === 2 || modelStatus === 4 || modelStatus === 5 || modelStatus === 6">
                                <div class="model-name-box" v-if="modelDetail.model_3d">
                                    <p class="model-name">{{modelDetail.name}}</p>
                                </div>
                                <div class="model-view" v-if="modelDetail.model_3d">
                                    <div class="model-container">
                                        <three-d ref="threeD" :modelFile="modelDetail.model_3d" :id="selectedModelId" :showFullScreenBtn="true" :showAnnoBtn="false" :refreshAfterLeave="false"></three-d>
                                    </div>
                                </div>
                                <div class="concepts" :class="{'none-border':!modelDetail.model_3d}" v-show="conceptsImg.length">
                                    <p class="tag-name" v-lang.rs></p>
                                    <div class="imgs">
                                        <div class="img" v-for="img in conceptsImg" :style="{backgroundImage:`url(${img})`}" @click="bigImgPop(img)">
                                        </div>
                                        <div class="img" v-for="img in fakeImg"></div>
                                    </div>
                                </div>
                                <!--<div class="attachments" v-if="modelAttach.length">-->
                                    <!--<p class="tag-name">Attachments</p>-->
                                    <!--<a v-for="file in modelAttach" :href="file.url">{{file.name}}</a>-->
                                <!--</div>-->
                            </template>
                            <div class="c-btns">
                                <button v-if="(modelStatus === 4 || modelStatus === 6) && canUploadModel " class="btn btn-default" v-lang.update @click="updateModel"></button>
                                <button v-if="modelStatus === 4 && canAnnoModel" class="btn btn-default-border" @click="chooseAnnoType" v-lang.an></button>
                                <button v-if="modelStatus === 2 && canUploadModel" class="btn btn-default" @click="publishModel" v-lang.publish></button>
                                <button v-if="modelStatus === 2 && canUploadModel" class="btn btn-default-border" @click="updateModel" v-lang.ru></button>
                                <button v-if="(modelStatus === 0 || modelStatus === 7) && canUploadModel"  class="btn btn-default upp" @click="submitModel" v-lang.submit></button>
                                <!--<button v-if="(modelStatus === 0 || modelStatus === 7) && !partyBSubmit && canUploadModel"  class="btn btn-default upp" @click="startUpload"  :disabled="disableUpload" v-lang.upload></button>-->
                                <button v-if="(modelStatus === 0 || modelStatus === 7) && canUploadModel"  class="btn btn-default-border upp" @click="cancelUpload"  v-lang.cancel></button>
                                <button v-if="isFinal && canCheckModel && modelStatus === 4"  class="btn btn-default upp" @click="acceptModel()" v-lang.accept></button>
                            </div>
                            <div class="choose-anno-type" v-show="showChooseAnnoType" @click.stop="showChooseAnnoType = false">
                                <div class="anno-types">
                                    <p class="anno-title">Select the Annotation type</p>
                                    <div class="anno-type three-d">
                                        <p class="pointer" @click="addFeedback">3D Model</p>
                                    </div>
                                    <div class="anno-type two-d">
                                        <p class="pointer" @click="add2dAnno">Renderings and Snapshots</p>
                                    </div>
                                </div>
                            </div>
                        </template>
                    </div>
                </saas-wrapper>
            </template>
            <template v-else>
                <saas-wrapper class="none-specification">
                    <p>This project is still on bidding.</p>
                </saas-wrapper>
            </template>
            <div class="big-review-img flex" v-if="bigImgStatus">
                <span class="pointer" @click="bigImgStatus = false"></span>
                <img :src="reviewBigImg" alt="">
            </div>
        </loading>
    </div>
</template>
<script>
    import saasWrapper from '../../components/saasWrapper.vue'
    import saasTitle from '../../components/saasTitle.vue'
    import feedback from '../../components/task/feedback.vue'
    import threeD from '../../../components/threeD/threeD.vue'
    import saasModelUpload from '../../../components/fileUpload/saasModelUpload.vue'
    import projectImage from '../../../components/imageUpload/projectConceptImgUpload'
    import loading from '../../components/loading.vue'
    import projectFileUpload from '../../../components/fileUpload/projectsFileUpload'

    export default {
        name:'saasTask',
        props:['id'],
        components:{
            saasWrapper,
            saasTitle,
            feedback,
            threeD,
            saasModelUpload,
            loading,
            projectImage,
            projectFileUpload
        },
        data(){
            return{
                projectStatus:false,
                models:[],
                selectedModelId:0,
                modelDetail:{},
                isFinal:false,
                previousModelStatus:0,
                partyBSubmit:false,
                disableUpload:true,
                disableCancel:true,
                canCheckModel:false,
                canAnnoModel:false,
                canUploadModel:false,
                modelStatus:0,
                projectMessage:'',
                showChooseAnnoType:false,
                concepts:[],
                conceptsImg:[],
                modelAttach:[],
                bigImgStatus:false,
                imageStatus:false,
                attachFiles:[],
                attachStatus:false
            }
        },
        computed:{
            fakeImg:function () {
                return this.conceptsImg.length % 4 === 0?0:4 - this.conceptsImg.length % 4
            }
        },
        messages:{
            en:{
                ml:'Model list',
                mv:'Model viewer',
                p1:'The designer will upload the model and display it here',
                fbh:'Feedback will be displayed here',
                fl:'Feedback list',
                p2:'Do you want to fail this project？',
                fail:'Fail',
                p3:'The project is still in its bidding stage.',
                p4:'Model in processing, please wait... \n Remember to publish after completion',
                p5:'Model translate fail, please double check your model file',
                asf:'Final submission',
                lf:'Leave feedback',
                accept:'Accept',
                update:'Update',
                ru:'Re-upload',
                an:'Annotation',
                publish:'Publish',
                rs:'Renderings and Snapshots'
            },
            zh:{
                ml:'模型列表',
                mv:'模型查看器',
                p1:'艺术家上传的模型将被展示在这里。',
                fbh:'模型的标注将会展示在这里',
                fl:'标注列表',
                p2:'判定这个项目失败？',
                fail:'确认失败',
                p3:'这个项目还在竞价阶段',
                p4:'模型正在转换，请等待。。。',
                p5:'模型转换失败，请重新上传',
                asf:'作为最终文件上传',
                lf:'添加标注',
                accept:'接受',
                update:'更新',
                ru:'重新上传',
                an:'标注',
                publish:'发布',
                rs:'模型渲染图'
            }
        },
        created(){
            this.init()
        },
        watch:{
            selectedModelId:function (val) {
                this.getModelData(val)
            },
            $route:function () {
                location.reload()
            }
        },
        methods:{
            init(){
                let _this = this;
                this.$store.dispatch('saas/task/getList',this.id).then(response => {
                    if(response.code === 200){
                        _this.projectStatus = response.data.project_status;

                        if(this.projectStatus){
                            _this.projectMessage = response.data.result;
                            _this.models = response.data.models;
                            let modelId = +_this.$route.params.modelId;
                            let contentModel = false;
                            _this.models.forEach(model => {
                                if(modelId === model.id){
                                    contentModel = true
                                }
                            });
                            if(!contentModel){
                                _this.$router.replace({name:'saasTask',params:{modelId:_this.models[0].id}});
                                return;
                            }
                            _this.selectedModelId = modelId;
                            _this.canCheckModel = response.data.functions.checkModel.operate;
                            _this.canAnnoModel = response.data.functions.markModel.operate;
                            _this.canUploadModel = response.data.functions.uploadModel.operate;
                        }
                        _this.$refs.loading.showSlots();
                    }
                });
            },
            changeModelsStatus:function (id,status) {
                this.models.forEach(model => {
                    if(model.bd_id === id){
                        model.bd_pub = status
                    }
                })
            },
            getModelStatus:function (status) {
                if(this.language === 'zh'){
                    switch (status){
                        case 1:
                            return '处理中';
                        case 2:
                            return '转换完成';
                        case 3:
                            return '转换失败';
                        case 4:
                            return '已接受';
                        case 5:
                            return '已拒绝';
                        default:
                            break;
                    }
                }
                else{
                    switch (status){
                        case 1:
                            return 'processing';
                        case 2:
                            return 'finished';
                        case 3:
                            return 'fail';
                        case 4:
                            return 'accepted';
                        case 5:
                            return 'reversed';
                        default:
                            break;
                    }
                }
            },
            selectModel:function (modelId) {
                this.$router.push({name:'saasTask',params:{modelId}});
            },
            getModelData:function () {
                let _this = this;
                this.$store.dispatch('saas/task/getModelDetails',this.selectedModelId).then(response => {
                    _this.modelDetail = response;
                    _this.modelStatus = response.status;
                    _this.isFinal = response.is_final;
                    _this.conceptsImg = response.model_2d || [];
                    _this.modelAttach = response.model_attach || []
                })
            },
            updateModel:function () {
                this.previousModelStatus = this.modelStatus;
                this.modelStatus = 0
            },
            startUpload:function () {
                this.$refs.fileupload.startUpload();
            },
            cancelUpload:function () {
                if(this.previousModelStatus === 0){
                    this.disableUpload = true;
                    this.disableCancel = true;
                    this.$refs.fileupload.cancelUpload();
                }
                this.modelStatus = this.previousModelStatus;
            },
            wrongFile:function () {
                this.disableUpload = true;
                this.disableCancel = false
            },
            submitModel:function () {
                let photos = [];
                this.concepts.forEach(function (img) {
                    photos.push({src:img.getSrc,size:img.getSize})
                });
                if(!this.partyBSubmit && !photos.length){
                    this.$alert({type:'alert',message:'Please upload images or 3d model'});
                    return;
                }
                let files = [];
                this.attachFiles.forEach(file => {
                    files.push({
                        src:file.getSrc,
                        size:file.getSize
                    })
                });
                if(!this.partyBSubmit && this.isFinal && !files.length){
                    this.$alert({type:'alert',message:'Please upload 3d model zip file in attachments'});
                    return;
                }
                let data = {
                    id:this.selectedModelId,
                    isFinal:this.isFinal?1:0,
                    photos,
                    is_3d:this.partyBSubmit,
                    files
                };
                this.$store.dispatch('saas/task/taskPartyBSubmit',data).then(response => {
                    if(this.partyBSubmit){
                        this.modelStatus = 1
                    }
                    else{
                        this.getModelData()
                    }
                });
            },
            publishModel:function () {
                this.$store.dispatch('saas/task/modelPublish',{id:this.selectedModelId}).then(response => {
                    this.modelStatus = 4;
                });
            },
            addFeedback:function () {
                this.$refs.threeD.goAnno()
            },
            add2dAnno:function () {
                this.$router.push({name:'twoDAnno',params:{id:this.$route.params.modelId}})
            },
            acceptModel:function () {
                let data = {
                    id:this.selectedModelId
                };
                let acceptStatus = 0; //已经有几个模型通过了
                this.models.forEach((item) => {
                    if(item.bd_pub === 5) {
                        acceptStatus++
                    }
                });
                if((this.models.length - 1) === acceptStatus) {
                    this.$alert({type:'confirm',message:'This model is the last one, do you want to approval this model?',confirmTxt:'Approval',cancelTxt:'Reversed',redMsg:'Approval means the current model will be finalized.'}).then((response) => {
                        if(response.data === 'confirm'){
                            data.result = 1;
                            this.$store.dispatch('saas/task/partyAaccept',data).then((response) => {
                                if(response.code === 200) {
                                    this.$router.push({name:'saasResult'})
                                }
                            });
                        }
                        else{
                            data.result = 2;
                            this.$store.dispatch('saas/task/partyAaccept',data).then((response) => {
                                this.isFinal = 0
                            });
                        }
                    });
                }
                else {
                    this.$alert({type:'confirm',message:'Do you want to approval this model?',confirmTxt:'Approval',cancelTxt:'Reversed',redMsg:'Approval means the project has been done, the modeler will receive payment.'}).then((response) => {
                        if (response.data === 'confirm') {
                            data.result = 1;
                            this.$store.dispatch('saas/task/partyAaccept',data).then((response) => {
                                if(response.code === 200) {
                                    this.modelStatus = 5
                                }
                            })
                        }
                        else{
                            data.result = 2;
                            this.$store.dispatch('saas/task/partyAaccept',data).then((response) => {
                                this.isFinal = 0
                            })
                        }
                    })
                }
            },
            getTime:function (time) {
                let reg = new RegExp('"',"g");
                let date = new Date(time*1000);
                return date.toString().replace(reg, "")
            },
            failPro:function () {
                this.$alert({type:'confirm',message:'Do you want to fail this project？'}).then((response) => {
                    if(response.data === 'confirm'){
                        this.$store.dispatch('saas/task/partyAFailPro',{id:this.id}).then((res) => {
                            if(res.code === 200) {
                                this.$router.push({name:'saasResult'})
                            }
                        })
                    }
                })
            },
            imagesChange:function ({data,status}) {
                this.concepts = data;
                this.imageStatus = status
            },
            chooseAnnoType:function () {
                if(this.modelDetail.model_3d && this.conceptsImg.length){
                    this.showChooseAnnoType = true
                }
                else if(this.modelDetail.model_3d){
                    this.addFeedback()
                }
                else{
                    this.add2dAnno()
                }
            },
            bigImgPop(url){
                if(url) {
                    this.reviewBigImg = url;
                    this.bigImgStatus = true;
                }
            },
            modelStatusChange({data}){
                if(data[0]){
                    if(data[0].status === 'waiting'){
                        this.$refs.fileupload.startUploadFile({modelId:this.selectedModelId,target:2});
                        this.partyBSubmit= false
                    }
                    else this.partyBSubmit = data[0].status === 'success';
                }
            },
            attachFilesStatusChange({data,status}){
                this.attachFiles = data;
                this.attachStatus = status
            }
        }
    }
</script>
<style lang="scss">
    .saas-task-wrap{
        .model-list{
            width: 26% !important;
            margin-right: 10px;
            .p-title{
                font-size: 16px;
                color: #4A4A4A;
                padding:0 20px;
                border-bottom: 1px solid #E8E8E8;
                line-height: 47px;
            }
            ul {
                padding:0 20px;
                li{
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    position: relative;
                    margin-top: 12px;
                    p{
                        font-size: 14px;
                        color: #4A4A4A;
                        letter-spacing: 0;
                        flex: 1;
                        overflow:hidden;
                        white-space:nowrap;
                        text-overflow:ellipsis;
                    }
                    button{
                        padding:0 20px;
                        height: 20px;
                        border: 1px solid #979797;
                        border-radius: 100px;
                        font-size: 10px;
                        color: #959595;
                        background-color: #fff;
                        -webkit-transform: scale(0.85);
                        transform: scale(0.85);
                    }
                    &.active{
                        p{
                            color: #EA6264;
                        }
                        button{
                            color: #EA6264;
                            border: 1px solid #EA6264;
                        }
                    }
                    &:hover{
                        p{
                            color: #EA6264;
                        }
                        button{
                            color: #EA6264;
                            border: 1px solid #EA6264;
                        }
                    }
                }
            }
        }
        .model-detail{
            flex:1;
            .model-name-box{
                margin-top: 8px;
                margin-bottom: 8px;
                .model-name{
                    font-size: 14px;
                    color: #4A4A4A;
                    letter-spacing: 0;
                    margin-bottom: 4px;
                }
                .model-time{
                    font-size: 10px;
                    color: #959595;
                    letter-spacing: 0;
                }
            }
            .model-view{
                width: 100%;
                padding-top: 60%;
                position: relative;
                margin-bottom: 30px;
                .model-container{
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    left:0;
                    top:0;
                }
            }
            .model-processing,.model-none,.model-convert-fail{
                height:100%;
                font-size: 16px;
                color: #ADADAD;
                justify-content: center;
                align-items: center;
                padding-top: 150px;
                padding-bottom: 150px;
            }
            .model-processing{
                p:before{
                    content:'';
                    display: block;
                    width:78px;
                    height:78px;
                    background: url(../../../assets/images/model-processing.png) no-repeat;
                    margin:0 auto 30px;
                }
            }
            .model-convert-fail{
                flex-wrap: wrap;
                .btn{
                    margin-top: 87px;
                    width: 107px;
                    height: 34px;
                }
                p{
                    text-align: center;
                    width: 100%;
                }
                p:before{
                    content:'';
                    display: block;
                    width:78px;
                    height:78px;
                    background: url(../../../assets/images/saas/icon_convert_fail.png) no-repeat;
                    margin:0 auto 30px;
                }
            }
            .model-none{
                p:before{
                    content:'';
                    display: block;
                    width:85px;
                    height:85px;
                    background: url(../../../assets/images/model-upload-none.png) no-repeat;
                    margin:0 auto 30px;
                }
            }
            .upload-box{
                padding:20px;
                .is-submission{
                    margin-top:20px;
                    label{
                        font-size: 16px;
                        color: #515254;
                    }
                }
            }
            .concepts{
                border-top: #E8E8E8 1px solid;
                padding-top: 10px;
                .tag-name{
                    margin-bottom: 12px;
                    font-size: 16px;
                    color: #4A4A4A;
                }
                .imgs{
                    display: flex;
                    justify-content: space-between;
                    flex-wrap: wrap;
                    .img{
                        width: 24%;
                        padding-top: 15%;
                        background-size: cover;
                        background-position: center;
                        margin-bottom: 10px;
                    }
                }
                &.none-border{
                    border:none;
                }
            }
            .attachments{
                .tag-name{
                    margin-bottom: 12px;
                    font-size: 16px;
                    color: #4A4A4A;
                }
                a{
                    font-size: 14px;
                    color: #EA6264;
                    line-height: 19px;
                    width: 100%;
                    display: block;
                    margin-bottom: 22px;
                }
            }
            .choose-anno-type{
                position: fixed;
                width: 100%;
                height: 100%;
                background-color: rgba(0,0,0,.5);
                top:0;
                left:0;
                z-index: 102;
                display: flex;
                justify-content: center;
                align-items: center;
                .anno-types{
                    width: 425px;
                    background: #FFFFFF;
                    border-radius: 4px;
                    padding:50px;
                    .anno-title{
                        font-size: 20px;
                        color: #2A2A36;
                        margin-bottom: 33px;
                        text-align: center;
                    }
                    .anno-type{
                        width: 100%;
                        height: 70px;
                        border-radius: 4px;
                        padding-left: 28px;
                        display: flex;
                        align-items: center;
                        p{
                            line-height: 70px;
                            width: 100%;
                            font-size: 18px;
                        }
                        &.three-d{
                            border: 1px solid #EA6264;
                            margin-bottom: 12px;
                            color: #EA6264;
                            &:hover{
                                background: rgba(234,98,100,0.10);
                            }
                            &:before{
                                content:url("../../../assets/images/saas/icon_anno_3d.png");
                                width: 24px;
                                margin-right: 27px;
                            }
                        }
                        &.two-d{
                            border: 1px solid #F57F23;
                            color: #F57F23;
                            &:hover{
                                background: rgba(245,127,35,0.10);
                            }
                            &:before{
                                content:url("../../../assets/images/saas/icon_anno_2d.png");
                                width: 24px;
                                margin-right: 27px;
                            }
                        }
                    }
                }
            }
        }
        .none-specification{
            display: flex;
            p{
                text-align: center;
                width: 100%;
                margin:200px 0;
            }
        }
        .c-btns{
            display: flex;
            justify-content: center;
            margin: 40px 0;
            .btn{
                width: 107px;
                height: 34px;
                margin:0 10px;
            }
        }
        .msg-container{
            padding:20px;
            font-size: 16px;
            color: #4A4A4A;
            display: flex;
            p{
                width: 884px;
            }
            a{
                font-size: 16px;
                color: #EA6264;
                margin-left: auto;
            }
        }
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
    }
</style>