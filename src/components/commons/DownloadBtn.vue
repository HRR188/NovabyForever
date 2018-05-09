<template>
    <div class="download-container" v-if="hasZip" >
        <div class="down-big-btn" v-if="type === 'big'" :class = "{circle:downloaded}" @click="download">
            <img src="../../assets/images/icon-download.png" alt="" v-if="!downloaded">
            <span v-if="!downloaded" v-lang.f></span>
            <img src="../../assets/images/icon-download-cloud.png" alt="" v-if="downloaded" class="downloaded">
        </div>
        <div class="down-small-btn" v-else @click="download">
            <img class="down" src="../../assets/images/icon-download.png" alt="" v-if="!downloaded">
            <img class="cloud" src="../../assets/images/icon-download-cloud.png" alt="" v-if="downloaded">
        </div>
    </div>
</template>

<script>
    export default {
        name: 'download-btn',
        props:{
            hasZip:{
                required:true
            },
            isDownload:{
                required:true
            },
            downloadId:{
                required:true
            },
            type:{
                default:'big'
            }
        },
        data(){
            return{
                downloaded:false
            }
        },
        messages:{
            en:{
                f:'Free'
            },
            zh:{
                f:'免费下载'
            }
        },
        created(){
            this.downloaded = this.isDownload
        },
        methods:{
            download:function () {
                let vm = this;
                let winRef = window.open("",'_blank');
                if(vm.$store.state.user.loginStatus){
                    vm.downloaded = true
                    vm.$store.dispatch('downloadModel',vm.downloadId).then(function (response) {
                        winRef.location.href = response.zip_url
                    })
                }
                else{
                    vm.$logPop().then(function (response) {
                        if(response){
                            vm.downloaded = true
                            vm.$store.dispatch('downloadModel',vm.downloadId).then(function (response) {
                                winRef.location.href = response.zip_url
                            })
                        }
                    })
                }

            }
        }
    }
</script>

<style lang="scss">
    .download-container{
        .down-big-btn{
            background: #EA6264;
            font-size: 16px;
            color: #FFFFFF;
            padding:8px 16px;
            border-radius: 100px;
            cursor: pointer;
            &.circle{
                padding:8px 9px;
            }
            img{
                width: 14px;
                height: 17px;
                margin-right: 10px;
                margin-top: 2px;
            }
            .downloaded{
                width: 20px;
                height: 13px;
                margin-right: 0;
            }
        }
        .down-small-btn{
            width:25px;
            height:25px;
            background: #EA6264;
            border-radius: 100%;
            cursor: pointer;
            img{
                display: block;
                box-sizing: content-box;
                margin:0 auto;
            }
            img.down{
                width:10px;
                padding-top:5px;
                height: 14px;
            }
            img.cloud{
                width:15px;
                height:12px;
                padding-top:5px;
            }
        }

    }
</style>
