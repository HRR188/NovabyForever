<template>
    <div class="three-annotation-upload">
        <input type="file" style="display: none" ref="input" @change="inputChange($event)" :accept="acceptTypeList" :multiple="multipleFile">

        <div class="add-upload pointer" @click="clickInput" v-if="fileList.length === 0">
            <img src="../../assets/images/annotation/icon-add-img.png" class="img-max">
        </div>
        <div v-else class="upload-show-warp" v-for="(item, index) in fileList" :style="{'background-image':'url('+ item.src +')' }">
            <div class="hover-box" v-show="item.progress>=100">
                <img src="../../assets/images/icon-delete-red.png" alt="" class="img-delete" @click="deleteFile(index)" v-if="deleteStatus">
            </div>
            <div class="upload-progress-container" v-if="item.progress<100">
                <div class="progress-bar">
                    <div class="progress-red" :style="{width:item.progress+'%'}"></div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import fileControl from '../../mixins/fileUpload/fileControl'
    export default {
        name: 'threeDAnnotationUpload',
        data(){
            return {
                deleteStatus:true
            }
        },
        watch:{
            imageStatus(val){
                this.deleteStatus = (val !== 'ready')
            }
        },
        props:{
            imageStatus:{

            }
        },
        mixins:[fileControl]
    }
</script>
<style lang="scss">
.three-annotation-upload{
    .add-upload,.upload-show-warp{
        width:100%;
        height:130px;
        border-radius: 2px;
        border: 1px solid #838398;
        margin-bottom: 10px;
        background-size: cover;
    }
    .upload-show-warp{
        position: relative;
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
    .img-delete{
        position: absolute;
        top:8px;
        right: 8px;
    }
    /*.big-review-img{
        position: fixed;
        top:0;
        left:0;
        width:100%;
        height:100%;
        background: rgba(0,0,0,0.70);
        z-index:30;
        align-items: center;
        justify-content: center;
        >img{
            maxQuantity-width:100%;
            maxQuantity-height:100%;
            display: block;
        }
        span{
            display: block;
            position: absolute;
            top:45px;
            right:50px;
            width:25px;
            height:25px;
            background-image:url(../../assets/images/feedback-close.png);
            background-size: contain;
            background-repeat: no-repeat;
        }
    }*/
}
</style>