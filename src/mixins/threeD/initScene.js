/**
 * Created by harryliu on 26/7/17.
 */

import * as Three from '../../threeD/init'

export default {
    props:{
        modelFile:{
            required:true
        },
        id:{
            required:false
        },
        showEditBtn:{
            default:false
        },
        showAnnoBtn:{
            default:false
        },
        showFullScreenBtn:{
            default:false
        },
        hideBtns:{
            default:false
        },
        transparentBack:{
            default:false
        },
        refreshAfterLeave:{
            default:true
        },
        disableAnimate:{
            default:true
        }
    },
    data(){
        return{
            loadStatus:{
                loadCom:false,
                loadPercent:0
            },
            backImgList:[
                {
                    url:'https://static-us.novaby.com/dev/background/IMAGE1.png',
                    active:true
                },
                {
                    url:'https://static-us.novaby.com/dev/background/IMAGE2.png',
                    active:false
                },
                {
                    url:'https://static-us.novaby.com/dev/background/IMAGE3.png',
                    active:false
                }
            ],
            environmentList:[
                {
                    url:'https://model-static.oss-cn-shanghai.aliyuncs.com/dev/skybox/',
                    active:true
                },
                // {
                //     url:'https://model-static.oss-cn-shanghai.aliyuncs.com/dev/skybox2/',
                //     active:false
                // },
                // {
                //     url:'https://model-static.oss-cn-shanghai.aliyuncs.com/dev/background/IMAGE3.png',
                //     active:false
                // }
            ],
            rotatePosition:{
                x:0,
                y:0,
                z:0
            },
            selectBackValue:''
        }
    },
    watch:{
        modelFile:function () {
            this.destroyAll();
            this.init()
        }
    },
    beforeDestroy(){
        this.destroyAll()
    },
    methods:{
        init:function () {
            Three.start(this.modelFile,this.loadStatus,this.transparentBack,this.disableAnimate);
        },
        getRenderer:function () {
            return Three.getCanvasImage()
        },
        goEdit:function () {
            this.$router.push({name:'editModel',params:{id:this.id}})
        },
        goAnno:function () {
            this.$router.push({name:'setAnnotation',params:{id:this.id}})
        },
        fullScreen:function (value) {
            let canvas = document.getElementById("container");
            if(!value){
                if(canvas.requestFullscreen){
                    canvas.requestFullscreen();
                }
                else if(canvas.webkitRequestFullScreen){
                    canvas.webkitRequestFullScreen();
                }
                else if(canvas.mozRequestFullScreen){
                    canvas.mozRequestFullScreen();
                }
                else if (canvas.msRequestFullscreen){
                    canvas.msRequestFullscreen()
                }
                else{
                    this.$alert({type:'alert',message:'Your browser doesn\'t support fullscreen'})
                }
            }
            else{
                if(document.exitFullscreen){
                    document.exitFullscreen();
                }
                else if(document.webkitExitFullscreen){
                    document.webkitExitFullscreen();
                }
                else if(document.mozCancelFullScreen){
                    document.mozCancelFullScreen();
                }
                else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                }
            }
        },
        changeLight:function (value) {
            Three.changeLight(value)
        },
        destroyAll:function () {
            Three.stop()
        },
        rotateModel:function (direction,value) {
            switch(direction){
                case 'x':
                    this.rotatePosition.x = this.rotatePosition.x + value;
                    break;
                case 'y':
                    this.rotatePosition.y = this.rotatePosition.y + value;
                    break;
                case 'z':
                    this.rotatePosition.z = this.rotatePosition.z +  value;
                    break;
                default:
                    break;
            }
            Three.rotateModel(direction,value)
        },
        setBackImage:function (url) {
            this.backStyle = 'image';
            if(url.length){
                Three.changeBackground({type:'image',value:url});
                this.selectBackValue = url
            }
            else{
                this.backImgList.forEach(img => {
                    if(img.active){
                        Three.changeBackground({type:'image',value:img.url});
                        this.selectBackValue = img.url
                    }
                });
            }
        },
        setBackColor:function (hex) {
            this.backStyle = 'color';
            Three.changeBackground({type:'color',value:hex});
            this.selectBackValue = hex
        },
        setBackEnvironment:function (url) {
            this.backStyle = 'environment';
            if(url.length){
                Three.changeBackground({type:'environment',value:url});
                this.selectBackValue = url
            }
            else{
                this.environmentList.forEach(img => {
                    if(img.active){
                        Three.changeBackground({type:'environment',value:img.url});
                        this.selectBackValue = img.url
                    }
                });
            }
        },
        showWireframe:function (value) {
            Three.showWireframe(value)
        }
    }
}