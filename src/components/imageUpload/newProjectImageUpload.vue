<template>
    <div class="project-upload">
        <input type="file" style="display: none" ref="input" @change="inputChange($event)" :accept="acceptTypeList" :multiple="multipleFile">

        <div v-if="!fileList.length" class="drop-img-container" @drop="dropFile" @dragover="dragFileOver" @dragleave="dragFileLeave" :class="{'drag-over':dropStatus}" >
            <p v-if="!typeIsWrong && !quantityIsWrong">{{translate('drag')}} {{translate('or')}} <span class="pointer" @click="clickInput">{{translate('upload')}}</span> {{translate('cover')}} {{translate('picture')}}</p>
            <p v-else style="text-align: center">Please upload one image file <br><span class="pointer" @click="clickInput"> upload again</span></p>
        </div>
        <div v-else class="upload-show-warp" v-for="(item, index) in fileList" :style="{'background-image':'url('+ item.src +')' }">
            <div class="hover-box" v-show="item.progress>=100">
                <img src="../../assets/images/icon-delete-red.png" alt="" class="img-delete" @click="deleteFile(index)">
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
    import randomString from '../../mixins/functions/randomString'
    import File from '../../mixins/fileUpload/file'
    import fileControl from '../../mixins/fileUpload/fileControl'
    export default {
        name: 'project-image-upload',
        messages:{
            en:{
                drag:'Drag',
                or:'or',
                upload:'upload',
                cover:'cover',
                picture:'picture',
                tips:'Tips：Please upload a cover picture, with .png, .jpg, .jpeg format'
            },
            zh:{
                drag:'拖放',
                or:'或',
                upload:'上传',
                cover:'封面',
                picture:'图片',
                tips:'小提示：请上传.png .jpg .jpeg格式的图片'
            }
        },
        mixins:[fileControl],
        props:{
            imgUrl:{
                type:String
            }
        },
        watch:{
            imgUrl(val){
                if(val){
                    let _file = new File({id:randomString(),name:randomString(),isCorrectFile:true,status:'success',progress:100});
                    _file.setCustomValue({src:val});
                    this.fileList.push(_file);
                }
            }
        },
        created(){
            if(this.imgUrl){
                let _file = new File({id:randomString(),name:randomString(),isCorrectFile:true,status:'success',progress:100});
                _file.setCustomValue({src:this.imgUrl});
                this.fileList.push(_file);
            }
        }
    }
</script>

<style scoped lang="scss">
.project-upload{
    margin-bottom: 20px;
    .drop-img-container{
        border: 1px dashed #D2D2D2;
        border-radius: 2px;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 240px;
        height: 150px;
        margin-bottom: 13px;
        p{
            font-size: 14px;
            color: #ADADAD;
            span{
                color: #EA6264;
            }
        }
        &.drag-over{
            border: 1px dashed #EA6264;
        }
    }
    .upload-show-warp{
        border-radius: 5px;
        width: 240px;
        height: 150px;
        position: relative;
        margin-bottom: 13px;
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
    .tips{
        font-size: 12px;
        color: #ADADAD;
    }
}
</style>