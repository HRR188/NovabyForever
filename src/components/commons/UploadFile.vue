<template>
    <div class="router-view-container">
        <template v-if="type === 'ali'">
            <input type="file" style="display: none" accept="application/zip" ref="input" @change="fileChangedAli">
        </template>
        <template v-else>
            <input type="file" style="display: none" accept="application/zip" ref="input" @change="fileChanged">
        </template>
        <div :class="{'no-margin':noMargin}" class="upload-row">
            <p class="model-file">{{tag}}</p>
            <span class="browse pointer" @click="upload" v-show="!fileComplete && progress === 0">Browse</span>
            <div class="progress-bar" v-show="!fileComplete && progress>0 && !fileUploadError">
                <div class="progress" :style="{width:progress+'%'}"></div>
                <span class="progress-per">
                    <template v-show="progress < 100">
                        Uploading：{{progress}}%
                    </template>
                    <template v-show="progress === 100">
                        processing...
                    </template>
                </span>
                <!--<img class="close-progress" src="../assets/images/icon-delete.png" alt="">-->
            </div>
            <div class="file" v-show="fileComplete">
                <img class="file-icon" src="../../assets/images/icon-file.png" alt="">
                <span class="file-name">{{fileName}}</span>
                <img class="delete-file" src="../../assets/images/icon-delete.png" alt="" @click="deleteFile">
            </div>
            <div class="file" v-show="fileUploadError">
                <span class="file-name" style="color:#EA6264">File upload error!</span>
                <img class="delete-file" src="../../assets/images/icon-delete.png" alt="" @click="deleteFile">
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState,mapMutations} from 'vuex'
    export default {
        name: 'upload-file',
        computed:{
            ...mapState('fileUpload',[
                'progress','fileComplete','fileName','fileUploadError'
            ])
        },
        props:{
            noMargin:{
                type:Boolean,
                default:false
            },
            tag:{
                type:String,
                default:'Model file:'
            },
            type:{
                type:String
            },
            autoUpload:{
                type:Boolean,
                default:true
            },
            proId:{},
            propModelFile:{
                type:Object
            }
        },
        created(){
            if(this.propModelFile && this.propModelFile.id){
                this.setModel({
                    'work_attach_id':this.propModelFile.id,
                    'work_3d_id':this.propModelFile.model_3d.id
                });
                this.setComplete(this.propModelFile.name.src);
                this.setProgress(100);
                this.setName(this.propModelFile.name);
                this.setSize(0)
            }
        },
        methods:{
            ...mapMutations('fileUpload',[
                'setModel','setComplete','setProgress','setName','setSize'
            ]),
            upload:function () {
                this.$refs.input.click()
            },
            fileChanged:function () {
                let file = this.$refs.input.files[0];
                this.$store.dispatch('fileUpload/uploadFile',file);
                this.$refs.input.value = '';
                this.$emit('fileChanged')
            },
            fileChangedAli:function () {
                let file = this.$refs.input.files[0];
                this.$store.dispatch('fileUpload/uploadFileAli',{
                    file:file,
                    autoUpload:this.autoUpload,
                    id:this.proId
                });
                this.$refs.input.value = ''
            },
            deleteFile:function () {
                this.$store.commit('fileUpload/deleteFile');
                this.$emit('fileDelete')
            }
        }
    }
</script>

<style scoped>
    .upload-row{
        width: 100%;
        display: flex;
        align-items: center;
    }
    .upload-row.no-margin{
        margin-bottom: 0;
    }
    .progress-bar{
        width: 364px;
        height: 12px;
        background: #FFFFFF;
        border: 1px solid #E7E7E7;
        border-radius: 100px;
        position: relative;
        text-align: center;
    }
    .model-file{
        margin-right: 34px;
        font-size: 16px;
        color: #515254;
    }
    .browse{
        margin-right: 20px;
        font-size: 16px;
        color: #EA6264;
    }
    .progress-bar img{
        position: absolute;
        right:-25px;
        top:-2px;
    }
    .progress{
        background: #EA6264;
        border-radius: 100px;
        width: 0;
        height: 100%;
        transition: all .5s;
    }
    .progress-per{
        font-size: 12px;
        color: #EA6264;
    }
    .file{
        display: flex;
        align-items: center;
    }
    .file-icon{
        /*margin-left:15px;*/
        margin-right: 15px;
    }
    .delete-file{
        margin-left: 18px;
    }
    .file-name{
        font-size: 16px;
        color: #7A7A7A;
    }


</style>
