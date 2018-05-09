<template>
    <div class="create-model-container mark" @click="hideCategory">
        <!--upload model-->
        <div class="model-wrapper" v-if="!conceptsUpload && !uploaded">
            <p class="title" v-show="!startUpload">{{translate('createNewModel')}}</p>
            <file-upload
                    ref="fileupload"
                    :maxQuantity="1"
                    :uploadTo="'backend'"
                    :autoUpload="false"
                    :type="'model'"
                    :checkFilesInZip="true"
                    @canUpload="uploadOk"
                    @fileStatusChange="fileStatusChange"
                    :modelId="wid"
                    @uploadSuccess="uploadSuccessFn"
            ></file-upload>
            <div class="threed-instruction-container" v-show="!startUpload">
                <p class="black-font">{{translate('tipMessageTitle')}}</p>
                <p>{{translate('tipMessageModelType')}}</p>
                <p>{{translate('tipMessageModelFormat')}}</p>
                <p>{{translate('tipMessagePicType')}}</p>
            </div>
            <div class="threed-setting-container" v-show="startUpload">
                    <p class="name-title">
                        {{translate('modelName')}}
                        <input type="text" v-model="modelName" class="model-name-text">
                    </p>
                <div class="model-category">
                    <p class="category-title" v-if="language === 'zh'" >{{translate('category')}}&nbsp;&nbsp;</p>
                    <p class="category-title" v-else >{{translate('category')}}</p>
                    <p class="category-max" v-lang.categoryMax></p>
                </div>
                    <slide-down :defaultValue="translate('choose')"
                                :values="category"
                                :selectType="'multiple'"
                                ref="modelCategory"
                                class="slide-down">
                    </slide-down>
            </div>
            <div class="btns">
                <button v-show="!startUpload" class="btn btn-default" :disabled="fileUploadStatus" @click="startUploadModel" v-lang.continue></button>
                <button v-show="startUpload" class="btn btn-default"  :disabled="!canContinue" @click="saveInitModel()"  v-lang.continue></button>
                <button class="btn btn-default-border" @click="cancelUpload" v-lang.cancel>Cancel</button>
            </div>
            <a href="" @click.prevent="conceptsUpload = true" class="upload-2d" v-lang.upload2d
               v-show="showTwoDLink && typeof this.reupload_work_id  === 'object'">
            </a>
            <a class="upload-2d" v-show="showTwoDLink && typeof this.reupload_work_id  !== 'object'"></a>
        </div>
        <!--startTrans-->
        <div v-show="this.uploaded && this.modelStatus !== 1">
            <div class="model-wrapper trans-model">
            <p class="transformation" v-lang.transformation></p>
            <div class="transformation-content">
                <p>{{translate('waitTrans')}}</p>
                <template v-if="language === 'zh'">
                    <p>或者您可以去&nbsp;&nbsp;<a href="/models/market">市场&nbsp;&nbsp;</a>逛逛，待模型转化完成或提示您。</p>
                </template>
                <template v-else>
                    <p>Or go to&nbsp;&nbsp;<a href="/models/market">market&nbsp;&nbsp;</a>and you will be notified when the conversion is successful.
                    </p>
                </template>
            </div>
            </div>
        </div>
        <div v-show="this.uploaded && this.modelStatus === 1">
            <div class="model-wrapper trans-model">
            <p class="transformation" v-lang.modelFail></p>
            <div class="transformation-content">
                <p>{{translate('sorryModelFalse')}}</p>
                <button class="btn btn-default re-upload" @click.stop.prevent="cancelFn()">{{translate('reUpload')}}
                </button>
            </div>
            </div>
        </div>

        <!--upload model concept-->
        <div v-if="conceptsUpload && !uploaded" class="model-wrapper">
            <p class="concept-title">{{translate('modelConcept')}}</p>
            <div class="twod-instruction-container">
               <div class="twod-picture-container">
                   <p class="pic-message">{{translate('pictures')}}&nbsp;&nbsp;
                       <span class="pic-message-max">{{translate('maxSixPicture')}}</span>
                   </p>
                   <model-concepts-upload
                           :multipleFile="true"
                           :maxQuantity="6"
                           :type="'image'"
                           :uploadTo="'cloud'"
                           :propImages="picturesList"
                           :saveImageSrc="true"
                           @fileStatusChange="imageStatusChange"
                           :needCover="true"
                   ></model-concepts-upload>
               </div>
                <div class="line"></div>
                <div class="twod-setting-container">
                    <div class="model-name">
                        <p class="info-title" v-lang.modelName></p>
                        <input type="text" v-model="modelName" class="model-name-text">
                    </div>
                    <div class="category">
                        <p class="info-title">{{translate('category')}}&nbsp;&nbsp;
                            <span class="pic-message-max">{{translate('categoryMax')}}</span>
                        </p>
                        <div class="category-slide-down">
                            <slide-down :defaultValue="translate('choose')"
                                        :values="category"
                                        :selectType="'multiple'"
                                        ref="modelCategory">
                            </slide-down>
                        </div>
                    </div>
                    <div class="tags">
                        <p class="info-title">{{translate('tags')}}&nbsp;&nbsp;<span
                                class="pic-message-max">{{translate('TagsMax')}}</span></p>
                        <div class="tags-warp">
                            <label for="tag" class="tag-input-container">
                                <a class="pointer" v-for="ta in tags" @click="removeTag(ta)">
                                    <span>{{ta}}</span>
                                    <img src="../../assets/images/saas/icon-delete-tag.png" alt="">
                                </a>
                                <input id="tag" type="text" class="tag-input" @keyup.enter="addNewTag"
                                       @keyup.space="addNewTag" @keydown.delete="deleteTag" v-model="tag"
                                       :placeholder="plsEnter">
                            </label>
                        </div>
                    </div>
                    <div class="description">
                        <p class="info-title" v-lang.modelDesc></p>
                        <textarea class="description-content" v-model="description"></textarea>
                    </div>
                </div>
            </div>
            <div class="btns">
                 <button @click="submitModel" class="btn btn-default" :disabled="!submitDisabled" v-lang.publish></button>
                 <button class="btn btn-default-border btn-left" @click="closeModelLayer" v-lang.cancel></button>
            </div>
        </div>
    </div>
</template>

<script>
    import lockScreen from '../../mixins/lockScreen/lockScreen'
    import fileUpload from '../../components/fileUpload/modelUpload.vue'
    import tag from '../../components/novahub/tag.vue'
    import container from '../../components/novahub/container.vue'
    import modelConceptsUpload from '../../components/imageUpload/modelConceptsUpload.vue'
    import store from '../../store/store'
    import router from '../../router/index'
    import slideDown from '../../saas/components/slideDown.vue'

    export default {
        name: "create-new-model",
        mixins: [lockScreen],
        components: {
            slideDown,
            tag,
            container,
            modelConceptsUpload,
            fileUpload,
        },
        messages: {
            en: {
                upload2d: 'Only upload model concepts',
                tipMessageModelType: 'File format: .zip',
                tipMessagePicType: 'Map format: jpg,bmp,tga,png',
                tipMessageTitle: 'Support for the following file formats',
                continue: 'Continue',
                cancel: 'Cancel',
                createNewModel: 'Upload new model',
                waiting: 'Waiting',
                processing: 'Processing',
                publish: 'Publish',
                yes: 'Yes',
                no: 'No',
                modelConcept: 'Upload model concepts',
                modelName: 'Model name',
                modelCate: 'Category',
                modelDesc: 'Description',
                drag: 'Drag',
                or: 'or',
                upload: 'upload',
                cover: 'cover',
                transformation: 'Model transformation',
                modelFail: 'Model conversion failed',
                choose: 'Please Choose',
                category: 'Category',
                categoryMax: ' Max 3 categories',
                waitTrans: 'Please wait a while for model review… ',
                sorryModelFalse: 'Sorry, something wrong with the model…  ',
                reUpload: 'Upload again',
                TagsMax: 'Max 3 tags',
                tags: 'Tag',
                pictures: 'Pictures',
                maxSixPicture: 'Max 6 pictures',
                tipMessageModelFormat: 'Model format: obj,fbx,gltf,stl,blend',
            },
            zh: {
                upload2d: '只上传模型概念图',
                tipMessageModelType: 'zip压缩格式文件',
                tipMessageModelFormat: 'obj，fbx，gltf，stl，blend格式',
                tipMessagePicType: 'jpg，bmp，tga，png文件',
                tipMessageTitle: '支持以下格式上传',
                continue: '下一步',
                cancel: '取消',
                createNewModel: '上传新模型',
                yes: '是',
                no: '否',
                waiting: '请等待',
                processing: '下一步',
                publish: '发布',
                modelConcept: '只上传模型概念图',
                modelName: '模型名称',
                modelCate: '分类',
                modelDesc: '描述',
                drag: '拖放',
                or: '或',
                upload: '上传',
                cover: '封面',
                pictures: '图片',
                transformation: '模型 转换信息',
                modelFail: '模型转化失败',
                choose: '请选择',
                category: '分类',
                categoryMax: '最多3个类别',
                waitTrans: '稍等片刻模型立即呈现... ',
                sorryModelFalse: '对不起，模型解析错误...',
                reUpload: '重新上传',
                TagsMax: '最多3个标签',
                tags: '标签',
                maxSixPicture: '最多6张'
            }
        },
        data(){
            return{
                wid: 0,  //模型id
                startUpload:false,
                category: [],
                showTwoDLink: true, //是否显示上传2d链接
                conceptsUpload:false,
                uploaded: false,
                isConvert: 0, //0不转化模型 1可以转换模型
                canTransform: false, //用于判断是否能够开始转化模型
                plsEnter: 'Please click enter',
                picturesList: [],
                description: '',
                tag: '',
                tags: [],
                modelName: '',
                fileUploadStatus: true,
                time:0,
                modelStatus: 0, //1：转换失败，2：模型转换成功 5:审核失败
            }
        },
        computed: {
            continueDisabled() {
                return this.modelName && this.$refs.modelCategory.selectedValue.length && this.canTransform;
            },
            canContinue() {
                if (this.auth) {
                    return this.continueDisabled && this.modelStatus !== 1
                }
                else {
                    return this.continueDisabled
                }
            },
            processDisabled() {
                return this.modelName && this.$refs.modelCategory.selectedValue.length && this.picturesList.length;
            },
            submitDisabled() {
                if (this.auth) {
                    return this.processDisabled && this.modelStatus !== 1
                }
                else {
                    return this.processDisabled
                }
            }
        },
        watch: {
            tags(val) {
                if (val.length > 0) {
                    this.plsEnter = '';
                } else {
                    this.plsEnter = 'Please click enter';
                }
                if (val.length > 3) {
                    val.splice(0, 1);
                    this.tags = val;
                }
            },
            picturesList(val) {
                    if (val.length) {
                        let length = val[0].name.length;
                        let reg = /(.gif|.png|.jpe?g)/;
                        this.modelName = val[0].name.replace(reg, '');
                    }
            },
        },
        created() {
            store.dispatch('modelAttr').then((response) => {
                this.tagsList = response.data.tag;
            });
            store.dispatch('novahub/releaseQuotes/getReleaseAttr').then(response => {
                this.category = response.category;
            });
            if (this.reupload_work_id>0) {
                this.wid = parseInt(this.reupload_work_id);
            } else {
                this.wid = 0;
            }
        },
        methods:{
            cancelFn() {
                this.$refs.fileupload.cancel();
                this.hasModel = false;
                if (this.fileUploadStatus) {
                    this.modeShow = true;
                    this.hasModel = true
                }
            },
            imageStatusChange: function ({data, status}) {
                this.coverImages = data;
                this.picturesList = data;
                this.coverImageStatus = status
            },
            cancelUpload(){
                this.fileUploadStatus = true;
                this.closeModelLayer();
            },
            getSelectedId: function (selected, list) {
                let result = [];
                if (Array.isArray(selected)) {
                    for (let i = 0; i < list.length; i++) {
                        for (let k = 0; k < selected.length; k++) {
                            if (list[i].name === selected[k]) {
                                result.push(list[i].id)
                            }
                        }
                    }
                }
                else {
                    for (let i = 0; i < list.length; i++) {
                        if (list[i].name === selected) {
                            result = list[i].id
                        }
                    }
                }
                return result
            },
            addNewTag: function () {
                if (this.checkDulpTag() < 0) {
                    this.tags.push(this.tag);
                    this.tag = ''
                }
            },
            checkDulpTag: function () {
                return this.tags.indexOf(this.tag)
            },
            removeTag: function (tag) {
                this.tags.splice(this.tags.indexOf(tag), 1)
            },
            deleteTag() {
                if (this.tag.length === 0) {
                    this.tags.pop()
                }
            },
            uploadOk(val) {
                this.fileUploadStatus = val;
                this.cancelStatus = val;
            },
            hideCategory() {
                if(this.$refs.modelCategory){
                    this.$refs.modelCategory.show = false;
                }
            },
            startTrans() {
                let data = {
                    wid: this.wid,
                };
                store.dispatch('uploadModel/getModelMessage', data).then((response) => {
                    if (response.code === 200) {
                        this.modelStatus = response.data.work.status;
                        this.isConvert = 0; //不能再转化模型
                        if (this.modelStatus === 1) {
                            clearInterval(this.time)
                            this.closeModelLayer();
                        }else if(this.modelStatus === 2){
                            clearInterval(this.time)
                            this.closeModelLayer();
                            router.push({
                                    name: 'editorModel',
                                    params: {id: this.wid, type: 3}
                                });
                        }
                    }
                });
            },
            saveInitModel() {
                this.$refs.fileupload.isUpload = false;
                this.isConvert = 1; //能转化模型
                this.uploaded = true;
                let categorys = this.getSelectedId(this.$refs.modelCategory.selectedValue, this.category);
                let that = this;
                let data = {
                    wid: this.wid,
                    name: this.modelName,
                    category: categorys,
                    is_convert: this.isConvert,
                };
                store.dispatch('uploadModel/postModelMessage', data).then((response) => {
                    let _that = this;
                    if (response.code === 200) {
                        _that.time = setInterval(that.startTrans, 2000)
                    }
                });
            },
            fileStatusChange:function ({data,status}) {
                if(data.length){
                    this.showTwoDLink = false;
                    let length = data[0].name.length;
                    this.modelName = data[0].name.substring(0, length - 4);
                }
            },
            startUploadModel:function () {
                this.fileUploadStatus = true;
                this.hasModel = true;
                this.$refs.fileupload.startUploadFile({modelId:this.wid,target:0});
                this.startUpload = true;
                this.$refs.fileupload.clearFileListInZip();
            },
            uploadSuccessFn(val) { //上传成功收到服务器相应
                this.canTransform = true;
                if (this.reupload_work_id>0) {
                    this.wid = this.reupload_work_id;
                }else{
                    this.wid = val;
                }
                this.isNewModel = true;
            },
            submitModel() {
                let photoList = [];
                let categorys = this.getSelectedId(this.$refs.modelCategory.selectedValue, this.category);
                this.picturesList.forEach((item) => {
                    let msg = {
                        height: item.height,
                        iscover: item.isCover,
                        name: item.name,
                        size: item.size,
                        src: item.getSrc,
                        width: item.width
                    };
                    photoList.push(msg)
                });
                let data = {
                    wid: this.wid,
                    name: this.modelName,
                    category: categorys,
                    tags: this.tags,
                    license: this.modelLicense,
                    rphotos: photoList,
                    permit: this.modelPermit,
                    type: 1,
                    video_url: this.videoStr,
                    description: this.description,
                    auth: this.auth,
                    is_convert: this.isConvert
                };
                let _this = this;
                    store.dispatch('uploadModel/postModelMessage', data).then((response) => {
                        if (response.code === 200) {
                            this.closeModelLayer();
                            if (_this.hasModel) {  //如果有3d模型
                                if (!_this.isNewModel && this.isJoinArtist) {
                                    router.push({name: 'joinArtistFour'});
                                } else {
                                    router.push({
                                        name: 'editorModel',
                                        params: {id: response.data.wid, type: 4}
                                    });
                                }
                            } else {
                                router.push({
                                    name: 'editorModel',
                                    params: {id: response.data.wid, type: 4}
                                });
                            }
                        }
                    })
                }
            },
    }
</script>

<style scoped lang="scss">
    .create-model-container {
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        .model-wrapper{
            background: #FFFFFF;
            border-radius: 10px;
            width: auto;
            min-width: 616px;
            .title{
                font-size: 20px;
                color: #2A2A36;
                margin-top: 52px;
                margin-bottom: 36px;
                text-align: center;
            }
            .concept-title{
                font-size: 20px;
                color: #2A2A36;
                margin-top: 52px;
                margin-left: 50px;
                margin-bottom: 36px;

            }
            .twod-instruction-container{
                  background: #F6F6F6;
                  height: 455px;
                  min-width: 756px;
                  width: auto;
                  display: flex;
                .pic-message {
                    display: block;
                    font-size: 16px;
                    color: #787878;
                    margin-left: 50px;
                    margin-top: 26px;
                }
                .pic-message-max {
                    font-size: 12px;
                    color: #9B9B9B;
                }
                .line {
                    content: "|";
                    height: 398px;
                    display: inline;
                    width: 1px;
                    margin-top: 31px;
                    border-left: 1px solid #D8D8D8;
                }
                .twod-picture-container{
                    min-width: 286px;
                    max-width: 506px;
                }
                .twod-setting-container{
                    width: 469px;
                    .info-title {
                        margin-left: 46px;
                        font-size: 16px;
                        color: #787878;
                        line-height: 21px;
                        margin-bottom: 10px;
                    }
                    .model-name-text {
                        margin-left: 46px;
                        width: 373px;
                        height: 40px;
                        background: #FFFFFF;
                        border: 1px solid #D2D2D2;
                        border-radius: 1px;
                        padding-left: 14px;
                        padding-right: 14px;
                        line-height: 21px;
                        font-size: 16px;
                        color: #2A2A36;
                    }
                    .toggle {
                        width: 373px;
                        margin-bottom: 6px;
                    }
                    .category {
                        margin-top: 11px;
                        .category-slide-down{
                            margin-left: 46px;
                        }
                    }
                    .description-content {
                        margin-left: 46px;
                        width: 373px;
                        height: 117px;
                        background: #FFFFFF;
                        border: 1px solid #D2D2D2;
                        border-radius: 1px;
                        resize: none;
                        font-size: 14px;
                        color: #4A4A4A;
                        line-height: 22px;
                        padding: 4px 14px 10px 14px;
                    }
                    .model-name{
                        margin-top: 26px;
                        font-size: 16px;
                        color: #787878;
                    }
                    .tags {
                        margin-top: 14px;
                        margin-bottom: 11px;
                        .tags-warp {
                            margin-left: 46px;
                            .tag-input-container {
                                background: #FFFFFF;
                                border: 1px solid #D2D2D2;
                                border-radius: 2px;
                                display: flex;
                                width: 373px;
                                min-height: 40px;
                                padding: 5px 5px 0 5px;
                                flex-wrap: wrap;
                                a {
                                    height: 30px;
                                    display: flex;
                                    justify-content: center;
                                    align-items: center;
                                    background: #9B9B9B;
                                    border-radius: 2px;
                                    padding: 0 10px;
                                    margin-right: 10px;
                                    margin-bottom: 5px;
                                    span {
                                        font-size: 16px;
                                        color: #FFFFFF;
                                        margin-right: 8px;
                                    }
                                    image {
                                        margin-top: 1px;
                                        width: 8px;
                                        height: 8px;
                                    }
                                }
                                input {
                                    border: none;
                                    font-size: 16px;
                                    color: #CDCDCD;
                                    flex: 1;
                                    min-width: 50px;
                                    height: 30px;
                                    margin-bottom: 5px;
                                }
                                input::-webkit-input-placeholder {
                                    color: #CDCDCD;
                                    font-size: 14px;
                                }
                            }
                        }
                    }
                }
            }
            .threed-instruction-container,.threed-setting-container{
                background: #F6F6F6;
                display: -webkit-box;
                display: -webkit-flex;
                display: -ms-flexbox;
                display: flex;
                align-content: center;
                flex-wrap: wrap;
            }
            .threed-instruction-container{
                padding:20px 0;
                -webkit-box-orient: vertical;
                -webkit-flex-direction: column;
                -ms-flex-direction: column;
                flex-direction: column;
                width: 600px;
                p{
                    width: 100%;
                    text-align: center;
                    font-size: 14px;
                    color: #9B9B9B;
                    margin-bottom: 4px;
                    &.black-font{
                        color: #2A2A36;
                    }
                    &:last-child{
                        margin-bottom: 0;
                    }
                }
            }
            .threed-setting-container{
                width: 721px;
                .name-title {
                    margin-left: 50px;
                    margin-top: 55px;
                    font-size: 16px;
                    color: #787878;
                    line-height: 21px;
                    .model-name-text {
                        background: #FFFFFF;
                        border: 1px solid #D2D2D2;
                        border-radius: 1px;
                        width: 500px;
                        height: 40px;
                        line-height: 21px;
                        font-size: 16px;
                        color: #2A2A36;
                        margin-left: 36px;
                        padding-left: 14px;
                        padding-right: 14px;
                    }
                }
                .model-category{

                }
                .category-title {
                    margin-left: 50px;
                    margin-top: 45px;
                    margin-bottom: 70px;
                    font-size: 16px;
                    color: #787878;
                    line-height: 21px;
                }
                .category-max {
                    position: fixed;
                    margin-top: -63px;
                    margin-left: 50px;
                    color: #9B9B9B;
                    font-size: 12px;
                }
                .slide-down {
                    height: 40px;
                    width: 500px;
                    margin-left: 63px;
                    margin-top: 45px;
                }
            }
            .btns{
                padding:26px 0;
                display: flex;
                justify-content: center;
                .btn{
                    padding:4px 20px;
                    font-size: 16px;
                    margin-right: 20px;
                    min-width: 107px;
                    &:last-child{
                        margin-right: 0;
                    }
                }
            }
            .upload-2d {
                text-decoration: underline;
                display: block;
                font-size: 12px;
                color: #EA6264;
                text-align: center;
                margin-bottom: 24px;
            }
        }
        .trans-model{
            height: 210px;
            .transformation {
                font-size: 20px;
                color: #2A2A36;
                line-height: 26px;
                padding-top: 52px;
                text-align: center;
            }
            .transformation-content {
                font-size: 14px;
                color: #2A2A36;
                text-align: center;
                line-height: 24px;
                margin-top: 29px;
            }
            a {
                display: inline;
                font-size: 14px;
                color: #EA6264;
            }
            .re-upload {
                width: 133px;
                height: 34px;
                font-size: 16px;
                color: #FFFFFF;
                text-align: center;
                margin-top: 26px;
            }
        }

    }
</style>