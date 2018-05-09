<template>
    <div :class="layer" @click.stop="" @click="hideCategory">
        <!--upload 3d model-->
        <div v-if="!twoD">
            <div :class="upload">
                <template>
                    <file-upload
                            ref="fileupload"
                            :maxQuantity="1"
                            :uploadTo="'backend'"
                            :autoUpload="false"
                            :type="'model'"
                            :checkFilesInZip="true"
                            @fileStatusChange="modelStatusChange"
                            @changeMessageClass="changeMessageClass"
                            @uploadSuccess="uploadSuccessFn"
                            :modelId="wid"
                            @canUpload="uploadOk"
                            @getModelInitName="getModelInitName"
                    >
                    </file-upload>
                </template>
            </div>
            <div v-show=" this.layer.threeD1">
                <div class="title" v-show="!this.layer.threeD2">
                    <h4 v-lang.modelLayer class="state"></h4>
                </div>
                <div :class="fake"></div>
                <div :class="message">
                    <div class="top-message" v-lang.tipTitle></div>
                    <div class="content-message" v-lang.tipMessageOne></div>
                    <div class="content-message" v-lang.tipMessageTwo></div>
                </div>
                <button class="btn btn-default upp" :disabled="fileUploadStatus" @click="startUpload"
                        v-lang.go></button>
                <button class="btn btn-default-border pointer" @click="closeModelLayer" v-lang.back></button>
                <a href="" @click.prevent="twoD = true" class="upload-2d" v-lang.upload2d
                   v-show="!showTwoDLink && !isre"></a>
                <a class="upload-2d" v-show="showTwoDLink && !isre"></a>
                <a class="upload-2d" v-show="isre"></a>
            </div>
            <!--write upload 3d model information-->
            <div v-show="this.layer.threeD2">
                <div class="message">
                    <p class="title">
                        {{translate('modelName')}}
                        <input type="text" v-model="modelName" class="model-name-text">
                    </p>
                    <div class="category" v-lang.Category>
                    </div>
                    <p class="category-max" v-lang.CategoryMax>
                    </p>
                    <slide-down :defaultValue="translate('choose')" :values="category" :selectType="'multiple'"
                                ref="modelCategory" class="slide-down">
                    </slide-down>
                </div>
                <button class="btn btn-default upp" :disabled="!canContinue" @click="saveInitModel()" v-lang.go></button>
                <button class="btn btn-default-border pointer" @click="closeModelLayer" v-lang.back></button>
            </div>

        </div>
        <!--startTrans-->
        <div v-show="!twoD && this.layer.threeD3 && this.modelStatus != 1">
            <div class="title"></div>
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
        <div v-show="!twoD && this.layer.threeD3 && this.modelStatus === 2">
            <div class="title"></div>
            <p class="transformation" v-lang.modelFail></p>
            <div class="transformation-content">
                <p>{{translate('sorryModelFalse')}}</p>
                <button class="btn btn-default re-upload" @click.stop.prevent="cancelFn()">{{translate('reUpload')}}
                </button>
            </div>
        </div>
        <!--upload model concept-->
        <div v-if="twoD">
            <div class="title">
                <h4 v-lang.modelConceptLayer class="state"></h4>
            </div>
            <div class="message">
                <!--message left-->
                <p class="pic-message">{{translate('pic')}}&nbsp;&nbsp;<span
                        class="pic-message-max">{{translate('maxSix')}}</span></p>
                <div class="line"></div>
                <div class="show-image">
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
                <!--message right-->
                <div class="info">
                    <div class="model-name">
                        <p class="info-title" v-lang.modelName></p>
                        <input type="text" v-model="modelName" class="model-name-text">
                    </div>
                    <div class="category">
                        <p class="info-title">{{translate('Category')}}&nbsp;&nbsp;<span
                                class="pic-message-max">{{translate('CategoryMax')}}</span></p>
                        <slide-down :defaultValue="translate('choose')" :values="category"
                                    :selectType="'multiple'" ref="modelCategory" v-if="twoD">
                        </slide-down>
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
            <button class="btn btn-default" :disabled="cancelStatus" @click.stop="cancelFn" v-lang.go
                    v-if="!twoD"></button>
            <button @click="submitModel" class="btn btn-default" :disabled="!submitDisabled" v-lang.publish
                    v-else></button>
            <button class="btn btn-default-border btn-left" @click="closeModelLayer" v-lang.back></button>
        </div>
    </div>
</template>

<script>
    import tag from '../../components/novahub/tag.vue'
    import container from '../../components/novahub/container.vue'
    import modelConceptsUpload from '../../components/imageUpload/modelConceptsUpload.vue'
    import fileUpload from '../../components/fileUpload/modelUpload.vue'
    import threeD from '../../components/threeD/threeD.vue'
    import store from '../../store/store'
    import router from '../../router/index'
    import api from '../../api/api'
    import slideDown from '../../saas/components/slideDown.vue'

    export default {
        name: 'show-upload',
        props: {
            //back work id 再次编辑时，需要传入newModelCreatedLayer
            bwid: {
                required: true
            },
            //关闭layer方法
            closeModelLayer: {
                required: true
            },
            //是否是从editor路由点击的layer
            isre: {
                required: true
            }
        },
        data() {
            return {
                tagsList: [],
                licenseList: [],
                modelName: '',
                modelTags: [],
                category: [],
                modelLicense: 1, //暂时给一个默认值
                modelPermit: 0,
                picturesList: [],
                description: '',
                modelFile: {},
                modelData: {},
                uploadFile: {},
                isNewModel: true,  //是否是新上传模型 true不是  false 是
                modelStatus: 0, //1：转换失败，2：模型转换成功 5:审核失败
                hasModel: false, //是否有模型   true是  false否
                modeShow: false, //模型是否展示   false隐藏  true显示
                uploadingImgNumber: 0,
                wid: 0,  //模型id
                errors: {},
                submitMsg: {
                    text: 'Submit',
                    status: false
                },
                uploadBtnText: 'Upload',
                uploadSuccess: false,
                uploadFail: false,
                errorMsg: '',
                auth: false,  //区分是否是成为入驻模型师  false 不是
                twoD: false,
                fileUploadStatus: true,
                cancelStatus: true,
                onlyTwoDStatus: true,
                fileBoxStatus: 0, // 0展示upload和cancel容器  1仅仅展示替换 其他都不处理
                tag: '',
                tags: [],
                isOnReUpload: false,
                isJoinArtist: 0,
                message: {
                    'message1': true,
                    'message2': false,
                },
                fake: {
                    'fake1': true,
                    'fake2': false,
                    'fake3': false,
                },
                layer: {
                    'threeD1': true,
                    'threeD2': false,
                    'threeD3': false,
                    'twoD1': false,
                    'twoD2': false,
                },
                upload: {
                    upload1: true,
                    upload2: false,
                },
                showTwoDLink: '', //是否显示上传2d链接
                uploaded: false,
                isConvert: 0, //0不转化模型 1可以转换模型
                canTransform: false, //用于判断是否能够开始转化模型
                plsEnter: 'Please click enter'
            }
        },
        messages: {
            en: {
                upload2d: 'Only upload model concepts',
                tipMessageOne: 'File + Materials: .zip',
                tipMessageTwo: 'Map format: .jpg, .png, .dds',
                tipTitle: 'Support for the following file formats',
                go: 'Continue',
                back: 'Cancel',
                modelLayer: 'Upload new model',
                um: 'Upload a model',
                title1: 'Model file(We will securely save your model file)',
                justImage: 'Upload model pictures instead',
                plsInputName: 'Please enter the model name',
                desc: 'Description(Optional)',
                waiting: 'Waiting',
                processing: 'Processing',
                publish: 'Publish',
                rr: 'Re-upload',
                dp: 'Download permit',
                yes: 'Yes',
                no: 'No',
                modelConceptLayer: 'Upload model concepts',
                modelName: 'Model name',
                modelCate: 'Category',
                modelDesc: 'Description',
                drag: 'Drag',
                or: 'or',
                upload: 'upload',
                cover: 'cover',
                picture: 'picture',
                transformation: 'Model transformation',
                modelFail: 'Model conversion failed',
                choose: 'Please Choose',
                Category: 'Category',
                CategoryMax: ' Max 3 categories',
                waitTrans: 'Please wait a while for model review… ',
                sorryModelFalse: 'Sorry, something wrong with the model…  ',
                reUpload: 'Upload again',
                TagsMax: 'Max 3 tags',
                tags: 'Tag',
                pic: 'Pictures',
                maxSix: 'Max 6 pictures'
            },
            zh: {
                upload2d: '只上传模型概念图',
                tipMessageOne: 'zip压缩格式文件',
                tipMessageTwo: '.jpg, .png, .dds后缀文件',
                tipTitle: '支持以下格式上传',
                go: '下一步',
                back: '取消',
                modelLayer: '上传新模型',
                yes: '是',
                no: '否',
                dp: '是否可以被下载',
                rr: '重新上传',
                um: '上传新模型',
                title1: '模型文件',
                justImage: '只上传模型图片',
                plsInputName: '请输入模型名称',
                desc: '描述（可选）',
                waiting: '请等待',
                processing: '下一步',
                publish: '发布',
                modelConceptLayer: '只上传模型概念图',
                modelName: '模型名称',
                modelCate: '分类',
                modelDesc: '描述',
                drag: '拖放',
                or: '或',
                upload: '上传',
                cover: '封面',
                picture: '图片',
                transformation: '模型 转换信息',
                modelFail: '模型转化失败',
                choose: '请选择',
                Category: '分类',
                CategoryMax: '最多3个类别',
                waitTrans: '稍等片刻模型立即呈现... ',
                sorryModelFalse: '对不起，模型解析错误...',
                reUpload: '重新上传',
                TagsMax: '最多3个标签',
                tags: '标签',
                pic: '图片',
                maxSix: '最多6张'
            }
        },

        watch: {
            // change modelLayer class
            twoD(val) {
                if (val === false) {
                    this.layer.threeD1 = true;
                    this.layer.twoD1 = false;
                } else {
                    this.layer.threeD1 = false;
                    this.layer.twoD1 = true;
                }
            },
            //change twoD class && upload image class
            picturesList(val) {
                if (!this.layer.threeD1) {
                    if (val.length === 0) {
                        this.layer.twoD1 = true;
                        this.layer.twoD2 = false;
                    } else {
                        this.layer.twoD1 = false;
                        this.layer.twoD2 = true;
                        let length = val[0].name.length;
                        let reg = /(.gif|.png|.jpe?g)/;
                        this.modelName = val[0].name.replace(reg, '');
                    }
                }
            },
            //max tags 3
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
        components: {
            slideDown,
            tag,
            container,
            modelConceptsUpload,
            fileUpload,
            threeD
        },
        created() {
            this.uploadBtnText = this.translate('upload');
            this.submitMsg.text = this.translate('publish');
            if (this.imgUrl) {
                this.images.push({src: this.imgUrl, percent: 100})
            }

            store.dispatch('modelAttr').then((response) => {
                this.tagsList = response.data.tag;
            });
            store.dispatch('novahub/releaseQuotes/getReleaseAttr').then(response => {
                this.category = response.category;
            });

            if (this.bwid) {
                this.wid = parseInt(this.bwid);
            } else {
                this.wid = 0;
            }
        },
        methods: {
            hideCategory() {
                this.$refs.modelCategory.show = false;
            },
            imageStatusChange: function ({data, status}) {
                this.coverImages = data;
                this.picturesList = data;
                this.coverImageStatus = status
            },
            modelStatusChange({data, status}) {

            },
            uploadingImgNumberChange(value) {
                this.uploadingImgNumber = value
            },
            //after model trans, make a round require for model trans status,
            // if the trans fail and user doesnot close this layer,
            // then give a notice to user,tell he should reuplaod the model
            startTrans() {
                let data = {
                    wid: this.wid,
                };
                store.dispatch('uploadModel/getModelMessage', data).then((response) => {
                    if (response.code === 200) {
                        this.modelStatus = response.data.work.status;
                        this.isConvert = 0; //不能再转化模型
                        if (this.modelStatus === 1) {

                        }
                    }
                });
            },
            saveInitModel() {
                this.$refs.fileupload.isUpload = false;
                this.isConvert = 1; //能转化模型
                this.layer.threeD2 = false;
                this.layer.threeD3 = true;
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
                    if (response.code === 200) {
                        setInterval(that.startTrans, 2000)
                    }
                });
            },
            getModelInitName(val) {
                this.modelName = val;
            },
            changeMessageClass(val) {
                if (val === 'true') {
                    this.message.message1 = false;
                    this.message.message2 = true;
                    this.showTwoDLink = true;
                    this.fake.fake1 = false;
                    this.fake.fake2 = true;
                } else {
                    this.message.message1 = true;
                    this.message.message2 = false;
                    this.showTwoDLink = false;
                    this.fake.fake2 = false;
                    this.fake.fake1 = true;
                }
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
            uploadConcept() {
                this.$createNewModel({});
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
            cancelReUpload() {
                this.$refs.fileupload.cancel();
                this.cancelStatus = true;
                this.fileUploadStatus = true;
                this.isOnReUpload = false;
                this.modeShow = true;
                this.fileBoxStatus = 1
            },
            reUpload() {
                this.fileBoxStatus = 0;
                this.cancelStatus = false;
                this.modeShow = false;
                this.$refs.fileupload.deleteFile(0);
                this.isOnReUpload = true;
            },
            uploadOk(val) {
                this.fileUploadStatus = val;
                this.cancelStatus = val;
            },
            wrongFile: function () {
                this.cancelStatus = false
            },
            startUpload() {  //开始上传
                this.fileUploadStatus = true;
                this.$refs.fileupload.startUploadFile({modelId: this.wid, target: 0});
                this.hasModel = true;
                this.$refs.fileupload.isUpload = true;
                this.$refs.fileupload.filesInZip = [];
            },
            uploadSuccessFn(val) { //上传成功收到服务器相应
                this.canTransform = true;
                if (!this.bwid) {
                    this.wid = val;
                }
                this.submitMsg.text = this.translate('processing');
                this.modeShow = false;
                // debugger
                this.isNewModel = true;
            },
            cancelFn() {
                this.layer.threeD1 = true;
                this.layer.threeD3 = false;
                this.uploaded = false;
                this.upload.upload1 = true;
                this.upload.upload2 = false;
                this.$refs.fileupload.cancel();
                this.hasModel = false;
                this.$refs.fileupload.isUpload = false;
                // this.fileBoxStatus = 1;
                if (this.fileUploadStatus) {
                    this.modeShow = true;
                    this.hasModel = true
                }

            },
            saveUploadImg(imgData) {
                this.picturesList = [];
                imgData.forEach((item) => {
                    let imgData = {
                        src: item.dir,
                        size: item.size
                    };
                    this.picturesList.push(imgData)
                })
            },
            chooseTags(data) {
                data.status = !data.status;
                this.modelTags = [];
                this.tagsList.forEach((item => {
                    if (item.status) {
                        this.modelTags.push(item.tag_id)
                    }
                }))
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
                if (!this.submitMsg.status) {
                    this.submitMsg.status = true;
                    // this.submitMsg.text = this.translate('waiting');
                    store.dispatch('uploadModel/postModelMessage', data).then((response) => {
                        if (response.code === 200) {
                            this.closeModelLayer();
                            if (_this.hasModel) {  //如果有3d模型
                                _this.submitMsg.status = false;
                                if (!_this.isNewModel && this.isJoinArtist) {
                                    router.push({name: 'joinArtistFour'});
                                }
                                else {
                                    router.push({
                                        name: 'editorModel',
                                        params: {id: response.data.wid, type: 4}
                                    });
                                }
                            }
                            else {
                                router.push({
                                    name: 'editorModel',
                                    params: {id: response.data.wid, type: 4}
                                });
                            }
                        }
                        _this.submitMsg.status = false;
                    })
                }
            },

        }
    }
</script>
<!--class for this page-->
<style scoped lang="scss">

    /*init class layer*/
    .threeD1 {
        width: 616px;
        min-height: 437px;
        background-color: #FFFFFF;
        border-radius: 10px;
        position: relative;
        .title {
            height: 62px;
            text-align: center;
            h4 {
                margin-bottom: 36px;
                margin-top: 56px;
                font-size: 20px;
                color: #2A2A36;
                font-weight: normal;
            }
        }
        .message1 {
            height: 112px;
            width: 100%;
            background-color: #F6F6F6;
            text-align: center;
            margin-top: 36px;
        }
        .message2 {
            height: 112px;
            width: 100%;
            background-color: #F6F6F6;
            text-align: center;
            margin-top: 52px;
        }
        .content-message {
            font-size: 14px;
            color: #9B9B9B;
            padding-bottom: 8px;
        }
        .upload-2d {
            text-decoration: underline;
            display: block;
            font-size: 12px;
            color: #EA6264;
            text-align: center;
            margin-top: 20px;
        }
        .top-message {
            padding-top: 19px;
            font-size: 14px;
            color: #2A2A36;
            padding-bottom: 8px;
        }
        button {
            width: 107px;
            height: 30px;
            text-align: center;
            line-height: 21px;
            margin-top: 30px;
            font-size: 16px;
            margin-left: 191px;
        }
        .pointer {
            margin-left: 21px;
        }
        .form-note {
            position: absolute;
            transform: translate(-50%, -50%);
            top: 50%;
            left: 50%;
            background-color: #2a2a36;
            font-size: 16px;
            padding: 20px;
            color: #fff;
            border-radius: 10px;
        }
        .bottom {
            position: absolute;
            width: 100%;
            height: 8px;
            background-image: linear-gradient(-198deg, #FFADAE 0%, #EA6264 100%);
            border-bottom-left-radius: 10px;
            border-bottom-right-radius: 10px;
            left: 0;
            bottom: 0;
        }

    }

    /*upload file class for 3d class*/
    .threeD2 {
        width: 721px;
        height: 406px;
        background-color: #FFFFFF;
        border-radius: 10px;
        position: relative;
        .message {
            position: absolute;
            height: 214px;
            width: 100%;
            background-color: #F6F6F6;
            top: 110px;
            .title {
                margin-left: 50px;
                margin-top: 58px;
                font-size: 16px;
                color: #787878;
                line-height: 21px;
                .model-name-text {
                    position: absolute;
                    left: 171px;
                    top: 50px;
                    background: #FFFFFF;
                    border: 1px solid #D2D2D2;
                    border-radius: 1px;
                    width: 500px;
                    height: 40px;
                    line-height: 21px;
                    font-size: 16px;
                    color: #2A2A36;
                    padding-left: 14px;
                    padding-right: 14px;
                }
            }
            .category {
                position: absolute;
                top: 124px;
                left: 50px;
                font-size: 16px;
                color: #787878;
                line-height: 21px;
            }
            .category-max {
                margin-top: 68px;
                margin-left: 50px;
                font-size: 12px;
                color: #9B9B9B;
            }
            .slide-down {
                height: 40px;
                width: 500px;
                position: absolute;
                top: 124px;
                left: 171px;
            }
        }
        button {
            position: relative;
            width: 107px;
            height: 30px;
            text-align: center;
            line-height: 21px;
            font-size: 16px;
            left: 243px;
            top: 350px;
            margin-right: 21px
        }
    }

    /*uploaded file and show notify message for 3d class*/
    .threeD3 {
        width: 616px;
        height: 210px;
        background-color: #FFFFFF;
        border-radius: 10px;
        position: relative;
        .transformation {
            font-size: 20px;
            color: #2A2A36;
            line-height: 26px;
            margin-top: 52px;
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

    /*just upload model concept before upload picture*/
    .twoD1 {
        height: 651px;
        width: 756px;
        background-color: #FFFFFF;
        border-radius: 10px;
        position: relative;
        .title {
            height: 58px;
            h4 {
                margin-bottom: 32px;
                margin-top: 52px;
                margin-left: 50px;
                font-size: 20px;
                color: #2A2A36;
                font-weight: normal;
            }
        }
        .btn-left {
            margin-left: 21px;
        }
        .message {
            height: 455px;
            min-width: 756px;
            background-color: #F6F6F6;
        }
        button {
            width: 107px;
            height: 30px;
            text-align: center;
            line-height: 21px;
            margin-top: 30px;
            margin-left: 261px;
            font-size: 16px;
        }
        .line {
            content: "|";
            height: 398px;
            position: absolute;
            left: 286px;
            top: 141px;
            width: 1px;
            z-index: 9999;
            border-left: 1px solid #D8D8D8;
        }

        .pic-message {
            padding-left: 50px;
            padding-top: 26px;
            font-size: 16px;
            color: #787878;

        }
        .pic-message-max {
            font-size: 12px;
            color: #9B9B9B;
        }
    }

    /*just upload model concept after upload picture*/
    .twoD2 {
        height: 651px;
        width: 956px;
        background-color: #FFFFFF;
        border-radius: 10px;
        position: relative;
        .title {
            height: 58px;
            h4 {
                margin-bottom: 32px;
                margin-top: 52px;
                margin-left: 50px;
                font-size: 20px;
                color: #2A2A36;
                font-weight: normal;
            }
        }
        .btn-left {
            margin-left: 21px;
        }
        .message {
            height: 455px;
            min-width: 756px;
            background-color: #F6F6F6;
        }
        button {
            width: 107px;
            height: 30px;
            text-align: center;
            line-height: 21px;
            margin-top: 30px;
            margin-left: 361px;
            font-size: 16px;
        }
        .line {
            content: "|";
            height: 398px;
            position: absolute;
            left: 486px;
            top: 141px;
            width: 1px;
            z-index: 9999;
            border-left: 1px solid #D8D8D8;
        }
        .pic-message {
            padding-left: 50px;
            padding-top: 26px;
            font-size: 16px;
            color: #787878;

        }
        .pic-message-max {
            font-size: 12px;
            color: #9B9B9B;
        }
    }

    /*general class for this model layer page*/
    .upload1 {
        position: absolute;
        top: 114px
    }

    .upload2 {
        position: absolute;
        top: 0
    }

    .fake1 {
        height: 62px;
    }

    .fake2 {
        height: 207px;
    }

    .close {
        display: block;
        width: 14px;
        height: 14px;
        position: absolute;
        right: 20px;
        top: 20px;
        background: url(../../assets/images/login-sprite.png) 0 0 no-repeat;
        cursor: pointer;
    }

    .errorMsg {
        margin-top: 10px;
        font-size: 12px;
        color: #EA6264;
    }

    .show-image {
        min-width: 286px;
        max-width: 486px;
    }

    .info {
        float: right;
        position: absolute;
        width: 423px;
        top: 136px;
        right: 0;
        .info-title {
            font-size: 16px;
            color: #787878;
            line-height: 21px;
            margin-bottom: 10px;
        }
        .model-name-text {
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
        }
        .description-content {
            width: 373px;
            height: 117px;
            background: #FFFFFF;
            border: 1px solid #D2D2D2;
            border-radius: 1px;
            resize: none;
            font-size: 14px;
            color: #4A4A4A;
            line-height: 22px;
            padding-left: 14px;
            padding-right: 14px;
            padding-top: 4px;
            padding-bottom: 10px;
            font-family: MicrosoftYaHei;
        }
        .tags-warp {
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
                input::-moz-placeholder {
                    color: #CDCDCD;
                    font-size: 14px;
                }
                input:-ms-input-placeholder {
                    color: #CDCDCD;
                    font-size: 14px;
                }
            }
        }
        .tags {
            margin-top: 14px;
            margin-bottom: 11px;
        }
        .drop-img-container {
            border: 1px dashed #D2D2D2;
            border-radius: 2px;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 240px;
            height: 150px;
            margin-bottom: 13px;
            p {
                font-size: 14px;
                color: #ADADAD;
                span {
                    color: #EA6264;
                }
            }
            &.drag-over {
                border: 1px dashed #EA6264;
            }
        }

    }
</style>

<!--class for modify components class-->
<style scoped lang="scss">

    .twoD2 /deep/ .tags-warp /deep/ .pointer {
        margin-left: 0;
        margin-right: 10px;
    }

    .twoD1 /deep/ .tags-warp /deep/ .pointer {
        margin-left: 0;
        margin-right: 10px
    }

    .twoD2 /deep/ .info /deep/ .category /deep/ .toggle {
        width: 373px;
        height: 40px;
    }

    .twoD1 /deep/ .info /deep/ .category /deep/ .toggle {
        width: 373px;
        height: 40px;
    }
</style>
