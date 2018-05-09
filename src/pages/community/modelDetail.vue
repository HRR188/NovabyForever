<template>
    <div class="model-detail-container">
        <div class="works-detail auto w-1200 clearfix">
            <div class="model-detail-page-left float-left">
                <template v-if="hasModel && showSection === '3d'">
                    <div class="model-note" v-if="modelFile.id">
                        <three-d :modelFile="modelFile"
                                 :id="modelId"
                                 :hideBtns="showDetail"
                                 :refreshAfterLeave="false"
                                 :showFullScreenBtn="true">
                        </three-d>
                    </div>
                </template>
                <div class="twoD-container" v-if="images.length">
                    <ul>
                        <li v-for="(item,index) in images">
                            <div class="img-box" @click="imageFullScreen(index)" >
                                <img :src="item">
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="comment-wrap">
                    <p class="response-title upp">{{this.totalComments|| 0}} {{translate('response')}}</p>
                    <div class="comment-reply">
                        <div class="send-comment">
                            <div class="portrait">
                                <portrait :portraitUrl="model.my_avatar"
                                          :type="myUserType"
                                          :width="16"
                                          :height="16">
                                </portrait>
                            </div>
                            <textarea type="text"
                                      :placeholder="translate('yourComment')"
                                      v-on:focus = "bigerInput()"
                                      v-model="reply"
                                      :class = "!this.biger? 'smallInput':'bigInput'"
                                      @keyup.enter="sendReply">
                            </textarea>
                        </div>
                        <div class="send-btn pointer" @click="sendReply" v-show="this.biger" >
                            <img src="../../assets/images/icon-send.png" alt="">
                            {{translate('send')}}
                        </div>
                    </div>
                    <div class="comments-list">
                        <template v-for="reply in replyList">
                            <comment :commentData="reply"></comment>
                        </template>
                    </div>
                    <div class="no-comments" v-if="!replyList.length && !this.biger">
                        <img src="../../assets/images/icon-comments-none.png"/>
                        <span class="no-comments-word">{{translate('noComments')}}</span>
                    </div>
                    <button v-if="replyList.length > 0 && this.loadMoreButtonShow" @click="getData" class="btn btn-default-border load-more">{{translate('loadMore')}}</button>
                </div>
            </div>
            <div class="model-detail-page-right float-right">
                <div class="digital-container">
                    <div class="author-info">
                        <div class="author-info-detail flex" v-if="!authorInfo.me">
                            <div class="portrait">
                                <router-link :to="{name:'personalAbout',params:{id:authorInfo.user_id}}">
                                    <portrait :portraitUrl="authorInfo.avatar"
                                              :type="myUserType"
                                              :width="16"
                                              :height="16">
                                    </portrait>
                                </router-link>
                            </div>
                            <div class="author-info-description">
                                <p class="author-name">{{authorInfo.user_name}}</p>
                                <div class="flex">
                                    <span >{{authorInfo.user_city}}</span>
                                    <span style="margin-right: 5px;margin-left: 5px" v-if="authorInfo.user_city && authorInfo.user_country"> / </span>
                                    <span >{{authorInfo.user_country}}</span>
                                </div>
                                <model-detail-follow-btn
                                        :btnBorder="false"
                                        :followId="authorInfo.user_id"
                                        :isRefresh = "false"
                                        :followBtnStatus="authorInfo.followed">
                                </model-detail-follow-btn>
                            </div>
                        </div>
                        <p class="model-name">{{model.name}}</p>
                        <div class="views-report-model">
                            <div class="icon-left float-left">
                                <img class="view-count-icon" src="../../assets/images/icon-view-count.png">
                                <span class="view-count">{{model.views}}</span>
                            </div>
                            <div class="icon-right float-right" v-if="!authorInfo.me">
                                <img class="report-model-icon" src="../../assets/images/icon-report-model.png">
                                <span class="report-model pointer" @click="reportModel()">{{translate('ReportModel')}}</span>
                            </div>
                            <router-link v-if="showSection === '2d' && authorInfo.me" :to="{name:'editorModel',params:{id:modelId,type:4}}" target="_blank">
                                <span  class="edit-my-model pointer float-right"  v-lang.edit></span>
                            </router-link>
                            <router-link v-if="showSection === '3d' && authorInfo.me" :to="{name:'editorModel',params:{id:modelId,type:5}}" target="_blank">
                                <span class="edit-my-model pointer float-right" v-lang.edit></span>
                            </router-link>
                        </div>
                        <div class="btn-s">
                            <div class="pointer">
                                <model-detail-like-btn :workId="modelId" ref = "modelDetailLike"></model-detail-like-btn>
                            </div>
                            <div class="btn-s-content btn-default-border share-model pointer" @click = "linkShow = !linkShow">
                                <img src="../../assets/images/icon-share-model.png" />
                                {{translate('Share')}}
                                <div @mouseleave = "linkShow=false">
                                    <model-detail-share-links :id="modelId" v-show="linkShow"></model-detail-share-links>
                                </div>
                            </div>
                            <div class=" btn-s-content btn-default-border down-load-model pointer"
                                 @click = "downloadModel"
                                 v-if="showSection === '3d' && this.model.has_zip">
                                <img src="../../assets/images/icon-download-model.png" />
                                {{translate('Download')}}
                            </div>
                        </div>
                    </div>
                    <hr class="line" />
                    <div class="model-info">
                        <div class="message" style="margin-left: 0;padding-left: 10px;">
                            <div class="info-content">
                                <div class="category">
                                    <p class="info-title">{{translate('category')}}</p>
                                    <ul>
                                        <li v-for="cate in model.category" class="cate-content">
                                            {{cate}}
                                        </li>
                                    </ul>
                                </div>
                                <div class="tags">
                                    <p class="info-title">{{translate('tags')}}</p>
                                    <div>
                                        <ul>
                                            <li v-for="item in model.tag">{{item}}</li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="license" >
                                    <p class="info-title">{{translate('license')}}</p>
                                    <div v-if="showSection === '3d'" class="license-content">{{model.license}}</div>
                                    <div v-if="showSection === '2d'" class="license-content">Attribution</div>
                                </div>
                                <div class="description">
                                    <p class="info-title" >{{translate('description')}}</p>
                                    <div class="description-content" >{{model.description}}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr class="line" />
                    <div class="follow-info">
                        <model-detail-follow-and-load-more type="A" style="margin-bottom:12px;"></model-detail-follow-and-load-more>
                    </div>
                    <hr class="line" />
                    <div class="more-model-show">
                        <model-detail-follow-and-load-more type="B"></model-detail-follow-and-load-more>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    import portrait from '../../components/user/headPortrait.vue'
    import ModelDetailFollowBtn from '../../components/commons/ModelDetailFollowBtn.vue'
    import modelDetailLikeBtn from '../../components/commons/modelDetailLikeBtn.vue'
    import DownloadBtn from '../../components/commons/DownloadBtn.vue'
    import Comment from '../../components/community/Comment.vue'
    import ModelDetailFollowAndLoadMore from '../../components/whoToFollow/ModelDetailFollowAndLoadMore.vue'
    import ModelDetailShareLinks from '../../components/commons/ModelDetailShareLinks.vue'
    import peoplePortrait from '../../components/user/headPortrait'
    import threeD from '../../components/threeD/threeD.vue'
    import fullScreenSlider from "../../components/community/fullScreenSlider.vue";

    export default {
        name: 'model-detail',
        data() {
            return {
                showSection: '3d',
                showInfo: false,
                showDetail: false,
                getModelData: false,
                reply: '',
                modelId: 0,
                hasModel: 0,
                unSliderConfig: {
                    time: 1000,
                    backgroundColor: '#1d1d1d'
                },
                modelFile: {},
                whoToFollowStatus: false,
                authorInfo: {},
                replyList: [],
                page:1,
                fullScreenShow:false,
                linkShow: false,
                biger:false,
                totalComments:0,
                haveSendNumer:0,
                notHaveGetData:true,
            }
        },
        messages: {
            en: {
                modelId: 'model id',
                category: 'Category',
                ReportModel:'Report model',
                ShareTo:'Share to',
                Download: 'Download',
                noComments: 'There was no comment',
                loadMore: 'Load more',
                Share:'Share',
                description:'Description',
                license:'License',
                tags:'Tags',
                edit:'Edit'

            },
            zh: {
                modelId: '模型编号',
                category: '分类',
                license: '许可',
                ReportModel:'举报模型',
                Share:'分享',
                Download: '模型下载',
                noComments: '没有评论',
                loadMore: '加载更多',
                ShareTo:'分享到',
                description:'描述',
                tags:'标签',
                edit:'编辑'
            }
        },
        components: {
            fullScreenSlider,
            ModelDetailFollowBtn,
            modelDetailLikeBtn,
            DownloadBtn,
            Comment,
            ModelDetailFollowAndLoadMore,
            ModelDetailShareLinks,
            peoplePortrait,
            portrait,
            threeD,
        },
        watch: {
            $route: 'init',
        },
        created() {
            this.init();
        },
        computed: {
            ...mapState('modelDetail', [
                'images', 'model', 'replies'
            ]),
            myUserType() {
                return this.$store.state.user.userType
            },
            loadMoreButtonShow(){
                if(this.totalComments > 6) {
                    return this.replyList.length !== this.totalComments;
                }else{
                    return false
                }
            },
        },
        methods: {
            bigerInput(){
                this.biger = true;
            },
            init() {
                this.whoToFollowStatus = false;
                this.$store.commit('modelDetail/resterData');
                this.showInfo = false;
                this.showDetail = false;
                let obj = this;
                let id = this.$route.params.id;
                this.modelId = this.$route.params.id;
                this.$store.dispatch('modelDetail/getModelDetail', id).then(function (response) {
                    obj.whoToFollowStatus = true;
                    obj.showSection = response.model.hasmodel ? '3d' : '2d';
                    obj.hasModel = response.model.hasmodel;
                    obj.authorInfo = response.model.author;
                    obj.$refs.modelDetailLike.likedNumber = response.model.likes;
                    obj.$refs.modelDetailLike.liked = response.model.liked;
                    if (obj.hasModel) {
                        obj.modelFile = response.model.model
                    }
                    obj.getModelData = true;
                });
                this.$store.dispatch('modelDetail/getModelReplies',{model:id,page:1,pagesize:6})
                    .then((response)=>{
                        this.replies.forEach(item=>{
                            this.replyList.push(item);
                        });
                        this.totalComments = response.tot;
                    });
            },
            downloadModel() {
                let _that = this;
                let winRef = window.open("",'_blank');
                if( _that.$store.state.user.loginStatus){
                    _that.downloaded = true;
                    _that.$store.dispatch('downloadModel',_that.modelId).then(function (response) {
                        winRef.location.href = response.zip_url
                    })
                }else{
                    _that.$logPop().then(function (response) {
                        if(response){
                            _that.downloaded = true;
                            _that.$store.dispatch('downloadModel',_that.modelId).then(function (response) {
                                winRef.location.href = response.zip_url
                            })
                        }
                    })
                }
            },
            sendReply() {
                let _this = this;
                let tempPage = _this.page - parseInt(_this.replyList.length / 6);
                _this.reply = this.reply.replace( /^\s*/, '');
                if (_this.reply) {
                    _this.totalComments++;
                    _this.haveSendNumer++;
                    _this.notHaveGetData = true;
                    let data = {
                        model_id: this.$route.params.id,
                        reply_uid: 0,
                        comment_content: this.reply,
                        reply_pid: 0
                    };
                    if (_this.$store.state.user.loginStatus) {
                        _this.$store.dispatch('modelDetail/sendReply', data).then(function (response) {
                            _this.$store.commit('modelDetail/addReplies', response.comment);
                            _this.reply = '';
                            _this.$store.dispatch('modelDetail/getModelReplies',{model:_this.$route.params.id,page:tempPage,pagesize:6})
                                .then((response)=>{
                                    let newComment = response.comments[0];
                                    _this.replyList.unshift(newComment);
                                })
                        });
                    } else {_this.$logPop().then(function (response) {
                        if (response) {
                            _this.$store.dispatch('modelDetail/sendReply', data).then(function (response) {
                                _this.replies.unshift(response.comment);
                                _this.reply = '';
                                _this.$store.dispatch('modelDetail/getModelReplies',{model:_this.$route.params.id,page:tempPage,pagesize:6})
                                    .then((response)=>{
                                        let newComment = response.comments[0];
                                        _this.replyList.unshift(newComment);
                                    })
                            })
                        }
                    })
                    }
                }
            },
            back() {
                this.$router.go(-1);
            },
            getData:function () {
                this.page = this.page + 1 + parseInt(this.haveSendNumer/6);
                this.$store.dispatch('modelDetail/getModelReplies',
                    {model:this.$route.params.id,page:this.page,pagesize:6}).then((response)=> {
                    if(this.notHaveGetData){
                        this.replies.slice(this.haveSendNumer % 6, 6).forEach(item => {
                            this.replyList.push(item);
                            this.notHaveGetData = false;
                        })
                    }else{
                        this.replies.forEach(item => {
                            this.replyList.push(item);
                        })
                    }
                });
            },
            reportModel() {
                if (this.$store.state.user.loginStatus) {
                    this.$report('model', this.modelId).then((response) => {
                        if (response) {
                            this.$alert({type: 'alert', message: 'Report successful!'})
                        }
                    })
                } else {
                    this.$logPop().then((response) => {
                        if (response) {
                            this.$report('model', this.modelId).then((response) => {
                                if (response) {
                                    this.$alert({type: 'alert', message: 'Report successful!'})
                                }
                            })
                        }
                    })
                }
            },
            imageFullScreen(index) {
                this.$fullScreen({slideList: this.images,imageIndex:index})
            },
        }
    }
</script>

<style scoped lang="scss">
    .w-1200 {
        width: 1200px;
    }
    .model-detail-container {
        .model-detail-page-left {
            width: 100%;
            height:100%;
            .model-note {
                position: relative;
                height: 436px;
                width: 773px;
                margin-top: 2px;
                margin-bottom: 12px;
                border-radius: 5px;
            }
            .twoD-container {
                background: #fff;
                margin-bottom: 12px;
                ul{
                    border: 1px solid #F1F1F1;
                    border-radius: 4px;
                    li{
                        height: auto;
                        padding-bottom: 20px;
                        .img-box {
                            max-width: 772px;
                            vertical-align: middle;
                            text-align: center;
                            overflow: hidden;
                            cursor: pointer;
                            position: relative;
                            background-size: cover;
                            &:last-child{
                                padding-bottom: 0;
                            }
                            img{
                                max-width: 772px;
                                max-height: calc(100vh - 100px);
                            }
                        }
                        &:last-child{
                            padding-bottom: 0;
                        }
                    }
                }
            }
        }

    }
    .model-detail-container .works-detail {
        margin-top: 97px;
        padding-bottom: 100px;
        > div:first-child {
            width: 773px;
        }
        > div:last-child {
            width: 421px;
        }
        .comment-wrap {
            padding: 22px 22px 40px 22px;
            background-color: #fff;
            border-radius: 5px;
            min-height:374px;
            .no-comments{
                position: relative;
                top:110px;
                left:280px;
                width: 250px;
                .no-comments-word{
                    font-size: 14px;
                    color: #AEAEAE;
                    letter-spacing: 0;
                    margin-left: 25px;
                    line-height: 35px;
                }
            }
            .load-more{
                height:24px;
                width: 98px;
                position: relative;
                left:320px;
            }
        }
        .digital-container {
            padding: 24px 24px 24px 24px;
            background-color: #fff;
            border-radius: 5px;
            justify-content: space-between;
            margin-bottom: 12px;
            border: 1px solid #F1F1F1;
            width: 421px;
            .model-desc {
                padding: 22px;
                background-color: #fff;
                margin-bottom: 12px;
                font-size: 16px;
                color: #181818;
                border-radius: 5px;
                p {
                    margin-top: 12px;
                    color: #7A7A7A;
                    line-height: 24px;
                }
            }
            .author-info{
                .portrait{
                    width: 70px;
                    height: 70px;
                }
                .author-info-detail{
                    margin-bottom: 24px;
                }
                .author-info-description{
                    margin-left: 15px;
                    width:280px;
                    height:70px;
                    .author-name{
                        font-size: 16px;
                        color: #515254;
                        text-align: left;
                        margin-top: 0;
                        margin-bottom: 0;
                    }
                    span{
                        font-size: 12px;
                        color: #515254;
                        text-align: left;
                        margin-top: 5px;
                        margin-bottom: 0;
                    }
                }
                .model-name{
                    text-align: left;
                    margin-bottom: 0;
                    font-size: 18px;
                    line-height: 30px;
                    color: #2A2A36;
                    max-height:60px;
                    word-wrap:break-word;
                    overflow: hidden;
                }
                .views-report-model{
                    margin-top: 16px;
                    height:20px;
                    span{
                        display: inline;
                        font-size: 14px;
                        color: #EA6264;
                    }
                    .view-count-icon{
                        margin-top: 5px;
                    }
                    .report-model-icon{
                        margin-right: 5px;
                    }
                    .view-count{
                        font-size: 14px;
                        color: #95979A;
                        text-align: left;
                    }
                    .report-model{
                        font-size: 14px;
                        color: #2CBE42;
                        text-align: center;
                        float: right;
                    }
                }
                .btn-s{
                    margin-top:16px;
                    margin-bottom: 24px;
                    display: flex;
                    .btn-s-content{
                        padding:4px 20px;
                        font-size: 16px;
                        margin-right: 20px;
                        height:32px;
                        width: 103px;
                        &:last-child{
                            margin-right: 0;
                        }
                    }
                    .like-model{
                        padding-left: 20px;
                        padding-right: 10px;
                        img{
                            float: left;
                            content:'';
                            display: inline-block;
                            margin-right: 5px;
                            height: 20px;
                            width: 20px;
                        }
                    }
                    .down-load-model{
                        width: 125px;
                        padding-left: 10px;
                        padding-right: 10px;
                        padding-top: 6px;
                        img{
                            display: inline-block;
                            margin-right: 5px;
                            height: 20px;
                            width: 20px;
                        }
                    }
                    .share-model{
                        padding-left: 10px;
                        padding-right: 10px;
                        padding-top: 6px;
                        img{
                            display: inline-block;
                            margin-right: 5px;
                            height: 20px;
                            width: 20px;
                        }
                    }
                }

            }
            .model-info{
                .message {
                    .tags {
                        margin-top: 24px;
                        margin-bottom: 11px;
                        margin-right: 5px;
                        ul{
                            max-width: 362px;
                            /*display: flex;*/
                            li{
                                display: inline-block;
                                background: #9B9B9B;
                                background-size: 20px,20px;
                                border-radius: 2px;
                                font-size: 16px;
                                color: #FFFFFF;
                                line-height: 21px;
                                padding: 3px 6px 3px 6px;
                                /*max-width: 400px;*/
                                max-width: 362px;
                                overflow: hidden;
                                margin-bottom: 5px;
                                margin-right: 10px;
                                &:first-child{
                                    margin-left: 0;
                                }
                                &:last-child {
                                    margin-bottom: 5px;
                                }
                            }
                        }

                    }
                    .category {
                        font-size: 16px;
                        color: #787878;
                        line-height: 21px;
                        border-radius: 1px;
                        background: #FFFFFF;
                        margin-top: 24px;
                        ul{
                            display: flex;
                            .cate-content{
                                margin-left: 10px;
                                font-size: 16px;
                                color: #2A2A36;
                                &:first-child{
                                    margin-left: 0;
                                }
                                &:after{
                                    content:' ,'
                                }
                                &:last-child:after{
                                    content:' '
                                }
                            }
                        }
                    }
                    .license {
                        font-size: 16px;
                        color: #787878;
                        line-height: 21px;
                        border-radius: 1px;
                        background: #FFFFFF;
                        margin-top: 24px;
                        .license-content{
                            font-size: 16px;
                            color: #2A2A36;
                        }
                    }
                    .description {
                        margin-top: 24px;
                        margin-bottom: 24px;
                        .description-content{
                            font-size: 16px;
                            color: #4A4A4A;
                            line-height: 24px;
                            word-wrap:break-word
                        }
                    }
                    .info-title {
                        font-size: 16px;
                        color: #787878;
                        line-height: 21px;
                        margin-bottom: 10px;
                    }
                }
            }
            .follow-info{
                height: auto;
            }
            .more-model-show{
                height:100%
            }
            .line {
                margin: 0;
                border: 0;
                height: 1px;
                border-top: 1px solid rgba(0, 0, 0, 0.1);
                border-bottom: 1px solid rgba(255, 255, 255, 0.4);
            }
            span {
                font-size: 16px;
                color: #2A2A36;
            }
            p {
                margin-top: 5px;
                font-size: 24px;
                color: #2A2A36;
            }
        }
    }
    .model-detail-container .works-detail .comment-reply{
        margin-top: 20px;
        height:auto;

    }
    .model-detail-container .works-detail .send-comment {
        display: flex;
    }
    .model-detail-container .works-detail .send-comment .portrait {
        width: 50px;
        height: 50px;

    }
    .model-detail-container .works-detail .send-comment .smallInput {
        width: 674px;
        height: 36px;
        padding: 8px 22px;
        margin-left:22px;
        background-color: #FFFFFF;
        -webkit-appearance: none;
        outline: none;
        border: 1px solid #A8DBF9;
        resize: none;
        margin-top: 6px;
        border-radius: 4px;
        margin-bottom: 30px;
        font-family: Helvetica;
        font-size: 14px;
        color: #85878B;
    }
    .model-detail-container .works-detail .send-comment .bigInput {
        width: 674px;
        height: 110px;
        padding: 8px 22px;
        margin-left:22px;
        background-color: #FFFFFF;
        -webkit-appearance: none;
        outline: none;
        border: 1px solid #A8DBF9;
        resize: none;
        margin-top: 6px;
        border-radius: 4px;
        font-family: Helvetica;
        font-size: 14px;
        color: #85878B;
    }
    .model-detail-container .works-detail .send-btn {
        background: #4990E2;
        border-radius: 100px;
        width: 83px;
        height: 28px;
        text-align: center;
        font-size: 12px;
        color: #FFFFFF;
        line-height: 28px;
        margin-top: 10px;
        position: relative;
        left: 646px;
    }
    .model-detail-container .works-detail .send-btn img {
        width: 20px;
        height: 16px;
        margin-top: 5px;
        margin-right: 5px;
        border-radius: 0;
    }
</style>
