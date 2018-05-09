<template>
    <div class="comment-container clearfix">
        <div>
            <portrait :portraitUrl="commentData.author.user_avatar" :type="commentData.author.user_type" :width="16" :height="16"></portrait>
        </div>
        <p class="name">
            <name-details :nameData="commentData.author"></name-details>
            <span class="time">{{time | time}}</span>
        </p>
        <p class="comment">{{commentData.comment_content}}</p>
        <p class="btns">
            <span class="report pointer" @click="report">Report</span>
            <!--<span class="reply">Reply</span>-->
        </p>
    </div>
</template>

<script>
    import portrait from '../user/headPortrait.vue'
    import NameDetails from '../commons/NameDetails.vue'
    export default {
        name: 'comment',
        components:{
            NameDetails,
            portrait
        },
        computed:{
            time:function () {
                return {
                    start: this.commentData.comment_create_time,
                    end: this.commentData.time
                }
            }
        },
        props:{
            commentData:{
                required:true
            }
        },
        methods:{
            report:function () {
                if(this.$store.state.user.loginStatus){
                    this.$report('comment',this.commentData.comment_id).then((response) => {
                        if(response){
                            this.$alert({type: 'alert', message: 'Report successful!'})
                        }
                    })
                }
                else{
                    this.$logPop().then( (response) => {
                        if(response){
                            this.$report('comment',this.commentData.comment_id).then((response) => {
                                if(response){
                                    this.$alert({type: 'alert', message: 'Report successful!'})
                                }
                            })
                        }
                    })
                }

            }
        }
    }
</script>

<style scoped lang="scss">
    .comment-container{
        width: 100%;
        padding-bottom: 30px;
        position: relative;
        padding-top: 22px;
        font-weight: 300;
        &:not(:last-child){
            border-bottom: 1px solid #D8D8D8;
        }
    }
    .comment-container>div{
        width: 50px;
        height:50px;
        position: absolute;
        left:0;
        top:22px;
    }
    .comment-container p{
        float: left;
        padding-left: 72px;
        width: 100%;
    }
    .comment-container .name-details{
        color: #4A90E2;
    }
    .comment-container .name .name{
        font-size: 16px;
        color: #4990E2;
    }
    .comment-container .name .time{
        font-size: 14px;
        color: #9B9B9B;
        float: right;
    }
    .comment-container .comment{
        color: #85878B;
        margin-top: 6px;
        margin-bottom: 12px;
        word-wrap:break-word;
        font-family: Helvetica;
        font-size: 14px;
        text-align: justify;
        line-height: 22px;
    }
    .comment-container .btns .reply{
        font-size: 16px;
        color: #4990E2;
        float: left;
        margin-right: 20px;
    }
    .comment-container .btns .report{
        font-size: 16px;
        color: #2CBE42;
        float: left;
    }

</style>