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
                    <div >
                        <p class="user">
                            <router-link :to="{name:'personalAbout',params:{id:item.user_id}}">
                                {{item.user_name}}
                            </router-link>
                        </p>
                        <div class="flex user-info">
                            <span >{{item.user_city}}</span>
                            <span style="margin-left:10px;margin-right: 10px" v-if="item.user_city && item.user_country" > / </span>
                            <span >{{item.user_country}}</span>
                        </div>
                        <div class="follow">
                            <model-detail-follow-btn
                                    :btnBorder="true"
                                    :followId="item.user_id"
                                    :isRefresh = "true"
                                    :followBtnStatus="0">
                            </model-detail-follow-btn>
                        </div>
                    </div>
                </li>
            </ul>
        </template>
        <template v-else-if="type === 'B'">
            <div class="refresh flex model-refresh">
                <p v-lang.moreModels></p>
                <p class="pointer upp" @click="refreshModel"><span :class="{'refresh':requestStatus}"></span>{{translate('refresh')}}</p>
            </div>
            <ul class="models-recommend">
                <li v-for="item in listData">
                    <router-link
                            class="model-list"
                            :to="{name:'model-detail',params:{id:item.work_id}}"
                            :style="{'background-image':'url('+item.work_cover+')' ,
                            'background-size':'cover',
                            'background-repeat':'no-repeat',
                           }">
                    </router-link>
                </li>
            </ul>
        </template>
    </div>
</template>
<script>
    import peoplePortrait from '../user/headPortrait'
    import ModelDetailFollowBtn from '../../components/commons/ModelDetailFollowBtn.vue'
    export default {
        name:'model-detail-follow-and-load-more',
        props:{
          type:{   //类型 A用在模型详情用户推荐  B用在模型详情页面模型推荐
              required:true,
              type:String
          }
        },
        components:{
            peoplePortrait,
            ModelDetailFollowBtn,
        },
        data(){
            return {
                requestStatus:false,
                listData:[],
            }
        },
        created(){
            if(this.type === 'A') {
                this.refreshUser()
            }
            else if(this.type === 'B') {
                this.refreshModel()
            }
        },
        methods:{
            refreshUser(){
                this.requestStatus = true;
                let data = {
                    size:4,
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
                    size:6,
                    type:'model'
                };
                this.$store.dispatch('search/getRecommend',data).then( (response) => {
                    this.requestStatus = false;
                    this.listData = response.works
                })
            },
        }
    }
</script>
<style scoped lang="scss">
@keyframes refresh {
    0%   { transform: rotate(360deg); }
    100% { transform: rotate(0deg); }
}
.recommend-wrap{
    padding-top:24px;
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
    .model-refresh{
        margin-bottom: 14px;
    }
    .user-recommend{
        .user{
            margin-top: 8px;
            margin-bottom: 0;
        }
        .user-info{
            position: absolute;
            font-size: 12px;
            margin-top: 3px;
            color: #515254;
            text-align: left;
        }
        .follow{
            position: relative;
            left:225px;
            top: -16px;
        }
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
        width: 372px;
        .model-list{
            height:110px
        }
        li{
            display: inline-block;
            height: 101px;
            width: 182px;
           margin-right: 8px;
            margin-bottom:8px;
            &:nth-child(even){
                margin-right: 0;
            }
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