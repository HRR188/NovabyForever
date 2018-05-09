<template>
    <div class="name-details pointer" @mouseover="hover" @mouseleave="leave">
        <div class="hover-bridge" v-show="showHover">

        </div>
        <div class="hover-div" v-show="showHover">
            <div class="user-card">
                <router-link :to="{name:'personalAbout',params:{id:nameData.user_id}}" class="avatar">
                    <people-portrait :portraitUrl="nameData.user_avatar" :type="nameData.user_type" :width="18" :height="18"></people-portrait>
                </router-link>
                <div class="user-info clearfix">
                    <p class="name">
                        <!-- <a :href="'#/home-page/'+nameData.user_id">{{nameData.user_name}}</a> -->
                        <router-link :to="{name:'personalAbout',params:{id:nameData.user_id}}">{{nameData.user_name}}</router-link>
                    </p>
                    <p class="job">{{nameData.user_country}}/{{nameData.user_city}}</p>
                    <follow-btn :followId="nameData.user_id" :btnstyle="followStyle" :followBtnStatus="nameData.isfollow"></follow-btn>
                </div>
                <div class="name-works-container" v-if="getWorks && userWorks.length">
                    <template v-for="work in userWorks">
                        <router-link :to="{name:'model-detail',params:{id:work.work_id}}" target="_blank">
                                <div class="work cover-background" :style="{'background-image':'url('+work.work_cover+')'}"></div>
                        </router-link>
                    </template>
                    <template v-for="n in fakeWorks">
                        <a>
                            <div class="work"></div>
                        </a>
                    </template>
                </div>
            </div>
        </div>
        <router-link :to="{name:'personalAbout',params:{id:nameData.user_id}}">
            <span class="name" >{{nameData.user_name}}</span>
        </router-link>
    </div>
</template>

<script>
    import peoplePortrait from '../user/headPortrait'
    import FollowBtn from './FollowBtn'
    export default {
        name: 'name-detail',
        components:{
            FollowBtn,
            peoplePortrait
        },
        computed:{
            fakeWorks:function () {
                return 3-this.userWorks.length
            }
        },
        data(){
            return {
                showHover:false,
                followStyle:{
                    width:'64px',
                    height:'20px',
                    lineHeight:'20px'
                },
                userWorks:[],
                getWorks:false,
                requestIndex:0
            }
        },
        props:{
            nameData:{
                required:true,
                type:Object
            }
        },
        methods:{
            hover:function () {
                //console.log(this.nameData)
                this.showHover = true;

                if(this.requestIndex < 1) {
                    let data = {
                        uid:this.nameData.user_id
                    };
                    this.$store.dispatch('getUserCard',data).then((response) => {
                        this.userWorks = response.author.works;
                        this.getWorks = true;
                        this.requestIndex++
                    })
                }

            },
            leave:function () {
                this.showHover = false;
            }
        }
    }
</script>

<style scoped lang="scss">
    .name-details{
        display: inline-block;
        position: relative;
    }
    .name-details p{
        padding-left:0;
        float: none;
    }
    .name-details .hover-bridge{
        position: absolute;
        width: 300px;
        left:-18px;
        z-index: 10;
        display: block;
        height: 35px;
        bottom: 10px;
    }
    .name-details .hover-div{
        position: absolute;
        width: 300px;
        left:-18px;
        bottom:35px;
        z-index: 10;
        display: block;
    }
    .name-details .user-card{
        width: 100%;
        background: #FFFFFF;
        border: 1px solid #E1E1E1;
        box-shadow: 0 1px 6px 0 rgba(103,103,103,0.50);
        border-radius: 6px;
        position: relative;
        padding:15px;
    }
    .name-details .user-card:after{
        content:"";
        display: block;
        width: 10px;
        height: 10px;
        position: absolute;
        left: 26px;
        bottom: -6px;
        -webkit-transform: rotate(45deg);
        transform: rotate(45deg);
        background-color: white;
    }
    .name-details .user-card .avatar{
        width:64px;
        height:64px;
        position: absolute;
        top:15px;
        left:15px;
        display: block;
    }
    /*.name-details .user-card .user-type-icon{
        position: absolute;
        width:18px;
        height:18px;
        top:15px;
        left:60px;
    }*/
    .name-details .user-card .user-info{
        padding-left: 77px;
        width: 100%;
    }
    .name-details .user-card .user-info .name{
        font-size: 18px;
        color: #515254;
        line-height: 22px;
        text-decoration: none;
        font-weight: 300;

    }
    .name-details .user-card .user-info .job{
        font-size: 12px;
        color: #7A7A7A;
        margin-bottom: 8px;
    }
    .name-details .user-card .name-works-container{
        display: flex;
        justify-content: space-between;
        margin-top: 16px;
    }
    .name-details .user-card .name-works-container .work{
        width: 85px;
        height: 57px;
        background-color: #575761;
        background-position: center;
        background-size: cover;
        border-radius: 4px;
    }
</style>
