<template>
    <div class="recommend-wrap">
        <template v-if="type === 'A'">
            <div class="refresh flex">
                <p v-lang.whoToFollow></p>
                <p class="pointer upp" @click="refreshUser"><span :class="{'refresh':requestStatus}"></span>{{translate('refresh')}}</p>
            </div>
            <ul class="user-recommend">
                <li v-for="item in listData">
                    <div>
                        <router-link :to="{name:'personalAbout',params:{id:item.user_id}}">
                            <people-portrait :portraitUrl="item.user_avatar" :type="item.user_type" :width="12" :height="12"></people-portrait>
                        </router-link>
                    </div>
                    <div>
                        <p>
                            <router-link :to="{name:'personalAbout',params:{id:item.user_id}}">
                                {{item.user_name}}
                            </router-link>
                        </p>
                        <follow-btn :btnstyle="btnstyle" :followId="item.user_id" :followBtnStatus="0"></follow-btn>
                    </div>
                </li>
            </ul>
        </template>
        <template v-else-if="type === 'B'">
            <div class="refresh flex">
                <p v-lang.moreModels></p>
                <p class="pointer upp" @click="refreshModel"><span :class="{'refresh':requestStatus}"></span>{{translate('refresh')}}</p>
            </div>
            <ul class="models-recommend">
                <li v-for="item in listData">
                    <router-link :to="{name:'model-detail',params:{id:item.work_id}}" :style="{'background-image':'url('+item.work_cover+')'}"></router-link>
                </li>
            </ul>
        </template>
        <template v-else-if="type === 'C'">
            <div class="refresh flex">
                <p>More projects</p>
                <p class="pointer" @click="refreshProject"><span :class="{'refresh':requestStatus}"></span>Refresh</p>
            </div>
            <ul class="models-recommend">
                <li v-for="item in listData">
                    <router-link :to="{name:'projectHallDetails',params:{id:item.prj_id}}" :style="{'background-image':'url('+item.prj_cover+')'}">
                        <p>{{item.prj_name}}</p>
                    </router-link>
                </li>
            </ul>
        </template>
    </div>
</template>
<script>
    import peoplePortrait from '../user/headPortrait'
    import followBtn from '../commons/FollowBtn.vue'
    export default {
        name:'recommend',
        props:{
          type:{   //类型 A用在模型详情用户推荐  B用在模型详情页面模型推荐   C是项目详情项目推荐
              required:true,
              type:String
          }
        },
        components:{
            peoplePortrait,
            followBtn
        },
        data(){
            return {
                requestStatus:false,
                listData:[],
                btnstyle:{
                    width:'64px',
                    height:'20px',
                    lineHeight:'20px'
                }
            }
        },
        created(){
            if(this.type === 'A') {
                this.refreshUser()
            }
            else if(this.type === 'B') {
                this.refreshModel()
            }
            else if(this.type === 'C'){
                this.refreshProject()
            }
        },
        methods:{
            refreshUser(){
                this.requestStatus = true;
                let data = {
                    size:5,
                    type:'user'
                };
                this.$store.dispatch('search/getRecommend',data).then( (response) => {
                    this.requestStatus = false;
                    this.listData = response.users
                });
            },
            refreshModel(){
                this.requestStatus = true;
                let data = {
                    size:5,
                    type:'model'
                };
                this.$store.dispatch('search/getRecommend',data).then( (response) => {
                    this.requestStatus = false;
                    this.listData = response.works
                })
            },
            refreshProject(){
                this.requestStatus = true;
                let data = {
                    size:3,
                    type:'project'
                };
                this.$store.dispatch('search/getRecommend',data).then( (response) => {
                    this.requestStatus = false;
                    this.listData = response.projects
                })
            }
        }
    }
</script>
<style scoped lang="scss">
@keyframes refresh {
    0%   { transform: rotate(360deg); }
    100% { transform: rotate(0deg); }
}
.recommend-wrap{
    padding:22px;
    border: 1px solid #F1F1F1;
    border-radius: 5px;
    background-color: #fff;
    .refresh{
        justify-content: space-between;
        align-items: center;
        p:first-child{
            font-size: 16px;
            color: #000;
        }
        p:last-child{
            font-size: 14px;
            color: #9B9B9B;
        }
        span{
           display: inline-block;
            width:15px;
            height:12px;
            background-image: url(../../assets/images/refresh.png);
            background-repeat: no-repeat;
            margin-right:5px;
            &.refresh{
                animation: refresh 800ms infinite linear;
            }
        }
    }
    .user-recommend{
        li{
            margin-top:15px;
            display: flex;
            >div:first-child{
                width:50px;
                height:50px;
                margin-right:8px;
            }
            p{
                font-size: 16px;
                color: #515254;
                margin-bottom:8px;
            }
        }
    }
    .models-recommend{
        li{
            margin-top:15px;
        }
        a{
            display: block;
            height:165px;
            border-radius: 5px;
            background-size: cover;
            background-position: center;
            position: relative;
            p{
                font-size: 16px;
                color: #FFFFFF;
                position: absolute;
                bottom:0;
                left:0;
                padding:12px 14px;
                overflow: hidden;
                text-overflow:ellipsis;
                white-space: nowrap;
            }
        }
    }
}
</style>