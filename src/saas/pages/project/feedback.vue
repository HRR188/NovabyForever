<template>
    <saas-wrapper class="feedback-list-container">
        <saas-title :title="translate('feedback')"></saas-title>
        <loading ref="loading">
            <div class="search-container">
                <div class="search">
                    <input type="text" v-model="searchMsg">
                    <button class="btn btn-default-border" @click="searchFeedback(true,{useModelName:true})" v-lang.search></button>
                    <span class="pointer" @click="showFilter = !showFilter" v-lang.filter></span>
                </div>
                <div class="filter-container" v-show="showFilter">
                    <div class="filter">
                        <p v-lang.ato></p>
                        <select v-model="selectedModelId">
                            <option :value="model.bd_id" v-for="model in modelList">{{model.bd_name}}</option>
                        </select>
                    </div>
                    <div class="filter" v-if="showFilterSource">
                        <p v-lang.ats></p>
                        <select v-model="selectedSourceId">
                            <option :value="source.id" v-for="source in sourceList">{{source.name}}</option>
                        </select>
                    </div>
                    <div class="btns">
                        <div class="btn btn-default pointer" @click="searchFeedback(true,{useModelKeys:true})" v-lang.apply></div>
                        <div class="btn btn-default-border pointer upp" @click="showFilter = false" v-lang.cancel></div>
                    </div>
                </div>
            </div>
            <div class="list-container">
                <div class="feedback" v-for="feedback in feedbackList" v-show="feedbackList.length">
                    <router-link :to="{name:'saasFeedbackDetail',params:{feedbackId:feedback.id}}">
                        <img class="status" :src="getStatusImage(feedback.status)" alt="">
                        <span class="id">AA-{{feedback.id}}</span>
                        <p class="name p-one-line">{{feedback.title}}</p>
                        <span class="feedback-mark" :class="{hidden:!feedback.mark.length}" :style="{color:getMarkColor(feedback.mark)}">{{feedback.mark}}</span>
                        <span class="model-name p-one-line">{{feedback.name}}</span>
                        <div class="avatar">
                            <img :src="feedback.author.avatar" alt="">
                        </div>
                    </router-link>
                    <div class="delete">
                        <img class="pointer" v-show="feedback.is_me" src="../../../assets/images/saas/icon_delete_model.png" alt="" @click="deleteFeedback(feedback.id)">
                    </div>
                </div>
                <div class="non-feedback" v-show="!feedbackList.length">
                    <img src="../../../assets/images/saas/icon_none_feedback.png" alt="">
                    <p>Feedback will be displayed here</p>
                </div>
            </div>
        </loading>
    </saas-wrapper>
</template>

<script>
    import saasWrapper from '../../components/saasWrapper'
    import saasTitle from '../../components/saasTitle.vue'
    import loading from '../../components/loading.vue'

    export default {
        name: "feedback",
        components:{
            saasWrapper,
            saasTitle,
            loading
        },
        data(){
            return{
                showFilter:false,
                searchMsg:'',
                feedbackList:[],
                selectedModelId:0,
                selectedSourceId:0,
                showFilterSource:false,
                modelList:[],
                sourceList:[],
                page:1
            }
        },
        messages:{
            en:{
                feedback:'Feedback',
                search:'Search',
                filter:'Filter',
                ato:'According to the model',
                ats:'According to the source',
                apply:'Apply'
            },
            zh:{
                feedback:'模型反馈',
                search:'搜索',
                filter:'筛选',
                ato:'根据模型',
                ats:'根据来源',
                apply:'应用'
            }
        },
        props:{
            id:{
                required:true
            }
        },
        async created(){
            let result = await this.$store.dispatch('saas/feedback/getFeedbackPageData',{id:this.id});
            if(result.code === 200){
                this.modelList = result.data.advance.models;
                this.sourceList = result.data.advance.source;
                this.showFilterSource = result.data.functions.search.operate

                await this.searchFeedback(true,{});
                this.$refs.loading.showSlots()
            }
            else{

            }
        },
        methods:{
            async searchFeedback(isNew = false, {useModelName = false,useModelKeys = false}){
                if(isNew){
                    this.page = 1
                }
                let listResult = await this.$store.dispatch('saas/feedback/getFeedbackList',{
                    id:this.id,
                    pagesize:100,
                    page:this.page,
                    model_id:useModelKeys?this.selectedModelId:0,
                    source:useModelKeys?this.selectedSourceId:0,
                    keywords:useModelName?this.searchMsg:0
                });
                if(isNew){
                    this.feedbackList = listResult.data.remark
                }
                else{
                    this.feedbackList.push(listResult.data.remark)
                }
                this.page++
            },
            getStatusImage(status){
                switch (status.toLowerCase()){
                    case 'pending':
                        return require('../../../assets/images/saas/icon_pending.png');
                    case 'processing':
                        return require('../../../assets/images/saas/icon_processing.png');
                    case 'completed':
                        return require('../../../assets/images/saas/icon_completed.png');
                    case 'abort':
                        return require('../../../assets/images/saas/icon_abort.png');
                    case 're-open':
                        return require('../../../assets/images/saas/icon_reOpen.png');
                }
            },
            getMarkColor(mark){
                switch (mark){
                    case 'auditing':
                        return '#A7A2A2';
                    case 'approval':
                        return '#EA6264';
                    case 'reverse':
                        return '#2CBE42';
                }
            },
            async deleteFeedback(id){
                let result = await this.$alert({type:'confirm',message:'Are you sure you want to delete this feedback?'});
                if(result.data === 'confirm'){
                    let respo = await this.$store.dispatch('saas/feedback/deleteFeedback',{id});
                    if(respo.code === 200){
                        this.feedbackList = this.feedbackList.filter(feedback => {
                            return feedback.id !== id
                        })
                    }
                }
            }
        }
    }
</script>

<style scoped lang="scss">
.feedback-list-container{
    .search-container{
        .search{
            display: flex;
            align-items: center;
            height: 92px;
            padding-left: 20px;
            input{
                width: 290px;
                height: 30px;
                margin-right: 8px;
                border: 1px solid #D2D2D2;
                border-radius: 100px;
                font-size: 14px;
                padding:5px 20px;
            }
            .btn{
                width: 85px;
                height: 30px;
                font-size: 14px;
                margin-right: 20px;
            }
            span{
                font-size: 14px;
                color: #EA6264;
            }
        }
        .filter-container{
            padding:30px 50px;
            position: relative;
            background: #FEFEFE;
            display: flex;
            flex-wrap: wrap;
            &:before{
                content:"";
                position: absolute;
                top:0;
                left:0;
                background-image: linear-gradient(0deg, rgba(238,238,238,0.00) 50%, rgba(238,238,238,0.16) 71%, #F5F5F5 100%);
                height: 42px;
                width: 100%;
            }
            &:after{
                content:"";
                position: absolute;
                bottom:0;
                left:0;
                background-image: linear-gradient(180deg, rgba(238,238,238,0.00) 50%, rgba(238,238,238,0.16) 71%, #F5F5F5 100%);
                height: 42px;
                width: 100%;
            }
            .filter{
                width: 314px;
                margin-right: 34px;
                p{
                    font-size: 14px;
                    color: #515254;
                    margin-bottom: 10px;
                }
            }
            .btns{
                margin-top: 30px;
                width: 100%;
                .btn{
                    width: 73px;
                    height: 24px;
                    margin-right: 14px;
                    font-size: 14px;
                    line-height: 24px;
                }
            }
        }
    }
    .list-container{
        padding:20px;
        .feedback{
            position: relative;
            a{
                display: flex;
                align-items: center;
                height: 56px;
                width: 100%;
                border-bottom: 1px solid #e8e8e8;
                border-right: 1px solid #e8e8e8;
                border-left: 1px solid #e8e8e8;
                .status,.id,.name,.model-name,.avatar,.feedback-mark{
                    height: 24px;
                    padding:0 12px;
                    border-left: 1px solid  #E8E8E8;
                    line-height: 24px;
                }
                .status{
                    border-left: none;
                    height: 20px;
                }
                .id{
                    font-size: 12px;
                    color: #A7A2A2;
                }
                .name{
                    font-size: 14px;
                    color: #515254;
                    width: 637px;
                }
                .model-name{
                    font-size: 14px;
                    color: #8B8B8B;
                    width: 120px;
                    text-align: center;
                }
                .avatar{
                    padding-right: 32px;
                    img{
                        width: 26px;
                        height: 26px;
                        border-radius:100%;
                    }
                }
                .feedback-mark{
                    font-size: 14px;
                    margin-left: auto;
                    width: 100px;
                    text-align: center;
                    &.hidden{
                        visibility: hidden;
                    }
                }
            }
            .delete{
                width: 21px;
                height: 56px;
                padding-right: 12px;
                position: absolute;
                right: 0;
                top:0;
                img{
                    width: 9px;
                    height: 9px;
                    margin-top: 23px;
                }
            }
            &:first-child{
                border-top: 1px solid #e8e8e8;
            }
            &:hover{
                background-color: #F9F9F9;
            }
        }
        .non-feedback{
            display: flex;
            align-content: center;
            justify-content: center;
            height: 500px;
            flex-wrap: wrap;
            img{
                width: 92px;
            }
            p{
                width: 100%;
                margin-top: 40px;
                font-size: 16px;
                color: #ADADAD;
                text-align: center;
            }
        }
    }
}
</style>