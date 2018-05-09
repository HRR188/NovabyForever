<template>
    <div class="image-upload-container">
        <input type="file" style="display: none" ref="input" @change="inputChange($event)" :accept="acceptTypeList" :multiple="multipleFile">
        <img src="../../assets/images/camera.png" alt="" @click.stop="clickInput" class="pointer">
    </div>
</template>

<script>
    import fileControl from '../../mixins/fileUpload/fileControl'

    export default {
        name: 'image-upload',
        mixins:[fileControl]
    }
</script>

<style scoped lang="scss">
    .image-upload-container{
        width: 100%;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
    }
    .image-upload-container .uploaded-image{
        width: 306px;
        height: 196px;
        background-size: cover;
        background-position: center;
        border-radius: 4px;
        margin-bottom: 10px;
        position: relative;
    }
    .image-upload-container .upload{
        background-image: url("../../assets/images/add-upload.png");
    }
    .image-upload-container .uploaded-image .img-cover{
        position: absolute;
        top:0;
        left:0;
    }
    .image-upload-container .uploaded-image .img-delete{
        position: absolute;
        top:8px;
        right: 8px;
    }
    .image-upload-container .uploaded-image .set-p{
        position: absolute;
        bottom: 0;
        left:0;
        border-bottom-left-radius: 4px;
        border-bottom-right-radius: 4px;
        background: rgba(234,98,100,0.80);
        height: 26px;
        line-height: 26px;
        font-size: 12px;
        color: #FAC1C1;
        width: 100%;
        text-align: center;
    }
    .image-upload-container .uploaded-image .hover-container{
        opacity: 0;
        transition:all 0.5s;
    }
    .image-upload-container .uploaded-image:hover .hover-container{
        opacity:1;
    }
    .image-upload-container .upload-progress-container{
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
    }
    .image-upload-container .upload-progress-container .progress-bar{
        background-color: #fff;
        height: 8px;
        border-radius: 50px;
        overflow: hidden;
        width: 70%;
    }
    .image-upload-container .upload-progress-container .progress-bar .progress-red{
        height: 8px;
        width: 0;
        background-color: #ea6264;
        border-bottom-left-radius: 4px;
        border-top-left-radius: 4px;
        transition: all 0.5s;
    }
    .image-upload-container .sm-image{
        width: 276px;
        height: 176px;
    }
    .image-upload-container .gry-border{
        border: 1px solid #D2D2D2;
    }
    .image-upload-container .feedback-upload{
        width:100%;
        height:125px;
        position: relative;
        background-size:cover;
        background-repeat: no-repeat;
    }
    .image-upload-container .annotation-attachment{
        width:100%;
        height:130px;
        position: relative;
        background: no-repeat center;
        background-size:cover;
        border-radius: 2px;
        border: 1px solid #838398;
        margin-bottom: 10px;
    }
    .image-upload-container .annotation-attachment .delete-attach{
        position: absolute;
        top:5px;
        right:5px;
        height: 14px;
        width: 14px;
    }
    .big-review-img{
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
            max-width:100%;
            max-height:100%;
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
    }

</style>
