function midPointBtw(p1, p2) {
    return {
        x: p1.x + (p2.x - p1.x) / 2,
        y: p1.y + (p2.y - p1.y) / 2
    };
}
class Annotation{
    constructor(image){
        this.status = 'edit'; // edit, ready
        this.selected = true;
        // this.isPending = true
        this.title = '';
        this.pid = '';
        this.image = image;
        this.attachment = '';
        this.desc = '';
        this.selectedSection = 0 //0:words 1:images
    }
}

export default {
    data(){
        return{
            hasAnnotation:true,
            annotation:{
                showDesc:false,
                showTools:false,
                down:false,
                show:true
            },
            AnCanvas:null,
            FaCanvas:null,
            showAnCanvas:false,
            points:[],
            colorList:[
                {
                    hex:'#D1CDCD',
                    selected:true
                },
                {
                    hex:'#D0021B',
                    selected:false
                },
                {
                    hex:'#0096FF',
                    selected:false
                },
                {
                    hex:' #7ED321',
                    selected:false
                },
                {
                    hex:'#F5A623',
                    selected:false
                },
                {
                    hex:'#000000',
                    selected:false
                },
            ],
            sizeList:[
                {
                    style:{
                        width: '6px',
                        height: '6px'
                    },
                    selected:true,
                    size:6
                },
                {
                    style:{
                        width: '10px',
                        height: '10px'
                    },
                    selected:false,
                    size:10
                },
                {
                    style:{
                        width: '14px',
                        height: '14px'
                    },
                    selected:false,
                    size:14
                },
            ],
            annotationList:[],
            sending:false,
            showToolList:true,
            box:null
        }
    },
    computed:{
        selectedSize:function () {
            return this.sizeList.find( (size) => {
                return size.selected
            })
        },
        selectedColor:function () {
            return this.colorList.find((color) => {
                return color.selected
            })
        },
        selectedAnnon:function () {
            return this.annotationList.find((annon) => {
                return annon.selected
            })
        }
    },
    methods:{
        select:function (style,type) {
            if(type === 'size'){
                this.sizeList.forEach(function (size) {
                    size.selected = size.style === style
                })
            }
            else{
                this.colorList.forEach(function (color) {
                    color.selected = color.hex === style
                })
            }
        },
        overShow:function () {
            if(!this.annotation.showTools){
                this.annotation.showDesc = true
            }
        },
        overHide:function () {
            this.annotation.showDesc = false
        },
        show:function () {
            if(this.annotation.showTools){
                return;
            }
            this.overHide();

            if(!this.box){
                let img = new Image();
                let _this = this;
                img.onload = () => {
                    _this.AnCanvas.drawImage(img,0,0)
                };
                img.src = this.getRenderer();
            }
            else{
                this.AnCanvas.drawImage(this.getRenderer(),0,0);
            }
            this.annotation.showTools = true
        },
        hide:function () {
            this.annotation.showTools = false;
            this.clearCanvas()
        },
        initCanvas:function (type) {
            let anCanvas = document.getElementById("AnCanvas");
            this.box = document.getElementById('canvas-box');
            if(type !== '2d'){
                anCanvas.width = window.innerWidth;
                anCanvas.height = window.innerHeight;
            }
            else{
                anCanvas.width = this.box.offsetWidth;
                anCanvas.height = this.box.offsetHeight;
            }
            this.AnCanvas = anCanvas.getContext("2d");

            let faCanvas = document.getElementById("FaCanvas");
            if(type !== '2d'){
                faCanvas.width = window.innerWidth;
                faCanvas.height = window.innerHeight;
            }
            else{
                faCanvas.width = this.box.offsetWidth;
                faCanvas.height = this.box.offsetHeight;
            }
            this.FaCanvas = faCanvas.getContext("2d");

            window.addEventListener('resize',() => {
                anCanvas.width = faCanvas.width = window.innerWidth;
                anCanvas.height = faCanvas.height = window.innerHeight
            },false)
        },
        clearCanvas:function(){
            this.AnCanvas.clearRect(0, 0, this.AnCanvas.canvas.width, this.AnCanvas.canvas.height);
            this.FaCanvas.clearRect(0, 0, this.FaCanvas.canvas.width, this.FaCanvas.canvas.height);
        },
        mouseDown:function (e) {
            this.annotation.down = true;
            if(this.box){
                this.points.push({x:e.clientX - this.box.offsetLeft,y:e.clientY - this.box.offsetTop})
            }
            else{
                this.points.push({x:e.clientX,y:e.clientY})
            }
        },
        mouseUp:function () {
            this.annotation.down = false;
            this.AnCanvas.drawImage(this.FaCanvas.canvas,0,0);
            this.points = []
        },
        mouseMove:function (e) {
            if(!this.annotation.down) return;

            this.FaCanvas.lineWidth = this.selectedSize.size;
            this.FaCanvas.lineJoin = this.FaCanvas.lineCap = 'round';
            if(this.box){
                this.points.push({x:e.clientX - this.box.offsetLeft,y:e.clientY - this.box.offsetTop})
            }
            else{
                this.points.push({ x: e.clientX, y: e.clientY });
            }

            this.FaCanvas.clearRect(0, 0, this.FaCanvas.canvas.width, this.FaCanvas.canvas.height);

            let p1 = this.points[0];
            let p2 = this.points[1];

            this.FaCanvas.beginPath();
            this.FaCanvas.moveTo(p1.x, p1.y);

            for (let i = 1; i < this.points.length; i++) {
                let midPoint = midPointBtw(p1, p2);
                this.FaCanvas.quadraticCurveTo(p1.x, p1.y, midPoint.x, midPoint.y);
                p1 = this.points[i];
                p2 = this.points[i+1];
            }
            this.FaCanvas.lineTo(p1.x, p1.y);
            this.FaCanvas.strokeStyle = this.selectedColor.hex;
            this.FaCanvas.stroke();
        },
        closeAnnotation:function () {
            this.hide()
        },
        saveAnnotation:function () {
            let data = document.getElementById("AnCanvas").toDataURL("image/png");
            this.hide();
            this.addAnnotation(data)
        },
        addAnnotation:function (data) {
            let an = new Annotation(data);
            this.annotationList.push(an);
            this.selectAnno(this.annotationList[this.annotationList.length-1])
        },
        selectAnno:function (anno) {
            this.showAnCanvas = true;
            let img = new Image();
            img.onload = () => {
                this.AnCanvas.drawImage(img,0,0)
            };
            img.src = anno.image;
            this.annotationList.forEach(function (an) {
                an.selected = false
            });
            anno.selected = true
        },
        returnToModel:function () {
            if(this.selectedAnnon.status === 'ready'){
                this.showAnCanvas = false;
                this.clearCanvas();
                this.annotationList.forEach(function (ann) {
                    ann.selected = false
                })
            }
            else{
                this.$alert({type:'alert',message:this.translate('p1')})
            }
        },
        annoReady:function (anno) {
            if(anno.title && anno.desc){
                anno.status = 'ready'
            }
            else{
                this.$alert({type:'alert',message:this.translate('p2')})
            }
        },
        annoDelete:function (index) {
            this.annotationList.splice(index,1);
            this.showAnCanvas = false;
            this.clearCanvas();
            this.annotationList.forEach(function (ann) {
                ann.selected = false
            })
        },
        setAttachment:function ({data}) {
            this.annotationList.forEach(function (anno) {
                if(anno.selected){
                    anno.attachment = data[0].getSrc
                }
            })
        },
        send:function () {
            if(this.annotationList.length){
                let result = true;
                this.annotationList.forEach(function (an) {
                    if(an.status === 'edit'){
                        result = false
                    }
                });
                if(result){
                    if(!this.sending){
                        this.sending = true;
                        this.$store.dispatch('three/annotation/uploadAnnotationList',{id:this.id,list:this.annotationList}).then((response) => {
                            this.sending = false;
                            this.$alert({type:'confirm',message:this.translate('p3')}).then((response) => {
                                if(response.data === 'confirm'){
                                    // this.$router.push({name:'partyAProposal',params:{id:this.id}})
                                    this.$router.go(-1)
                                }
                            })
                        })
                    }
                }
                else{
                    this.$alert({type:'alert',message:this.translate('p4')})
                }
            }
            else{
                this.$alert({type:'alert',message:this.translate('p5')})
            }
        },
        exit:function () {
            this.$alert({type:'confirm',message:this.translate('p6')}).then((response) => {
                if(response.data === 'confirm'){
                    this.$router.go(-1)
                }
            })
        }
    }
}