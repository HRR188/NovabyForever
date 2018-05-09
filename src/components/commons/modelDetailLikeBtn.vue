<template>
    <div class="like-container pointer">
        <div class="like-big-btn btn-default-border" @click="toggleLike" :class="{'active':liked}">
            <img :src="heartUrl" alt="">
            <span :class="isLike">{{likedNumber>999? '999+':likedNumber}}</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'model-detail-like-btn',
        data(){
            return {
                liked:false,
                likeId:'',
                likedNumber:null
            }
        },
        props:{
            workId:{
                required:true
            },
        },
        computed:{
            heartUrl:function (){
                return this.liked?require('../../assets/images/icon-heart-after.png'):require('../../assets/images/icon-heart-before.png')
            },
            isLike(){
                return this.liked? 'liked-number':'un-like-number'
            }
        },
        methods:{
            toggleLike:function () {
                let vm = this;
                if(this.$store.state.user.loginStatus){
                    this.liked = !this.liked;
                    if(this.liked) {
                        this.$store.dispatch('likeModel',this.workId).then(function (response) {
                            vm.likedNumber++
                        })
                    }
                    else {
                        this.$store.dispatch('likeModel',this.workId).then(function (response) {
                            vm.likedNumber--
                        })
                    }
                }
                else{
                    this.$logPop().then(function (response) {
                        if(response){
                            vm.liked = !vm.liked;
                            if(vm.liked) {
                                vm.$store.dispatch('likeModel',vm.workId).then(function (response) {
                                    vm.likedNumber++
                                })
                            }
                            else {
                                vm.$store.dispatch('likeModel',vm.workId).then(function (response) {
                                    vm.likedNumber--
                                })
                            }
                        }
                    })
                }
            }
        }
    }
</script>

<style lang="scss">
    .like-container{
        .like-big-btn{
            text-align: center;
            font-size: 16px;
            margin-right: 20px;
            height:32px;
            width: 103px;
            &:hover{
                background: #fff;
            }
            &.active{
                color: #EA6264;
                &:hover img{
                    content:url("../../assets/images/icon-heart-after.png");
                }
            }
            img{
                width: 15px;
                height: 14px;
                margin-right: 8px;
                margin-top: 9px;
            }
            .un-like-number,.liked-number{
                line-height: 32px;
            }
            .liked-number{
                color: #EA6264;
            }
            .un-like-number{
                color: #939292;
            }
        }
    }

</style>
