<template>
    <div class="likes-container">
        <div class="project-list-container" v-infinite-scroll="likesMore" infinite-scroll-disabled="likesMoreSwitch" infinite-scroll-distance="50">
            <template v-for="project in likesList">
                <project-big-list :projectData="project" :showAuthor="false"></project-big-list>
            </template>
        </div>
        <loading :loadingMsg="loadingMsg"></loading>
        <back-to-top :target="200"></back-to-top>
    </div>
</template>
<script>
import ProjectBigList from '../../components/community/ProjectBigList'
import loading from '../../components/commons/loading'
import backToTop from '../../components/commons/backToTop'
export default {
    name:'personalLikes',
    data(){
        return {
            likesList:[],
            loadingMsg:{
                loadingStatus:false,
                noteText:"No more likes",
                noteStatus:false
            },
            LikesPage:0,
            likesMoreSwitch:false
        }
    },
    components:{
        ProjectBigList,
        loading,
        backToTop
    },
    methods:{
        likesMore(){
            this.LikesPage++
            let pageLikedWorksData = {
              userId:this.$route.params.id,
              page:this.LikesPage,
              pagesize:5
            }
            this.$store.dispatch('pageLikedWorksAc',pageLikedWorksData).then((response) =>{
                this.loadingMsg.loadingStatus = true
                if(response.code === 200) {
                    this.likesList = this.likesList.concat(response.data.works)
                }
                else {
                    this.likesMoreSwitch = true
                    this.loadingMsg.loadingStatus = false
                    this.loadingMsg.noteStatus = true
                }
            });
        }
    }
}
</script>

<style lang="scss">
.personal-warp{
    .likes-container{
        margin-top:20px;
        .project-list-container{
            min-height:65px;
        }
    }
}
</style>
