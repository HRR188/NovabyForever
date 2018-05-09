<template>
    <div class="release-quote-container" @click="closeAllSlideDown()">
        <div class="release-quote">
            <h4>{{translate('step2')}}</h4>
            <div class="wrapper">
                <p class="title upp" v-lang.industry></p>
                <ul class="choose-icon-list industry-warp flex">
                    <li @click="industry = item.id" v-for="item in industryList" :class="{'active':item.id === industry}">
                        <p :class="item.className">{{item.name}}</p>
                        <span></span>
                    </li>
                </ul>

                <p class="title upp" v-lang.category></p>
                <slide-down :defaultValue="translate('plsSelectCategory')" :values="category" :selectType="'multiple'" ref="projectCategory"></slide-down>
                <p class="title upp" v-lang.tag></p>
                <label for="tag" class="tag-input-container">
                    <a class="pointer" v-for="ta in tags" @click="removeTag(ta)">
                        <span>{{ta}}</span>
                        <img src="../../../assets/images/saas/icon-delete-tag.png" alt="">
                    </a>
                    <input id="tag" type="text" class="tag-input" @keyup.enter="addNewTag" @keyup.space="addNewTag" v-model="tag" @keydown.8="deleteTag" @keyup="checkInput">
                </label>


                <p class="title upp" v-lang.resolution></p>
                <slide-down :defaultValue="translate('plsSelectResolution')" :values="resolutions" selectType="single" ref="projectResolution"></slide-down>
                <p class="title" v-lang.modelNumber></p>
                <input type="text" class="number-input" v-model="modelNumber" @keypress="isNumber">
                <p class="title">{{translate('budget')+' ('+translate('averagePerModel')+')'}}</p>
                <slide-down :defaultValue="translate('plsSelectBudget')" :values="budgets" selectType="single" ref="projectBudget"></slide-down>
                <p class="title" v-lang.projectDuration></p>
                <slide-down :defaultValue="translate('plsSelectDuration')" :values="durations" selectType="single" ref="projectDuration"></slide-down>
            </div>
            <!--<div class="note">-->
            <!--<p class="black">Please Note</p>-->
            <!--<p>Where To Look For Cheap Brochure Printing Services</p>-->
            <!--<p>More and more people are opting to live the herbal life: moving away from chemicals and scientific medicines, and taking traditional herbs to do everything from losing weight to relieving pain. They are often remedies that have been used in communities for hundreds or even thousands of years, and have now been taken for sale worldwide because of the people’s claims about their powers.</p>-->
            <!--<p>More and more people are opting to live the herbal life: moving away from chemicals and scientific medicines, and taking traditional herbs to do everything from losing weight to relieving pain. They are often remedies that have been used in communities for hundreds or even thousands of years, and have now been taken for sale worldwide because of the people’s claims about their powers.</p>-->
            <!--</div>-->
            <div class="btn-container">
                <button class="btn btn-default" @click="createProject" :disabled="!creatable">{{translate('create')}}</button>
            </div>
        </div>
    </div>
</template>

<script>
    import slideDown from '../../components/slideDown.vue'
    export default {
        name: 'release-quote',
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
                selectType:'single',
                category:[],
                projectName:'',
                projectType:0,
                duration:0,
                resolutions:[],
                durations:[],
                budgets:[],
                modelNumber:'',
                ranges:[]
            }
        },
        messages:{
            en:{
                projectName:'Name your project',
                plsInputName:'Please enter the project name',
                projectType:'Project type',
                whoCanCheck:'who has right to check this project',
                plsSelectCategory:'please select project category',
                plsSelectResolution:'please select project resolution',
                projectCover:'Project cover (For better display, please add a cover picture for your project)',
                plsSelectBudget:'please select project budget',
                plsSelectDuration:'please select project duration',
                create:'Create project',
                budget:'Budget',
                step2:'Step 2: Get free quotes'
            },
            zh:{
                projectName:'项目名称',
                plsInputName:'请输入项目名称',
                projectType:'项目隐私性',
                whoCanCheck:'谁有权利查看项目',
                plsSelectCategory:'请选择一个项目分类',
                plsSelectResolution:'请选择模型精度',
                projectCover:'项目封面（为了更好的展示效果）',
                plsSelectBudget:'请选择模型预算',
                plsSelectDuration:'请选择项目周期',
                create:'创建项目',
                budget:'预算',
                step2:'第二步：获取免费报价'
            }
        },
        computed:{
            creatable:function () {
                if(!this.industry){
                    return false
                }
                else if(!this.$refs.projectCategory.selectedValue.length){
                    return false
                }
                else if(!this.$refs.projectResolution.selectedValue.length){
                    return false
                }
                else if(!this.$refs.projectBudget.selectedValue.length){
                    return false
                }
                else if(!this.$refs.projectDuration.selectedValue.length){
                    return false
                }
                else return this.tags.length;
            }
        },
        components:{
            slideDown
        },
        created(){
            this.init()
        },
        methods:{
            init() {
                if(this.language === 'zh') {
                    this.industryList = [
                        {
                            id:43,
                            name:'游戏',
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
                            name:'3D 打印',
                            className:'printing',
                            status:false
                        },
                        {
                            id:42,
                            name:'电影',
                            className:'film',
                            status:false
                        },
                        {
                            id:46,
                            name:'其他',
                            className:'other',
                            status:false
                        }
                    ]
                }
                else {
                    this.industryList = [
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
                    ]
                }

                this.$store.dispatch('novahub/releaseQuotes/getReleaseAttr').then(response => {
                    this.category = response.category;
                    this.resolutions = response.resolution;
                    this.durations = response.duration;
                    this.budgets = response.budgets;
                    this.ranges = response.project_visibility
                })
            },
            closeAllSlideDown:function () {
                this.$children.forEach(children => {
                    if(children.$options.name === 'slide-down'){
                        children.show = false
                    }
                })
            },
            isNumber: function(evt) {
                evt = (evt) ? evt : window.event;
                let charCode = (evt.which) ? evt.which : evt.keyCode;
                if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
                    evt.preventDefault();
                } else {
                    return true;
                }
            },
            checkInput:function () {
                this.tag = this.tag.toLowerCase();
                this.tag = this.tag.replace(/[^0-9a-z]+/g,"");
            },
            addNewTag:function () {
                if(this.checkDulpTag() < 0 && this.tag){
                    this.tags.push(this.tag);
                    this.clearInputTag()
                }
            },
            checkDulpTag:function () {
                return this.tags.indexOf(this.tag)
            },
            deleteTag:function () {
                if(!this.tag.length){
                    this.tags.splice(this.tags.length-1,1)
                }
            },
            removeTag:function (tag) {
                this.tags.splice(this.tags.indexOf(tag),1)
            },
            clearInputTag:function () {
                this.tag = ''
            },
            getSelectedId:function (selected,list) {
                let result = [];
                if(Array.isArray(selected)){
                    for(let i = 0;i<list.length;i++){
                        for(let k = 0;k<selected.length;k++){
                            if(list[i].name === selected[k]){
                                result.push(list[i].id)
                            }
                        }
                    }
                }
                else{
                    for(let i = 0;i<list.length;i++){
                        if(list[i].name === selected){
                            result = list[i].id
                        }
                    }
                }
                return result
            },
            createProject:function () {
                if(this.creatable){
                    let categorys = this.getSelectedId(this.$refs.projectCategory.selectedValue,this.category);
                    let resolution = this.getSelectedId(this.$refs.projectResolution.selectedValue,this.resolutions);
                    let budget = this.getSelectedId(this.$refs.projectBudget.selectedValue,this.budgets);
                    let duration = this.getSelectedId(this.$refs.projectDuration.selectedValue,this.durations);
                    let data = {
                        id:this.$route.params.id,
                        industry:this.industry,
                        categorys,
                        tags:this.tags,
                        resolution,
                        number:this.modelNumber,
                        budget,
                        duration,
                    };
                    this.$store.dispatch('saas/releaseQuote/releaseQuote',data).then(response => {
                        // debugger
                        // if(response.code === 200){
                        //     debugger
                            this.$router.push({name:'saasModelSpecification',params: { id: this.$route.params.id}})
                        // }
                        // console.log(response)
                    })
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    .release-quote-container {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        z-index: 1000;
        margin:25px auto 48px;
        .release-quote {
            width: 738px;
            background-color: #fff;
            border-radius: 4px;
            position: relative;
            h4 {
                text-align: center;
                font-weight: normal;
                width: 100%;
                margin-top: 0;
                height: 70px;
                line-height: 70px;
                font-size: 22px;
                color: #4a4a4a;
                margin-bottom: 0;
                border-bottom: 1px solid #e8e8e8;
            }
            .wrapper {
                width: 100%;
                margin-bottom: 30px;
                padding: 28px 20px 0;
                .title {
                    font-size: 16px;
                    color: #181818;
                    padding-left: 14px;
                    position: relative;
                    margin-bottom: 14px;
                    &:before {
                        content: "";
                        width: 4px;
                        height: 16px;
                        background: #ea6264;
                        position: absolute;
                        left: 0;
                        top: 0;
                    }
                }
                .number-input {
                    background: #ffffff;
                    border: 1px solid #d2d2d2;
                    border-radius: 2px;
                    height: 42px;
                    font-size: 16px;
                    color: #9b9b9b;
                    padding: 10px;
                    margin-bottom: 18px;
                    width: 300px;
                }
                .choose-icon-list {
                    border-right: 1px solid #d2d2d2;
                    li {
                        flex: 1;
                        height: 125px;
                        justify-content: center;
                        align-items: center;
                        display: flex;
                        border-top: 1px solid #d2d2d2;
                        border-bottom: 1px solid #d2d2d2;
                        border-left: 1px solid #d2d2d2;
                        cursor: pointer;
                        position: relative;
                        > p {
                            font-size: 16px;
                            color: #959595;
                            text-align: center;
                        }
                        span {
                            position: absolute;
                            display: block;
                            width: 100%;
                            height: 100%;
                            left: 0;
                            top: 0;
                        }
                        &:hover {
                            p {
                                color: #ea6264;
                            }
                        }
                        &.active {
                            p {
                                color: #ea6264;
                            }
                            span {
                                border: 1px solid #ea6264;
                                box-shadow: 0 0 2px #ea6264;
                            }
                            .game:before {
                                background-position: 0 -36px;
                            }
                            .vr-ar:before {
                                background-position: -49px -36px;
                            }
                            .printing:before {
                                background-position: -95px -36px;
                            }
                            .film:before {
                                background-position: -137px -36px;
                            }
                            .other:before {
                                background-position: -176px -36px;
                            }
                        }
                    }
                }
                .industry-warp {
                    margin: 0 0 20px;
                    p {
                        &:before {
                            content: "";
                            display: block;
                            height: 28px;
                            margin: 0 auto 22px;
                            background: url(../../../assets/images/add-projects-sprite.png)
                            no-repeat;
                        }
                    }
                    .game:before {
                        width: 40px;
                        background-position: 0 0;
                    }
                    .vr-ar:before {
                        width: 36px;
                        background-position: -49px 0;
                    }
                    .printing:before {
                        width: 32px;
                        background-position: -95px 0;
                    }
                    .film:before {
                        width: 30px;
                        background-position: -137px 0;
                    }
                    .other:before {
                        width: 26px;
                        background-position: -176px 0;
                    }
                    li:hover {
                        .game:before {
                            background-position: 0 -36px;
                        }
                        .vr-ar:before {
                            background-position: -49px -36px;
                        }
                        .printing:before {
                            background-position: -95px -36px;
                        }
                        .film:before {
                            background-position: -137px -36px;
                        }
                        .other:before {
                            background-position: -176px -36px;
                        }
                    }
                }
                .title-normal {
                    font-size: 16px;
                    color: #515254;
                    margin-bottom: 16px;
                }
                .tag-input-container {
                    background: #ffffff;
                    border: 1px solid #d2d2d2;
                    border-radius: 2px;
                    display: flex;
                    width: 100%;
                    min-height: 40px;
                    padding: 5px 5px 0 5px;
                    flex-wrap: wrap;
                    margin-bottom: 20px;
                    a {
                        height: 30px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        background: #9b9b9b;
                        border-radius: 2px;
                        padding: 0 10px;
                        margin-right: 10px;
                        margin-bottom: 5px;
                        span {
                            font-size: 16px;
                            color: #ffffff;
                            margin-right: 8px;
                        }
                        image {
                            margin-top: 1px;
                            width: 8px;
                            height: 8px;
                        }
                    }
                    input {
                        border: none;
                        font-size: 16px;
                        color: #cdcdcd;
                        flex: 1;
                        min-width: 50px;
                        height: 30px;
                        margin-bottom: 5px;
                    }
                }
            }
            .note {
                padding: 20px;
                background: #fafcff;
                p {
                    font-size: 12px;
                    color: #9b9b9b;
                    margin-bottom: 10px;
                    line-height: 16px;
                    &:last-child {
                        margin-bottom: 0;
                    }
                    &.black {
                        font-size: 14px;
                        color: #181818;
                        margin-bottom: 13px;
                    }
                }
            }
            .btn-container {
                height: 74px;
                display: flex;
                justify-content: center;
                align-items: center;
                padding-bottom: 46px;
                .btn {
                    padding: 0 20px;
                    height: 42px;
                    line-height: 42px;
                    font-size: 16px;
                    color: #ffffff;
                }
            }
        }
    }
</style>