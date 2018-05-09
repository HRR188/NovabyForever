<template xmlns:v-progressive="http://www.w3.org/1999/xhtml">
    <div class="masonry-item" :class="{'active':status}" @mouseover="show($event)" @mouseout="hide($event)">
        <router-link :to="{name:'model-detail',params:{id:projectData.work_id}}" class="cover-box" target="_blank">
            <img :src="projectData.work_cover" v-progressive:img_50>
        </router-link>
        <div class="icon-3d" v-if="projectData.work_objs">
            <img src="../../assets/images/icon-3D.png" alt="" >
        </div>
        <span v-if="type === 'following'" class="time">{{time | time}}</span>
        <like-btn v-if="!projectData.whotofollow" type="small" :likedPro="projectData.liked" :workId="projectData.work_id" :likedNumber="projectData.work_likes"></like-btn>
        <p class="follow-title" v-else>Who to Follow</p>
        <div class="item-mark"></div>
        <div class="bottom-msg clearfix">
            <router-link :to="{name:'personalAbout',params:{id:projectData.author.user_id}}" target="_blank">
                <portrait :portraitUrl="projectData.author.user_avatar" :type="projectData.author.user_type" :width="10" :height="10"></portrait>
            </router-link>
            <name-details :nameData="projectData.author"></name-details>
            <download-btn v-if="!projectData.whotofollow"  type="small" :hasZip="projectData.has_zip" :downloadId="projectData.work_id" :isDownload="projectData.has_download"></download-btn>
            <follow-btn v-else :followBtnStatus="false" :followId="projectData.author.user_id" :btnstyle="followBtnStyle"></follow-btn>
        </div>
    </div>
</template>

<script>
import portrait from '../user/headPortrait.vue'
import NameDetails from '../commons/NameDetails.vue'
import DownloadBtn from '../commons/DownloadBtn.vue'
import LikeBtn from '../commons/LikeBtn.vue'
import followBtn from '../commons/FollowBtn.vue'
export default {
    name:'projectSmallList',
    data(){
        return {
            status:false,
            followBtnStyle:{
                width:'64px',
                height:'24px'
            }
        }
    },
    computed:{
        time:function () {
            return {
                start: this.projectData.work_pubtime,
                end: this.projectData.time
            }
        }
    },
    components:{
        portrait,
        NameDetails,
        DownloadBtn,
        LikeBtn,
        followBtn
    },
    props:{
        projectData:{
            required:true
        },
        type:{
            required:true   //type区分是用在market列表还是following列表
        }
    },
    methods:{
        show(event){
            this.status = true
        },
        hide(event){
            this.status = false
        }
    }
}
</script>
