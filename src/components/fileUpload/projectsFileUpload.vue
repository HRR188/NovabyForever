<template>
    <div class="projects-file-upload file-upload-warp">
        <input type="file" style="display: none" ref="input" @change="inputChange($event)" :accept="acceptTypeList" :multiple="multipleFile">
        <div class="file" v-for="(file, index) in fileList">
            <img src="" alt="">
            <p>{{file.name}}{{file.size?'('+parseInt(file.size/1024)+'kb)':''}}</p>
            <p style="color:red" v-show="file.error">Error!</p>
            <div class="loading-container" v-show="file.progress < 100">
                <div class="loading-content" :style="{width:file.progress+'%'}"></div>
            </div>
            <img src="../../assets/images/icon-delete.png" alt="" @click="deleteFile(index)">
        </div>
        <div class="drop-area" @drop="dropFile" @dragover="dragFileOver" @dragleave="dragFileLeave" :class="{'drag-over':dropStatus}" v-show="fileList.length < maxQuantity">
            <p v-show="!quantityIsWrong && !typeIsWrong">drag or <span class="pointer" style="color:red" @click="clickInput">upload</span>&nbsp;attachment fileList</p>
            <p v-show="typeIsWrong">Error! Only {{errorNote}} are allowed. <span class="pointer" style="color:red" @click="clickInput">Try again</span></p>
            <p v-show="quantityIsWrong">Error! Max number of upload files is {{maxQuantity}}. <span class="pointer" style="color:red" @click="clickInput">Try again</span></p>
        </div>
        <p class="tips">tips:You may attach up to 5 files under 100 MB.</p>
    </div>
</template>
<script>
    import fileControl from '../../mixins/fileUpload/fileControl'

    export default {
        name: 'projectsFileUpload',
        mixins:[fileControl]
    }
</script>
