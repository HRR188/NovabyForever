<template>
    <div class="model-upload-img-warp">
        <input type="file" style="display: none" ref="input" @change="inputChange($event)" :accept="acceptTypeList" :multiple="multipleFile">

        <div class="clearfix">
            <div class="uploaded-image pointer" v-for="(item, index) in fileList" :style="{'background-image':'url('+ item.src +')' }">
                <div class="hover-container" v-show="item.progress>=100">
                    <img src="../../assets/images/icon-delete-red.png" alt="" class="img-delete" @click="deleteFile(index)">
                </div>
                <div class="upload-progress-container" v-if="item.progress<100">
                    <div class="progress-bar">
                        <div class="progress-red" :style="{width:item.progress+'%'}"></div>
                    </div>
                </div>
            </div>
            <div class="uploaded-image drop-img-container" @drop="dropFile" @dragover="dragFileOver" @dragleave="dragFileLeave" :class="{'drag-over':dropStatus}">
                <p v-if="!typeIsWrong && !quantityIsWrong">Drag or <span class="pointer" @click="clickInput">upload</span> cover picture</p>
                <p v-else style="text-align: center">Please upload one image file <br><span class="pointer" @click="clickInput"> upload again</span></p>
            </div>
        </div>
    </div>
</template>

<script>
    import fileControl from '../../mixins/fileUpload/fileControl'
    import File from '../../mixins/fileUpload/file'
    import randomString from '../../mixins/functions/randomString'

    export default {
        name: 'model-image-upload',
        props:{
            propImages:{
                required:false
            }
        },
        data(){
            return{
                modelName:''
            }
        },
        mixins:[fileControl],
        created(){
            this.modelName = this.propImages.name;
            if(this.propImages.images.length){
                this.propImages.images.forEach(img => {
                    let _img = new File({id:randomString(),name:img.src,isCorrectFile:true,status:'success',progress:100});
                    _img.setCustomValue({src:img.url});
                    this.fileList.push(_img)
                });
                this.customFileChanged()
            }
        },
        methods:{
            customFileChanged:function () {
                if(this.fileList.length || !this.atLeastOneFile){
                    let result = true;
                    this.fileList.some(file => {
                        if(file.status !== 'success'){
                            result = false;
                            return true;
                        }
                    });
                    if(result){
                        this.$emit('fileStatusChange',{data:this.fileList,name:this.modelName});
                    }
                    else{
                        this.$emit('fileStatusChange',{data:this.fileList,name:this.modelName});
                    }
                }
                else{
                    this.$emit('fileStatusChange',{data:this.fileList,name:this.modelName});
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    .model-upload-img-warp{
        .uploaded-image{
            /*width: 268px;*/
            /*height: 175px;*/
            width: 23%;
            padding-top: 13%;
            border-radius: 4px;
            position: relative;
            float: left;
            margin-right:15px;
            margin-bottom:15px;
            background-size: cover;
            background-position: center;
            .img-delete{
                position: absolute;
                top:8px;
                right: 8px;
            }
            .set-p{
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
            .hover-container{
                opacity: 0;
                transition:all 0.5s;
                width: 100%;
                height: 100%;
            }
            &:hover .hover-container{
                opacity:1;
            }
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
        .drop-img-container{
            border: 1px dashed #D2D2D2;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 13px;
            p{
                font-size: 14px;
                color: #ADADAD;
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                span{
                    color: #EA6264;
                }
            }
            &.drag-over{
                border: 1px dashed #EA6264;
            }
        }
        .tips{
            font-size: 12px;
            color: #ADADAD;
            margin-bottom: 16px;
        }
    }
</style>
