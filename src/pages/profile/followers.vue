<template>
    <div>
        <ul v-infinite-scroll="followersMoreFn" infinite-scroll-disabled="followersMoreSwitch" infinite-scroll-distance="100" class="follow-container clearfix">
            <template v-for="followItem in followersList">
              <items :followersItem="followItem" :btnStatus="false"></items>
            </template>
        </ul>
        <loading :loadingMsg="followersListLoadingMsg"></loading>
        <back-to-top :target="200"></back-to-top>
    </div>
</template>

<script>
import items from '../../components/user/pageFllowItems'
import loading from '../../components/commons/loading'
import backToTop from '../../components/commons/backToTop'
export default {
    name:'personalFollowers',
    data(){
        return {
            followersList:[],
            followersMoreSwitch:false,
            followersListLoadingMsg:{
                loadingStatus:false,
                noteText:"No more followers",
                noteStatus:false
            },
            FollowersPage:0,
            pageSize:9
        }
    },
    components:{
        items,
        loading,
        backToTop
    },
    methods:{
        followersMoreFn(){
            this.FollowersPage++;
            let pageFollowersData = {
                uid:this.$route.params.id,
                page:this.FollowersPage,
                pagesize:this.pageSize
            };
            this.$store.dispatch('pageFollowersAc',pageFollowersData).then((response) => {
                this.followersListLoadingMsg.loadingStatus = true;
                if(response.code === 200) {
                    this.followersList = this.followersList.concat(response.data.followers)
                    if(response.data.followers.length<this.pageSize) {
                        this.followersMoreSwitch = true;
                        this.followersListLoadingMsg.loadingStatus = false;
                        this.followersListLoadingMsg.noteStatus = true
                    }
                }
                else {
                    this.followersMoreSwitch = true;
                    this.followersListLoadingMsg.loadingStatus = false;
                    this.followersListLoadingMsg.noteStatus = true
                }
            });
        }
    }
}
</script>

<style lang="scss">
.personal-warp{
    .follow-container{
        margin-top:20px;
        min-height:65px;
    }
}
</style>
