<template>
    <div class="search-user">
        <p class="filter-icon pointer" @click="filterStatus = !filterStatus" v-lang.filters></p>
        <div class="filter-box" v-show="filterStatus">
            <div class="flex" style="margin-bottom:40px;">
                <dl>
                    <dt v-lang.skill></dt>
                    <dd>
                        <label class="input-checkbox-sm" v-for="item in skillList">
                            <input type="checkbox" v-model="skill" :value="item.id">{{item.name}}
                        </label>
                    </dd>
                </dl>
                <dl>
                    <dt v-lang.hr></dt>
                    <dd>
                        <label class="input-radio-sm" v-for="(item,index) in rateList">
                            <input type="radio" :value="index" v-model="rate" name="rate">{{item}}
                        </label>
                    </dd>
                </dl>
                <dl>
                    <dt v-lang.el></dt>
                    <dd>
                        <label class="input-radio-sm" v-for="(item,index) in englishList">
                            <input type="radio" name="english" v-model="english" :value="index">{{item}}
                        </label>
                    </dd>
                </dl>
                <dl style="width:195px;">
                    <dt v-lang.ea></dt>
                    <dd>
                        <label class="input-radio-sm" v-for="(item,index) in amountList">
                            <input type="radio" name="amount" :value="index" v-model="amount">{{item}}
                        </label>
                    </dd>
                </dl>
            </div>
            <div class="flex">
                <dl>
                    <dt v-lang.cr></dt>
                    <dd>
                        <select v-model="country">
                            <option value="1" v-for="item in countryList" :value="item.id">{{item.name}}</option>
                        </select>
                    </dd>
                </dl>
                <dl>
                    <dt v-lang.ps></dt>
                    <dd>
                        <label class="input-radio-sm" v-for="(item,index) in projectList">
                            <input type="radio" :value="index" name="projects" v-model="projects">{{item}}
                        </label>
                    </dd>
                </dl>
                <dl>
                    <dt v-lang.mt></dt>
                    <dd>
                        <label class="input-radio-sm" v-for="item in modelerList">
                            <input type="radio" :value="item.id" v-model="modeler" name="modeler">{{item.name}}
                        </label>
                    </dd>
                </dl>
                <dl style="width:195px;">
                    <dt v-lang.la></dt>
                    <dd>
                        <label class="input-radio-sm" v-for="(item,index) in activityList">
                            <input type="radio" :value="index" name="activity" v-model="activity">{{item}}
                        </label>
                    </dd>
                </dl>
            </div>
            <div class="filter-btn-box">
                <button class="btn btn-default" @click="getData('filter')" v-lang.uf></button>
                <span class="pointer upp" @click="filterStatus = !filterStatus" v-lang.cancel></span>
            </div>
        </div>
        <template v-if="userList.length">
            <ul class="user-list">
                <li v-for="item in userList" @click="toPage(item.user_id)">
                    <div>
                        <div class="left-container">
                            <peoplePortrait :portraitUrl="item.avatar" :type="item.user_type" :width="25" :height="27"></peoplePortrait>
                        </div>
                        <div class="right-container">
                            <div class="name">
                                {{item.name}}
                                <follow-btn :btnstyle="followStyle" :followId="item.user_id" :followBtnStatus="item.isfollow"></follow-btn>
                            </div>
                            <p class="address">{{item.user_country}} / {{item.user_city}}</p>
                            <div class="information" v-if="item.hourly_rate || item.project_amount || item.user_work_exp">
                                <p v-if="item.hourly_rate"><span>${{item.hourly_rate}}</span> / hr</p>
                                <p v-if="item.project_amount"><span>${{item.project_amount}}</span> / earned</p>
                                <p v-if="item.user_work_exp"><span>{{item.user_work_exp}}</span> / Working experience</p>
                            </div>
                            <!-- https://www.baidu.com/index.html -->
                            <a class="http" v-if="item.user_page_id" @click.stop="openNew(item.user_page_id)">{{item.user_page_id}}</a>
                            <!--<div class="pro-success" v-if="item.project_success || item.projects || item.project_time || item.project_quality || item.project_commucation">-->
                                <!--<p class="success-cion" v-if="item.project_success"><span>{{item.project_success}}% projects Success</span></p>-->
                                <!--<p v-if="item.projects"><span>{{item.projects}}</span> / projects</p>-->
                                <!--<p v-if="item.project_time"><span>{{item.project_time}}</span> / Time</p>-->
                                <!--<p v-if="item.project_quality"><span>{{item.project_quality}}</span> / Quality</p>-->
                                <!--<p v-if="item.project_commucation"><span>{{item.project_commucation}}</span> / Commucation</p>-->
                            <!--</div>-->
                            <p class="description">
                                {{item.user_description}}
                            </p>
                            <div class="notes" v-if="item.field.length">
                                <span v-for="tag in item.field">{{tag}}</span>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
            <div class="flex user-page">
                <div class="pagination-warp" v-if="pageContainer">
                    <paginate
                            :total="userNum"
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
    import peoplePortrait from '../../components/user/headPortrait'
    import followBtn from '../../components/commons/FollowBtn.vue'
    import paginate from '../../components/commons/paginate.vue'
    export default {
        name:'searchUser',
        data(){
            return {
                filterStatus:false,
                followStyle:{
                    width:'70px',
                    height:'24px',
                    lineHeight:'24px'
                },
                skillList:[],
                skill:[],
                rateList:[],
                rate:'',
                englishList:[],
                english:'',
                amount:'',
                amountList:[],
                countryList:[],
                country:'',
                projectList:[],
                projects:'',
                modelerList:[],
                modeler:'',
                activityList:[],
                activity:'',
                pageNum:1,
                pageContainer:true
            }
        },
        messages:{
            en:{
                filters:'Filters',
                skill:'Skill',
                hr:'Hourly rate',
                el:'English Level',
                ea:'Earned amount',
                cr:'Country/Region',
                ps:'Project success',
                mt:'Modeler type',
                la:'Last activity',
                uf:'Update filters',
                sorry:'Sorry !',
                tip:'We did not find results for your query, please try another one'
            },
            zh:{
                filters:'筛选器',
                skill:'技能',
                hr:'时薪',
                el:'英语水平',
                ea:'已完成项目的总收益',
                cr:'国家/地区',
                ps:'项目成功率',
                mt:'模型师类型',
                la:'最后在线时间',
                uf:'更新搜索选项',
                sorry:'抱歉 !',
                tip:'我们没有搜索到您的关键字，请重新输入'
            }
        },
        computed:{
            ...mapState('search',[
                'userList','searchMessage','userNum'
            ])
        },
        created(){
            this.$store.dispatch('search/getUserFilter').then((response) => {
                if(response.code === 200) {
                    this.skillList = response.data.filter.skill;
                    this.rateList = response.data.filter.hourly_rate;
                    this.englishList = response.data.filter.english_level;
                    this.amountList = response.data.filter.earned_amount;
                    this.countryList = response.data.filter.country;
                    this.projectList = response.data.filter.project_success;
                    this.modelerList = response.data.filter.modeler_type;
                    this.activityList = response.data.filter.last_activity;
                }
            });
        },
        components:{
            peoplePortrait,
            followBtn,
            paginate
        },
        methods:{
            listenerPage(page){
                if(typeof page === 'number') {
                    this.pageNum = page;
                }
                this.getData('page');
            },
            getData(type){
                let data = {
                    act:'user',
                    keywords:this.searchMessage,
                    page:this.pageNum,
                    skill:this.skill,
                    rate:this.rate,
                    english:this.english,
                    amount:this.amount,
                    country:this.country,
                    success:this.projects,
                    type:this.modeler,
                    active:this.activity
                };
                this.$store.dispatch('search/search',data);
                this.filterStatus = false;
                if(type === 'filter') {
                    this.pageContainer = false;
                    setTimeout(() => {
                        this.pageContainer = true
                    },500)
                }
            },
            toPage(id){
                this.$router.push({name:'personalAbout',params:{id:id}})
            },
            openNew(url){
                window.open(url)
            }
        }
    }
</script>
<style lang="scss">
.search-warp{
    .search-user{
        ul.user-list{
            margin-top:40px;
            border-bottom:1px solid  #E1E1E1;
            li{
                cursor: pointer;
                transition: all linear 0.3s;
                &:last-child{
                    >div{
                        border-bottom:1px solid #fff;
                    }
                }
                &:hover{
                    background: #F3F3F3;
                    >div{
                        border-bottom:1px solid #F3F3F3;
                    }
                }
                >div{
                    display: flex;
                    border-bottom:1px solid #E1E1E1;
                    padding:35px 0;
                    margin:0 25px;
                }
                .left-container{
                    width:82px;
                    height:82px;
                }
                .right-container{
                    width:790px;
                    margin-left:20px;
                }
            }
        }
        .name{
            display: flex;
            justify-content: space-between;
            font-size: 18px;
            color: #515254;
        }
        .address{
            font-size: 14px;
            color: #7A7A7A;
        }
        .http{
            display: inline-block;
            font-size: 16px;
            color: #EA6264;
            margin-top:10px;
        }
        .information{
            display: flex;
            margin-top:10px;
            p{
                margin-right:35px;
                font-size: 14px;
                color: #7A7A7A;
                span{
                    font-size: 14px;
                    color: #515254;
                }
            }
        }
        .pro-success{
            font-size: 14px;
            color: #515254;
            margin-top:12px;
            display: flex;
            .success-cion{
                &:before{
                    content:'';
                    display: inline-block;
                    width:18px;
                    height:20px;
                    background-image: url(../../assets/images/projects-success-icon.png);
                    background-size: cover;
                    background-repeat: no-repeat;
                    vertical-align: middle;
                    margin-right:8px;
                }
            }
            p{
                margin-right:35px;
                font-size: 14px;
                color: #7A7A7A;
                span{
                    color: #515254;
                }
            }
        }
        .description{
            font-size: 14px;
            color: #7A7A7A;
            line-height: 22px;
            margin-top:10px;
        }
        .notes{
            margin-top:12px;
            span{
                display: inline-block;
                font-size: 12px;
                color: #fff;
                line-height: 20px;
                background: #9B9B9B;
                border-radius: 2px;
                padding:0 6px;
                margin-right:10px;
            }
        }
        .user-page{
            height: 128px;
            background-color: #fff;
            justify-content: center;
            align-items: center;
        }
    }
}
</style>