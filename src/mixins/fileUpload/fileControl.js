import randomString from '../functions/randomString'
import File from './file'
import Upload from '../upload/upload'
import checkFilesInZip from './checkFilesInZip'
import store from '../../store/store'

export default {
    data(){
        return {
            fileList:[], //文件队列有包含文件名和文件大小
            dropStatus:false, //拖拽状态
            quantityIsWrong:false, //上传数量出错状态
            typeIsWrong:false, //上传文件类型出错状态
            errorNote:'',   //错误提示信息
            // tokens:[],  //用来中断请求
            modelFormats:[],
            modelTypeIsWrong:false,
            filesInZip:[],
            dir:'',
            typeList:[]
        }
    },
    computed:{
        acceptTypeList:function () {
            return '.'+this.typeList.join(', .')
        }
    },
    props:{
        maxQuantity:{  // 最大上传数量
            required:true,
            type:Number
        },
        type:{   //所支持的上传文件类型 image model file
            required:true,
            type:String
        },
        autoUpload:{  //是否开启自动上传
            required:false,
            type:Boolean,
            default:true
        },
        defaultFileList:{  //二次渲染使用的模型名称数组，没有传[]
            require:false,
            type:Array,
            default:() => []
        },
        checkFilesInZip:{
            require:false,
            type:Boolean,
            default:false
        },
        saveImageSrc:{
            require:false,
            type:Boolean,
            default:false
        },
        atLeastOneFile:{
            require:false,
            type:Boolean,
            default:true
        },
        uploadTo:{ //cloud backend
            require:false,
            type:String,
            default:'cloud'
        },
        multipleFile:{
            require:false,
            type:Boolean,
            default:true
        },
        compressionImage:{
            require:false,
            type:Boolean,
            default:true
        }
    },
    created(){
        this.createDir();
        this.getFileTypeList();
        if(this.defaultFileList.length){
            this.defaultFileList.forEach(file => {
                let _file = new File({id:randomString(),dir:file.dir,name:file.name,size:file.size,isCorrectFile:true,status:'success',progress:100});
                this.fileList.push(_file);
            });
            this.fileChanged()
        }
    },
    methods:{
        createDir(){
            this.dir = Math.floor((new Date()).getTime() / 1000) + randomString()
        },
        clickInput(){
            this.$refs.input.click()
        },
        inputChange(event){
            event.preventDefault();
            this.validateFile(event.target.files);
        },
        validateFile(files){
            this.clearAllErrorStatus();
            if(!this.checkFileQuantity(files.length) && !this.checkFileType(files)){
                for(let i = 0;i < files.length;i++){
                    this.initFile(files[i])
                }
            }

            this.$refs.input.value = '';
        },
        async initFile(file){
            let isCorrectFile = true;
            if(this.checkFilesInZip){
                isCorrectFile = await this.checkModelTypeInZip(file);
            }
            let name = file.name.replace(/ /g,'_');
            let _file = new File({id:randomString(),dir:this.dir,name,file,size:file.size,isCorrectFile});
            if(this.saveImageSrc && this.type === 'image'){
                this.html5Reader(_file);
            }
            this.fileList.push(_file);
            if(this.autoUpload && isCorrectFile) {
                this.startUploadFile()
            }
            this.fileChanged();
        },
        startUploadFile(params){
            this.fileList.map(file => {
                if(file.isCorrectFile && file.status === 'waiting'){
                    Upload.startUpload(file,this.uploadTo,params,{
                        OnStart:this.customOnStart,
                        OnChanged:this.fileChanged,
                        OnEnd:this.customOnEnd
                    })
                }
            })
        },
        deleteFile(index){
            // if(this.fileList[index] && (this.fileList[index].progress < 100 && this.fileList[index].progress > 0)) {  //只有当文件上传进度不是百分之百的时候才会停止发送数据
            //     this.tokens[index].cancel('取消发送数据')
            // }

            this.fileList.splice(index,1);
            this.fileChanged();
            // this.tokens.splice(index,1);
        },
        async checkModelTypeInZip(file) {
            let result = false;
            let _this = this;
            await this.getModelFormats();
            return new  Promise((resolve,reject)=>{
                checkFilesInZip(file, function(entries) {
                    entries.forEach(function(entry) {
                        let arr = entry.filename.split('.');
                        _this.filesInZip.push(entry.filename);
                        if(_this.modelFormats.indexOf(arr[arr.length - 1].toLowerCase()) > -1){
                            result = true
                        }
                    });
                    if(!result){
                        _this.modelTypeIsWrong = true;
                    }
                    resolve(result)
                });
            })
        },
        checkFileQuantity(number){
            this.quantityIsWrong = number > this.maxQuantity - this.fileList.length;
            if(this.quantityIsWrong){
                this.errorNote = this.maxQuantity
            }
            return this.quantityIsWrong
        },
        checkFileType(files){
            for(let i = 0;i<files.length;i++) {
                let arr = files[i].name.split('.');
                if(this.typeList.indexOf(arr[arr.length-1].toLowerCase()) === -1) {
                    this.typeIsWrong = true;
                    this.errorNote = this.typeList.join(',');
                    return this.typeIsWrong;
                }
            }
            return this.typeIsWrong;
        },
        dropFile(event){
            event.preventDefault();
            event.stopPropagation();
            this.dropStatus = false;
            this.validateFile(event.dataTransfer.files)
        },
        dragFileOver(event){
            event.preventDefault();
            event.stopPropagation();
            this.dropStatus = true;
        },
        dragFileLeave(event){
            event.preventDefault();
            event.stopPropagation();
            this.dropStatus = false;
        },
        async getModelFormats() {
            let result = await store.dispatch('modelFormat');
            this.modelFormats = result.data.format;
            return true
        },
        clearAllErrorStatus:function () {
            this.quantityIsWrong = false;
            this.typeIsWrong = false;
        },
        async getFileTypeList() {
            let response = await store.dispatch('file/getFileTypeList',{type:this.type});
            this.typeList = response.data.format
        },
        html5Reader(file) {
            let reader = new FileReader();
            reader.readAsDataURL(file.file);
            reader.onload = (e) => {
                let img = new Image();
                img.src = e.target.result;
                img.onload = () => {
                    file.setCustomValue({width:img.width,height:img.height});
                    if(img.width >= 400 && this.compressionImage){
                        let canvas = document.createElement('canvas'),
                            ctx = canvas.getContext('2d');
                        canvas.width = 400;
                        canvas.height = 400 / img.width * img.height;
                        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                        file.setCustomValue({src:canvas.toDataURL()});
                    }
                    else{
                        file.setCustomValue({src:e.target.result});
                    }
                }
            }
        },
        fileChanged(){
            //todo:add custom file change function in file change
            if(this.customFileChanged instanceof Function){
                this.customFileChanged();
                return;
            }
            if(this.fileList.length || !this.atLeastOneFile){
                let result = true;
                this.fileList.some(file => {
                    if(file.status !== 'success'){
                        result = false;
                        return true;
                    }
                });
                if(result){
                    this.$emit('fileStatusChange',{data:this.fileList,status:true,message:'file status is success'});
                }
                else{
                    this.$emit('fileStatusChange',{data:this.fileList,status:false,message:'file status is wrong'});
                }
            }
            else{
                this.$emit('fileStatusChange',{data:this.fileList,status:false,message:'file status is wrong'});
            }
        }
    }
}