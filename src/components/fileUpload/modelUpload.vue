<template>
    <div class="file-upload-warp" ref="warp" :style="!this.modelTypeIsWrong? 'margin-bottom:26px': 'margin-bottom:40px'">
        <input
                type="file"
                style="display: none"
                ref="input"
                @change="inputChange($event)"
                :accept="acceptTypeList"
                :multiple="multipleFile">
        <div class="big-file" v-for="item in fileList" v-if="item.progress > 0">
            <h4 class="upload-title">{{item.progress < 100?translate('uploading'):translate('uploaded')}}</h4>
            <div class="c-loading-container" v-show="item.progress < 100">
                <div class="loading-content" :style="{width:item.progress+'%'}"></div>
            </div>
            <span class="load-percent" v-show="item.progress < 100">{{item.progress}}%</span>
        </div>
        <ul
                v-show="fileList.length < maxQuantity"
                class="drop-warp-upload"
                @drop="dropFile($event)"
                @dragover="dragFileOver($event)"
                @dragleave="dragFileLeave($event)"
                :class="{'drag-over':dropStatus}"
        >
            <template v-if="language === 'zh'">
                <li>拖拽或者&nbsp;<span @click="clickInput">上传</span>&nbsp;模型文件</li>
            </template>
            <template v-else>
                <li>drag or&nbsp;<span @click="clickInput">upload</span>&nbsp;model files</li>
            </template>
        </ul>
        <ul class="files" v-show="filesInZip.length">
            <li v-for="file in filesInZip">{{file}}</li>
        </ul>
        <template v-if="language === 'zh'">
            <div v-if="modelTypeIsWrong">
                <p class="alert" v-if="modelTypeIsWrong"> 模型格式不对，请重试。</p>
                <a href="" class="change" @click.stop.prevent="cancel()">换一个</a>
            </div>
            <p class="alert" v-if="typeIsWrong">
                错误! 只有 {{errorNote}}  模型允许&nbsp;
                <span @click="clickInput">重试</span>
            </p>
            <p class="alert" v-if="quantityIsWrong">
                错误! 最大数量是 {{errorNote}}&nbsp;
                <span @click="clickInput">重试</span>
            </p>
        </template>
        <template v-else>
            <div v-if="modelTypeIsWrong">
                <p class="alert" >
                    Error uploading file format.
                </p>
                <a href="" class="change" @click.stop.prevent="cancel()">Change</a>
            </div>

            <p class="alert" v-if="typeIsWrong">
                Error! Error uploading file format. {{errorNote}}&nbsp;
                <span @click="clickInput">Try again</span>
            </p>
            <p class="alert" v-if="quantityIsWrong">
                Error! Max number of upload files is {{errorNote}}&nbsp;
                <span @click="clickInput">Try again</span>
            </p>
        </template>
    </div>
</template>
<script>
    import fileControl from '../../mixins/fileUpload/fileControl'

    export default {
        name: 'new-model-file-upload',
        mixins: [fileControl],
        messages: {
            en: {
                uploading: 'Uploading',
                uploaded: 'Uploaded'
            },
            zh: {
                uploading: '正在上传',
                uploaded: '上传完毕'
            }
        },
        watch:{
            fileList(val) {
                if (val.length) {
                    if (val[0].isCorrectFile) {
                        this.$emit('canUpload', false);
                    } else {
                        this.$emit('wrongFile');
                    }
                } else {
                    this.$emit('canUpload', true)
                }
            },
        },
        methods: {
            cancel() {  //取消替换模型
                this.clearAllErrorStatus();
                this.modelTypeIsWrong = false;
                this.filesInZip = [];
                this.deleteFile(0);
                this.clickInput();

            },
            customOnEnd({status, response}) {
                if (status === 'success') {
                    this.$emit('uploadSuccess', response.data.data.work_id)
                }
            },
            clearFileListInZip:function () {
                this.$refs.warp.style.margin = 0;
                this.filesInZip = []
            }
        }
    }
</script>

<style lang="scss" scoped="">
    .file-upload-warp {
        margin-bottom: 26px;
        .drop-warp-upload {
            width: 560px;
            border: 1px dashed #D2D2D2;
            border-radius: 2px;
            margin-left: 28px;
            color: #959595;
            &.drag-over {
                background-color: white;
                border: 1px dashed #EA6264;
            }
            li {
                display: flex;
                justify-content: center;
                align-items: center;
                height: 60px;
                color: #959595;
                span {
                    cursor: pointer;
                    color: #EA6264;
                }
            }
        }
        .big-file {
            height: 110px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding:0 50px;
            .c-loading-container {
                width: 450px;
                height: 26px;
                overflow: hidden;
                padding: 1px;
                background: #F8F8F8;
                border: 1px solid #D2D2D2;
                border-radius: 100px;
                .loading-content {
                    height: 100%;
                    border-radius: 100px;
                    background-color: #F27375;
                    background-image: linear-gradient(135deg, rgba(255, 255, 255, .15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .15) 50%, rgba(255, 255, 255, .15) 75%, transparent 75%, transparent);
                    background-size: 36px 36px;
                    animation: progress-bar-stripes 0.8s linear infinite;
                }
            }
            .upload-title {
                font-size: 20px;
                color: #2A2A36;
                width: 100px;
                margin:0;
                font-weight: 400;
            }
            .load-percent{
                font-size: 16px;
                color: #2A2A36;
            }
        }
        .drop-area {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 60px;
            width: 100%;
            border: 1px dashed #D2D2D2;
            border-radius: 2px;
            position: relative;
            color: #959595;
            &.drag-over {
                background-color: white;
                border: 1px dashed #EA6264;
            }
        }
        .drop-warp {
            width: 100%;
            border: 1px dashed #D2D2D2;
            border-radius: 2px;
            position: relative;
            color: #959595;
            &.drag-over {
                background-color: white;
                border: 1px dashed #EA6264;
            }
            li {
                display: flex;
                justify-content: center;
                align-items: center;
                height: 60px;
                color: #959595;
                span {
                    cursor: pointer;
                    color: #EA6264;
                }
            }
        }
        .tips {
            margin-top: 20px;
            font-size: 12px;
            color: #ADADAD;
        }
        .files {
            width: 560px;
            border: 1px solid #D2D2D2;
            min-height: 207px;
            overflow-y: auto;
            max-height: 208px;
            background: #FFFFFF;
            border-radius: 2px;
            margin: 0 27px 0 27px;
            padding-top: 0;
            padding-bottom: 0;
            li {
                font-size: 14px;
                color: #959595;
                padding-bottom: 18px;
                border-bottom: 1px solid #D8D8D8;
            }
            li:last-child {
                border-bottom: none;
            }
        }
        .alert {
            /*display: inline;*/
            font-size: 12px;
            color: #EA6264;
            float: left;
            align-items: center;
            margin-top: 12px;
            margin-left: 27px;
            &:before {
                content: url("../../assets/images/icon_alert.png");
                width: 11px;
                height: 11px;
                margin-right: 7px;
            }
        }
        .change {
            position: absolute;
            font-size: 14px;
            color: #EA6264;
            margin-left: 350px;
            line-height: 19px;
            margin-top: 5px;
            text-decoration: underline;
        }
    }
</style>
