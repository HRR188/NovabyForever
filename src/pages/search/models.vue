<template>
    <div class="search-models">
        <p class="filter-icon pointer" @click="filterStatus = !filterStatus" v-lang.filters></p>
        <div class="filter-box" v-show="filterStatus">
            <div class="flex">
                <div>
                    <dl>
                        <dt>{{translate('category')}}</dt>
                        <dd>
                            <select v-model="category">
                                <option :value="item.cate_id" v-for="item in categoryList">{{item.cate_name}}</option>
                            </select>
                        </dd>
                    </dl>
                    <dl style="margin-top:30px;">
                        <dt>{{translate('model')}}</dt>
                        <dd>
                            <label class="input-radio-sm" v-for="item in model3DList">
                                <input type="radio" :value="item.id" name="model3D" v-model="model3D">{{item.name}}
                            </label>
                        </dd>
                    </dl>
                    <!--<dl style="margin-top:30px;">-->
                        <!--<dt>{{translate('video')}}</dt>-->
                        <!--<dd>-->
                            <!--<label class="input-radio-sm" v-for="item in videoList">-->
                                <!--<input type="radio" :value="item.id" v-model="video" name="video">{{item.name}}-->
                            <!--</label>-->
                        <!--</dd>-->
                    <!--</dl>-->
                </div>
                <dl>
                    <dt>{{translate('format')}}</dt>
                    <dd>
                        <label class="input-radio-sm" v-for="item in formatList">
                            <input type="radio" :value="item.id" v-model="format" name="format">{{item.name}}
                        </label>
                    </dd>
                </dl>
                <dl>
                    <dt>{{translate('updated')}}</dt>
                    <dd>
                        <label class="input-radio-sm" v-for="(item,index) in lastList">
                            <input type="radio" :value="index" name="last" v-model="last">{{item}}
                        </label>
                    </dd>
                </dl>
                <dl>
                    <dt>{{translate('permit')}}</dt>
                    <dd>
                        <label class="input-radio-sm" v-for="item in downList">
                            <input type="radio" :value="item.id" name="down" v-model="down">{{item.name}}
                        </label>
                    </dd>
                </dl>
            </div>
            <div class="filter-btn-box">
                <button class="btn btn-default" @click="getData('filter')">{{translate('updateFilters')}}</button>
                <span class="pointer" @click="filterStatus = !filterStatus">{{translate('cancel')}}</span>
            </div>
        </div>
        <template v-if="modelsList.length">
            <ul class="models-list">
                <li v-for="item in modelsList">
                    <router-link :to="{name:'model-detail',params:{id:item.work_id}}" target="_blank">
                        <div>
                            <div class="left-content" :style="{backgroundImage:'url('+item.cover+'),url(https://model-static.oss-cn-shanghai.aliyuncs.com/dev/background/IMAGE1.png'}">
                                <img src="../../assets/images/icon-3D.png" alt="" v-if="item.work_model">
                            </div>
                            <div class="right-content">
                                <p class="name">{{item.work_title}}</p>
                                <p class="category">{{translate('category')}} : {{item.work_cate}}</p>
                                <p class="license">{{translate('license')}} : <span>{{translate(item.work_license)}}</span></p>
                                <div>
                                    <div>
                                        <people-portrait :portraitUrl="item.author.avatar" :type="item.author.user_type" :width="12" :height="14"></people-portrait>
                                    </div>
                                    <p>{{item.author.name}}</p>
                                </div>
                            </div>
                        </div>
                    </router-link>
                </li>
            </ul>
            <div class="flex models-page">
                <div class="pagination-warp" v-if="pageContainer">
                    <paginate
                            :total="modelNum"
                            :page-size="10"
                            :show-page-num="5"
                            @listenerPage="listenerPage">
                    </paginate>
                </div>
            </div>
        </template>
        <template v-else>
            <div class="no-data flex">
                <div>
                    <img src="../../assets/images/search-no-daata.png" alt="">
                </div>
                <div>
                    <p v-lang.sorry></p>
                    <span v-lang.tip></span>
                </div>
            </div>
        </template>
    </div>
</template>
<script>
    import {mapState,mapMutations,mapActions,mapGetters} from 'vuex'
    import paginate from '../../components/commons/paginate.vue'
    import peoplePortrait from '../../components/user/headPortrait'

    export default {
        name:'searchModels',
        data(){
            return {
                filterStatus:false,
                categoryList:[],
                category:'',
                model3DList:[],
                model3D:'',
                videoList:[],
                video:'',
                tagsList:[],
                tags:[],
                formatList:[],
                format:'',
                lastList:[],
                last:'',
                downList:[],
                down:'',
                pageNum:1,
                pageContainer:true,
            }
        },
        messages:{
            en:{
                filters:'Filters',
                category:'Category',
                sorry:'Sorry !',
                model:'3D model',
                video:'Video',
                format:'Format',
                updated:'Last uploaded',
                permit:'Download permit',
                license:'License',
                cancel:'Cancel',
                updateFilters:'Update filters',
                tip:'We did not find results for your query, please try another one'
            },
            zh:{
                filters:'筛选器',
                sorry:'抱歉 !',
                model:'3D 模型',
                video:'视频',
                format:'格式',
                updated:'最后更新',
                permit:'下载许可',
                license:'许可',
                cancel:'取消',
                updateFilters:'更新搜索选项',
                tip:'我们没有搜索到您的关键字，请重新输入'
            }
        },
        components:{
            peoplePortrait,
            paginate
        },
        created(){
            this.init()
        },
        computed:{
            ...mapState('search',[
                'modelsList','searchMessage','modelNum'
            ])
        },
        methods:{
            async init(){
                await this.$store.dispatch('search/getModelFilter').then((response) => {
                    if(response.code === 200) {
                        this.categoryList = response.data.filter.category;
                        this.model3DList = response.data.filter.model_3D;
                        this.videoList = response.data.filter.video;
                        this.tagsList = response.data.filter.tags;
                        this.formatList = response.data.filter.format;
                        this.lastList = response.data.filter.last_uploaded;
                        this.downList = response.data.filter.download_permit;
                    }
                });
            },
            listenerPage(page){
                if(typeof page === 'number') {
                    this.pageNum = page;
                }
                this.getData('page');
            },
            async getData(type){
                let data = {
                    act:'model',
                    keywords:this.searchMessage,
                    page:this.pageNum,
                    category:this.category,
                    tags:this.tags,
                    format:this.format,
                    lastUploaded:this.last,
                    download:this.down,
                    model_3D:this.model3D,
                    video:this.video
                };
                await this.$store.dispatch('search/search',data);
                this.filterStatus = false;
                if (type === 'filter') {
                    this.pageContainer = false;
                    setTimeout(() => {
                        this.pageContainer = true
                    }, 500)
                }
            }
        }
    }
</script>
<style lang="scss">
.search-warp{
    .search-models{
        .models-list{
            border-bottom:1px solid #E1E1E1;
            margin-top:40px;
            a{
                display: block;
                >div{
                    display: flex;
                    margin: 0 25px;
                    padding:35px 0;
                    border-bottom:1px solid #E1E1E1;
                }
                &:hover{
                    background: #F3F3F3;
                    >div{
                        border-bottom:1px solid #F3F3F3;
                    }
                }
            }
            li:last-child{
                a{
                    >div{
                        border-bottom: none;
                    }
                }
            }
        }
        .left-content{
            position: relative;
            width:240px;
            height:162px;
            background-size: cover;
            background-repeat: no-repeat;
            border-radius: 5px;
            >img{
                display: inline-block;
                position: absolute;
                top:10px;
                right:10px;
                width:24px;
                height:24px;
            }
        }
        .right-content{
            margin-left:20px;
            >div{
                display: flex;
                align-items: center;
                div{
                    width:32px;
                    height:32px;
                    margin-right:10px;
                }
            }
            p{
                font-size: 14px;
                color: #515254;
                span{
                    font-size: 14px;
                    color: #7A7A7A;
                }
            }
            .name{
                font-size: 18px;
                color: #515254;
            }
            .category{
                margin-top:15px;
            }
            .tags{
                margin-top:15px;
            }
            .license{
                margin:15px 0;
            }
        }
        .models-page{
            height: 128px;
            background-color: #fff;
            justify-content: center;
            align-items: center;
        }
    }
}
</style>