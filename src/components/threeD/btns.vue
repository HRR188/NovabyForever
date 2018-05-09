<template>
    <div class="three-d-asst" :style="{pointerEvents:showHelp?'all':'none'}" ref="asst" v-show="!hideBtns">
        <div class="btns">
            <div class="btn" v-show="showContact" @click="showContactClick" >
                <img src="../../assets/images/threeD/icon_feedback.png" alt="" style="height: 14px;">
            </div>
            <div class="btn" @click="showHelp = true">
                <img src="../../assets/images/threeD/icon_question_mark.png" alt="" style="height: 14px;">
            </div>
            <div class="btn" @click="toggleWireframe">Wireframe</div>
            <div class="btn" v-show="showFullScreenBtn" @click="fullScreen" >
                <img v-show="!isFullScreen" src="../../assets/images/icon_full_screen.png" alt="" style="height: 14px;">
                <img v-show="isFullScreen" src="../../assets/images/icon_exit_full_screen.png" alt="" style="height: 14px;">
            </div>
            <div class="btn-edit btn" v-show="showEditBtn" @click="goEdit">Edit</div>
            <div class="btn" v-show="showAnnoBtn" @click="goAnno">Annotation</div>
        </div>
        <div class="desc" v-show="showHelp">
            <img class="close pointer" src="../../assets/images/threeD/icon_close.png" alt="" @click="showHelp = false">
            <p class="title" :style="{fontSize:fontSize+12+'px'}">NAVIGATION BASICS</p>
            <div class="descs">
                <div class="item">
                    <img src="../../assets/images/threeD/icon_left.png" alt="">
                    <div>
                        <p class="title-s" :style="{fontSize:fontSize+6+'px'}">Rotate model</p>
                        <p class="content" :style="{fontSize:fontSize+'px'}">Left click + drag or
                            <br>
                            One finger drag (touch)</p>
                    </div>
                </div>
                <div class="item">
                    <img src="../../assets/images/threeD/icon_zoom.png" alt="">
                    <div>
                        <p class="title-s" :style="{fontSize:fontSize+6+'px'}">Zoom</p>
                        <p class="content" :style="{fontSize:fontSize+'px'}">Double click on modelor scroll
                            <br>
                            anywhere orPinch (touch)</p>
                    </div>
                </div>
                <div class="item">
                    <img src="../../assets/images/threeD/icon_right.png" alt="">
                    <div>
                        <p class="title-s" :style="{fontSize:fontSize+6+'px'}">Pan</p>
                        <p class="content" :style="{fontSize:fontSize+'px'}">Right click + drag or <br>
                            Two fingers drag (touch)</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'btns',
        data(){
            return{
                showHelp:false,
                showContact:true,
                fontSize:20,
                isFirstTime:false,
                isFullScreen:false,
                showWireframe:false
            }
        },
        props:{
            showEditBtn:{
                default:false,
                type:Boolean
            },
            showAnnoBtn:{
                default:false,
                type:Boolean
            },
            showContactBtn:{
                default:true,
                type:Boolean
            },
            showFullScreenBtn:{
                default:false,
                type:Boolean
            },
            id:{
                required:true
            },
            hideBtns:{
                default:false
            },
            loadComplete:{
                required:false
            }
        },
        mounted(){
            this.fontSize = this.$refs.asst.offsetWidth > 900 ? 20 : 12;
            this.isFirstTime = !(localStorage.getItem('isFirstTime') === '1');
            localStorage.setItem('isFirstTime','1');
            let _this = this;
            document.addEventListener("fullscreenchange", changed);
            document.addEventListener("webkitfullscreenchange", changed);
            document.addEventListener("mozfullscreenchange", changed);
            document.addEventListener("MSFullscreenChange", changed);
            function changed(){
                _this.isFullScreen = !_this.isFullScreen;
            }
        },
        watch:{
            loadComplete:function (val) {
                if(val){
                    if(this.isFirstTime){
                        this.showHelp = true
                    }
                }
            }
        },
        methods:{
            showContactClick:function () {
                let _this = this
                this.$contact('threeD',this.id).then(response => {
                    if(response){
                        _this.$alert({type:'alert',message:'Send feedback successful!'})
                    }
                    else{
//                        _this.$alert({type:'alert',message:'Send feedback fail!'})
                    }
                })
            },
            goEdit:function () {
                this.$emit('goEdit')
            },
            goAnno:function () {
                this.$emit('goAnno')
            },
            fullScreen:function () {
                this.$emit('fullScreen',this.isFullScreen)
            },
            toggleWireframe:function () {
                this.showWireframe = !this.showWireframe;
                this.$emit('toggleWireframe',this.showWireframe)
            }
        }
    }
</script>

<style scoped lang="scss">
    .three-d-asst{
        width: 100%;
        height: 100%;
        position: absolute;
        top:0;
        left:0;
        z-index: 10;
        .desc{
            width: 100%;
            height: 100%;
            background-color:rgba(0,0,0,.7);
            position: absolute;
            top:0;
            left:0;
            .close{
                position: absolute;
                margin:3%;
                top:0;
                right:0;
            }
            .title{
                font-size: 38.4px;
                color: #FFFFFF;
                margin-top: 11%;
                margin-left: 7%;
                position: absolute;
                top:0;
                left:0;
            }
            .title:after{
                content:"";
                width: 25%;
                height: 4px;
                position: absolute;
                left:0;
                bottom:-10px;
                background: #EA6264;
            }
            .descs{
                width: 100%;
                height: 100%;
                padding:0 7%;
                display: flex;
                align-items: center;
                .item{
                    width: 33.33%;
                    display: flex;
                    align-items: center;
                    img{
                        width: 16%;
                        margin-right: 7%;
                    }
                    .title-s{
                        font-size: 28.8px;
                        color: #FFFFFF;
                    }
                    .content{
                        font-size: 19.2px;
                        color: #FFFFFF;
                    }
                }
            }
        }
        .btns{
            position: absolute;
            bottom: 10px;
            right:0;
            left:0;
            width: 100%;
            height: 26px;
            display: flex;
            justify-content: flex-end;
            align-items: center;
            padding:0 10px;
            margin:0;
            .btn{
                padding:0 8px;
                margin-left: 10px;
                /*width: 100%;*/
                height: 26px;
                background: #40404E;
                border-radius: 4px;
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 14px;
                color: #FFFFFF;
                pointer-events: all;
            }
        }
    }
</style>