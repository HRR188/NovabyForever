<template>
    <div class="share-content">
        <p v-lang.share class="upp"></p>
        <ul class="flex">
            <li @click="share('facebook')">
                <img src="../../assets/images/facebook.png" alt="">
            </li>
            <li @click="share('twitter')">
                <img src="../../assets/images/twitter.png" alt="">
            </li>
            <li @click="share('linkedin')">
                <img src="../../assets/images/Instagram.png" alt="">
            </li>
            <li @click="share('pinterest')">
                <img src="../../assets/images/pinterest.png" alt="">
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: 'share-links',
        props:{
            id:{
                required:true
            },
            type:{
                default:1
            }
        },
        created(){
            this.$store.dispatch('getShareLinks',{id:this.id,type:this.type})
        },
        methods:{
            share:function (name) {
                let vm = this
                if(this.$store.state.user.loginStatus){
                    this.$store.dispatch('beforeShare',vm.id).then(function () {
                        window.open(vm.$store.state.share.links[name],'_blank')
                    })
                }
                else{
                    this.$logPop().then(function (response) {
                        if(response){
                            vm.$store.dispatch('beforeShare',vm.id).then(function () {
                                window.open(vm.$store.state.share.links[name],'_blank')
                            })
                        }
                    })
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    .share-content{
        padding:12px 22px 20px;
        margin-bottom:12px;
        background-color: #fff;
        border-radius: 5px;
        border: 1px solid #F1F1F1;
        >p{
            font-size: 16px;
            color: #181818;
        }
        ul{
            margin-top:15px;
            justify-content: space-between;
        }
        li{
            width:40px;
            height:40px;
            cursor: pointer;
            img{
                width: 100%;
                height:100%;
            }
        }
    }
</style>