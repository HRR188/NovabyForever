<template>
    <div class="model-upload-img-warp">
        <input type="file" style="display: none" ref="input" @change="inputChange($event)" :accept="acceptTypeList" :multiple="multipleFile">
        <div class="clearfix">
            <div class="upload uploaded-image pointer" v-if="fileList.length < 6" @click="clickInput">
                <div class="drop-img-container " @drop="dropFile" @dragover="dragFileOver" @dragleave="dragFileLeave"
                     :class="{'drag-over':dropStatus}">
                    <p v-if="!typeIsWrong && !quantityIsWrong">{{translate('drag')}} {{translate('or')}}
                        <span class="pointer">{{translate('upload')}}</span> {{translate('picture')}}
                    </p>
                    <p v-else-if="typeIsWrong">{{translate('fileError')}}
                        <span class="pointer">{{translate('upload')}}</span> {{translate('other')}}
                    </p>
                </div>
            </div>
            <div class="uploaded-image pointer" v-for="(item, index) in fileList"
                 :style="{'background-image':'url('+ item.src +')' }">
                <div class="hover-container" v-show="item.progress>=100">
                    <img src="../../assets/images/icon-delete-red.png" alt="" class="img-delete"
                         @click="deleteFile(index)">
                    <p class="set-p" @click="setCover(index)" v-show="!item.isCover">Set as Cover</p>
                </div>
                <div class="picture-cover">
                    <img src="../../assets/images/icon-cover.png" alt="" class="img-cover" v-show="item.isCover">
                </div>
                <div class="upload-progress-container" v-if="item.progress<100">
                    <div class="progress-bar">
                        <div class="progress-red" :style="{width:item.progress+'%'}"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import fileControl from '../../mixins/fileUpload/fileControl'
    import File from '../../mixins/fileUpload/file'
    import randomString from '../../mixins/functions/randomString'

    export default {
        name: 'model-concepts-upload',
        mixins: [fileControl],
        props: {
            needCover: {
                type: Boolean
            },
            propImageList: {
                required: false,
                type: Array
            },
        },
        methods: {
            setCover: function (id) {
                this.fileList.forEach((img, index) => {
                    img.setCustomValue({isCover: index === id});
                });
                this.customFileChanged();
                this.$forceUpdate();
            },
            setInitCover: function (id) {
                this.fileList.forEach((img, index) => {
                    img.setCustomValue({isCover: index === id});
                });
                this.$forceUpdate();
            },
            customFileChanged() {
                if(this.needCover){
                    if (!this.checkHasCover()) {
                        this.setCover(0)
                    }
                }
                if (this.fileList.length || !this.atLeastOneFile) {
                    let result = true;
                    this.fileList.some(file => {
                        if (file.status !== 'success') {
                            result = false;
                            return true;
                        }
                    });
                    if (result) {
                        this.$emit('fileStatusChange', {
                            data: this.fileList,
                            status: true,
                            message: 'file status is success'
                        });
                    }
                    else {
                        this.$emit('fileStatusChange', {
                            data: this.fileList,
                            status: false,
                            message: 'file status is wrong'
                        });
                    }
                }
                else {
                    this.$emit('fileStatusChange', {
                        data: this.fileList,
                        status: false,
                        message: 'file status is wrong'
                    });
                }
            },
            checkHasCover: function () {
                let result = false;
                this.fileList.some(file => {
                    if (file.isCover || file.iscover) {
                        result = true;
                        return;
                    }
                })
                return result;
            }
        },
        messages: {
            en: {
                drag: 'Drag',
                or: 'or',
                upload: 'upload',
                cover: 'cover',
                picture: 'picture',
                fileError: 'file type error',
                other: 'other'
            },
            zh: {
                drag: '拖放',
                or: '或',
                upload: '上传',
                picture: '图片',
                fileError: '图片格式错误',
                other: '其他'
            }
        },

    }
</script>

<style scoped lang="scss">
    .model-upload-img-warp {
        min-width: 286px;
        max-width: 489px;
        padding-left: 50px;
        padding-right: 30px;
        padding-top: 11px;
        .uploaded-image {
            width: 191px;
            height: 118px;
            background-size: cover;
            background-position: center;
            background-color: #FFFFFF;
            margin-bottom: 9px;
            position: relative;
           /*margitn-left :10px;*/
            float: left;
            margin-right: 9px;
            display: flex;
            align-items: center;
            justify-content: center;
            .drop-img-container {
                border: 1px dashed #D2D2D2;
                border-radius: 2px;
                display: flex;
                align-items: center;
                justify-content: center;
                width: 191px;
                height: 118px;
                position: relative;
                float: left;
                p {
                    font-size: 14px;
                    color: #ADADAD;
                    span {
                        color: #EA6264;
                    }
                }
                &.drag-over {
                    border: 1px dashed #EA6264;
                }
            }
            .img-cover {
                position: absolute;
                top: 0;
                left: 0;
            }
            .img-delete {
                position: absolute;
                top: 8px;
                right: 8px;
            }
            .set-p {
                position: absolute;
                bottom: 0;
                left: 0;
                border-bottom-left-radius: 4px;
                border-bottom-right-radius: 4px;
                background: rgba(234, 98, 100, 0.80);
                height: 26px;
                line-height: 26px;
                font-size: 12px;
                color: #FAC1C1;
                width: 100%;
                text-align: center;
            }
            .picture-cover{
                width: 100%;
                height: 100%;
            }
            .hover-container {
                opacity: 0;
                transition: all 0.5s;
                width: 100%;
                height: 100%;
            }
            &:hover .hover-container {
                opacity: 1;
            }
            .upload-progress-container {
                width: 100%;
                height: 100%;
                position: absolute;
                top: 0;
                left: 0;
                display: flex;
                justify-content: center;
                align-items: center;
                background-color: rgba(0, 0, 0, .6);
                border-radius: 4px;
                .progress-bar {
                    background-color: #fff;
                    height: 8px;
                    border-radius: 50px;
                    overflow: hidden;
                    width: 70%;
                    .progress-red {
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
    }
</style>
