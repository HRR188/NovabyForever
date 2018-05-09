<template>
    <button class="follow-btn" :style="{width:btnstyle.width,height:btnstyle.height,visibility:followId === userId?'hidden':'show'}" @click.stop="followFn" :class="{unfollow:followStatus}">{{text}}</button>
</template>

<script>
    export default {
        name: 'follow-btn',
        props:{
            btnstyle:{
                required: true
            },
            followId:{
                required: true
            },
            followBtnStatus:{  // 按钮状态 是否是follow状态  布尔值 true是follow
                required:true
            }
        },
        data(){
            return {
                followStatus:false
            }
        },
        watch:{
            followBtnStatus:function(value){
                this.followStatus = value;
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
                        else{
                            //未登录
                        }
                    })
                }
            }
        }
    }
</script>

<style lang="scss">
    .follow-btn{
        border-radius: 100px;
        font-size: 12px;
        color: #fff;
        text-align: center;
        border:none;
        background: #EA6264;
        cursor:pointer;
    }
    .unfollow{
        background: #C2C0C0;
    }
</style>
