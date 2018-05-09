<template>
    <div class="requirement-container">
        <saas-wrapper>
            <loading ref="loading">
                <saas-title :title="translate('specification')"></saas-title>
                <div class="requirements" v-if="hadRequirement && !canUpdateModels">
                    <div class="project">
                        <p class="big-title" v-lang.pr></p>
                        <p class="small-title" v-lang.attachments></p>
                        <ul>
                            <li v-for="attach in attaches">
                                <a :href="attach.url">{{attach.name+' ( '+parseInt(attach.size/1024)+'kb ) '}}</a>
                            </li>
                        </ul>
                    </div>
                    <div class="models">
                        <p class="big-title" style="width: 100%" v-lang.mr></p>
                        <div class="models-name">
                            <ul>
                                <li
                                        class="pointer"
                                        v-for="model in models"
                                        :class="{active:model.status}"
                                        @click="selectModels(model.name)"
                                >
                                    <p class="p-one-line">{{model.name}}</p>
                                </li>
                            </ul>
                        </div>
                        <div class="models-content">
                            <div class="wrapper" v-for="model in models" v-show="model.status">
                                <p class="small-title" v-lang.mn></p>
                                <p style="font-size: 16px;color: #7A7A7A;margin-bottom: 20px;">{{model.name}}</p>
                                <p class="small-title" v-lang.concepts></p>
                                <!--todo:add image upload check-->
                                <div class="image-wrapper">
                                    <div :style="{'background-image':'url('+img.url+')'}" v-for="img in model.images" @click="bigImgPop(img.url)" class="pointer"></div>
                                    <div class="fake-div" v-for="di in fakeDiv(model.images.length)"></div>
                                </div>
                                <p class="small-title" v-lang.desc2></p>
                                <p class="pre-line" style="font-size: 14px;color: #7A7A7A;">{{model.desc}}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="requirements" v-else-if="canUpdateModels">
                    <div class="project">
                        <p class="small-title" v-lang.attachments></p>
                        <file-upload
                                :type="'file'"
                                :uploadTo="'cloud'"
                                :maxQuantity="100"
                                :defaultFileList="attaches"
                                :atLeastOneFile="false"
                                @fileStatusChange="attachFilesStatusChange"
                        >
                        </file-upload>
                    </div>
                    <div class="models">
                        <p class="big-title" style="width: 100%" v-lang.mr></p>
                        <div class="models-name">
                            <div class="add-new pointer" @click="addNewModel">
                                + {{translate('an')}}
                            </div>
                            <ul>
                                <li
                                        class="pointer"
                                        v-for="(model,index) in models"
                                        :class="{active:model.status}"
                                        @click="selectModels(model.name)"
                                >
                                    <p class="p-one-line">{{model.name}}</p>
                                    <img @click.stop="deleteModel(index)" src="../../../assets/images/saas/icon_delete_model.png" alt="">
                                </li>
                            </ul>
                        </div>
                        <div class="models-content">
                            <div class="wrapper" v-for="model in models" v-show="model.status">
                                <p class="small-title" v-lang.mn></p>
                                <input type="text" v-model="model.name" @blur="checkNameDulp($event)">
                                <p class="small-title" v-lang.concepts></p>
                                <image-upload
                                        :propImages="{images:model.images,name:model.name}"
                                        :maxQuantity="1000"
                                        :type="'image'"
                                        :uploadTo="'cloud'"
                                        :saveImageSrc="true"
                                        @fileStatusChange="imagesChange"
                                ></image-upload>
                                <p class="small-title" v-lang.desc2></p>
                                <textarea cols="30" rows="10" v-model="model.description"></textarea>
                            </div>
                        </div>
                    </div>
                    <div class="btns">
                        <div class="btn btn-default" @click="submit" :disabled="disableSubmitBtn || submitting">{{submitting?'Submitting':'Submit'}}</div>
                    </div>
                </div>
                <template v-else>
                    <div class="requirement-empty">
                        <img src="../../../assets/images/saas/icon-waiting.png" alt="">
                        <span v-lang.wu></span>
                    </div>
                </template>
                <div class="big-review-img flex" v-if="bigImgStatus">
                    <span class="pointer" @click="bigImgStatus = false"></span>
                    <img :src="reviewBigImg" alt="">
                </div>
            </loading>
        </saas-wrapper>
    </div>
</template>

<script>
    class Model{
        constructor(name,images,description,build_id = 0,status = true){
            this.name = name;
            this.images = images || [];
            this.description = description || '';
            this.status = status;
            this.build_id = build_id
        }
        changeImage(images){
            this.images = images
        }
        changeName(name){
            this.name = name
        }
        changeDescription(description){
            this.description = description
        }
        setActive(status){
            this.status = status
        }
    }
    import saasTitle from '../../components/saasTitle.vue'
    import saasWrapper from '../../components/saasWrapper.vue'
    import fileUpload from '../../../components/fileUpload/projectsFileUpload.vue'
    import imageUpload from '../../../components/imageUpload/projectImageUpload.vue'
    import loading from '../../components/loading.vue'

    import {mapState} from 'vuex'
    export default {
        name: 'saas-specification',
        components:{
            saasTitle,
            saasWrapper,
            fileUpload,
            imageUpload,
            loading
        },
        data(){
            return{
                models:[],
                hadRequirement:true,
                attaches:[],
                attachStatus:true,
                bigImgStatus:false,
                reviewBigImg:'',
                submitting:false,
                canUpdateAttach:false,
                canUpdateModels:false,
                removedModelId:[]
            }
        },
        messages:{
            en:{
                specification:'Specification',
                pr:'Project specification',
                desc:'Description',
                attachments:'Attachments',
                mr:'Model specification',
                an:'Add new',
                concepts:'Concepts',
                desc2:'Description',
                wu:'Waiting for update',
                mn:'Model name'
            },
            zh:{
                specification:'需求',
                pr:'项目需求',
                desc:'需求描述',
                attachments:'附件',
                mr:'模型需求',
                an:'添加新模型',
                concepts:'设计图',
                desc2:'模型描述',
                wu:'等待上传',
                mn:'模型名称'
            }
        },
        computed:{
            disableSubmitBtn:function () {
                let result = false;
                this.models.forEach(model=>{
                    if(!model.name){
                        result = true
                    }
                    if(!model.images.length){
                        result = true
                    }
                });
                if(!this.attachStatus){
                    result = true
                }
                return result
            }
        },
        created(){
            this.init()
        },
        methods:{
            init:function () {
                let data = {
                    id:this.$route.params.id
                };
                let _this = this;
                this.$store.dispatch('saas/specification/getSpecification',data).then(response => {
                    if(response.code === 200){
                        if(response.data.projects && response.data.projects.models.length){
                            _this.hadRequirement = true;
                            _this.desc = response.data.projects.desc;
                            _this.attaches = response.data.projects.attach.map(attach => {
                                return {
                                    dir:attach.src,
                                    name:attach.name,
                                    size:attach.size,
                                    url:attach.url
                                }
                            });
                            _this.models = [];
                            response.data.projects.models.forEach((model,index) => {
                                model.status = index === 0;
                                let _model = new Model(model.name,model.photos,model.desc,model.build_id,model.status);
                                _this.models.push(_model)
                            });
                            _this.canUpdateModels = response.data.functions.modelRequirement.operate
                        }
                        else{
                            _this.hadRequirement = false;
                            _this.models.push(new Model('model 1'));
                            _this.canUpdateModels = response.data.functions.modelRequirement.operate
                        }
                        _this.$refs.loading.showSlots()
                    }
                    else{
                        _this.$router.replace({name:'permissionDenied'})
                    }
                })
            },
            addNewModel:function () {
                let number = this.models.length+1;
                this.selectModels();
                //todo:check model name dulp
                this.models.push(new Model('model '+ number));
            },
            selectModels:function (name) {
                if(this.NameDulp()){
                    return
                }
                if(name){
                    this.models.forEach(model => {
                        model.status = model.name === name
                    });
                }
                else{
                    this.models.forEach(model => {
                        model.status = false
                    })
                }
            },
            imagesChange:function ({data,name}) {
                this.models.forEach(model => {
                    if(model.name === name){
                        model.changeImage(data)
                    }
                })
            },
            checkNameDulp:function (e) {
                e.preventDefault();
                if(this.NameDulp()){
                    e.srcElement.focus();
                }
            },
            NameDulp:function () {
                for(let i = 0;i<this.models.length;i++){
                    for(let k = i+1;k<this.models.length;k++){
                        if(this.models[i].name === this.models[k].name){
                            this.$alert({type:'alert',message:'model name duplicate'});
                            return true;
                        }
                    }
                }
            },
            submit:function () {
                if(this.disableSubmitBtn || this.submitting){
                    return;
                }
                let docs = [];
                this.attaches.forEach(attach => {
                    docs.push({
                        src:attach.getSrc,
                        size:attach.getSize
                    })
                });
                let models = [];
                this.models.forEach(model => {
                    let imgs = [];
                    model.images.forEach(img =>{
                        imgs.push(img.getSrc || img.src)
                    });
                    models.push({
                        name:model.name,
                        desc:model.description,
                        photos:imgs,
                        build_id:model.build_id
                    })
                });
                let data = {
                    id:this.$route.params.id,
                    docs,
                    models,
                    del_ids:this.removedModelId
                };
                let _this = this;
                this.submitting = true;
                this.$store.dispatch('saas/specification/submitSpecification',data).then(response => {
                    if(response.code === 200){
                        _this.submitting = false;
                        _this.init()
                    }
                })
            },
            fakeDiv:function (length) {
                return (4-length%4) === 4?0:4-length%4
            },
            bigImgPop(url){
                if(url) {
                    this.reviewBigImg = url;
                    this.bigImgStatus = true;
                }
            },
            deleteModel:function (index) {
                if(this.models.length === 1){
                    this.$alert({type:'alert',message:'Sorry, you can\'t delete this model'})
                }
                else{
                    this.$alert({type:'confirm',message:'Are you sure to delete the model?'}).then(response => {
                        if(response.data === 'confirm'){
                            if(this.models[index].build_id !== 0){
                                this.removedModelId.push(this.models[index].build_id)
                            }
                            this.models.splice(index,1);
                            let hasSelected = false;
                            this.models.forEach(model => {
                                if(model.status){
                                    hasSelected = true
                                }
                            });
                            if(!hasSelected){
                                this.models[0].status = true
                            }
                        }
                    })
                }
            },
            attachFilesStatusChange:function ({data,status}) {
                this.attaches = data;
                this.attachStatus = status;
            }
        }
    }
</script>

<style lang="scss">
.requirement-container{
    .requirements{
        width: 100%;
        height: 100%;
        background-color: white;
        /*padding:0 20px;*/
        .big-title{
            font-size: 18px;
            color: #4A4A4A;
            letter-spacing: 0;
            margin-bottom: 16px;
        }
        .small-title{
            font-size: 16px;
            color: #4A4A4A;
            margin-bottom: 12px;
        }
        hr{
            border-bottom: none;
            border-top: 1px solid  #E8E8E8;
            margin-top: 17px;
        }
        .project{
            padding:16px 20px 0 20px;
            margin-bottom: 40px;
            textarea{
                width: 100%;
                background: #FFFFFF;
                border: 1px solid #D2D2D2;
                padding:10px;
                margin-bottom: 16px;
            }
            >ul li{
                font-size: 14px;
                color: #EA6264;
                line-height: 21px;
                display: flex;
                align-items: center;
                &:before{
                    content:url('../../../assets/images/saas/icon-attach.png');
                    margin-right: 15px;
                }
            }
        }
        .models{
            width: 100%;
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
            padding: 0 20px 61px;
            .models-name{
                width: 15%;
                border: 1px solid #D2D2D2;
                border-radius: 2px;
                .add-new{
                    border-top-left-radius:2px;
                    border-top-right-radius:2px;
                    height: 38px;
                    border-bottom: 1px solid #D2D2D2;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size: 14px;
                    color: #EA6264;
                }
                >ul li{
                    font-size: 14px;
                    padding-left: 16px;
                    margin-top: 12px;
                    display: flex;
                    align-items: center;
                    padding-right: 16px;
                    &:hover{
                        img{
                            display: block;
                        }
                    }
                    img{
                        margin-left: auto;
                        display: none;
                    }
                }
                >ul li.active{
                    color: #EA6264;
                }
            }
            .models-content{
                width: calc(85% - 10px);
                border: 1px solid #D2D2D2;
                border-radius: 2px;
                padding:20px;
                .wrapper{
                    input{
                        border: 1px solid #D2D2D2;
                        border-radius: 2px;
                        width: 100%;
                        height: 42px;
                        padding:10px;
                        font-size: 16px;
                        color: #9B9B9B;
                        margin-bottom: 16px;
                    }
                    textarea{
                        width: 100%;
                        border: 1px solid #D2D2D2;
                        border-radius: 2px;
                        padding:10px;
                    }
                    .image-wrapper{
                        display: flex;
                        justify-content: space-between;
                        flex-wrap: wrap;
                        margin-bottom: 15px;
                        div{
                            width: 24%;
                            padding-top: 13%;
                            background-size: cover;
                            background-position: center;
                            margin-bottom: 12px;
                        }
                    }
                }
            }
        }
        .btns{
            height: 70px;
            display: flex;
            justify-content: center;
            align-items: center;
            .btn{
                width: 112px;
                height: 30px;
                line-height: 30px;
            }
        }
    }
    .big-review-img{
        position: fixed;
        top:0;
        left:0;
        width:100%;
        height:100%;
        background: rgba(0,0,0,0.70);
        z-index:1000;
        align-items: center;
        justify-content: center;
        >img{
            max-width:100%;
            max-height:100%;
        }
        span{
            display: block;
            position: absolute;
            top:45px;
            right:50px;
            width:25px;
            height:25px;
            background-image:url(../../../assets/images/feedback-close.png);
            background-size: contain;
            background-repeat: no-repeat;
        }
    }
    .requirement-empty{
        padding-top: 200px;
        padding-bottom: 300px;
        display: flex;
        justify-content: center;
        align-items: center;
        img{
            margin-right: 56px;
        }
        span{
            font-size: 24px;
            color: #4A4A4A;
        }
    }
}
</style>
