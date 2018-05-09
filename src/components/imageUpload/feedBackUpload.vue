<template>
    <div class="feedback-upload-warp">
        <input type="file" style="display: none" ref="input" @change="inputChange($event)" :accept="acceptTypeList" :multiple="multipleFile">

        <template v-if="canUpdate">
            <div class="add-upload pointer" @click="clickInput" v-if="uploadStatus">
                <img src="../../assets/images/add-upload.png" class="img-max">
            </div>
            <div v-else class="upload-show-warp" v-for="(item, index) in fileList" :style="{'background-image':'url('+ item.src +')' }" @click="showBigImg(item.src)">
                <div class="hover-box" v-show="item.progress>=100">
                    <img src="../../assets/images/icon-delete-red.png" alt="" class="img-delete" @click.stop="deleteFile(index)">
                </div>
                <div class="upload-progress-container" v-if="item.progress<100">
                    <div class="progress-bar">
                        <div class="progress-red" :style="{width:item.progress+'%'}"></div>
                    </div>
                </div>
            </div>
        </template>
        <template v-else>
            <div v-if="imgUrl" class="upload-img pointer" :style="{backgroundImage:'url('+imgUrl+')'}" @click="showBigImg(imgUrl)"></div>
            <div v-else class="upload-img pointer" style="background: #EEEFF3;">
                <img src="../../assets/images/feed-back-waiting-upload.png" alt="">
                <p>waiting for update</p>
            </div>
        </template>
    </div>
</template>
<script>
    import randomString from '../../mixins/functions/randomString'
    import File from '../../mixins/fileUpload/file'
    import fileControl from '../../mixins/fileUpload/fileControl'
    export default {
        name:'feedBackUpload',
        data(){
            return {
                uploadStatus:true //是否要隐藏点击上传的容器
            }
        },
        props:{
            canUpdate:{
                required:true,
                type:Boolean
            },
            imgUrl:{
                type:String
            }
        },
        watch:{
            fileList(val){
                (val.length) ? (this.uploadStatus = false) : (this.uploadStatus = true)
            },
            imgUrl(val){
                if(val){
                    let _file = new File({id:randomString(),name:randomString(),isCorrectFile:true,status:'success',progress:100});
                    _file.setCustomValue({src:val});
                    this.fileList.push(_file);
                }
            }
        },
        mixins:[fileControl],
        methods:{
            showBigImg:function (url) {
                if(url){
                    this.$emit('showBigImg',url)
                }
            }
        }
    }
</script>
<style lang="scss">
.feedback-upload-warp{
    .add-upload,.upload-show-warp{
        background-color:#fff;
        border: 1px solid #E0E0E0;
        border-radius: 5px;
        overflow: hidden;
        width:458px;
        height:257px;
    }
    .upload-img{
        border-radius: 5px;
        width:458px;
        height:257px;
        background-size: cover;
        background-position: center;
        display: flex;
        align-content: center;
        justify-content: center;
        flex-wrap: wrap;
        img{

        }
        p{
            width: 100%;
            text-align: center;
            font-size: 12px;
            color: #959595;
            margin-top: 5px;
        }
    }
    .upload-show-warp{
        position: relative;
        background-size: cover;
        background-position: center;
        .upload-progress-container{
            width: 100%;
            height: 100%;
            position: absolute;
            top:0;
            left:0;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: rgba(0,0,0,.6);
            border-radius: 4px;
            .progress-bar{
                background-color: #fff;
                height: 8px;
                border-radius: 50px;
                overflow: hidden;
                width: 70%;
                .progress-red{
                    height: 8px;
                    width: 0;
                    background-color: #ea6264;
                    border-bottom-left-radius: 4px;
                    border-top-left-radius: 4px;
                    transition: all 0.5s;
                }
            }
        }
    }
    .hover-box{
        opacity: 0;
        transition:all 0.5s;
        width: 100%;
        height: 100%;
        cursor: pointer;
        &:hover{
            opacity:1;
        }
        .img-delete{
            position: absolute;
            top:8px;
            right: 8px;
        }
    }
}
</style>