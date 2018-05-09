<template>
    <div class="project-big-list-container">
        <div class="author" v-if="showAuthor">
            <img :src="projectData.author.user_avatar" alt="">
            <!--<span class="name">{{projectData.author.user_name}}</span>-->
            <name-details :nameData="projectData.author"></name-details>
            <span class="time">{{time | time}}</span>
        </div>
        <!-- <a :href="'#model-detail/'+projectData.work_id">
            <img :src="projectData.work_cover" alt="" class="cover" v-progressive:img_50>
        </a> -->
        <router-link :to="{name:'model-detail',params:{id:projectData.work_id}}" target="_blank">
            <img :src="projectData.work_cover" alt="" class="cover" v-progressive:img_50>
        </router-link>
        <img src="../../assets/images/icon-3D.png" alt="" class="icon-3d" :class="{'low':showAuthor}" v-if="projectData.work_objs">
        <div class="like-download">
            <div class="flex1">
                <like-btn :likedPro="projectData.liked" :workId="projectData.work_id" :likedNumber="projectData.work_likes" ></like-btn>
            </div>
            <div class="flex1 flex-middle">
                <div class="author-s" v-show="!showAuthor">
                    <!-- :to="'#/home-page/'+projectData.author.user_id" -->
                    <router-link :to="{name:'personalAbout',params:{id:projectData.author.user_id}}" target="_blank">
                        <portrait :portraitUrl="projectData.author.user_avatar" :type="projectData.author.user_type" :width="10" :height="10"></portrait>
                    </router-link>
                    <name-details :nameData="projectData.author"></name-details>
                    <!--<span class="name">{{projectData.author.user_name}}</span>-->
                </div>
            </div>
            <div class="flex1 flex-end">
                <download-btn :hasZip="projectData.has_zip" :downloadId="projectData.work_id" :isDownload="projectData.has_download"></download-btn>
            </div>
        </div>
    </div>
</template>

<script>
    import LikeBtn from '../commons/LikeBtn.vue'
    import DownloadBtn from '../commons/DownloadBtn.vue'
    import NameDetails from '../commons/NameDetails.vue'
    import portrait from '../user/headPortrait.vue'
    export default {
        name: 'project-big-list',
        props:{
            projectData:{
                type:Object,
                required:true
            },
            showAuthor:{
                type:Boolean,
                required:true
            }
        },
        data(){
            return{

            }
        },
        components:{
            LikeBtn,
            DownloadBtn,
            NameDetails,
            portrait
        },
        computed:{
            time:function () {
                return {
                    start: this.projectData.work_pubtime,
                    end: this.projectData.time
                }
            }
        }
    }
</script>

<style>
    .project-big-list-container{
        margin:0 0 80px 0;
        width: 100%;
        position: relative;
    }

    .project-big-list-container .icon-3d{
        position: absolute;
        right:18px;
        top:18px;
        width: 32px;
        height: 32px;
    }

    .project-big-list-container .icon-3d.low{
        top:70px;
    }

    .project-big-list-container .author{
        width: 100%;
        margin-bottom: 18px;
    }

    .project-big-list-container .author img{
        width: 32px;
        height: 32px;
        border-radius: 100%;
        margin-right: 10px;
    }

    .project-big-list-container .author span{
        font-size: 14px;
        line-height: 32px;
    }

    .project-big-list-container .author .name{
        color: #515254;
        text-decoration: underline;
        margin-right: 28px;
    }

    .project-big-list-container .author .time{
        color: #9B9B9B;
    }

    .project-big-list-container .cover{
        width: 100%;
        border-radius: 10px;
        background-color: #575761;
    }

    .project-big-list-container .like-download{
        margin-top: 20px;
        width: 100%;
        display: flex;
        justify-content: space-between;
        font-weight: 300;
    }
    .project-big-list-container .like-download .author-s{
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .project-big-list-container .like-download .author-s>a{
        display: inline-block;
        width:32px;
        height:32px;
        margin-right: 10px;
    }
    .project-big-list-container .like-download .author-s .name-details .name{
        font-size: 14px;
        color: #515254;
        line-height: 32px;
        text-decoration: underline;
    }

    .project-big-list-container .flex1{
        flex:1;
        display: flex;
    }

    .project-big-list-container .flex1.flex-middle{
        justify-content: center;
    }
    .project-big-list-container .flex1.flex-end{
        justify-content: flex-end;
    }
</style>
