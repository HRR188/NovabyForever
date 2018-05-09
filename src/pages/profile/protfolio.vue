<template>
    <div class="protfolio-container">
        <!-- use createNewModelayer to upload new model-->
        <p class="text-right" v-if="isMe">
            <a @click="createNewModelLayer()" class="upload-btn btn-default btn upp" v-lang.upload></a>
        </p>
        <ul v-if="isMe" class="uploads" v-infinite-scroll="loadingMore" infinite-scroll-disabled="lodingSwitch"
            infinite-scroll-distance="10">
            <li v-for="(item,parentIndex) in myUploads">
                <p>{{item.udate}}</p>
                <div class="clearfix">
                    <div class="items-box" v-for="(items,childrenIndex) in item.works">
                        <div class="items">
                            <!--model-transing-->
                            <div v-if="items.status === 0">
                                    <div class="cover-background">
                                        <div class="img-box" :style="{backgroundImage : 'url('+items.cover+')'}">
                                            <p>In 3D conversion,please wait...</p>
                                        </div>
                                    </div>
                                <p class="model-name" @click="linkTo(items)">{{items.name.length>20? items.name.substring(0,25)+'...':items.name}}</p>
                            </div>
                            <!--2d -->
                            <router-link
                                    :to="items.status === 4 && !items.work_model?{name:'model-detail',params:{id:items.id}}:{name:'editorModel',params:{id:items.id}}"
                                    target="_blank" v-if="items.work_trans+items.status == 4">
                                <div class="img-box" :style="{backgroundImage : 'url('+items.cover+')'}">
                                </div>
                                <div class="options">
                                    <div class="show-options">
                                        <router-link
                                                :to="{name:'editorModel',params:{id:items.id,type:items.work_trans+items.status}}"
                                                target="_blank">
                                            <div class="show-update pointer" v-lang.edit></div>
                                        </router-link>
                                        <div class="show-delete pointer"
                                             @click.stop.prevent="deleteUpload($event,items,parentIndex,childrenIndex)"
                                             v-lang.del></div>
                                    </div>
                                    <div class="btn-box">
                                        <button class="btn-options" @click.stop.prevent="showOptions(items.id)"></button>
                                    </div>
                                </div>
                                <p  class="model-name" @click="linkTo(items.work_trans+items.status)">{{items.name.length>20? items.name.substring(0,25)+'...':items.name}}</p>
                            </router-link>
                            <!--3d ok but not publish-->
                            <router-link v-if="items.work_trans+items.status == 3 && items.status != 1"
                                         :to="{name:'editorModel',params:{id:items.id,type:items.work_trans+items.status}}"
                                         target="_blank">
                                <img src="../../assets/images/icon-3D.png" alt=""
                                     class="is3d">
                                <div class="cover-background">
                                    <div class="img-box" :style="{backgroundImage : 'url('+items.cover+')'}">
                                        <p>3D conversion finished</p>
                                    </div>
                                </div>
                                <div class="options">
                                    <div class="show-options">
                                        <router-link
                                                :to="{name:'editorModel',params:{id:items.id,type:items.work_trans+items.status}}"
                                                target="_blank">
                                            <div class="show-update pointer" v-lang.edit></div>
                                        </router-link>
                                        <div class="show-delete pointer"
                                             @click.stop.prevent="deleteUpload($event,items,parentIndex,childrenIndex)"
                                             v-lang.del></div>
                                    </div>
                                    <div class="btn-box">
                                        <button class="btn-options" @click.stop.prevent="showOptions(items.id)"></button>
                                    </div>
                                </div>
                                <p  class="model-name" @click="linkTo(items.work_trans+items.status)">{{items.name.length>20? items.name.substring(0,25)+'...':items.name}}</p>
                            </router-link>
                            <!--3d ok reEdit-->
                            <router-link v-if="items.work_trans+items.status==5 && items.status != 1"
                                         :to="{name:'model-detail',params:{id:items.id}}" target="_blank">
                                <img src="../../assets/images/icon-3D.png" alt="" class="is3d">
                                <div class="cover-background">
                                    <div class="img-box" :style="{backgroundImage : 'url('+items.cover+')'}"></div>
                                </div>
                                <div class="options">
                                    <div class="show-options">
                                        <router-link
                                                :to="{name:'editorModel',params:{id:items.id,type:items.work_trans+items.status}}"
                                                target="_blank">
                                            <div class="show-update pointer" v-lang.edit></div>
                                        </router-link>
                                        <div class="show-delete pointer"
                                             @click.stop.prevent="deleteUpload($event,items,parentIndex,childrenIndex)"
                                             v-lang.del></div>
                                    </div>
                                    <div class="btn-box">
                                        <button class="btn-options" @click.stop.prevent="showOptions(items.id)"></button>
                                    </div>
                                </div>
                                <p  class="model-name" @click="linkTo(items.work_trans+items.status)">{{items.name.length>20? items.name.substring(0,25)+'...':items.name}}</p>
                            </router-link>
                            <!--3d trans falied-->
                            <div v-if=" items.work_trans == 2">
                                <div class="cover-background">
                                    <div class="img-box" :style="{backgroundImage : 'url('+items.cover+')'}">
                                        <p>3D conversion failed</p>
                                    </div>
                                </div>
                                <div class="options">
                                    <div class="file-delete pointer"
                                         @click.stop.prevent="deleteUpload($event,items,parentIndex,childrenIndex)"
                                         v-lang.del></div>
                                    <div class="btn-box">
                                        <button class="btn-options" @click.stop.prevent="showOptions(items.id)"></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </li>
        </ul>
        <div v-if="!isMe" class="project-list-container" v-infinite-scroll="loadingMore"
             infinite-scroll-disabled="lodingSwitch" infinite-scroll-distance="50">
            <template v-for="project in myUploads">
                <project-big-list :projectData="project" :showAuthor="false"></project-big-list>
            </template>
        </div>
        <loading :loadingMsg="uploadLoadingMsg"></loading>
        <back-to-top :target="200"></back-to-top>
    </div>
</template>

<script>
    import ProjectBigList from '../../components/community/ProjectBigList'
    import loading from '../../components/commons/loading'
    import backToTop from '../../components/commons/backToTop'

    export default {
        name: 'personalProtfolio',
        data() {
            return {
                myUploads: [],
                lodingSwitch: false,
                curPage: 0,
                uploadLoadingMsg: {
                    loadingStatus: false,
                    noteText: "No more data",
                    noteStatus: true
                },
                isMe: true,
                isOptionsShow: false,
                showThisButton: false,
                modelType: 0,
                optionStatus: 0

            }
        },
        messages: {
            en: {
                edit: 'Edit',
                del: 'Delete',
                showReload: 'ReUpload'
            },
            zh: {
                edit: '更新',
                del: '删除',
                showReload: '重新上传'
            }
        },
        components: {
            loading,
            backToTop,
            ProjectBigList
        },
        created() {
            (parseInt(this.$route.params.id) === parseInt(this.$store.state.user.userId)) || (this.isMe = false)
        },
        methods: {
            isShow() {
                if (this.optionStatus) {
                    this.optionStatus = 0;
                }
            },
            fastReupload(e, items, parentIndex, childrenIndex) {
                this.$store.dispatch('deleteMyUploadsAc', {id: items.id}).then((response) => {
                    if (response.code === 200) {
                        this.myUploads[parentIndex].works.splice(childrenIndex, 1);
                        if (!this.myUploads[parentIndex].works.length) {
                            this.myUploads.splice(parentIndex, 1)
                        }
                    }
                });
                this.$createNewModel({});
            },
            showOptions(val) {
                this.showThisButton = val;
                this.optionStatus = 1;
            },
            createNewModelLayer() {
                this.$createNewModel({});
            },
            itemsMouseover(event, data) {
                if (data.status === 4) {
                    let childBtnBox = event.currentTarget.querySelector('.btn-box');
                    childBtnBox.style.display = 'block';
                }
            },
            itemsMouseout(event, data) {
                if (data.status === 4) {
                    let childBtnBox = event.currentTarget.parentNode.parentNode.querySelector('.btn-box');
                    childBtnBox.style.display = 'none'
                }
            },
            loadingMore() {
                this.curPage++;
                if (this.isMe) {
                    let data = {
                        page: this.curPage,
                        pagesize: 5
                    };
                    this.$store.dispatch('myUploadsAc', data).then((response) => {
                        this.uploadLoadingMsg.loadingStatus = true;
                        if (response.code === 200) {
                            this.myUploads = this.myUploads.concat(response.data.works)
                        }
                        else {
                            this.lodingSwitch = true;
                            this.uploadLoadingMsg.loadingStatus = false;
                            this.uploadLoadingMsg.noteStatus = true
                        }
                    });
                }
                else {
                    let data = {
                        uid: this.$route.params.id,
                        page: this.curPage,
                        pagesize: 5
                    };
                    this.$store.dispatch('pageUserWorksAc', data).then((response) => {
                        this.uploadLoadingMsg.loadingStatus = true;
                        if (response.code === 200) {
                            this.myUploads = this.myUploads.concat(response.data.works)
                        }
                        else {
                            this.lodingSwitch = true;
                            this.uploadLoadingMsg.loadingStatus = false;
                            this.uploadLoadingMsg.noteStatus = true
                        }
                    });
                }
            },
            linkTo(val) {
                //if 2d
                if (val === 4) {
                    this.$router.push({name: 'editorModel', params: {id: this.$route.params.id, type: 0}})
                }
                //if 3d ok not published
                else if (val === 3) {
                    this.$router.push({name: 'editorModel', params: {id: this.$route.params.id, type: 1}})
                }
                //if 3d ok  and published
                else if (val === 5) {
                    this.$router.push({name: 'editorModel', params: {id: this.$route.params.id, type: 2}})
                }
            },
            deleteUpload(e, items, parentIndex, childrenIndex) {
                e.preventDefault();
                this.$alert({type: 'confirm', message: 'Delete the model?'}).then((response) => {
                    if (response.data === 'confirm') {
                        this.$store.dispatch('deleteMyUploadsAc', {id: items.id}).then((response) => {
                            if (response.code === 200) {
                                this.myUploads[parentIndex].works.splice(childrenIndex, 1);
                                if (!this.myUploads[parentIndex].works.length) {
                                    this.myUploads.splice(parentIndex, 1)
                                }
                            }
                        });
                    }
                })
            }
        }
    }
</script>

<style lang="scss">
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

    .personal-warp {
        .protfolio-container {
            margin-top: 10px;
            .upload-btn {
                width: 80px;
                height: 25px;
                line-height: 25px;
                font-size: 12px;
                color: #fff;
                margin-bottom: 10px;
            }
        }
        .uploads {
            min-height: 65px;
            li {
                margin-bottom: 50px;
                > p {
                    color: #4A4A4A;
                    font-size: 16px;
                    line-height: 16px;
                    &:before {
                        content: '';
                        display: inline-block;
                        width: 18px;
                        height: 20px;
                        vertical-align: bottom;
                        background-image: url(../../assets/images/uploads-sprite.png);
                        background-repeat: no-repeat;
                        background-position: 0px -59px;
                        margin-right: 10px;
                    }
                }
                .items-box {
                    float: left;
                    width: 300px;
                    margin-right: 18px;
                    margin-top: 15px;
                    position: relative;
                    .items {
                        width: 100%;
                        > p {
                            font-size: 18px;
                            color: #4A4A4A;
                            margin-top: 10px;
                            cursor: pointer;
                            &:hover {
                                color: #EA6264;
                            }
                        }
                    }
                    .img-box {
                        width: 100%;
                        height: 200px;
                        vertical-align: middle;
                        text-align: center;
                        border-radius: 5px;
                        overflow: hidden;
                        border: 1px solid #dcdcdc;
                        cursor: pointer;
                        position: relative;
                        background-size: cover;
                        img {
                            height: 100%;
                            max-width: 100%;
                        }
                        p {
                            position: absolute;
                            font-size: 14px;
                            color: #fff;
                            background: rgba(41, 41, 41, 0.50);
                            border: 2px solid rgba(193, 193, 193, 0.53);
                            border-radius: 100px;
                            width: 230px;
                            height: 28px;
                            line-height: 25px;
                            top: 50%;
                            left: 50%;
                            margin: -10px 0 0 -115px;
                        }
                    }
                    &:nth-child(3n) {
                        margin-right: 0;
                    }
                    /*.options {*/
                    .btn-box {
                        position: absolute;
                        width: 100%;
                        left: 0;
                        top: 12px;
                        .editor {
                            float: left;
                            display: inline-block;
                            width: 18px;
                            height: 18px;
                            background-image: url(../../assets/images/uploads-sprite.png);
                            background-repeat: no-repeat;
                            background-position: 0 -30px;
                            margin-left: 12px;
                            cursor: pointer;
                        }
                        .btn-options {
                            float: right;
                            display: inline-block;
                            width: 30px;
                            height: 30px;
                            margin-right: 12px;
                            margin-top: 150px;
                            border: none;
                            cursor: pointer;
                            background-image: url(../../assets/images/icon_Portfolio.png);
                            background-size: 30px 30px;
                            background-repeat: no-repeat;
                            background-position: 0 0;
                            border: none;
                            background-color: rgba(0, 0, 0, 0);
                            cursor: pointer;
                        }
                    }
                    &:hover {
                        .file-delete {
                            display: block;
                            animation-name: fadeIn;
                            animation-duration: 0.5s;
                            animation-iteration-count: 1;
                            animation-delay: 0s;
                        }
                        .show-options {
                            display: block;
                            animation-name: fadeIn;
                            animation-duration: 0.5s;
                            animation-iteration-count: 1;
                            animation-delay: 0s;
                        }
                    }
                    .show-options {
                        box-shadow: 0 0 4px 0 rgba(168, 168, 168, 0.50);
                        border-radius: 2px;
                        background: #FFFFFF;
                        position: absolute;
                        z-index: 1;
                        margin-right: 100px;
                        margin-top: -40px;
                        margin-left: 168px;
                        width: 80px;
                        height: 65px;
                        top: 165px;
                        display: none;
                        .show-update {
                            height: 50%;
                            border-bottom: 1px solid #D8D8D8;
                            padding-left: 10px;
                            line-height: 32.5px;
                            font-size: 12px;
                            color: #5C5C5C;
                            &:hover {
                                color: #CD5355;
                            }
                            &:active {
                                color: #BC3A3C;
                            }
                        }
                        .show-delete {
                            font-size: 12px;
                            color: #5C5C5C;
                            padding-left: 10px;
                            line-height: 32.5px;
                            &:hover {
                                color: #CD5355;
                            }
                            &:active {
                                color: #BC3A3C;
                            }
                        }
                        /*}*/
                    }
                }
            }
        }

        .file-delete {
            box-shadow: 0 0 4px 0 rgba(168, 168, 168, 0.50);
            border-radius: 2px;
            background: #FFFFFF;
            position: absolute;
            z-index: 9999;
            margin-right: 100px;
            margin-top: -10px;
            margin-left: 168px;
            width: 80px;
            height: 32px;
            top: 168px;
            border-bottom: 1px solid #D8D8D8;
            color: #EA6264;
            padding-left: 10px;
            line-height: 32.5px;
            font-size: 12px;
            display: none;
        }
        .is3d {
            width: 20px;
            height: auto;
            position: absolute;
            left: 261px;
            top: 14px;
            z-index: 1;
        }
        .cover-background {
            float: left;
            background-color: #575761;
            width: 300px;
            height: 200px;
            border-radius: 11px;
        }
    }
</style>
