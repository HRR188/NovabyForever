<template>
    <div class="canvas-container" ref="container">
        <div class="menu-bar">
            <div class="logo">
                <img src="../../assets/images/logo.png" alt="">
            </div>
            <div>
                <div class="btn btn-save pointer" @click="save">{{saving?'Saving':'Save'}}</div>
                <div class="btn btn-exit pointer" @click="exit">Exit</div>
            </div>
        </div>
        <div class="tool-list pointer">
            <div class="tool-tabs">
                <div class="has-hint aligned" data-hint="scene" @click="showTab = 'scene'" :class="{active:showTab === 'scene'}"><img src="../../assets/images/threeD/edit/ic_settings.png" alt=""></div>
                <div class="has-hint" data-hint="light" @click="showTab = 'light'" :class="{active:showTab === 'light'}"><img src="../../assets/images/threeD/edit/ic_light.png" alt=""></div>
            </div>
            <div class="tools">
                <div class="tool" v-show="showTab === 'scene'" key="scene">
                    <edit-toggle title="GENERAL" hint="test hint" :showToggle="true">
                        <div class="tool-container">
                            <p class="tag">Straighten model</p>
                            <div class="rotation-container">
                                <div class="rotation">
                                    <div class="left"  @click="rotateModel('x',-1)">
                                        <div></div>
                                    </div>
                                    <div class="middle">X</div>
                                    <div class="right" @click="rotateModel('x',1)">
                                        <div></div>
                                    </div>
                                </div>
                                <div class="rotation">
                                    <div class="left" @click="rotateModel('y',1)">
                                        <div></div>
                                    </div>
                                    <div class="middle">Y</div>
                                    <div class="right" @click="rotateModel('y',-1)">
                                        <div></div>
                                    </div>
                                </div>
                                <div class="rotation">
                                    <div class="left" @click="rotateModel('z',1)">
                                        <div></div>
                                    </div>
                                    <div class="middle">Z</div>
                                    <div class="right" @click="rotateModel('z',-1)">
                                        <div></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </edit-toggle>
                    <edit-toggle title="BACKGROUND" hint="test hint" :showToggle="true">
                        <div class="tool-container">
                            <p class="tag">Background type</p>
                            <div class="back-pick-container">
                                <div class="back-pick-tab">
                                    <div :class="{active:backStyle === 'image'}" @click="setBackImage">IMAGE</div>
                                    <div :class="{active:backStyle === 'color'}" @click="setBackColor(backColorHex)">COLOR</div>
                                    <div :class="{active:backStyle === 'environment'}" @click="setBackEnvironment" style="flex:1">ENVIRONMENT</div>
                                </div>
                                <div class="back-pick-contain">
                                    <div v-show="backStyle === 'color'" class="color">
                                        <div class="box">
                                            <div class="picker-wrapper" id="picker" @mousedown.left="clickPicker">
                                                <div class="cursor" :style="{left:pickerCursor.left+'px',top:pickerCursor.top+'px'}"></div>
                                                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="100%" height="100%" :style="{backgroundColor: '#'+sliderColor}">
                                                    <defs>
                                                        <linearGradient id="svgcolorpicker-gradient-black-1" x1="0%" y1="100%" x2="0%" y2="0%">
                                                            <stop offset="0%" stop-color="#000000" stop-opacity="1"></stop>
                                                            <stop offset="100%" stop-color="#000000" stop-opacity="0"></stop>
                                                        </linearGradient>
                                                        <linearGradient id="svgcolorpicker-gradient-white-1" x1="0%" y1="100%" x2="100%" y2="100%">
                                                            <stop offset="0%" stop-color="#FFFFFF" stop-opacity="1"></stop>
                                                            <stop offset="100%" stop-color="#FFFFFF" stop-opacity="0"></stop>
                                                        </linearGradient>
                                                    </defs>
                                                    <rect x="0" y="0" width="100%" height="100%" fill="url(#svgcolorpicker-gradient-white-1)">
                                                    </rect>
                                                    <rect x="0" y="0" width="100%" height="100%" fill="url(#svgcolorpicker-gradient-black-1)">
                                                    </rect>
                                                </svg>
                                            </div>
                                            <div class="slider-wrapper" id="slider" @mousedown.left="clickSlider">
                                                <div class="cursor" :style="{left:sliderCursor.left+'px',top:sliderCursor.top+'px'}"></div>
                                                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="100%" height="100%">
                                                    <defs>
                                                        <linearGradient id="svgcolorpicker-gradient-hue-1" x1="0%" y1="100%" x2="0%" y2="0%">
                                                            <stop offset="0%" stop-color="#FF0000" stop-opacity="1"></stop>
                                                            <stop offset="17%" stop-color="#FFFF00" stop-opacity="1"></stop>
                                                            <stop offset="33%" stop-color="#00FF00" stop-opacity="1"></stop>
                                                            <stop offset="50%" stop-color="#00FFFF" stop-opacity="1"></stop>
                                                            <stop offset="67%" stop-color="#0000FF" stop-opacity="1"></stop>
                                                            <stop offset="83%" stop-color="#FF00FF" stop-opacity="1"></stop>
                                                            <stop offset="100%" stop-color="#FF0000" stop-opacity="1"></stop>
                                                        </linearGradient>
                                                    </defs>
                                                    <rect x="0" y="0" width="100%" height="100%" fill="url(#svgcolorpicker-gradient-hue-1)"></rect>
                                                </svg>
                                            </div>
                                        </div>
                                        <input type="text" v-model="backColorHex" @keyup.enter="updateColor()">
                                        <span>#</span>
                                    </div>
                                    <div v-show="backStyle === 'image'" class="image">
                                        <div class="back-img" v-for="img in backImgList" @click="selectImgBack(img.url)" :class="{active:img.active}">
                                            <img :src="img.url" alt="">
                                        </div>
                                    </div>
                                    <div v-show="backStyle === 'environment'" class="image">
                                        <div class="back-img" v-for="img in environmentList" @click="selectEnvironment(img.url)" :class="{active:img.active}">
                                            <img :src="img.url+'px.jpg'" alt="">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </edit-toggle>
                </div>
                <div class="tool" v-show="showTab === 'light'" key="light">
                    <edit-toggle title="LIGHTS" hint="Light" :showToggle="true">
                        <div class="tool-container">
                            <!--<div class="light-pick-container">-->
                                <!--<div class="light-pick-contain">-->
                                    <!--LOAD LIGHTING PRESET-->
                                    <!--<div class="lights">-->
                                        <!--<div>-->

                                        <!--</div>-->
                                        <!--<div>-->
                                            <!--<div class="light">-->

                                            <!--</div>-->
                                        <!--</div>-->
                                    <!--</div>-->
                                <!--</div>-->
                            <!--</div>-->
                            <div class="drag-bar-container">
                                <p class="drag-bar-p">Brightness</p>
                                <div class="drag-bar">
                                    <div class="bar" id="light">
                                        <div class="red-bar" :style="{width:lightCursor.left+9+'px'}"></div>
                                        <div class="drag" @mousedown.left="clickLight" :style="{left:lightCursor.left+'px'}"></div>
                                    </div>
                                    <div class="drag-value">
                                        {{lightValue}}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </edit-toggle>
                </div>
            </div>
        </div>
        <div class="canvas-wrapper" >
            <div class="canvas" id="container">
                <div ref="canvas" id="canvas" class="canvas"></div>
            </div>
            <loading v-if="!loadStatus.loadCom" :percent="loadStatus.loadPercent"></loading>
            <btns :id="id" :showEditBtn="showEditBtn" :showAnnoBtn="showAnnoBtn" @goEdit="goEdit" @goAnno="goAnno" @toggleWireframe="showWireframe"></btns>
        </div>
    </div>
</template>

<script>
    import Loading from './loading.vue'
    import btns from './btns.vue'
    import editToggle from './editToggle.vue'
    import initScene from '../../mixins/threeD/initScene'
    import * as Color from '../../threeD/color'

    const DefaultWidthAndHeight = 230;
    const DefaultDragR = 9;

    export default {
        name: 'three-d-edit',
        mixins:[initScene],
        components:{
            Loading,
            btns,
            editToggle
        },
        props:{
            isBuilding:{  // 区分是否在甲乙building流程中 如果是的话不需要跳转页面
                defalut:false
            },
            target:{
                default:false  //如果需要在submit之后跳转页面， 需要传递不同情况
            }
        },
        mounted(){
            this.init();
            window.addEventListener('mousemove',this.mouseMove,false);
            window.addEventListener('mouseup',this.mouseUp,false);
            let setting = this.modelFile.edit;
            this.rotatePosition.x = setting.scene.straighten.x;
            this.rotatePosition.y = setting.scene.straighten.y;
            this.rotatePosition.z = setting.scene.straighten.z;
            this.lightValue = setting.light.brightness;
            this.backStyle = setting.scene.background.style;
            this.selectBackValue = setting.scene.background.value
        },
        beforeDestroy(){
            window.removeEventListener('mousemove',this.mouseMove,false);
            window.removeEventListener('mouseup',this.mouseUp,false);
        },
        data(){
            return{
                saving:false,
                showTab:'scene',
                backStyle:'color',
                backColorHex:'FF0000',
                clickedPicker:false,
                clickedSlider:false,
                pickerCursor:{
                    left:0,
                    top:0
                },
                sliderCursor:{
                    left:0,
                    top:0
                },
                lightCursor:{
                    left:0,
                    top:0
                },
                sliderColor:'ff0000',
                clickedLight:false,
                lightValue:1,
            }
        },
        watch:{
            backColorHex:function (val) {
                this.setBackColor(val)
            },
            lightValue:function (val) {
                if(!this.clickedLight){
                    this.lightCursor.left = val * 20 - DefaultDragR
                }
                this.changeLight(val)
            }
        },
        methods:{
            mouseMove(e){
                e.preventDefault();
                if(this.clickedPicker){
                    this.setPickerPosition(e);
                }
                else if(this.clickedSlider){
                    this.setSliderPosition(e);
                }
                else if(this.clickedLight){
                    this.setLightPosition(e);
                }
            },
            mouseUp(e){
                e.preventDefault();
                this.clickedSlider = false;
                this.clickedPicker = false;
                this.clickedLight = false;
            },
            setLightPosition:function (e) {
                let element = document.getElementById('light').getBoundingClientRect();
                let x = e.pageX - element.left;
                if(x < -8){
                    x = - DefaultDragR
                }
                if(x > 200-8){
                    x = 200 - DefaultDragR
                }
                this.lightCursor.left = x;
                this.lightValue = ((x + DefaultDragR) / 20).toFixed(2)
            },
            clickLight:function (e) {
                e.preventDefault();
                this.clickedLight = true;
                this.setLightPosition(e);
            },
            setPickerPosition:function (e) {
                let element = document.getElementById('picker').getBoundingClientRect();
                let x = e.pageX - element.left;
                if(x < 0){
                    x = 0
                }
                if(x > DefaultWidthAndHeight){
                    x = DefaultWidthAndHeight
                }
                let y = e.pageY - element.top;
                if(y < 0){
                    y = 0
                }
                if(y > DefaultWidthAndHeight){
                    y = DefaultWidthAndHeight
                }
                this.pickerCursor.left = x;
                this.pickerCursor.top = y;
                this.backColorHex = Color.changeSV(x,y,DefaultWidthAndHeight)
            },
            clickPicker:function (e) {
                e.preventDefault();
                this.clickedPicker = true;
                this.setPickerPosition(e);
            },
            setSliderPosition:function (e) {
                let element = document.getElementById('slider').getBoundingClientRect();
                let y = e.pageY - element.top;
                if(y < 0){
                    y = 0
                }
                if(y > DefaultWidthAndHeight){
                    y = DefaultWidthAndHeight
                }
                this.sliderCursor.top = y;
                this.sliderColor = Color.changeH(y,DefaultWidthAndHeight);
                this.backColorHex = Color.getHex();
            },
            clickSlider:function (e) {
                e.preventDefault();
                this.clickedSlider = true;
                this.setSliderPosition(e);
            },
            selectImgBack:function (url) {
                this.backImgList.forEach(img => {
                    if(img.url === url){
                        img.active = true;
                        this.setBackImage(url)
                    }
                    else{
                        img.active = false
                    }
                });
            },
            selectEnvironment:function (url) {
                this.environmentList.forEach(img => {
                    if(img.url === url){
                        img.active = true;
                        this.setBackEnvironment(url)
                    }
                    else{
                        img.active = false
                    }
                });
            },
            save:function () {
                this.$store.dispatch('three/edit/saveEdit',{
                    data:{
                        scene:{
                            straighten:{
                                x:this.rotatePosition.x,
                                y:this.rotatePosition.y,
                                z:this.rotatePosition.z
                            },
                            background:{
                                "style":this.backStyle, //image, color, environment, none
                                "value":this.selectBackValue
                            }
                        },
                        light:{
                            "brightness":this.lightValue
                        }
                    },
                    id:this.modelFile.id,
                }).then((response) => {
                    if(response){
                        this.$router.go(-1)
                    }
                })
            },
            exit:function () {
                this.$alert({type:'confirm',message:'Are you sure to exit?'}).then((response) => {
                    if(response.data === 'confirm'){
                        this.$router.go(-1)
                    }
                })
            }
        }
    }
</script>

<style scoped lang="scss">
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s
    }
    .fade-enter, .fade-leave-to {
        opacity: 0
    }
    .has-hint{
        position: relative;
        &:before{
            position: absolute;
            top: 100%;
            left: 50%;
            z-index: 4;
            display: block;
            margin-left: -5px;
            pointer-events: none;
            content: " ";
            border: 5px solid transparent;
            border-top: 0;
            border-bottom: 5px solid rgba(0, 0, 0, 0.8);
            opacity: 0;
            transition: opacity 0.2s;
        }
        &:after{
            position: absolute;
            top: 100%;
            left: 50%;
            z-index: 4;
            width: 94px;
            padding: 6px;
            margin-top: 5px;
            margin-left: -47px;
            font-size: 12px;
            line-height: 17px;
            color: #ffffff;
            text-align: center;
            text-transform: uppercase;
            pointer-events: none;
            content: attr(data-hint);
            background: rgba(0, 0, 0, 0.8);
            border-radius: 6px;
            opacity: 0;
            transition: opacity 0.2s;
        }
        &.aligned:after{
            left:0;
            margin-left: 0;
        }
        &:hover:before,
        &:hover:after{
            opacity: 1;
        }
    }
    .canvas-container{
        width: 100%;
        height: 100%;
        .menu-bar{
            z-index: 3;
            width: 100%;
            height: 50px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            background: #2A2A36;
            position: absolute;
            top:0;
            left:0;
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
        .canvas-wrapper{
            width: 100%;
            height: 100%;
            position: absolute;
            top:0;
            left:0;
            padding-left: 320px;
            padding-top: 50px;
            .canvas{
                width: 100%;
                height: 100%;
            }
        }
        .tool-list{
            width: 320px;
            display: flex;
            flex-flow: column;
            background-color: #4F4F4F;
            position: absolute;
            top:0;
            left:0;
            height: 100%;
            padding-top: 50px;
            z-index: 2;
            border-right: 1px solid #1E1E29;
            .tool-tabs{
                display: flex;
                height: 36px;
                background: #3E3E4D;
                div{
                    width: 36px;
                    height: 36px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    border-right:black solid 1px;
                    img{
                        width: 16px;
                        height: 16px;
                    }
                    &.active{
                        background: #666674;
                    }
                }
            }
            .tools{
                flex:1;
                overflow: auto;
                background-color: #565664;
                .tool{
                    .tool-container{
                        padding:15px 23px;
                        color:white;
                        .tag{
                            margin-bottom: 12px;
                            font-size: 12px;
                            color: #FFFFFF;
                        }
                        .rotation-container{
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            width: 100%;
                            height: 32px;
                            .rotation{
                                display: flex;
                                border-radius: 4px;
                                overflow: hidden;
                                height: 32px;
                                background-color: #3E3E4D;
                                >div{
                                    display: flex;
                                    justify-content: center;
                                    align-items: center;
                                    height: 32px;
                                }
                                .left{
                                    width: 26px;
                                    >div{
                                        border:5px solid transparent;
                                        border-left: 0;
                                        border-right: 5px solid white;
                                    }
                                    &:hover{
                                        background-color: #444444;
                                    }
                                }
                                .middle{
                                    width: 30px;
                                    font-size: 12px;
                                }
                                .right{
                                    width: 26px;
                                    >div{
                                        border:5px solid transparent;
                                        border-right: 0;
                                        border-left: 5px solid white;
                                    }
                                    &:hover{
                                        background-color: #444444;
                                    }
                                }
                            }
                        }
                        .back-pick-container{
                            display: flex;
                            flex-flow: column;
                            border-radius: 4px;
                            overflow: hidden;
                            .back-pick-tab{
                                display: flex;
                                >div{
                                    /*width: 33.33%;*/
                                    padding: 0 18px;
                                    background-color: #3E3E4D;
                                    height: 40px;
                                    line-height: 40px;
                                    text-align: center;
                                    font-size: 12px;
                                }
                                .active{
                                    background-color: #7D7D8A;
                                }
                            }
                            .back-pick-contain{
                                background-color: #7D7D8A;
                                position: relative;
                                .color{
                                    padding:6px;
                                    position: relative;
                                    .box{
                                        width: 100%;
                                        height: 242px;
                                        display: flex;
                                        justify-content: space-between;
                                        .cursor{
                                            position: absolute;
                                        }
                                        .picker-wrapper{
                                            width: 230px;
                                            height: 230px;
                                            position: relative;
                                            overflow: hidden;
                                            .cursor{
                                                width: 10px;
                                                height: 10px;
                                                box-sizing: border-box;
                                                margin-top: -5px;
                                                margin-left: -5px;
                                                background: rgba(255, 255, 255, 0.3);
                                                border: 1px solid #000000;
                                                border-radius: 100%;
                                            }
                                        }
                                        .slider-wrapper{
                                            width: 20px;
                                            height: 230px;
                                            position: relative;
                                            .cursor{
                                                left: 0 !important;
                                                z-index: 1;
                                                width: 100%;
                                                height: 2px;
                                                margin-top: -2px;
                                                background: #ffffff;
                                                border-top: 1px solid #000000;
                                                border-bottom: 1px solid #000000;
                                            }
                                        }
                                    }
                                    input{
                                        width: 100%;
                                        padding: 4px 4px 4px 15px;
                                        color: white;
                                        text-transform: uppercase;
                                        background: #1a1a1a;
                                        border: 0;
                                        border-radius: 4px;
                                    }
                                    span{
                                        position: absolute;
                                        bottom: 7px;
                                        left: 10px;
                                    }
                                }
                                .image{
                                    >div{
                                        width: 100%;
                                        display: flex;
                                        align-items: center;
                                        justify-content: center;
                                        background-color: #676771;
                                        padding:6px;
                                        &.active{
                                            background-color: #7D7D8A;
                                        }
                                        img{
                                            width: 100%;
                                        }
                                    }
                                }
                            }
                        }
                        .light-pick-container{
                            border-radius: 4px;
                            height: 32px;
                            line-height: 32px;
                            text-align: center;
                            background-color: #777777;
                            font-size: 12px;
                        }
                        .drag-bar-container{
                            .drag-bar-p{
                                font-size: 12px;
                                margin-bottom: 15px;
                            }
                            .drag-bar{
                                height: 20px;
                                display: flex;
                                align-items: center;
                                justify-content: space-between;
                                .bar{
                                    width: 200px;
                                    height: 10px;
                                    background-color: #3E3E4D;
                                    position: relative;
                                    border-radius: 100px;
                                    .red-bar{
                                        position: absolute;
                                        left:0;
                                        top:0;
                                        height: 100%;
                                        background-color: #EA6264;
                                        border-radius: 100px;
                                    }
                                    .drag{
                                        width: 18px;
                                        height: 18px;
                                        background-color: #dddddd;
                                        border-radius: 100%;
                                        position: absolute;
                                        top:-5px;
                                    }
                                }
                                .drag-value{
                                    background-color: #383838;
                                    text-align: center;
                                    border-radius: 4px;
                                    padding: 6px 8px;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
</style>