<template>
    <div class="page" @click="hideCategory">
        <div class="editor-model">
            <!--picture and model-->
            <div class="picture-model">
                <!--show 3d model-->
                <loading-model ref="loadingModel" v-if="modelType !== 4">
                    <div class="show-model" style="margin-top: 99px">
                        <div class="pic pointer " @click="capture()">
                            <img :src="icon">
                            <span>{{translate(saveCoverChangeWord[saveStatus])}}</span>
                            <div class="cover-info" v-if="coverInfoShow" v-lang.coverInfo></div>
                        </div>
                        <img :src="coverSrc" alt="" class="piw" v-if="showCover">
                        <div class="upload-project-container main">
                            <div class="three-model">
                                <div class="model-note" v-if="modelFile.id">
                                    <three-d :modelFile="modelFile"
                                             :id="wid"
                                             :showEditBtn="false"
                                             ref="three">
                                    </three-d>
                                </div>
                            </div>
                        </div>
                    </div>
                </loading-model>
                <!--pictureList-->
                <div :class="[this.modelType !== 4? 'pic-threed' : 'pic-twod']">
                    <loading-pictures ref="loadingPictures">
                        <p class="pic-info-title">
                            {{translate('pictures')}}
                            <span class="pic-message-max">
                            {{translate('maxSixPictures')}}
                        </span>
                        </p>
                        <div class="show-image">
                            <div v-if="modelType !== 4">
                                <image-cover-upload
                                        :propImageList="coverList"
                                        ref="imageListsTreeDCover"
                                ></image-cover-upload>
                                <editor-model-concepts-upload
                                        :multipleFile="true"
                                        :maxQuantity="6"
                                        :type="'image'"
                                        :uploadTo="'cloud'"
                                        :saveImageSrc="true"
                                        @fileStatusChange="imageStatusChange"
                                        ref="imageListsTreeD"
                                        :propImageList="picturesList"
                                        :needCover="false"
                                        :isThreeD=isThreeD
                                ></editor-model-concepts-upload>
                            </div>
                            <div v-else>
                                <editor-model-concepts-upload
                                        :multipleFile="true"
                                        :maxQuantity="6"
                                        :type="'image'"
                                        :uploadTo="'cloud'"
                                        :saveImageSrc="true"
                                        @fileStatusChange="imageStatusChange"
                                        ref="imageListsTwoD"
                                        :propImageList="picturesList"
                                        :needCover="true"
                                        :isThreeD=isThreeD
                                ></editor-model-concepts-upload>
                            </div>
                        </div>
                    </loading-pictures>
                </div>
            </div>
            <!--3d right-->
            <div class="message" v-if="modelType !== 4" style="margin-left: 0;padding-left: 10px;">
                <div :class="info">
                    <div class="manage">{{translate('manage')}}
                        <a href="javascript:;" class="delete-model" v-lang.delete @click="deleteUpload($event)"></a>
                    </div>
                    <div class="button-group">
                        <button @click="submitModel" class="btn publish btn-175 btn-default upp"
                                :disabled="!submitDisabled" v-lang.publish v-if="modelType===3"></button>
                        <button @click="submitModel" class="btn publish btn-175 btn-default upp"
                                :disabled="!updateDisabled" v-lang.update v-if="modelType===5"></button>
                        <button class="btn btn-default-border pointer " v-lang.setting @click="goToEdit()"></button>
                        <button class="btn btn-default-border pointer" @click="reUpload()" v-lang.reload></button>
                        <button class="btn btn-default-border delete pointer" @click="saveInfo()">
                            {{translate(saveDataChangeWord[saveInfoStatus])}}
                        </button>
                    </div>
                    <div class="info-content">
                        <div class="model-name">
                            <p class="info-title" v-lang.modelName></p>
                            <input type="text" v-model="modelName" class="model-name-text">
                        </div>
                        <div class="category">
                            <p class="info-title">{{translate('category')}}&nbsp;&nbsp;
                                <span class="pic-message-max">{{translate('maxThreeCates')}}</span>
                            </p>
                            <slide-down :defaultValue="!DefaultSelectedName? translate('choose'): DefaultSelectedName"
                                        :values="category"
                                        :selectType="'multiple'" ref="modelCategory"
                                        v-on:seletctValueChanged="seletctValueChanged"
                            ></slide-down>
                        </div>
                        <div class="tags">
                            <p class="info-title">{{translate('tags')}}&nbsp;&nbsp;
                                <span class="pic-message-max">{{translate('maxThreeTags')}}</span>
                            </p>
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
                        <div class="license">
                            <p class="info-title">{{translate('license')}}</p>
                            <slide-down :values="licenseList"
                                        :defaultValue="!DefaultSelectedName? translate('choose'): DefaultSelectedName"
                                        :selectType="'single'" ref="modelLicense" v-if="this.modelType != 4"
                                        v-on:seletctValueChanged="seletctValueChanged"
                            ></slide-down>
                        </div>
                        <div class="description">
                            <p class="info-title" v-lang.modelDesc></p>
                            <textarea class="description-content" v-model="description"></textarea>
                        </div>
                        <div class="line"></div>
                        <div class="info-footer">
                            <div class="model-file clearfix">
                                <p v-lang.downLoad></p>
                                <div class="down-load-btn">
                                    <div class="down-load-btn1">
                                        <button :class="modelPermit? 'btn btn-default' : 'btn btn-default-border'"
                                                @click.prevent.stop="changePermit('yes')">{{translate('yes')}}
                                        </button>
                                        <button :class="modelPermit? 'btn btn-default-border' : 'btn btn-default'"
                                                @click.prevent.stop="changePermit('no')">{{translate('no')}}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="line"></div>
                        <div class="info-footer">
                            <div class="model-file clearfix">
                                <p v-lang.privacy></p>
                                <div class="down-load-btn">
                                    <div class="down-load-btn2">
                                        <button :class="modelPrivacy? 'btn btn-default' : 'btn btn-default-border'"
                                                @click.prevent.stop="changePrivacy('yes')">{{translate('yes')}}
                                        </button>
                                        <button :class="modelPrivacy? 'btn btn-default-border' : 'btn btn-default'"
                                                @click.prevent.stop="changePrivacy('no')">{{translate('no')}}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!--2d right-->
            <div class="message" v-else style="margin-left: 0;padding-left: 10px;">
                <div :class="info">
                    <p class="manage" v-lang.manage></p>
                    <div class="button-group">
                        <button @click="submitModel" class="btn publish btn-175 btn-default upp"
                                :disabled="!updateDisabled" v-lang.update></button>
                        <button class="btn delete2d btn-175 btn-default-border upp" v-lang.delete
                                @click="deleteUpload($event)"></button>
                    </div>
                    <div class="info-content">
                        <div class="model-name">
                            <p class="info-title" v-lang.modelName></p>
                            <input type="text" v-model="modelName" class="model-name-text">
                        </div>
                        <div class="category">
                            <p class="info-title">
                                {{translate('category')}}&nbsp;&nbsp;
                                <span class="pic-message-max">{{translate('maxThreeCates')}}</span>
                            </p>
                            <slide-down :defaultValue="!DefaultSelectedName? translate('choose'): DefaultSelectedName"
                                        :values="category" :selectType="'multiple'" ref="modelCategory"
                                        v-on:seletctValueChanged="seletctValueChanged"
                            ></slide-down>
                        </div>
                        <div class="tags">
                            <p class="info-title">
                                {{translate('tags')}}&nbsp;&nbsp;
                                <span class="pic-message-max">{{translate('maxThreeTags')}}</span>
                            </p>
                            <div class="tags-warp">
                                <label for="tag" class="tag-input-container">
                                    <a class="pointer" v-for="ta in tags" @click="removeTag(ta)">
                                        <span>{{ta}}</span>
                                        <img src="../../assets/images/saas/icon-delete-tag.png" alt="">
                                    </a>
                                    <input id="tag"
                                           type="text"
                                           class="tag-input"
                                           @keyup.enter="addNewTag"
                                           @keyup.space="addNewTag"
                                           @keydown.delete="deleteTag"
                                           v-model="tag"
                                           :placeholder="plsEnter"/>
                                </label>
                            </div>
                        </div>
                        <div class="description">
                            <p class="info-title" v-lang.modelDesc></p>
                            <textarea class="description-content" v-model="description"></textarea>
                        </div>
                        <div class="line"></div>
                        <div class="info-footer">
                            <div class="model-file clearfix">
                                <p v-lang.privacy></p>
                                <div class="down-load-btn">
                                    <div class="down-load-btn2">
                                        <button :class="modelPrivacy? 'btn btn-default' : 'btn btn-default-border'"
                                                @click.prevent.stop="changePrivacy('yes')">{{translate('yes')}}
                                        </button>
                                        <button :class="modelPrivacy? 'btn btn-default-border' : 'btn btn-default'"
                                                @click.prevent.stop="changePrivacy('no')">{{translate('no')}}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import tag from '../../components/novahub/tag.vue'
    import container from '../../components/novahub/container.vue'
    import editorModelConceptsUpload from '../../components/imageUpload/editorModelConceptsUpload.vue'
    import imageCoverUpload from '../../components/imageUpload/modelCoverImgUpload.vue'
    import fileUpload from '../../components/fileUpload/modelUpload.vue'
    import threeD from '../../components/threeD/threeD.vue'
    import slideDown from '../../saas/components/slideDown.vue'
    import loadingModel from '../../pages/community/loadingModel.vue'
    import loadingPictures from '../../pages/community/loadingPictures.vue'

    class Photos {
        constructor({url, height, iscover, percent = 100, size, src, width}) {
            this.src = src;
            this.dir = url;
            this.iscover = iscover;
            this.size = size;
            this.percent = percent;
            this.width = width;
            this.height = height;
        }
    }

    class modelCoverSubmit {
        constructor({dir, height, iscover = 1, percent = 100, size, width}) {
            this.src = dir;
            this.iscover = iscover;
            this.size = size;
            this.percent = percent;
            this.width = width;
            this.height = height;
        }
    }

    export default {
        name: 'editor-model',
        data() {
            return {
                tagsList: [],   //储存的所有tag列表选项
                licenseList: [], //储存的所有license列表选项
                modelName: '',
                modelTags: [],
                category: [], //储存的所有category列表选项
                modelLicense: 1,
                modelPermit: 0,
                picturesList: [],  //模型概念图数组
                description: '',
                modelFile: {}, //3d模型文件
                modelStatus: 0, //1：转换失败，2：模型转换成功 5:审核失败
                wid: 0,  //模型id
                auth: false,  //区分是否是成为入驻模型师  false 不是
                onlyTwoDStatus: true,
                tag: '', //用户输入的未点击回车键的tag,用于限定一个Tag的输入长度，过长以...代替
                tags: [], //点击回车键后保存的tags数组
                isJoinArtist: 0,
                DefaultSelectedName: null,
                modelPrivacy: 0, //是否隐私
                info: {
                    info2d: true,
                    info3d: false
                },
                icon: require('../../assets/images/icon-save-view.png'),
                /*页面数据改变触发以下数据改变*/
                selectedChanged: false,
                modelNameChanged: false,
                tagsChanged: false,
                permitChanged: false,
                descriptionChanged: false,
                privacyChanged: false,
                editedThreeD: false,
                /*-----------------------*/
                modelType: 0, //4是2d 3是3d未发布 5是3d已发布
                saved: true,  //是否保存了
                saveStatus: 0, //保存截图状态
                saveInfoStatus: 0, //保存右侧模型信息状态
                saveDataChangeWord: ['toSaveData', 'saving', 'saved'],
                saveCoverChangeWord:['toSave', 'saving', 'saved'],
                coverList: [],   //保存封面图数组
                captured: false, //是否截图了
                isConvert: 0, //0不转化模型 1可以转换模型
                coverSrc: null, //截屏base64
                showCover: false, //是否显示截图区域
                coverInfoShow: true, //是否显示截图的提示信息
                picAnyChanged: false, //图片是否做了任何改变
                plsEnter: 'Please click enter',
                isThreeD: false,
                type: 1, // 0模型保存 1模型发布
                canStartWatchModelInfo: false, //加载异步数据完成之后再监听右侧Info的变化
                canStartWatchModelConcepts: false //加载异步数据完成之后再监听模型图片的变化
            }
        },
        messages: {
            en: {
                publish: 'Publish',
                yes: 'Yes',
                no: 'No',
                modelName: 'Model name',
                modelCate: 'Category',
                modelDesc: 'Description',
                drag: 'Drag',
                or: 'or',
                upload: 'upload',
                cover: 'cover',
                picture: 'picture',
                manage: 'MANAGE THIS MODEL',
                delete: 'Delete',
                setting: '3D Settings',
                downLoad: 'Download',
                privacy: 'Private model',
                reload: 'ReUpload',
                update: 'Update',
                toSave: 'Save View',
                saving: 'Saving...',
                saved: 'Saved',
                choose: 'Please Choose',
                coverInfo: 'Save thumbnail and initial camera view',
                save: 'Save',
                license: 'License',
                category: 'Category',
                maxThreeCates: 'Max 3 categories',
                tags: 'Tags',
                maxThreeTags: 'Max 3 tags',
                maxSixPictures: 'Max 6 pictures',
                pictures: 'Pictures',
                toSaveData: 'Save Data'

            },
            zh: {
                yes: '是',
                no: '否',
                publish: '发布',
                modelName: '模型名称',
                modelCate: '分类',
                modelDesc: '描述',
                drag: '拖放',
                or: '或',
                upload: '上传',
                cover: '封面',
                picture: '图片',
                manage: '管理模型',
                delete: '删除',
                setting: '修改3D',
                downLoad: '是否可被下载',
                privacy: '是否私密模型',
                reload: '重新上传',
                update: '更新',
                toSave: '保存截图',
                saving: '保存中...',
                saved: '已保存',
                choose: '请选择',
                coverInfo: '保存您的模型缩略图  重置摄像机',
                save: '保存信息',
                license: '许可',
                category: '分类',
                maxThreeCates: '最多3个分类',
                tags: '标签',
                maxThreeTags: '最多3个标签',
                maxSixPictures: '最多6张图片',
                pictures: '图片',
                toSaveData: '保存数据'
            }
        },
        watch: {
            tags(val) {     //保存的tag数组
                if (val.length > 0) {
                    this.plsEnter = '';
                    if (val.length > 3) {
                        val.splice(0, 1);
                        this.tags = val;
                    }
                } else {
                    this.plsEnter = 'Please click enter';
                }
                if (val && this.canStartWatch)
                    this.tagsChanged = true;
            },
            tag(val) {  //用户正在输入的tag
                if (this.tag.length > 38) {
                    this.tag = val.substring(0, 35) + '...';
                }
            },
            modelName(val) {
                if (val && this.canStartWatch) {
                    this.modelNameChanged = true;
                }
            },
            modelPrivacy(val) {
                if (val && this.canStartWatch) {
                    this.privacyChanged = true;
                }
            },
            modelPermit(val) {
                if (val && this.canStartWatch) {
                    this.permitChanged = true;
                }
            },
            description(val) {
                if (val && this.canStartWatch) {
                    this.descriptionChanged = true;
                }
            },
            saveStatus(val) {   //根据保存的截图状态，显示或者隐藏提示信息与截图区域
                if (val === 1) {
                    this.showCover = true;
                } else if (val === 0) {
                    this.showCover = false;
                    this.coverInfoShow = true;
                }
            },
        },
        computed: {
            processDisabled() {
                if (this.modelType !== 4) {
                    return this.modelName && this.$refs.modelCategory.selectedValue.length;
                }
                return this.modelName && this.$refs.modelCategory.selectedValue.length && this.picturesList.length;
            },
            submitDisabled() {
                if (this.auth) {
                    return this.processDisabled && this.modelStatus !== 1
                } else {
                    return this.processDisabled
                }
            },
            updateDisabled() {
                return (this.modelName
                    && this.$refs.modelCategory.selectedValue.length
                    && this.modelLicense
                    && (this.modelType === 4? this.picturesList.length : true))
                    && (this.modelNameChanged
                        || this.tagsChanged
                        || this.privacyChanged
                        || this.permitChanged
                        || this.descriptionChanged
                        || this.selectedChanged
                        || this.picAnyChanged
                        || this.captured
                    );
            },
        },
        components: {
            slideDown,
            tag,
            container,
            editorModelConceptsUpload,
            fileUpload,
            threeD,
            imageCoverUpload,
            loadingModel,
            loadingPictures
        },
        created() {
            this.init()
        },
        methods: {
            async init() {
                this.modelType = parseInt(this.$route.params.type);
                if (this.modelType !== 4) {
                    this.info.info3d = true;
                    this.info.info2d = false;
                    this.isThreeD = true;
                    if (!window.name) {
                        window.name = 'firstIn';
                        this.editedThreeD = false;
                    } else {
                        this.editedThreeD = true;
                    }
                }
                if (this.$route.name === 'joinArtistThree') {
                    this.auth = true
                }
                await this.$store.dispatch('modelAttr').then((response) => {
                    this.tagsList = response.data.tag;
                    this.licenseList = response.data.licence
                });
                await this.$store.dispatch('novahub/releaseQuotes/getReleaseAttr').then(response => {
                    this.category = response.category;
                });
                this.wid = parseInt(this.$route.params.id);
                let data = {wid: this.wid};
                await this.$store.dispatch('uploadModel/getModelMessage', data).then((response) => {
                    if (response.code === 200) {
                        this.modelName = response.data.work.title;
                        this.tags = this.resolveTags(response.data.work.tags);
                        this.modelPermit = response.data.work.permit;
                        this.description = response.data.work.description;
                        this.modelPrivacy = response.data.work.privacy;
                        this.$refs.modelCategory.selectedValue = this.getDefaultSelectedName(response.data.work.cate, this.category);
                        if (this.modelType !== 4) {
                            this.modelFile = response.data.work.model.model_3d;
                            this.$refs.modelLicense.selectedValue = this.getDefaultSelectedName(response.data.work.license, this.licenseList);
                        }
                        response.data.work.photos.forEach((photo) => {
                            if (this.modelType === 4) {
                                this.picturesList.push(new Photos(photo));
                            } else {
                                if (photo.iscover) {
                                    this.coverList.push(new Photos(photo));
                                } else {
                                    this.picturesList.push(new Photos(photo));
                                }
                            }
                        });
                        this.modelPermit = response.data.work.permit;
                        this.description = response.data.work.description;
                        this.modelStatus = response.data.work.status;
                        this.isJoinArtist = response.data.work.auth_model
                    }
                });
                if (this.modelType !== 4) {
                    this.$refs.loadingModel.showSlots();
                    this.$refs.loadingPictures.showSlots();
                } else {
                    this.$refs.loadingPictures.showSlots();
                }
                this.canStartWatch = true;
            },
            resolveTags(val) {
                let resultTags = [];
                val.forEach(item => {
                    if (item.length > 35) {
                        item = item.substring(0, 35) + '...';
                    }
                    resultTags.push(item)
                });
                return resultTags;
            },
            hideCategory() {
                this.$refs.modelCategory.show = false;
                if (this.modelType !== 4) {
                    this.$refs.modelLicense.show = false;
                }
            },
            saveInfo() {
                this.type = 0;
                this.submitModel();
                if (this.saved) {
                    this.saveInfoStatus = 1;
                    setTimeout(() => {
                        this.saveInfoStatus = 2;
                        this.type = 1;
                    }, 2000);
                }
            },
            goToEdit() {
                this.$refs.three.goEdit();
            },
            seletctValueChanged() {
                this.selectedChanged = true;
            },
            imageStatusChange({data}) {
                let _that = this;
                if (this.canStartWatchModelConcepts) {
                    _that.picAnyChanged = true;
                }
                if (_that.modelType !== 4) {
                    data.forEach((val) => {
                        if (!val.isCover) {
                            _that.picturesList = data;
                        }
                    });
                } else {
                    _that.picturesList = data;
                }
                this.canStartWatchModelConcepts = true;
            },
            capture() {
                if (this.saveStatus === 0) {
                    this.coverSrc = this.$refs.three.getRenderer();
                    this.captured = true;
                    this.$refs.imageListsTreeDCover.coverPush(this.coverSrc);
                    this.coverInfoShow = false;
                    if (this.saveStatus = 2) {
                        this.icon = require('../../assets/images/icon-save-view.png');
                        this.saveStatus = 1;
                        const p1 = new Promise((resolve) => {
                            setTimeout(() => {
                                this.saved = true;
                                this.saveStatus = 2;
                                this.icon = require('../../assets/images/icon-saved.png')
                            }, 2000);
                            resolve();
                        });
                        const p2 = new Promise((resolve) => {
                            setTimeout(() => {
                                resolve(p1);
                                this.saved = true;
                                this.saveStatus = 0;
                                this.icon = require('../../assets/images/icon-save-view.png');
                            }, 4000);
                        });
                    }
                } else {
                    return false;
                }
            },
            beforeSubmitCapture() {
                this.coverSrc = this.$refs.three.getRenderer();
                this.$refs.imageListsTreeDCover.coverPush(this.coverSrc);
            },
            async deleteUpload(e) {
                let _this = this;
                e.preventDefault();
                this.$alert({
                    type: 'confirm',
                    message: 'Are you sure you want to delete this model?'
                }).then((response) => {
                    if (response.data === 'confirm') {
                        this.$store.dispatch('deleteMyUploadsAc', {id: this.wid}).then((response) => {
                            if (response.code === 200) {
                                _this.$router.push({
                                    name: 'personalProtfolio',
                                    params: {id: parseInt(this.$store.state.user.userId)}
                                });
                            }
                        });
                    }
                })
            },
            changePermit(val) {
                if (val === 'yes') {
                    this.modelPermit = 1;
                } else {
                    this.modelPermit = 0;
                }
            },
            changePrivacy(val) {
                if (val === 'yes') {
                    this.modelPrivacy = 1;
                } else {
                    this.modelPrivacy = 0;
                }
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
            reUpload() {
                this.$createNewModel(this.$route.params.id);
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
            getDefaultSelectedName: function (selected, list) {
                let result = [];
                if (Array.isArray(selected)) {
                    for (let i = 0; i < list.length; i++) {
                        for (let k = 0; k < selected.length; k++) {
                            if (list[i].id === selected[k]) {
                                result.push(list[i].name)
                            }
                        }
                    }
                }
                else {
                    for (let i = 0; i < list.length; i++) {
                        if (list[i].id === selected) {
                            result = list[i].name
                        }
                    }
                }
                return result
            },
            async submitModel() {
                let photoList = [];
                if (this.modelType !== 4) {
                    let _that = this;
                    if (_that.coverList.length > 0) {
                        let cover = _that.coverList.pop();
                        photoList.push(new modelCoverSubmit(cover));
                    } else {
                        _that.beforeSubmitCapture();
                        let cover = this.coverList.pop();
                        photoList.push(new modelCoverSubmit(cover));
                    }
                }
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
                let categorys = this.getSelectedId(this.$refs.modelCategory.selectedValue, this.category);
                let data = {
                    wid: this.wid,
                    name: this.modelName,
                    category: categorys,
                    tags: this.tags,
                    license: this.modelLicense,
                    rphotos: photoList,
                    permit: this.modelPermit,
                    type: this.type,
                    video_url: this.videoStr,
                    description: this.description,
                    auth: this.auth,
                    privacy: this.modelPrivacy,
                    is_convert: 0
                };
                await this.$store.dispatch('uploadModel/postModelMessage', data).then((response) => {
                    if (response.code === 200 && this.type === 1) {
                        this.$router.push({
                            name: 'personalProtfolio',
                            params: {id: parseInt(this.$store.state.user.userId)}
                        });
                    } else if (response.code === 200 && this.type === 0) {
                        this.saved = true;
                    }
                })
            },
        }
    }
</script>

<style lang="scss" scoped>
    @keyframes fadeIn {
        0% {
            opacity: 0;
        }
        50% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }

    .page {
        width: 100%;
        display: flex;
        justify-content: center;
        .editor-model {
            display: flex;
            width: 84%;
            justify-content: center;
            .pic-message-max {
                font-size: 12px;
                color: #9B9B9B;
            }
            .pic-info-title {
                margin-left: 24px;
                margin-top: 24px;
                font-size: 16px;
                color: #787878;
                line-height: 21px;
                margin-bottom: 10px;
            }
            .pic-message {
                margin-left: 24px;
                margin-top: 24px;
                font-size: 16px;
                color: #787878;
                line-height: 21px;
            }
            .show-image {
                margin-top: 20px;
            }
            .pic-threed {
                width: 773px;
                height: 456px;
                background: #FFFFFF;
                border: 1px solid #F1F1F1;
                border-radius: 4px;
                margin-top: 12px;
                left: 111px;
            }
            .pic-twod {
                width: 773px;
                height: 456px;
                background: #FFFFFF;
                border: 1px solid #F1F1F1;
                border-radius: 4px;
                margin-top: 97px;
                left: 111px;
            }
            .show-model {
                height: 436px;
                width: 773px;
                margin-top: 99px;
                .model-note {
                    height: 436px;
                    background-color: #575761;
                    font-size: 16px;
                    color: #fff;
                    align-items: center;
                    justify-content: center;
                    margin-top: -50px;
                    border-radius: 5px;
                    position: relative;
                    > img {
                        position: absolute;
                        left: 50%;
                        margin-left: -58px;
                        bottom: 42px;
                    }
                }
                .piw {
                    position: absolute;
                    width: 182px;
                    height: 106px;
                    top: 153px;
                    z-index: 1;
                    margin-left: 10px;
                    background-color: #575761;
                    background-size: 182px 106px;
                    animation-name: fadeIn;
                    animation-duration: 0.5s;
                    animation-iteration-count: 1;
                    animation-delay: 0s;
                }
                .pic {
                    width: 119px;
                    height: 32px;
                    background: #2A2A36;
                    border-radius: 100px;
                    font-size: 14px;
                    color: #D4D4D6;
                    position: absolute;
                    z-index: 1;
                    top: 111px;
                    margin-left: 10px;
                    animation-name: fadeIn;
                    animation-duration: 2s;
                    animation-iteration-count: 1;
                    animation-delay: 0s;
                    span {
                        position: relative;
                        z-index: 1;
                        margin-left: 4px;
                        top: 8px;
                    }
                    img {
                        margin-left: 12px;
                        padding-top: 7px;
                    }
                    .cover-info {
                        position: absolute;
                        height: 40px;
                        width: 120px;
                        left: 130px;
                        margin-top: -25px;
                        display: none;
                        z-index: 1;
                        background: #2A2A36;
                        border-radius: 10px;
                        font-size: 12px;
                        padding-top: 7px;
                        animation-name: fadeIn;
                        animation-duration: 0.7s;
                        animation-iteration-count: 1;
                        animation-delay: 0s;
                        text-align: center;
                    }
                    &:hover {
                        .cover-info {
                            display: block;
                        }
                    }
                }
            }
            .message {
                margin-left: 10px;
                background-color: #F6F6F6;
                margin-top: 97px;
                .model-name {
                    margin-left: 24px;
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
                }
                .tags {
                    margin-top: 18px;
                    margin-bottom: 11px;
                    margin-left: 24px;
                    width: 373px;
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
                                min-height: 30px;
                                max-width: 373px;
                                display: flex;
                                justify-content: center;
                                align-items: center;
                                background: #9B9B9B;
                                border-radius: 2px;
                                padding: 0 10px;
                                margin-right: 10px;
                                margin-bottom: 5px;
                                overflow: hidden;
                                span {
                                    font-size: 16px;
                                    color: #FFFFFF;
                                    margin-right: 8px;
                                    top: 0;
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
                .category {
                    font-size: 16px;
                    color: #787878;
                    line-height: 21px;
                    width: 373px;
                    border-radius: 1px;
                    background: #FFFFFF;
                    margin-left: 24px;
                    margin-top: 18px;
                }
                .license {
                    font-size: 16px;
                    color: #787878;
                    line-height: 21px;
                    width: 373px;
                    border-radius: 1px;
                    background: #FFFFFF;
                    margin-left: 24px;
                    margin-top: 18px;
                }
                .description {
                    margin-top: 18px;
                    margin-left: 24px;
                    margin-bottom: 18px;
                    .description-content {
                        width: 373px;
                        height: 157px;
                        background: #FFFFFF;
                        border: 1px solid #D2D2D2;
                        border-radius: 1px;
                        resize: none;
                        font-size: 14px;
                        color: #4A4A4A;
                        padding: 5px 14px 7px 14px;
                    }
                }
                .slide-down {
                    height: 40px;
                    width: 500px;
                    position: absolute;
                    top: 124px;
                    left: 171px;
                }
                .pic-message-max {
                    font-size: 12px;
                    color: #9B9B9B;
                }
                .line {
                    height: 1px;
                    border-top: 1px solid #D2D2D2;
                    width: 373px;
                    margin-left: 24px;
                }
                .info-title {
                    font-size: 16px;
                    color: #787878;
                    line-height: 21px;
                    margin-bottom: 10px;
                }
                .info-content {
                    margin-top: 22px;
                }
                .manage {
                    font-size: 16px;
                    color: #2A2A36;
                    line-height: 21px;
                    margin-left: 24px;
                    margin-top: 30px;
                    margin-bottom: 17px;
                }
                .button-group {
                    height: 88px;
                    margin-left: 24px;
                    button {
                        width: 114px;
                        height: 32px;
                        text-align: center;
                        line-height: 21px;
                        font-size: 16px;
                        left: 24px;
                        top: 56px;
                        margin-right: 10px;
                    }
                    .publish {
                        height: 45px;
                        line-height: 45px;
                        width: 373px;
                        font-size: 16px;
                        cursor: pointer;
                        margin-bottom: 12px;
                    }
                }
                .info-footer {
                    margin-left: 24px;
                    height: 77px;
                    p {
                        color: #787878;
                        line-height: 77px;
                    }
                    .down-load-btn {
                        .down-load-btn1 {
                            position: relative;
                            margin-top: -54px;
                            margin-left: 215px;
                        }
                        .down-load-btn2 {
                            position: relative;
                            margin-top: -54px;
                            margin-left: 215px;
                        }
                        .btn-default {
                            width: 80px;
                            height: 33px;
                            margin-right: -4px;
                            margin-left: -4px;
                            background-color: #EA6264;
                            border-radius: 1px;
                            color: #fff;
                            &:hover {
                                background-color: #CD5355;
                            }
                            &:active {
                                background-color: #BC3A3C;
                            }
                            &[disabled] {
                                background-color: #D5D9DF;
                                color: #fff;
                            }
                            &.disabled {
                                background-color: #D5D9DF;
                                color: #fff;
                            }
                        }
                        .btn-default-border {
                            width: 81px;
                            height: 33px;
                            background-color: #fff;
                            border-radius: 1px;
                            color: #EA6264;
                            border: 1px solid #EA6264;
                            margin-right: -2px;
                            margin-left: -2px;
                            &:hover {
                                background-color: #FFD9DA;
                            }
                            &:active {
                                background-color: #F9B0B2;
                            }
                            &[disabled] {
                                border: 1px solid #D5D9DF;
                                color: #D5D9DF;
                                background-color: #fff;
                            }
                        }
                    }
                }
                /*3d right form class*/
                .info3d {
                    float: right;
                    width: 421px;
                    min-height: 905px;
                    top: 97px;
                    right: 266px;
                    background: #FFFFFF;
                    border: 1px solid #F1F1F1;
                    border-radius: 4px;
                    margin-bottom: 21px;
                    .delete-model {
                        font-size: 12px;
                        color: #9B9B9B;
                        text-align: center;
                        float: right;
                        margin-right: 23px;
                    }
                }
                /*2d right form class*/
                .info2d {
                    float: right;
                    width: 421px;
                    min-height: 740px;
                    top: 97px;
                    right: 266px;
                    background: #FFFFFF;
                    border: 1px solid #F1F1F1;
                    border-radius: 4px;
                    margin-bottom: 21px;
                    .delete2d {
                        height: 32px;
                        line-height: 32px;
                        width: 373px;
                        font-size: 16px;
                        cursor: pointer;
                        margin-bottom: 12px;
                    }
                }
            }
        }
    }
</style>
