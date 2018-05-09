<template>
    <div class="upload-project-container main">
        <div class="top-banner-warp position-relative">
            <img src="../../assets/images/models-bg.png" alt="" class="img-max">
            <div class="position-absolute">
                <h1 v-lang.um></h1>
            </div>
        </div>
        <div class="w-940 auto">
            <h1></h1>
            <template v-if="!twoD">
                <tag :tag="translate('title1')"></tag>
                <container class="model-file position-relative" :class="{error:errors[6],'custom-container-child':modelStatus}">
                    <file-upload
                            ref="fileupload"
                            :isModelFile="true"
                            :maxQuantity="1"
                            :type="['zip']"
                            :target="0"
                            :autoUpload="false"
                            :modelId="wid"
                            :requestModelName="modelNameList"
                            @canUpload="uploadOk"
                            @uploadSuccess="uploadSuccessFn"
                            @wrongFile="wrongFile"
                    ></file-upload>
                    <div class="file-btn-box text-right" v-if="fileBoxStatus === 0">
                        <span class="pointer" @click="twoD = true" v-if="onlyTwoDStatus" v-lang.justImage></span>
                        <button style="margin-right:20px;" type="button" class="btn btn-default upp" :disabled="fileUploadStatus" @click="startUpload">{{uploadBtnText}}</button>
                        <button v-if="isOnReUpload"  type="button" class="btn btn-default upp" :disabled="!isOnReUpload" @click.stop="cancelReUpload" v-lang.cancel></button>
                        <button v-else  type="button" class="btn btn-default upp" :disabled="cancelStatus" @click.stop="cancelFn" v-lang.cancel></button>
                    </div>
                    <button class="repeat-btn btn btn-default-border" v-else-if="fileBoxStatus === 1" @click="reUpload" v-lang.rr></button>
                </container>
            </template>
            <container class="model-file " :class="{error:errors[6],'custom-container-child':!errors[6]}" v-show="modeShow">
                <div class="model-note flex position-relative" v-if="modelFile.id">
                    <three-d :modelFile="modelFile" :id="wid" :showEditBtn="true"></three-d>
                </div>
                <p class="error-text" v-if="errors[6]">{{errors[6]}}</p>
            </container>
            <container class="model-file clearfix" v-show="modeShow">
                <p class="float-left" style="margin-right:15px;" v-lang.dp></p>
                <div class="float-left">
                    <label class="input-radio">
                        <input type="radio" v-model="modelPermit" name="permit" value="0">{{translate('no')}}
                    </label>
                    <label class="input-radio">
                        <input type="radio" v-model="modelPermit" name="permit" value="0">{{translate('yes')}}
                    </label>
                </div>
            </container>
            <div v-show="hasModel || twoD">
                <tag :tag="translate('name')"></tag>
                <container :class="{error:errors[1]}">
                    <input style="width:365px;" type="text" :placeholder="translate('plsInputName')" v-model="modelName">
                    <p class="error-text" v-if="errors[1]">{{errors[1]}}</p>
                </container>
                <tag :tag="translate('category')"></tag>
                <container class="category-warp" style="padding-bottom:15px" :class="{error:errors[2]}">
                    <label class="input-radio" v-for="item in categoryList">
                        <input v-model="modelCategory" type="radio" name="category" :value="item.cate_id"/>{{item.cate_name}}
                    </label>
                    <p class="error-text" v-if="errors[2]">{{errors[2]}}</p>
                </container>
                <tag :tag="translate('tag')"></tag>
                <container class="tags-warp" :class="{error:errors[3]}">
                    <!--<span @click="chooseTags(item)" v-for="item in tagsList" :class="{'active':item.status}">{{item.tag_name}}</span>-->
                    <label for="tag" class="tag-input-container">
                        <a class="pointer" v-for="ta in tags" @click="removeTag(ta)">
                            <span>{{ta}}</span>
                            <img src="../../assets/images/saas/icon-delete-tag.png" alt="">
                        </a>
                        <input id="tag" type="text" class="tag-input" @keyup.enter="addNewTag" @keyup.space="addNewTag" v-model="tag">
                    </label>
                    <p class="error-text" v-if="errors[3]">{{errors[3]}}</p>
                </container>
                <tag :tag="translate('license')"></tag>
                <container  :class="{error:errors[4]}">
                    <label class="input-radio" v-for="item in licenseList">
                        <input v-model="modelLicense" type="radio" name="license" :value="item.id"/>{{item.name}}
                    </label>
                    <p class="error-text" v-if="errors[4]">{{errors[4]}}</p>
                </container>
                <tag :tag="translate('picture')"></tag>
                <container :class="{error:errors[5]}">
                    <image-upload
                            v-if="isNewModel || picturesList.length"
                            :multipleImg="true"
                            :propImageList="picturesList"
                            @uploadingImgNumberChange="uploadingImgNumberChange"
                            @imagesChange="imagesChange"
                    ></image-upload>
                    <p class="error-text" v-if="errors[5]">{{errors[5]}}</p>
                </container>
                <tag :tag="translate('video')"></tag>
                <container :class="{error:errors[7],'custom-container-child':videoStr}">
                    <input style="width:100%" type="text" v-model="videoUrl" :placeholder="translate('videoP')">
                    <p style="font-size:12px;color: #ADADAD;margin-top:10px;" v-lang.exp></p>
                </container>
                <container v-if="videoStr" :class="{error:errors[7]}">
                    <div class="video-warp">
                        <iframe height="100%" width="100%" :src="videoStr" frameborder="0" allowfullscreen>
                        </iframe>
                    </div>
                    <p class="error-text" v-if="errors[7]">{{errors[7]}}</p>
                </container>
                <tag :tag="translate('desc')"></tag>
                <container :class="{error:errors[8]}">
                    <textarea class="description" v-model="description"></textarea>
                    <p class="error-text" v-if="errors[8]">{{errors[8]}}</p>
                </container>
                <div class="flex form-footer">
                    <button @click="submitModel" class="btn btn-175 btn-default upp" :disabled="!submitDisabled">{{submitMsg.text}}</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import tag from '../../components/novahub/tag.vue'
    import container from '../../components/novahub/container.vue'
    import modelConceptsUpload from '../../components/imageUpload/modelConceptsUpload.vue'
    import fileUpload from '../../components/fileUpload/modelUpload.vue'
    import threeD from '../../components/threeD/threeD.vue'
    export default {
        name: 'upload-new-project',
        data(){
            return {
                modelNameList:[],
                categoryList:[],
                tagsList:[],
                licenseList:[],
                modelName:'',
                modelCategory:'',
                modelTags:[],
                modelLicense:'',
                modelPermit:0,
                picturesList:[],
                videoUrl:'',
                videoStr:'',
                description:'',
                modelFile:{},
                modelData:{},
                uploadFile:{},
                isNewModel:true,  //是否是新上传模型 true不是  false 是
                modelStatus:0, //1：转换失败，2：模型转换成功 5:审核失败
                hasModel:false, //是否有模型   true是  false否
                modeShow:false, //模型是否展示   false隐藏  true显示
                uploadingImgNumber:0,
                wid:0,  //模型id
                errors:{},
                submitMsg:{
                    text:'Submit',
                    status:false
                },
                uploadBtnText:'Upload',
                uploadSuccess:false,
                uploadFail:false,
                errorMsg:'',
                auth:false ,  //区分是否是成为入驻模型师  false 不是
                twoD:false,
                fileUploadStatus:true,
                cancelStatus:true,
                onlyTwoDStatus:true,
                fileBoxStatus:0, // 0展示upload和cancel容器  1仅仅展示替换 其他都不处理
                tag:'',
                tags:[],
                isOnReUpload:false,
                isJoinArtist:0
            }
        },
        messages:{
            en:{
                um:'Upload a model',
                title1:'Model file(We will securely save your model file)',
                justImage:'Upload model pictures instead',
                plsInputName:'Please enter the model name',
                video:'Video(Optional but strongly recommended)',
                videoP:'Please paste YOUTUBE or YOUKU video link here and it will show automatically',
                desc:'Description(Optional)',
                exp:'Examples: https://www.youtube.com/watch?v=i5zVB_NwQEY',
                waiting:'Waiting',
                processing:'Processing',
                publish:'Publish',
                rr:'Re-upload',
                dp:'Download permit',
                yes:'Yes',
                no:'No'
            },
            zh:{
                yes:'是',
                no:'否',
                dp:'是否可以被下载',
                rr:'重新上传',
                um:'上传新模型',
                title1:'模型文件',
                justImage:'只上传模型图片',
                plsInputName:'请输入模型名称',
                video:'视频（可选但是强烈推荐）',
                videoP:'请将优酷或者youtube的视频地址粘贴到这里',
                desc:'描述（可选）',
                exp:'示例：https://www.youtube.com/watch?v=i5zVB_NwQEY',
                waiting:'请等待',
                processing:'下一步',
                publish:'发布'
            }
        },
        computed:{
            processDisabled(){
                return this.modelName && this.modelCategory && this.modelLicense && this.picturesList.length && !this.uploadingImgNumber
            },
            submitDisabled() {
                if(this.auth) {
                    return this.processDisabled && this.modelStatus !== 1
                }
                else {
//                return this.processDisabled && this.modelStatus !== 1
                    return this.processDisabled
                }
            }
        },
        watch:{
            videoUrl(val){
                let result;
                if(val.indexOf('youku.com') !== -1) { //如果是优酷的地址
                    val.replace(/id_(.*?).html/ig,(match, capture) => {
                        result = `http://player.youku.com/embed/${capture}`;
                        this.videoStr = result;
                    })
                }
                else if(val.indexOf('youtube.com') !== -1) {  //如果是youtube
                    let vid = val.split('?')[1].toString();
                    let id = vid.split('=')[1].toString();
                    result = `https://www.youtube.com/embed/${id}`;
                    this.videoStr = result
                }
                else {
                    this.videoStr = ''
                }
            }
        },
        components:{
            tag,
            container,
            imageUpload,
            fileUpload,
            threeD
        },
        created(){
            this.uploadBtnText = this.translate('upload');
            this.submitMsg.text= this.translate('publish');
            if(this.$route.name !== 'uploadNewModel' && this.$route.name !== 'joinArtistThree') {  //如果不是新上传模型
                this.isNewModel = false
            }
            if(this.$route.name === 'joinArtistThree') {
                this.onlyTwoDStatus = false;
                this.auth = true
            }
            this.$store.dispatch('modelAttr').then((response) => {
                this.categoryList = response.data.category;
                this.tagsList = response.data.tag;
                this.licenseList = response.data.licence
            });
            if(!this.isNewModel ) {
                let data = {
                    wid:this.$route.params.id
                };
                this.fileBoxStatus = 1;
                this.wid = parseInt(this.$route.params.id);
                this.$store.dispatch('uploadModel/getModelMessage',data).then((response) => {
                    if(response.code === 200) {
                        this.hasModel = true;
                        this.modelName = response.data.work.title;
                        this.modelCategory = response.data.work.cate;
                        this.modelLicense = response.data.work.license;
                        this.tags = response.data.work.tags;
                        this.modelPermit = response.data.work.permit;
                        this.videoStr = response.data.work.video;
                        this.description = response.data.work.description;
                        response.data.work.photos.forEach( photo => {
                            this.picturesList.push({
                                src:photo.src,
                                dir:photo.url,
                                iscover:photo.iscover,
                                size:photo.size,
                                percent:100,
                                width:photo.width,
                                height:photo.height
                            })
                        });
                        if(response.data.work.model){
                            this.modelData = response.data.work.model;
                            this.modelNameList.push(response.data.work.model.name);
                            this.modelFile = response.data.work.model.model_3d
                        }
                        if(response.data.work.has_error){
                            this.errors = response.data.work.errors;
                        }
                        this.modelPermit = response.data.work.permit;
                        this.videoUrl = response.data.work.video;
                        this.description = response.data.work.description;
                        this.modelStatus = response.data.work.status;
                        this.modeShow = true;
                        this.onlyTwoDStatus = false;
                        if(response.data.work.status === 2) {  //当模型转换成功的时候可以替换模型
                            if(this.language === 'en'){
                                this.uploadBtnText = 'Re-upload'
                            }
                            else if(this.language === 'zh'){
                                this.uploadBtnText = '再次上传'
                            }
                        }
                        this.isJoinArtist = response.data.work.auth_model
                    }
                })
            }
        },
        methods:{
            addNewTag:function () {
                if(this.checkDulpTag() < 0){
                    this.tags.push(this.tag);
                    this.tag = ''
                }
            },
            checkDulpTag:function () {
                return this.tags.indexOf(this.tag)
            },
            removeTag:function (tag) {
                this.tags.splice(this.tags.indexOf(tag),1)
            },
            cancelReUpload(){
                this.$refs.fileupload.cancel();
                this.cancelStatus = true;
                this.fileUploadStatus = true;
                this.isOnReUpload = false;
                this.modeShow = true;
                this.fileBoxStatus = 1
            },
            reUpload(){
                this.fileBoxStatus = 0;
                this.cancelStatus = false;
                this.modeShow = false;
                this.$refs.fileupload.deleteFile(0);
                this.isOnReUpload = true;
            },
            uploadOk(val){
                this.fileUploadStatus = val;
                this.cancelStatus = val
            },
            wrongFile:function () {
                this.cancelStatus = false
            },
            startUpload(){  //开始上传
                this.fileUploadStatus = true;
                this.$refs.fileupload.startUpload();
                this.onlyTwoDStatus = false;
                this.cancelStatus = true;
                this.fileBoxStatus = 2;
                this.hasModel = true
            },
            uploadSuccessFn(val){ //上传成功收到服务器相应
                this.wid = val;
                this.submitMsg.text = this.translate('processing');
                this.modeShow = false;
                // debugger
                this.isNewModel = true;
            },
            cancelFn(){
                this.$refs.fileupload.cancel();
                this.hasModel = false;
                // this.fileBoxStatus = 1;
                if(this.fileUploadStatus) {
                    this.modeShow = true;
                    this.hasModel = true
                }
            },
            saveUploadImg(imgData){
                this.picturesList = [];
                imgData.forEach((item) => {
                    let imgData = {
                        src:item.dir,
                        size:item.size
                    };
                    this.picturesList.push(imgData)
                })
            },
            chooseTags(data){
                data.status = !data.status;
                this.modelTags = [];
                this.tagsList.forEach((item => {
                    if(item.status) {
                        this.modelTags.push(item.tag_id)
                    }
                }))
            },
            submitModel(){
                let photoList = [];
                this.picturesList.forEach((item) => {
                    let msg = {
                        height:item.height,
                        iscover:item.iscover,
                        name:item.name,
                        size:item.size,
                        src:item.src,
                        width:item.width
                    };
                    photoList.push(msg)
                });
                let data = {
                    wid:this.wid,
                    name:this.modelName,
                    category:this.modelCategory,
                    tags:this.tags,
                    license:this.modelLicense,
                    rphotos:photoList,
                    permit:this.modelPermit,
                    type:1,
                    video_url:this.videoStr,
                    description:this.description,
                    auth:this.auth
                };
                let _this = this;
                if(!this.submitMsg.status) {
                    this.submitMsg.status = true;
                    // this.submitMsg.text = this.translate('waiting');
                    this.$store.dispatch('uploadModel/uploadModel',data).then((response) => {
                        if(response.code === 200) {
                            if(_this.hasModel) {  //如果有3d模型
                                _this.submitMsg.status = false;
                                if(!_this.isNewModel && this.isJoinArtist){
                                    _this.$router.replace({name:'joinArtistFour'});
                                }
                                else if(_this.isNewModel){
                                    _this.$router.replace({name:'UploadNewModelSuccess'});
                                }
                                else{
                                    _this.$router.replace({name:'UploadNewModelSuccess2',params:{id:response.data.wid}});
                                }
                            }
                            else {
                                _this.$router.replace({name:'UploadNewModelSuccess2',params:{id:response.data.wid}});
                            }
                        }
                        else {
                            if(_this.hasModel){  //如果有3d模型
                                if(_this.modelStatus === 2) {  //如果是转换成功的模型提交出错
                                    _this.submitMsg.text = this.translate('publish')
                                }
                                else {  // 如果是发布模型第一步提交出错
                                    _this.submitMsg.text = this.translate('processing')
                                }
                            }
                            else{
                                _this.submitMsg.text = this.translate('publish')
                            }
                        }
                        _this.submitMsg.status = false;
                    })
                }
            },
            uploadingImgNumberChange (value) {
                this.uploadingImgNumber = value
            },
            imagesChange (value) {
                this.picturesList = value
            }
        }
    }
</script>

<style lang="scss">
    .upload-project-container{
        .custom-container{
            position: relative;
            &.error{
                border: 1px solid #EA6264;
            }
            .error-text{
                font-size: 12px;
                color: #EA6264;
                position: absolute;
                bottom:-20px;
                left:0;
            }
        }
        .custom-container-child{
            margin-bottom:10px !important;
        }
        h1{
            font-size: 24px;
            color: #515254;
            margin:50px 0 60px;
            font-weight: normal;
        }
        .file-btn-box{
            margin-top:15px;
            span{
                font-size: 12px;
                color: #EA6264;
                text-decoration: underline;
                margin-right:40px;
            }
            button{
                font-size: 16px;
                width:108px;
                line-height: 35px;
            }
        }
        input[type="text"]{
            height:35px;
            background: #fff;
            border: 1px solid #D2D2D2;
            border-radius: 2px;
            font-size: 16px;
            color: #9B9B9B;
            padding:8px 10px;
        }
        .input-radio{
            font-size: 16px;
            color: #9B9B9B;
        }
        .category-warp{
            .input-radio{
                width: 160px;
                margin-bottom:25px;

            }
        }
        .tags-warp{
            .tag-input-container{
                background: #FFFFFF;
                border: 1px solid #D2D2D2;
                border-radius: 2px;
                display: flex;
                width: 100%;
                min-height: 40px;
                padding:5px 5px 0 5px;
                flex-wrap: wrap;
                a{
                    height: 30px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background: #9B9B9B;
                    border-radius: 2px;
                    padding:0 10px;
                    margin-right: 10px;
                    margin-bottom: 5px;
                    span{
                        font-size: 16px;
                        color: #FFFFFF;
                        margin-right: 8px;
                    }
                    image{
                        margin-top: 1px;
                        width: 8px;
                        height: 8px;
                    }
                }
                input{
                    border:none;
                    font-size: 16px;
                    color: #CDCDCD;
                    flex:1;
                    min-width: 50px;
                    height: 30px;
                    margin-bottom: 5px;
                }
            }
            /*span{*/
            /*display: inline-block;*/
            /*padding:5px 8px;*/
            /*font-size: 16px;*/
            /*color: #9B9B9B;*/
            /*border: 1px solid #9B9B9B;*/
            /*border-radius: 2px;*/
            /*cursor: pointer;*/
            /*margin:15px 25px 0 0;*/
            /*&:hover{*/
            /*background-color: #EA6264;*/
            /*border: 1px solid #EA6264;*/
            /*color:#fff;*/
            /*}*/
            /*&.active{*/
            /*background-color: #EA6264;*/
            /*border: 1px solid #EA6264;*/
            /*color:#fff;*/
            /*}*/
            /*}*/
        }
        .model-file{
            >p{
                font-size: 16px;
                color: #515254;
            }
            .model-note{
                width:100%;
                height:548px;
                background-color: #575761;
                font-size: 16px;
                color: #fff;
                align-items: center;
                justify-content: center;
                margin-top:18px;
                border-radius: 5px;
                position: relative;
                >img{
                    position: absolute;
                    left:50%;
                    margin-left:-58px;
                    bottom:42px;
                }
            }
            .repeat-btn{
                position: absolute;
                right:42px;
                top:42px;
                font-size: 16px;
                width:108px;
                line-height: 35px;
            }
        }
        .video-warp{
            width:100%;
            height:482px;
            background-color: #575761;
            border-radius: 5px;
        }
        textarea.description{
            width:100%;
            display: block;
            height:195px;
            background: #FFFFFF;
            border: 1px solid #D2D2D2;
            border-radius: 4px;
            resize: none;
            padding:15px;
            font-size: 16px;
            color: #4A4A4A;
        }
    }
</style>
