<template>
    <div class="models-container" v-infinite-scroll="pushProjectsHall" infinite-scroll-disabled="projectsHallStatus" infinite-scroll-distance="100">
        <ul class="projects clearfix">
            <template v-for="project in projectsHall">
                <li class="project-content">
                    <template v-if="project.redirect === 0">
                        <router-link :to="{name: 'projectHallDetails', params: { id:project.prj_id }}" target="_blank">
                            <div class="item-img" :style="{'background-image':'url('+project.prj_cover+')'}">
                                <span>{{project.prj_industry}}</span>
                            </div>
                        </router-link>
                    </template>
                    <template v-else-if="project.redirect === 1">
                        <router-link :to="{name: 'saasInvite', params: { id:project.prj_id }}" target="_blank">
                            <div class="item-img" :style="{'background-image':'url('+project.prj_cover+')'}">
                                <span>{{project.prj_industry}}</span>
                            </div>
                        </router-link>
                    </template>
                    <!--<template v-else>-->
                        <!--<router-link :to="{name: 'partyBProposal', params: { id:project.prj_id }}" target="_blank">-->
                            <!--<div class="item-img" :style="{'background-image':'url('+project.prj_cover+')'}">-->
                                <!--<span>{{project.prj_industry}}</span>-->
                            <!--</div>-->
                        <!--</router-link>-->
                    <!--</template>-->
                    <div class="project-message">
                        <div class="message-top">
                            <p @click="goto(project)">{{project.prj_name}}</p>
                        </div>
                        <div class="message-bottom clearfix">
                            <router-link :to="{ name: 'personalAbout', params: {id:project.prj_uid}}" target="_blank" class="user-portrait">
                                <portrait :portraitUrl="project.user_avator" :type="project.user_type" :width="10" :height="10"></portrait>
                            </router-link>
                            <router-link class="user-name" :to="{ name: 'personalAbout', params: {id:project.prj_uid}}">{{project.user_name}}</router-link>
                            <span class="join-number">{{project.prj_bids}}</span>
                            <span class="review-number">{{project.prj_views}}</span>
                        </div>
                    </div>
                </li>
            </template>
        </ul>
        <loading :loadingMsg="LoadingMsg"></loading>
    </div>
</template>
<script>
    import countdown from '../../components/novahub/time.vue'
    import portrait from '../../components/user/headPortrait.vue'
    import loading from '../../components/commons/loading'
    export default {
        name:'biddingGallery',
        data(){
            return {
                projectsHall:[],
                projectsHallStatus:false,
                LoadingMsg:{
                    loadingStatus:true,
                    noteText:'',
                    noteStatus: false
                },
                pageSize:9,
                pageNum:0
            }
        },
        components:{
            countdown,
            portrait,
            loading
        },
        methods:{
            pushProjectsHall(){
                this.pageNum++;
                let data = {
                    pagesize:this.pageSize,
                    page:this.pageNum
                };
                this.$store.dispatch('novahub/projects/getProjectsHallData',data).then((response) => {
                    if(response.code === 200) {
                        this.projectsHall = this.projectsHall.concat(response.data.tasks);
                        if(response.data.tasks.length < this.pageSize) {
                            this.LoadingMsg.noteStatus = true;
                            this.projectsHallStatus = true
                        }
                    }
                    else {
                        this.LoadingMsg.noteStatus = true;
                        this.projectsHallStatus = true
                    }
                });
            }
        }
    }
</script>
<style lang="scss">
.models-container{
    .projects{
        padding:25px 95px 0;
        .project-content{
            float:left;
            width: 33%;
            margin-bottom: 15px;
            margin-right:0.5%;
            &:nth-child(3n){
                margin-right:0;
            }
            .item-img{
                height:228px;
                border-radius: 4px 4px 0 0;
                background-size: cover;
                cursor: pointer;
                position:relative;
                span{
                    background: rgba(41,41,41,0.50);
                    border: 2px solid rgba(193,193,193,0.53);
                    border-radius: 100px;
                    font-size: 12px;
                    color: #F2F4F6;
                    padding:5px 8px 3px;
                    position: absolute;
                    right:12px;
                    bottom:12px;
                }
            }
            .project-message{
                padding:12px 12px 20px;
                background-color: #fff;
                border-radius:0 0 5px 5px ;
            }
            .message-top{
                display: flex;
                align-items: center;
                justify-content: space-between;
                >p{
                    font-size: 18px;
                    color: #4A4A4A;
                    cursor: pointer;
                    max-width:280px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    &:hover{
                        color: #EA6264;
                    }
                }
                .time-result{
                    font-size: 12px;
                    color: #4A4A4A;
                }
                >span{
                    font-size:12px;
                    color:#4A4A4A;
                }
            }
            .message-bottom{
                margin-top:8px;
                >a{
                    float: left;
                    display: block;
                }
                .user-portrait{
                    width:32px;
                    height:32px;
                }
                .user-name{
                    line-height: 32px;
                    margin-left:10px;
                    font-size: 14px;
                    color: #515254;
                    &:hover{
                        color: #EA6264;
                    }
                }
                >span{
                    display: block;
                    float: right;
                    line-height: 32px;
                    font-size: 12px;
                    color: #515254;
                }
                .join-number:before{
                    content:'';
                    display: inline-block;
                    width:17px;
                    height:12px;
                    background:url(../../assets/images/icon-people.png) no-repeat;
                    vertical-align: middle;
                    margin-right:5px;
                }
                .review-number{
                    margin-right:12px;
                    &:before{
                        content:'';
                        display: inline-block;
                        width:18px;
                        height:11px;
                        background:url(../../assets/images/icon-number.png) no-repeat;
                        vertical-align: middle;
                        margin-right:5px;
                    }
                }
            }
        }
    }
}
</style>