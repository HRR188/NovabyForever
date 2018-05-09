<template>
    <div class="following-list-warp" v-infinite-scroll="load" infinite-scroll-disabled="loadStatus" infinite-scroll-distance="100">
        <template v-for="(project,index) in followingList">
            <template v-if="index%8 === 0 && index">
                <who-to-follow :projectNumber="4" :modelType="true"></who-to-follow>
            </template>
            <project-big-list :projectData="project" :showAuthor="true"></project-big-list>
        </template>
        <loading :loadingMsg="loading"></loading>
    </div>
</template>
<script>
    import ProjectBigList from '../../components/community/ProjectBigList.vue'
    import loading from '../../components/commons/loading.vue'
    import WhoToFollow from '../../components/whoToFollow/WhoToFollow.vue'
    export default {
        name:'followingList',
        components:{
            ProjectBigList,
            loading,
            WhoToFollow
        },
        data(){
            return {
                loadStatus:false,
                loading:{
                    loadingStatus:true,
                    noteText:'No more data',
                    noteStatus: false
                },
                followingList:[],
                pageSize:6,
                pageNum:1
            }
        },
        methods:{
            load(){
                let data = {
                    page:this.pageNum++,
                    pagesize:this.pageSize
                };
                this.$store.dispatch('modelsList/getFollowingList',data).then((response) => {
                   if(response.code === 200) {
                       this.followingList = this.followingList.concat(response.data.works);
                       if(response.data.works.length < this.pageSize) {
                            this.loadStatus = true;
                           this.loading.noteStatus = true
                       }
                    }
                    else {
                       this.loadStatus = true;
                       this.loading.noteStatus = true
                   }
                })
            }
        }
    }
</script>
<style lang="scss">
    .models-container{
        .following-list-warp{
            padding: 20px 95px;
        }

    }
</style>