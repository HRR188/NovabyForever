<template>
    <div class="release-quote-container mark">
        <div class="release-quote" @click.stop="">
            <h4>{{title}}</h4>
            <img src="../../../assets/images/icon-close.png" class="close-icon pointer" @click="closePop">
            <div class="scroll-wrapper">
                <div class="wrapper">
                    <p class="title">Name your project</p>
                    <input type="text" class="name-input" v-model="projectName">
                    <p class="title">Project type</p>
                    <!--<div class="project-type-container">-->
                        <!--<div class="project-type">-->
                            <!--<img src="../../../assets/images/saas/icon-outsource-project.png" alt="">-->
                            <!--<span>Outsourcing project</span>-->
                        <!--</div>-->
                    <!--</div>-->
                    <!--<p class="tips">Tips：Please upload cencepts package with .zip, .rar, 7z.</p>-->
                    <!--<slide-down defaultValue="who has right to check this project" :values="rangeString" selectType="single" ref="projectRange"></slide-down>-->
                    <p class="title-normal">Industry:</p>
                    <ul class="choose-icon-list industry-warp flex">
                        <li @click="industry = item.id" v-for="item in industryList" :class="{'active':item.id === industry}">
                            <p :class="item.className">{{item.name}}</p>
                            <span></span>
                        </li>
                    </ul>
                    <div v-show="industry">
                        <p class="title-normal">Category:</p>
                        <slide-down defaultValue="please select project type" :values="categoryList" :selectType="selectType" ref="projectCategory"></slide-down>
                        <p class="title-normal">Tag:</p>
                        <label for="tag" class="tag-input-container">
                            <a class="pointer" v-for="ta in tags" @click="removeTag(ta)">
                                <span>{{ta}}</span>
                                <img src="../../../assets/images/saas/icon-delete-tag.png" alt="">
                            </a>
                            <input id="tag" type="text" class="tag-input" @keyup.enter="addNewTag" @keyup.space="addNewTag" v-model="tag" @keyup.delete="deleteTag">
                        </label>
                    </div>
                </div>
                <div class="btn-container">
                    <button class="btn btn-default" @click="createProject" :disabled="!creatable">Create</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import store from '../../../store/store'
    import slideDown from '../slideDown.vue'
    export default {
        name: 'report-pop',
        data(){
            return{
                tags:[],
                tag:'',
                industryList:[
                    {
                        id:43,
                        name:'Game',
                        className:'game',
                        status:false
                    },
                    {
                        id:44,
                        name:'AR/VR',
                        className:'vr-ar',
                        status:false
                    },
                    {
                        id:45,
                        name:'3D printing',
                        className:'printing',
                        status:false
                    },
                    {
                        id:42,
                        name:'Film',
                        className:'film',
                        status:false
                    },
                    {
                        id:46,
                        name:'Other',
                        className:'other',
                        status:false
                    }
                ],
                industry:0,
                categoryList:[],
                selectType:'single',
                gameCategory:[],
                category:[],
                projectName:'',
                projectType:0,
                rangeString:[
                    'everyone can check this project',
                    'only modelers I invited can check this project'
                ]
            }
        },
        computed:{
            creatable:function () {
                if(!this.projectName){
                    return false
                }
                else if(this.projectType !== 0 && this.projectType !== 3){
                    return false
                }
//                else if(!(this.$refs.projectRange && this.$refs.projectRange.selectedValue.length) ){
//                    return false
//                }
                else if(!this.industry){
                    return false
                }
                else if(!this.$refs.projectCategory){
                    return false
                }
                else if(!this.$refs.projectCategory.selectedValue.length){
                    return false
                }
                else return this.tags.length;
            }
        },
        components:{
            slideDown
        },
        created(){
            store.dispatch('novahub/releaseQuotes/getReleaseAttr').then(response => {
                this.category = response.category
                this.gameCategory = response.category_game
            });
        },
        watch:{
            industry:function () {
                if(this.industry === 43){
                    this.categoryList = this.gameCategory;
                    this.selectType = 'single'
                }
                else{
                    this.categoryList = this.category;
                    this.selectType = 'multiple'
                }
            }
        },
        methods:{
            deleteTag:function () {
                console.log('delete')
            },
            addNewTag:function () {
                if(this.checkDulpTag() < 0){
                    this.tags.push(this.tag);
                    this.tag = ''
                }
            },
            checkDulpTag:function () {
                return this.tags.indexOf(this.tag)
            },
            removeTag:function (tag) {
                this.tags.splice(this.tags.indexOf(tag),1)
            },
            getCategoryId:function (categorySelected,categoryList) {
                let result = [];
                if(this.industry === 43){
                    for(let i = 0;i<categoryList.length;i++){
                        if(categoryList[i].cate_name === categorySelected){
                            result.push(categoryList[i].cate_id)
                        }
                    }
                }
                else{
                    for(let i = 0;i<categoryList.length;i++){
                        for(let k = 0;k<categorySelected.length;k++){
                            if(categoryList[i].cate_name === categorySelected[k]){
                                result.push(categoryList[i].cate_id)
                            }
                        }
                    }
                }
                return result
            }
        }
    }
</script>

<style scoped lang="scss">
    .release-quote-container{
        width: 100%;
        height: 100%;
        position: fixed;
        top:0;
        left:0;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
        .release-quote{
            width:738px;
            background-color: #fff;
            border-radius: 4px;
            position: relative;
            h4{
                text-align: center;
                font-weight: normal;
                width: 100%;
                margin-top:0;
                background: #F8F8F8;
                height: 63px;
                line-height: 63px;
                font-size: 22px;
                color: #4A4A4A;
                margin-bottom: 0;
            }
            .close-icon{
                position: absolute;
                right:20px;
                top:25px;
            }
            .scroll-wrapper{
                max-height: 597px;
                overflow: auto;
                padding-top: 28px;
                .wrapper{
                    width: 100%;
                    padding:0 35px;
                    margin-bottom: 50px;
                    .title{
                        font-size: 16px;
                        color: #181818;
                        padding-left: 14px;
                        position: relative;
                        margin-bottom: 14px;
                        &:before{
                            content:"";
                            width: 4px;
                            height: 16px;
                            background: #EA6264;
                            position: absolute;
                            left:0;
                            top:0;
                        }
                    }
                    .name-input{
                        background: #FFFFFF;
                        border: 1px solid #D2D2D2;
                        border-radius: 2px;
                        width: 100%;
                        height: 42px;
                        font-size: 16px;
                        color: #9B9B9B;
                        padding:10px;
                        margin-bottom: 18px;
                    }
                    .project-type-container{
                        .project-type{
                            width: 220px;
                            height: 53px;
                            border: 1px solid #EA6264;
                            border-radius: 2px;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            margin-bottom: 17px;
                            img{
                                width: 29px;
                                height: 29px;
                                margin-right:9px;
                            }
                            span{
                                font-size: 16px;
                                color: #EA6264;
                            }
                            &:hover{

                            }
                        }
                    }
                    .tips{
                        font-size: 12px;
                        color: #ADADAD;
                        margin-bottom: 18px;
                    }
                    .choose-icon-list{
                        border-right:1px solid #D2D2D2;
                        li{
                            flex:1;
                            height:125px;
                            justify-content: center;
                            align-items: center;
                            display: flex;
                            border-top:1px solid #D2D2D2;
                            border-bottom:1px solid #D2D2D2;
                            border-left:1px solid #D2D2D2;
                            cursor: pointer;
                            position: relative;
                            >p{
                                font-size: 16px;
                                color: #959595;
                                text-align: center;
                            }
                            span{
                                position: absolute;
                                display: block;
                                width:100%;
                                height:100%;
                                left:0;
                                top:0;
                            }
                            &:hover{
                                p{
                                    color: #EA6264;
                                }
                            }
                            &.active{
                                p{
                                    color: #EA6264;
                                }
                                span{
                                    border:1px solid #EA6264;
                                    box-shadow: 0 0 2px #EA6264;
                                }
                                .game:before{
                                    background-position: 0 -36px;
                                }
                                .vr-ar:before{
                                    background-position: -49px -36px;
                                }
                                .printing:before{
                                    background-position: -95px -36px;
                                }
                                .film:before{
                                    background-position: -137px -36px;
                                }
                                .other:before{
                                    background-position: -176px -36px;
                                }
                            }
                        }
                    }
                    .industry-warp{
                        margin:0 0 20px;
                        p{
                            &:before{
                                content:'';
                                display: block;
                                height:28px;
                                margin:0 auto 22px;
                                background: url(../../../assets/images/add-projects-sprite.png) no-repeat;
                            }
                        }
                        .game:before{
                            width:40px;
                            background-position: 0 0;
                        }
                        .vr-ar:before{
                            width:36px;
                            background-position: -49px 0;
                        }
                        .printing:before{
                            width:32px;
                            background-position: -95px 0;
                        }
                        .film:before{
                            width:30px;
                            background-position: -137px 0;
                        }
                        .other:before{
                            width:26px;
                            background-position: -176px 0;
                        }
                        li:hover{
                            .game:before{
                                background-position: 0 -36px;
                            }
                            .vr-ar:before{
                                background-position: -49px -36px;
                            }
                            .printing:before{
                                background-position: -95px -36px;
                            }
                            .film:before{
                                background-position: -137px -36px;
                            }
                            .other:before{
                                background-position: -176px -36px;
                            }
                        }
                    }
                    .title-normal{
                        font-size: 16px;
                        color: #515254;
                        margin-bottom: 16px;
                    }
                    .tag-input-container{
                        background: #FFFFFF;
                        border: 1px solid #D2D2D2;
                        border-radius: 2px;
                        display: flex;
                        width: 100%;
                        min-height: 40px;
                        padding:5px 5px 0 5px;
                        flex-wrap: wrap;
                        a{
                            height: 30px;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            background: #9B9B9B;
                            border-radius: 2px;
                            padding:0 10px;
                            margin-right: 10px;
                            margin-bottom: 5px;
                            span{
                                font-size: 16px;
                                color: #FFFFFF;
                                margin-right: 8px;
                            }
                            image{
                                margin-top: 1px;
                                width: 8px;
                                height: 8px;
                            }
                        }
                        input{
                            border:none;
                            font-size: 16px;
                            color: #CDCDCD;
                            flex:1;
                            min-width: 50px;
                            height: 30px;
                            margin-bottom: 5px;
                        }
                    }
                }
                .btn-container{
                    height: 74px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    border-top: 1px solid #e8e8e8;
                    .btn{
                        width: 112px;
                        height: 42px;
                        line-height: 42px;
                        font-size: 16px;
                        color: #FFFFFF;
                    }
                }
            }
        }
    }
</style>
