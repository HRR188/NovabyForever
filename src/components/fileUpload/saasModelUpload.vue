<template>
    <div class="model-file-upload file-upload-warp">
        <input type="file" style="display: none" ref="input" @change="inputChange($event)" :accept="acceptTypeList" :multiple="multipleFile">
        <div class="big-file" v-for="item in fileList">
            <div class="flex">
                <p>{{item.name}}{{item.size?'('+parseInt(item.size/1024)+'kb)':''}}</p>
                <img src="../../assets/images/icon-delete.png" alt="" @click="cancelUpload" style="width: 18px;">
            </div>
            <div class="loading-container" v-show="item.progress && item.progress < 100">
                <div class="loading-content" :style="{width:item.progress+'%'}"></div>
            </div>
            <span v-show="item.progress && item.progress < 100">{{item.progress}}%</span>
        </div>
        <ul v-show="fileList.length < maxQuantity" class="drop-warp" @drop="dropFile($event)" @dragover="dragFileOver($event)" @dragleave="dragFileLeave($event)" :class="{'drag-over':dropStatus}">

            <template v-if="language === 'zh'">
                <li v-show="!quantityIsWrong && !typeIsWrong">拖拽或者&nbsp;<span @click="clickInput">上传</span>&nbsp;模型文件</li>
                <li v-if="typeIsWrong">错误! 只有 {{errorNote}}  模型允许&nbsp;<span @click="clickInput">重试</span></li>
                <li v-if="quantityIsWrong">错误! 最大数量是 {{errorNote}}&nbsp;<span @click="clickInput">重试</span></li>
            </template>

            <template v-else>
                <li v-show="!quantityIsWrong && !typeIsWrong">drag or&nbsp;<span @click="clickInput">upload</span>&nbsp;model files</li>
                <li v-if="typeIsWrong">Error! Only {{errorNote}}  are allowed&nbsp;<span @click="clickInput">Try again</span></li>
                <li v-if="quantityIsWrong">Error! Max number of upload files is {{errorNote}}&nbsp;<span @click="clickInput">Try again</span></li>
            </template>

        </ul>
        <ul class="files" v-show="filesInZip.length">
            <li v-for="file in filesInZip">{{file}}</li>
        </ul>
        <template v-if="language === 'zh'">
            <p class="alert" v-if="modelTypeIsWrong">对不起，模型格式不对，请重试。</p>
        </template>
        <template v-else>
            <p class="alert" v-if="modelTypeIsWrong">Sorry, model format was not correct, please try again.</p>
        </template>
        <p class="tips" v-if="language === 'zh'">小提示：<br>
            1. 请保证文件夹名称不包含空格<br>
            2. 请将材质和模型关联好<br>
            3. 支持的模型格式为.obj, .fbx, .dae, .3d和.3ds<br>
            4. 请将所有文件压缩成一个.zip压缩包后上传。
        </p>
        <p class="tips" v-else>Tips：<br>
            1. Before exporting, make sure the file name does not include any spaces<br>
            2. Before exporting, remember to assign the material/texture to the model <br>
            3. Acceptable model file formats are .obj, .fbx, .dae, .3d, and .3ds <br>
            4. Please compress all files into a .zip before uploading
        </p>
    </div>
</template>
<script>
    import fileControl from '../../mixins/fileUpload/fileControl'

    export default {
        name:'saas-model-upload',
        mixins:[fileControl],
        methods:{
            cancelUpload:function () {
                this.deleteFile(0);
                this.filesInZip = []
            }
        }
    }
</script>
