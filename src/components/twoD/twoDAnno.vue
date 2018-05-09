<template>
    <div class="canvas-container" ref="container" id="container">
        <div class="canvas-wrapper">
            <div class="canvas-box" id="canvas-box">
                <img-preview ref="imgCanvas" :img-src="selectedImgSrc"></img-preview>
                <canvas class="canvas annotation-canvas"
                        id="AnCanvas"
                        v-show="annotation.showTools || showAnCanvas"
                ></canvas>
                <canvas class="canvas annotation-fake-canvas"
                        id="FaCanvas"
                        v-show="annotation.showTools"
                        @mousedown="mouseDown($event)"
                        @mousemove="mouseMove($event)"
                        @mouseup="mouseUp"
                >
                </canvas>
            </div>
        </div>
        <div class="return-3d" v-show="showAnCanvas" @click="returnToModel" v-lang.r3></div>
        <div class="menu-bar">
            <div class="logo">
                <img src="../../assets/images/logo.png" alt="">
                <p class="menu-title" style="width: 200px;" v-lang.fs></p>
            </div>
            <div>
                <div class="btn btn-save pointer" @click="send">{{sending?translate('sending'):translate('sSend')}}</div>
                <div class="btn btn-exit pointer" @click="exit" v-lang.exit></div>
            </div>
        </div>
        <div class="images">
            <img class="left pointer" src="../../assets/images/icon_left.png" alt="" @click="moveImageBox(-1)">
            <div class="images-box">
                <div id="imageBox" :style="{transform:'translateX('+ imageBoxLeft + 'px)'}">
                    <div class="image" :class="{active:img.selected}" v-for="img in images" :style="{backgroundImage:`url(${img.low})`}" @click="selectImage(img)"></div>
                </div>
            </div>
            <img class="right pointer" src="../../assets/images/icon_right.png" alt="" @click="moveImageBox(1)">
        </div>
        <div class="tool-list pointer" :class="{hide:!showToolList}">
            <div class="tool-tabs">
                <ul>
                    <li style="background: #666674;"><img src="../../assets/images/icon-annotation.png" alt=""></li>
                </ul>
            </div>
            <div class="annotation-list">
                <div
                        class="annotation-container"
                        v-for="(anno,index) in annotationList"
                        :class="{active:anno.selected}"
                        @click="selectAnno(anno)"
                >
                    <div class="annotation-title" :class="{active:anno.selected}">
                        <p v-show="anno.status === 'ready'">{{anno.title}}</p>
                        <input type="text" v-model="anno.title" v-show="anno.status === 'edit'" :placeholder="translate('title')">
                        <div class="btns">
                            <span class="pointer" v-show="anno.status === 'ready'" @click="anno.status = 'edit'" style="font-size: 12px;" v-lang.edit></span>
                            <img src="../../assets/images/annotation/icon-check.png"
                                 class="pointer"
                                 v-show="anno.status === 'edit'"
                                 @click.stop="annoReady(anno)"
                            >
                            <img src="../../assets/images/annotation/icon-close.png" class="pointer" @click.stop="annoDelete(index)">
                        </div>
                    </div>
                    <div class="annotation-content" :class="{active:anno.selected}">
                        <div class="tabs">
                            <img src="../../assets/images/annotation/icon-text.png"
                                 class="text-label"
                                 :class="{active:!anno.selectedSection}"
                                 @click="anno.selectedSection = 0"
                            >
                            <img src="../../assets/images/annotation/icon-attach.png"
                                 class="attach-label"
                                 :class="{active:anno.selectedSection}"
                                 @click="anno.selectedSection = 1"
                            >
                        </div>
                        <div class="contents" v-show="anno.status === 'ready' && !anno.selectedSection">
                            <p>{{anno.desc}}</p>
                        </div>
                        <div class="contents" v-show="anno.status === 'edit' && !anno.selectedSection">
                            <textarea name="text" v-model="anno.desc" :placeholder="translate('ad')"></textarea>
                        </div>
                        <div class="contents" v-show="(anno.status === 'edit' && anno.selectedSection) || (anno.status === 'ready' && anno.attachment.length > 0 && anno.selectedSection)">
                            <!--<image-upload imageType="annotationAttachment" :imageStatus="anno.status" @imageUrl="setAttachment"></image-upload>-->
                            <image-upload
                                    ref="threeDAnnotationUpload"
                                    :multipleFile="false"
                                    :maxQuantity="1"
                                    :type="'image'"
                                    :uploadTo="'cloud'"
                                    :saveImageSrc="true"
                                    :imageStatus="anno.status"
                                    @fileStatusChange="setAttachment"
                            ></image-upload>
                        </div>
                        <div class="contents word-content" v-show="anno.status === 'ready' && anno.selectedSection && anno.attachment.length === 0">
                            <p v-lang.na></p>
                        </div>
                    </div>
                </div>
            </div>
            <!--<div class="hide-btn" @click="showToolList = !showToolList">-->
                <!--<img src="../../assets/images/annotation/icon-hide-list.png" alt="" :class="{hide:!showToolList}">-->
            <!--</div>-->
        </div>
        <div class="annotation"
             v-show="annotation.show && !showAnCanvas"
             :class="{active:annotation.showTools}"
             @mouseover="overShow"
             @mouseout="overHide"
             @click="show"
        >
            <img src="../../assets/images/icon-annotation.png">
            <div class="annotation-desc" v-show="annotation.showDesc" v-lang.sa></div>
            <div class="annotation-tools" v-show="annotation.showTools" @click.stop="">
                <div class="circle-div pointer"
                     v-for="size in sizeList"
                     :style="size.style"
                     :class="{active:size.selected}"
                     @click.stop="select(size.style,'size')"
                ></div>
                <div class="border"></div>
                <div class="color-div pointer"
                     v-for="color in colorList"
                     :style="{ backgroundColor: color.hex }"
                     :class="{active:color.selected}"
                     @click.stop="select(color.hex,'color')"
                ></div>
                <div class="border"></div>
                <div class="pointer img close" @click="closeAnnotation"></div>
                <div class="pointer img check" @click="saveAnnotation"></div>
            </div>
        </div>
    </div>
</template>

<script>
    import annotation from '../../mixins/threeD/annotation'
    import ImageUpload from '../imageUpload/threeDAnnotationUpload.vue'
    import imgPreview from './imgPreview.vue'

    export default {
        name: "two-d-anno",
        mixins:[annotation],
        components:{
            ImageUpload,
            imgPreview
        },
        data(){
            return{
                images:[],
                id:0,
                imageBoxLeft:0,
                selectedImgSrc:''
            }
        },
        created(){
            this.init()
        },
        mounted(){
            this.initCanvas('2d')
        },
        messages:{
            en:{
                fs:'FEEDBACK SYSTEM',
                r3:'Return to 2d',
                exit:'Exit',
                sending:'Sending',
                sSend:'Save and Send',
                edit:'Edit',
                sa:'Start annotation',
                na:'No attachment',
                ad:'annotation description',
                title:'title',
                p1:'Please save annotation first',
                p2:'Please fill annotation title and description',
                p3:'Update successful. Do you want to leave this page?',
                p4:'Please save all annotations',
                p5:'Please at least add one annotation',
                p6:'Are you sure to exit?'
            },
            zh:{
                fs:'标注系统',
                r3:'返回到3d',
                exit:'退出',
                sending:'发送中',
                sSend:'保存和发送',
                edit:'编辑',
                sa:'开始标注',
                na:'没有附件',
                ad:'标注描述',
                title:'标题',
                p1:'请先保存标注',
                p2:'请填写标注的标题和描述',
                p3:'上传成功，确定离开这个页面？',
                p4:'请保存所有的标注',
                p5:'请至少添加一个标注',
                p6:'确定离开这个页面？'
            }
        },
        methods:{
            async init(){
                this.id = this.$route.params.id;
                let result = await this.$store.dispatch('three/annotation/getAnnotationModelData',{id:this.id,type:0});
                this.images = result.data.model;
                this.images.forEach((img,index) => {
                    img.selected = index === 0;
                });
                this.loadImg(this.images[0])
            },
            loadImg(image){
                this.selectedImgSrc = image.high;
            },
            getRenderer:function () {
                return this.$refs.imgCanvas.getRenderer()
            },
            selectImage:function (img) {
                this.loadImg(img);
                this.images.forEach(image => {
                    image.selected = image === img
                })
            },
            moveImageBox:function (direction) {
                let imageBoxLength = - document.getElementById('imageBox').offsetWidth;
                let data = this.imageBoxLeft + direction * 1000;
                if(imageBoxLength <= data && data <= 0){
                    this.imageBoxLeft = data
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    .canvas-container{
        width: 100%;
        height: 100%;
        overflow: hidden;
        .canvas-wrapper{
            position: absolute;
            top:0;
            left:0;
            width: 100%;
            height: 100%;
            padding-top: 50px;
            padding-bottom: 170px;
            padding-left: 304px;
            .canvas-box{
                position: relative;
                width: 100%;
                height: 100%;
                .canvas{
                    display: block;
                    position: absolute;
                    top:0;
                    left:0;
                }
            }
        }
        .images{
            position: absolute;
            bottom:0;
            left:0;
            width: 100%;
            height: 170px;
            background: #2A2A36;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding:20px 25px 20px 329px;
            .images-box{
                width: 1000px;
                overflow: hidden;
                >div{
                    display: inline-flex;
                    .image{
                        width: 228px;
                        height: 128px;
                        background-size: cover;
                        background-position: center;
                        border-radius:4px;
                        margin-right: 22px;
                        display: inline-block;
                        &.active{
                            border: 2px solid #EA6264;
                        }
                    }
                }
            }
        }
        .menu-bar{
            z-index: 1;
            width: 100%;
            height: 50px;
            position: absolute;
            top:0;
            left:0;
            display: flex;
            justify-content: space-between;
            align-items: center;
            background: #2A2A36;
            .logo{
                display: flex;
                justify-content: flex-start;
                align-items: center;
                img{
                    margin-right: 28px;
                    margin-left: 30px;
                    height: 32px;
                }
            }
            .menu-title{
                font-size: 16px;
                color: #FFFFFF;
                width: 100%;
            }
            .btn{
                border-radius: 4px;
                height: 28px;
                padding:5px 10px;
                color:white;
                float:right;
            }
            .btn-exit{
                background: #838383;
            }
            .btn-save{
                background: #EA6264;
                margin: 0 14px;
            }
        }
        .annotation{
            position: absolute;
            width: 40px;
            height: 40px;
            top:78px;
            right:28px;
            background: #3E3E4D;
            display: flex;
            align-items: center;
            justify-content: center;
            border:4px solid #3E3E4D;
            border-radius: 2px;
            box-sizing: border-box;
            &.active{
                border: 4px solid #383838;
            }
            img{
                width: 16px;
                height: 16px;
                -webkit-user-select: none;
                -moz-user-select: none;
                user-select: none;
            }
            .annotation-desc{
                position: absolute;
                right:60px;
                height: 26px;
                background: rgba(9,9,12,0.80);
                border-radius: 2px;
                color:white;
                white-space: nowrap;
                font-size: 12px;
                line-height: 26px;
                padding:0 8px;
            }
            .annotation-tools{
                position: absolute;
                right:60px;
                height: 26px;
                background: #666674;
                border-radius: 2px;
                white-space: nowrap;
                padding:0 8px;
                display: flex;
                justify-content: center;
                align-items: center;
                .color-div{
                    width: 14px;
                    height: 14px;
                    margin:0 3px;
                    border-radius: 2px;
                    box-sizing: border-box;
                    &.active{
                        border: 1px solid #FFFFFF;
                    }
                }
                .circle-div{
                    border-radius: 100%;
                    background: #9B9B9B;
                    margin:0 3px;
                    &.active{
                        background: #FFFFFF;
                    }
                }
                .border{
                    height: 20px;
                    width: 1px;
                    margin:0 5px;
                    background: #59596A;
                }
                .img{
                    width: 10px;
                    height: 10px;
                    margin:0 3px;
                    background-size: cover;
                    background-position: center;
                }
                .close{
                    background-image: url("../../assets/images/annotation/icon-close.png");
                    &:hover{
                        background-image: url("../../assets/images/annotation/icon-close-active.png");
                    }
                }
                .check{
                    width: 12px;
                    background-image: url("../../assets/images/annotation/icon-check.png");
                    &:hover{
                        background-image: url("../../assets/images/annotation/icon-check-active.png");
                    }
                }
            }
        }
        .tool-list{
            position: absolute;
            top:0;
            left:0;
            width: 304px;
            height: 100%;
            transition: all ease .5s;
            padding-top: 86px;
            &.hide{
                transform:translateX(-304px);
            }
            .tool-tabs{
                display: flex;
                width: 100%;
                height: 36px;
                background: #3E3E4D;
                position: absolute;
                left:0;
                top:50px;
                ul li{
                    width: 36px;
                    height: 36px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    img{
                        width: 16px;
                        height: 16px;
                    }
                    &.active{
                        background: #666674;
                    }
                }
            }
            .annotation-list{
                width: 100%;
                height: 100%;
                overflow-x: hidden;
                background: #787884;
                .annotation-container{
                    color:white;
                    padding:7px 13px;
                    .annotation-title{
                        background: #31313D;
                        &.active{
                            background: #666674;
                        }
                        border-top-left-radius: 2px;
                        border-top-right-radius: 2px;
                        height: 28px;
                        width: 100%;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        padding:0 10px;
                        p{
                            font-size: 14px;
                            color: #FFFFFF;
                        }
                        input{
                            background: #52525F;
                            border: 1px solid #838398;
                            border-radius: 2px;
                            font-size: 14px;
                            color: #FFFFFF;
                            padding: 2px 5px;
                            overflow: hidden;
                        }
                        .btns{
                            display: flex;
                            align-items: center;
                            justify-content: flex-start;
                            img{
                                height: 10px;
                                margin-right: 10px;
                            }
                            span{
                                margin-right: 10px;
                            }
                            img:last-child{
                                margin-right: 0;
                            }
                        }
                    }
                    .annotation-content{
                        background: #40404E;
                        &.active{
                            background: #9B9BA8;
                        }
                        border-bottom-left-radius: 2px;
                        border-bottom-right-radius: 2px;
                        .tabs{
                            display: flex;
                            align-items: center;
                            justify-content: flex-start;
                            width: 100%;
                            height: 26px;
                            padding:0 10px;
                            img{
                                height: 14px;
                                margin-right: 10px;
                            }
                            .text-label.active{
                                content:url("../../assets/images/annotation/icon-text-active.png");
                            }
                            .attach-label.active{
                                content:url("../../assets/images/annotation/icon-attach-active.png");
                            }
                        }
                        .contents{
                            width: 100%;
                            padding:5px 10px;
                            textarea{
                                width: 100%;
                                height: 90px;
                                background: #52525F;
                                border: 1px solid #838398;
                                border-radius: 2px;
                                font-size: 14px;
                                color: #FFFFFF;
                                padding: 2px 5px;
                                resize: none;
                            }
                            p{
                                color: #FFFFFF;
                            }
                            &.word-content{
                                width: 100%;
                                height: 130px;
                                display: flex;
                                justify-content: center;
                                align-items: center;
                            }
                        }
                    }
                }
            }
            .hide-btn{
                width: 12px;
                height: 160px;
                position: absolute;
                left:304px;
                top:50%;
                transform:translateY(-80px);
                display: flex;
                justify-content: center;
                align-items: center;
                background: #787884;
                img{
                    height: 18px;
                    width: 7px;
                }
                .hide{
                    transform:rotate(180deg);
                }
            }
        }
        .return-3d{
            position: absolute;
            height: 40px;
            top: 78px;
            right: 28px;
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-align: center;
            -ms-flex-align: center;
            align-items: center;
            -webkit-box-pack: center;
            -ms-flex-pack: center;
            justify-content: center;
            border: 2px solid #ffffff;
            border-radius: 4px;
            color: white;
            padding: 10px;
            background-color: black;
        }
    }
</style>