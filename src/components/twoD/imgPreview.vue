<template>
    <div class="preview-container">
        <canvas class="canvas image-canvas" id="canvas"></canvas>
        <loading v-if="!loadStatus.loadCom" :percent="loadStatus.loadPercent"></loading>
    </div>
</template>

<script>
    import Loading from '../threeD/loading.vue'

    export default {
        name: "img-preview",
        props:{
            imgSrc:{
                required:true,
                type:String
            }
        },
        components:{
            Loading
        },
        data(){
            return{
                loadStatus:{
                    loadCom:false,
                    loadPercent:0
                },
                interval:null,
                canvas:null,
            }
        },
        watch:{
            imgSrc:function (val) {
                this.loadImg(val)
            }
        },
        mounted(){
            this.initImgCanvas()
        },
        methods:{
            loadImg(image){
                let _this = this;
                this.startLoad();
                let img = new Image();
                img.crossOrigin = "Anonymous";
                img.src = image;
                img.onload = function () {
                    _this.endLoad();
                    _this.appendImgToCanvas(img)
                }
            },
            startLoad(){
                this.loadStatus.loadCom = false;
                this.interval = setInterval(() => {
                    if(this.loadStatus.loadPercent < 99){
                        this.loadStatus.loadPercent++
                    }
                },100)
            },
            endLoad(){
                this.loadStatus.loadPercent = 100;
                this.loadStatus.loadCom = true;
                clearInterval(this.interval)
            },
            initImgCanvas:function () {
                let box = document.getElementById('canvas-box');
                let canvas = document.getElementById('canvas');
                canvas.width = box.offsetWidth;
                canvas.height = box.offsetHeight;
                this.canvas = canvas.getContext('2d');
            },
            appendImgToCanvas:function (img) {
                let canvas = document.getElementById('canvas');
                this.canvas.clearRect(0, 0, canvas.width, canvas.height);

                this.canvas.setTransform(1,0,0,1,0,0);
                this.canvas.clearRect(0,0,canvas.width,canvas.height);
                this.canvas.drawImage(img,0,0);

                let lastX = canvas.width/2, lastY = canvas.height/2;
                let dragStart,dragged;
                let scaleFactor = 1.1;
                let zoom = function(clicks){
                    let pt = ctx.transformedPoint(lastX,lastY);
                    ctx.translate(pt.x,pt.y);
                    let factor = Math.pow(scaleFactor,clicks);
                    ctx.scale(factor,factor);
                    ctx.translate(-pt.x,-pt.y);
                    redraw();
                };
                let handleScroll = function(evt){
                    evt.preventDefault();
                    let delta = evt.wheelDelta ? evt.wheelDelta/40 : evt.detail ? -evt.detail : 0;
                    if (delta) zoom(delta);
                    return false;
                };
                let ctx = canvas.getContext('2d');
                function trackTransforms(ctx){
                    let svg = document.createElementNS("http://www.w3.org/2000/svg",'svg');
                    let xform = svg.createSVGMatrix();
                    ctx.getTransform = function(){ return xform; };

                    let savedTransforms = [];
                    let save = ctx.save;
                    ctx.save = function(){
                        savedTransforms.push(xform.translate(0,0));
                        return save.call(ctx);
                    };

                    let restore = ctx.restore;
                    ctx.restore = function(){
                        xform = savedTransforms.pop();
                        return restore.call(ctx);
                    };

                    let scale = ctx.scale;
                    ctx.scale = function(sx,sy){
                        xform = xform.scaleNonUniform(sx,sy);
                        return scale.call(ctx,sx,sy);
                    };

                    let rotate = ctx.rotate;
                    ctx.rotate = function(radians){
                        xform = xform.rotate(radians*180/Math.PI);
                        return rotate.call(ctx,radians);
                    };

                    let translate = ctx.translate;
                    ctx.translate = function(dx,dy){
                        xform = xform.translate(dx,dy);
                        return translate.call(ctx,dx,dy);
                    };

                    let transform = ctx.transform;
                    ctx.transform = function(a,b,c,d,e,f){
                        let m2 = svg.createSVGMatrix();
                        m2.a=a; m2.b=b; m2.c=c; m2.d=d; m2.e=e; m2.f=f;
                        xform = xform.multiply(m2);
                        return transform.call(ctx,a,b,c,d,e,f);
                    };

                    let setTransform = ctx.setTransform;
                    ctx.setTransform = function(a,b,c,d,e,f){
                        xform.a = a;
                        xform.b = b;
                        xform.c = c;
                        xform.d = d;
                        xform.e = e;
                        xform.f = f;
                        return setTransform.call(ctx,a,b,c,d,e,f);
                    };

                    let pt  = svg.createSVGPoint();
                    ctx.transformedPoint = function(x,y){
                        pt.x=x; pt.y=y;
                        return pt.matrixTransform(xform.inverse());
                    }
                }
                function redraw(){
                    ctx.save();
                    ctx.setTransform(1,0,0,1,0,0);
                    ctx.clearRect(0,0,canvas.width,canvas.height);
                    ctx.restore();

                    ctx.drawImage(img,0,0);
                }
                trackTransforms(ctx);
                canvas.addEventListener('mousedown',function(evt){
                    lastX = evt.offsetX || (evt.pageX - canvas.offsetLeft);
                    lastY = evt.offsetY || (evt.pageY - canvas.offsetTop);
                    dragStart = ctx.transformedPoint(lastX,lastY);
                    dragged = false;
                },false);
                canvas.addEventListener('mousemove',function(evt){
                    lastX = evt.offsetX || (evt.pageX - canvas.offsetLeft);
                    lastY = evt.offsetY || (evt.pageY - canvas.offsetTop);
                    dragged = true;
                    if (dragStart){
                        let pt = ctx.transformedPoint(lastX,lastY);
                        ctx.translate(pt.x-dragStart.x,pt.y-dragStart.y);
                        redraw();
                    }
                },false);
                canvas.addEventListener('mouseup',function(evt){
                    dragStart = null;
                    if (!dragged) zoom(evt.shiftKey ? -1 : 1 );
                },false);
                canvas.addEventListener('mousewheel',handleScroll,false);
            },
            getRenderer:function () {
                return this.canvas.canvas
            },
        }
    }
</script>

<style scoped lang="scss">
    .preview-container{
        width: 100%;
        height: 100%;
        position: absolute;
        top:0;
        left:0;
        canvas{
            display: block;
            position: absolute;
            top:0;
            left:0;
        }
        .loading-container{
            position: absolute;
            top:0;
            left:0;
        }
    }
</style>