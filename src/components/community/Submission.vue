<template>
    <div class="router-view-container w-940">
        <h1 class="title-spe">{{title}}</h1>
        <p class="subtitle">You are almost done!</p>
        <div class="imgs">
            <div class="img" v-for="image in uploadImageList" :style="{backgroundImage:'url('+image.src+')'}">
                <img src="../../assets/images/icon-cover.png" class="img-cover" v-if="image.cover">
            </div>
            <div class="fake-img img" v-for="n in fakeImg"></div>
        </div>
        <p class="upload-row">
            <span class="tag">Category:</span>
            <span class="value">{{getCategory}}</span>
        </p>
        <p class="upload-row">
            <span class="tag">License: </span>
            <span class="value">{{getLicense}}</span>
        </p>
        <template v-if="wantUploadModel">
            <p class="upload-row">
                <span class="tag">File Size:</span>
                <span class="value">{{fileSize+'MB'}}</span>
            </p>
            <p class="upload-row">
                <span class="tag">Feature:</span>
                <span class="value" v-for="feature in getFeatures">{{feature}}</span>
            </p>
            <p class="upload-row">
                <span class="tag">Download permit:</span>
                <span class="value">{{permit?'Yes':'NO'}}</span>
            </p>
        </template>
        <p class="upload-row"><span class="tag">Description </span></p>
        <p class="desc">{{description}}</p>
        <div class="btns">
            <div class="back-btn btn" @click="back">Back</div>
            <div class="next-btn btn" @click="submitProject">Submit</div>
        </div>
    </div>
</template>

<script>
    import {  mapState,mapGetters } from 'vuex'
    export default {
        name: 'submission',
        props:{
            back:Function
        },
        computed:{
            fileName:function () {
                return this.$store.state.fileUpload.fileName
            },
            fileSize:function () {
                return Math.round((this.$store.state.fileUpload.fileSize/1024/1024*100))/100
            },
            fakeImg:function () {
                if(3-(this.uploadImageList.length)%3 === 3){
                    return 0;
                }
                else{
                    return 3-(this.uploadImageList.length)%3
                }
            },
            ...mapGetters('projectDetail',[
                'getFeatures','getLicense','getTags','getCategory'
            ]),
            ...mapState('projectDetail',[
                'description','faces','vertices','title','permit','wantUploadModel'
            ]),
            ...mapState('imageUpload',[
                'uploadImageList'
            ])

        },
        methods:{
            submitProject:function () {
                let _this = this;
                this.$store.dispatch('uploadProject').then(function (response) {
                    // console.log(response)
                    if(response.status === 200){
                        _this.$store.dispatch('clearAllProjectUploadData')
                        _this.$router.replace({path:'upload-project-success'})
                    }
                    else{
                        alert('open console')
                    }
                })
            }
        }
    }
</script>

<style scoped lang="scss">
    .title-spe{
        text-align: center;
        font-size: 30px;
        color: #515254;
        margin-top: 50px;
        margin-bottom: 22px;
    }
    .subtitle{
        font-size: 18px;
        color: #7A7A7A;
        margin-bottom: 32px;
        text-align: center;
    }
    .work-container{
        width: 100%;
        height: 600px;
        background: #2A2A36;
        border-radius: 4px;
        margin-bottom: 44px;
    }
    .upload-row{
        margin-bottom: 28px;
        font-size: 16px;
    }
    .upload-row .tag{
        color: #515254;
    }
    .upload-row .value{
        color: #7A7A7A;
        margin-right: 30px;
    }
    .desc{
        font-size: 14px;
        color: #515254;
        font-weight: 300;
    }
    .imgs{
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        margin-bottom: 25px;
        .img{
            width: 308px;
            height: 196px;
            border-radius: 4px;
            background-size: cover;
            background-position: center;
            margin-bottom: 10px;
            position: relative;
            .img-cover{
                position: absolute;
                top:0;
                left:0;
            }
        }
    }

</style>
