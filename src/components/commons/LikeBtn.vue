<template>
    <div class="like-container">
        <div v-if="type === 'big'" class="like-big-btn" @click="toggleLike" :class="{'active':liked}">
            <img :src="heartUrl" alt="">
            <span>{{num}}</span>
        </div>
        <div v-else class="like-small-btn" @click="toggleLike" :class="{'active':liked}">
            <img :src="heartUrl" alt="">
            <span>{{num}}</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'like-btn',
        data(){
            return {
                liked:false,
                likeId:'',
                num:200
            }
        },
        props:{
            likedPro:{
                default:true,
                required:true
            },
            workId:{
                required:true
            },
            likedNumber:{
                required:true
            },
            type:{
                default:'big'
            }
        },
        created(){
            this.liked = this.likedPro
            this.num = this.likedNumber
        },
        computed:{
            heartUrl:function (){
                return this.liked?require('../../assets/images/icon-heart-after.png'):require('../../assets/images/icon-heart-before.png')
            }
        },
        methods:{
            toggleLike:function () {
                let vm = this;
                if(this.$store.state.user.loginStatus){
                    this.liked = !this.liked;
                    if(this.liked) {
                        this.$store.dispatch('likeModel',this.workId).then(function (response) {
                            vm.num++
                        })
                    }
                    else {
                        this.$store.dispatch('likeModel',this.workId).then(function (response) {
                            vm.num--
                        })
                    }
                }
                else{
                    this.$logPop().then(function (response) {
                        if(response){
                            vm.liked = !vm.liked;
                            if(vm.liked) {
                                vm.$store.dispatch('likeModel',vm.workId).then(function (response) {
                                    vm.num++
                                })
                            }
                            else {
                                vm.$store.dispatch('likeModel',vm.workId).then(function (response) {
                                    vm.num--
                                })
                            }
                        }
                        else{
                            //alert('need log in')
                        }
                    })
                }
            }
        }
    }
</script>

<style lang="scss">
    .like-container{
        .like-big-btn,.like-small-btn{
            &:hover{
                background: #fff;
                color: #C8C8C8;
                img{
                    content:url("../../assets/images/icon-heart-hover.png");
                }
            }
            &.active{
                color: #EA6264;
                &:hover img{
                    content:url("../../assets/images/icon-heart-after.png");
                }
            }
        }
        .like-big-btn{
            background: #fff;
            border: 1px solid #E1E1E1;
            font-size: 16px;
            color: #95979A;
            padding:8px 16px;
            border-radius: 100px;
            cursor: pointer;
            img{
                width: 15px;
                height: 14px;
                margin-right: 8px;
                margin-top: 3px;
            }
        }
        .like-small-btn{
            background: #fff;
            border: 1px solid #E1E1E1;
            font-size: 14px;
            color: #95979A;
            padding:5px 12px;
            border-radius: 100px;
            cursor: pointer;
            display: flex;
            justify-content: center;
            align-items: center;
            img{
                width:12px;
                height:11px;
            }
            span{
                display: inline-block;
                margin-left:4px;
            }
        }
    }

</style>
