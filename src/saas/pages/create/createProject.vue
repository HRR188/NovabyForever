<template>
    <div class="create-project-container">
        <p class="page-title">{{(this.projectType === 'outsource'?translate('step'):'')+translate('cp')}}</p>
        <div class="wrapper">
            <p class="tag-title" v-lang.projectName></p>
            <input type="text" class="name-input" v-model="projectName" :placeholder="translate('plsInputName')">
            <p class="tag-title" v-lang.projectCover></p>
            <image-upload
                    :multipleFile="false"
                    :maxQuantity="1"
                    :type="'image'"
                    :uploadTo="'cloud'"
                    :saveImageSrc="true"
                    @fileStatusChange="imageStatusChange"
            ></image-upload>
            <p class="tag-title" v-lang.desc></p>
            <textarea class="desc" name="" id="" cols="30" rows="10" :placeholder="translate('plsInputDesc')" v-model="projectDesc"></textarea>
            <div class="btns">
                <button class="btn btn-default-border" @click="goBack" v-lang.previous></button>
                <button class="btn btn-default" @click="goNext" v-lang.next v-if="this.projectType === 'outsource'" :disabled="!verify"></button>
                <button class="btn btn-default" @click="goNext" v-lang.submit v-if="this.projectType === 'internal'" :disabled="!verify"></button>
            </div>
        </div>
    </div>
</template>

<script>
    import imageUpload from '../../../components/imageUpload/newProjectImageUpload.vue'
    export default {
        name: "create-project",
        components:{
            imageUpload
        },
        data(){
            return{
                projectType:'outsource',
                projectName:'',
                projectDesc:'',
                coverImageStatus:false,
                coverImages:[]
            }
        },
        computed:{
            verify:function () {
                if(!this.projectName){
                    return false
                }
                else if(!this.coverImageStatus){
                    return false
                }
                else {
                    return this.projectDesc.length
                }
            }
        },
        created(){
            this.projectType = this.$route.params.type;
        },
        messages:{
            zh:{
                projectName:'项目名称',
                plsInputName:'请输入项目名称',
                projectCover:'项目封面（为了更好的展示效果）',
                desc:'项目描述',
                plsInputDesc:'请输入项目描述',
                previous:'返回上一步',
                next:'下一步',
                submit:'提交',
                cp:'创建项目',
                step:'步骤 1: '
            },
            en:{
                projectName:'Name your project',
                plsInputName:'Please enter the project name',
                projectCover:'Project cover (For better display, please add a cover picture for your project)',
                desc:'Project description',
                plsInputDesc:'Please enter the project description',
                previous:'Previous',
                next:'Next',
                submit:'Submit',
                cp:'Create Project',
                step:'Step 1: '
            }
        },
        methods:{
            goBack:function () {
                this.$router.go(-1);
            },
            goNext:function () {
                if(this.verify){
                    let data = {
                        name:this.projectName,
                        description:this.projectDesc,
                        photo:{
                            src:this.coverImages[0].getSrc,
                            size:this.coverImages[0].getSize
                        },
                        type:this.projectType === 'outsource'?0:1
                    };
                    this.$store.dispatch('saas/project/createProject',data).then(response => {
                        if(response.project_id){
                            if(this.projectType === 'outsource'){
                                this.$router.push({name:'releaseQuote',params:{id:response.project_id}})
                            }
                            else{
                                this.$router.push({name:'saasModelSpecification',params:{id:response.project_id}})
                            }
                        }
                    })
                }
            },
            imageStatusChange:function ({data,status}) {
                this.coverImages = data;
                this.coverImageStatus = status
            }
        }
    }
</script>

<style scoped lang="scss">
    .create-project-container{
        width: 738px;
        margin: 25px auto 46px;
        background-color: white;
        .wrapper{
            width: 100%;
            padding:40px 35px;
            .name-input {
                background: #ffffff;
                border: 1px solid #d2d2d2;
                border-radius: 2px;
                height: 42px;
                font-size: 16px;
                color: #9b9b9b;
                padding: 10px;
                margin-bottom: 18px;
                width: 100%;
            }
            .desc{
                width: 100%;
                background: #ffffff;
                border: 1px solid #d2d2d2;
                border-radius: 2px;
                padding: 10px;
            }
            .btns{
                display: flex;
                justify-content: center;
                margin-top: 40px;
                .btn{
                    width: 112px;
                    height: 30px;
                    font-size: 16px;
                    margin:0 20px;
                }
            }
        }
    }
</style>