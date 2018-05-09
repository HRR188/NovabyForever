<template>
    <button @click.stop="followFn"
            :class="{unfollowa:followStatus,
            'model-detail-follow-btn-A':btnBorder,
            'model-detail-follow-btn-B':!btnBorder}">
        {{text}}
    </button>
</template>

<script>
    export default {
        name: 'model-detail-follow-btn',
        props:{
            btnBorder:{
                required: true
            },
            followId:{
                required: true
            },
            followBtnStatus:{
                required:true
            },
            isRefresh:{
                required:true,
                type:Boolean
            }
        },
        data(){
            return {
                followStatus:false,
            }
        },
        watch:{
            followBtnStatus:function(value){
                this.followStatus = value;
            },
            followId(val){
                if(this.isRefresh){
                    this.followStatus = 0;
                }
            }
        },
        created(){
            this.followStatus = this.followBtnStatus;
        },
        computed:{
            text:function () {
                if(this.language === 'zh'){
                    return this.followStatus?'取消关注':'关注'
                }
                return this.followStatus?'Unfollow':'Follow'
            },
            userId:function () {
                return this.$store.state.user.userId
            }
        },
        methods:{
            followFn(){
                let data = {
                    users:[this.followId]
                };
                let vm = this;
                if(vm.$store.state.user.loginStatus){
                    if(vm.followStatus){
                        vm.$store.dispatch('followUser',data).then(function (response) {
                            if(response.code === 200) {
                                vm.followStatus = false
                            }
                        });
                    }
                    else{
                        vm.$store.dispatch('followUser',data).then(function (response) {
                            if(response.code === 200) {
                                vm.followStatus = true
                            }
                        });
                    }
                }
                else{
                    vm.$logPop().then(function (response) {
                        if(response){
                            if(vm.followStatus){
                                vm.$store.dispatch('followUser',data).then(function (response) {
                                    if(response.code === 200) {
                                        vm.followStatus = false
                                    }
                                });
                            }
                            else{
                                vm.$store.dispatch('followUser',data).then(function (response) {
                                    if(response.code === 200) {
                                        vm.followStatus = true
                                    }
                                });
                            }
                        }
                    })
                }
            }
        }
    }
</script>

<style lang="scss">
    .model-detail-follow-btn-A, .model-detail-follow-btn-B{
        position: absolute;
        display: block;
        border-radius: 100px;
        font-size: 12px;
        line-height: 26px;
        text-align: center;
        cursor:pointer;
        width: 90px;
        height: 26px;
        &:before{
            content:'';
            display: inline-block;
            width:18px;
            height:18px;
            line-height: 26px;
            margin-right: 2px;
            background-position-y: 4px;
        }
    }
    .model-detail-follow-btn-A{
        color: #EA6264 ;
        background: #fff;
        border: 1px solid #EA6264;
        &:before{
            background: url(../../assets/images/icon-follow-red.png) no-repeat;
            margin-right: 2px;
            background-position-y: 4px;
        }
    }
    .model-detail-follow-btn-B{
        margin-top: 7px;
        color: #fff;
        border:none;
        background: #EA6264;
        cursor:pointer;
        &:before{
            background: url(../../assets/images/icon-follow.png) no-repeat;
            margin-right: 2px;
            background-position-y: 4px;
        }
    }

    .unfollowb,.unfollowa{
        &:before{
            content:'';
            display: inline-block;
            width:18px;
            height:18px;
            margin-right: 2px;
            background-position-y: 4px;
        }
    }
    .unfollowb{
        background: #C2C0C0;
        &:before{
            background: url(../../assets/images/icon-icon-unfollow.png) no-repeat;
        }
    }
    .unfollowa{
        background: #C2C0C0;
        color: #fff;
        border: none;
        &:before{
            background: url(../../assets/images/icon-icon-unfollow.png) no-repeat;
            background-position-y: 4px;
        }
    }
</style>
