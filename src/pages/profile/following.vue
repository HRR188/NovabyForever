<template>
    <div>
        <ul style="margin-top:20px;" class="follow-container clearfix" v-infinite-scroll="followingMoreFn" infinite-scroll-disabled="followingMoreSwitch" infinite-scroll-distance="100">
            <template v-for="followItem in followingList">
              <items :followersItem="followItem" :btnStatus="true"></items>
            </template>
        </ul>
        <loading :loadingMsg="followingListLoadingMsg"></loading>
        <back-to-top :target="200"></back-to-top>
    </div>
</template>

<script>
import items from '../../components/user/pageFllowItems'
import loading from '../../components/commons/loading'
import backToTop from '../../components/commons/backToTop'
export default {
    name:'personalFollowing',
    data(){
        return {
            followingList:[],
            followingMoreSwitch:false,
            followingListLoadingMsg:{
                loadingStatus:false,
                noteText:"No more followings",
                noteStatus:false
            },
            followingPage:0,
            pageSize:9
        }
    },
    components:{
        items,
        loading,
        backToTop
    },
    methods:{
        followingMoreFn(){
            this.followingPage++;
            let pageFollowingData = {
              uid:this.$route.params.id,
              page:this.followingPage,
              pagesize:this.pageSize
            };
            this.$store.dispatch('pageFollowingsAc',pageFollowingData).then((response) => {
                this.followingListLoadingMsg.loadingStatus = true;
                if(response.code === 200) {
                    this.followingList = this.followingList.concat(response.data.followings);
                    if(response.data.followings.length<this.pageSize) {
                        this.followersMoreSwitch = true;
                        this.followingListLoadingMsg.loadingStatus = false;
                        this.followingListLoadingMsg.noteStatus = true
                    }
                }
                else {
                    this.followingMoreSwitch = true;
                    this.followingListLoadingMsg.loadingStatus = false;
                    this.followingListLoadingMsg.noteStatus = true
                }

            });
        }
    }
}
</script>
