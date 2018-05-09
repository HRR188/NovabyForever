<template>
    <div class="market-list-warp" v-infinite-scroll="pushMarket" infinite-scroll-disabled="loadingSwitch" infinite-scroll-distance="50">
        <div class="small-big-switch clearfix">
            <span @click="setType('market',true)" class="market-big" :class="{'active':marketType}"></span>
            <span @click="setType('market',false)" class="market-small" :class="{'active':!marketType}"></span>
        </div>
        <template v-if="marketType">
            <template v-for="(project,index) in marketBigList">
                <template v-if="index%8 === 0 && index">
                    <who-to-follow :projectNumber="4"></who-to-follow>
                </template>
                <project-big-list :projectData="project" :showAuthor="false"></project-big-list>
            </template>
        </template>
        <template v-else>
            <div class="project-small-warp flex">
                <div class="column flex" v-for="(item,index) in marketSmallList">
                    <template v-for="project in item">
                        <project-small-list :projectData="project" type="market"></project-small-list>
                    </template>
                </div>
            </div>
        </template>
        <div class="new-market-note text-center pointer" v-if="marketNewModel"  @click="addNewMarket">{{marketNewModel}} new models</div>
        <loading :loadingMsg="marketLoading"></loading>
    </div>
</template>
<script>
    import { mapState,mapGetters } from 'vuex'
    import ProjectBigList from '../../components/community/ProjectBigList.vue'
    import projectSmallList from '../../components/community/projectSmallList.vue'
    import backTopFn from '../../mixins/backToTop/backToTop'
    import loading from '../../components/commons/loading.vue'
    import WhoToFollow from '../../components/whoToFollow/WhoToFollow.vue'
    export default {
        name:'marketList',
        mixins:[backTopFn],
        data(){
            return {
                maxId:null,
                timeId:null,
                marketNewModel: 0
            }
        },
        components:{
            ProjectBigList,
            projectSmallList,
            loading,
            WhoToFollow
        },
        created(){
            this.$store.dispatch('modelsList/getMarketList').then((response) => {
                this.maxId = response.data.maxid;
                this.timeId = setInterval(() => {
                    this.$store.dispatch('modelsList/getNewMarketNote',this.maxId).then((res) => {
                        if (res.code === 200 && res.data.nums !== 0 && res.data.nums % 30 === 0) {
                            this.marketNewModel = res.data.nums
                        }
                    })
                },300000)
            })
        },
        computed:{
            ...mapState('modelsList',[
                'marketType','stateMaxId','marketListmaxID','marketLoading'
            ]),
            ...mapGetters('modelsList',[
                'marketSmallList','marketBigList'
            ]),
            loadingSwitch(){
                return this.$store.state.modelsList.marketLoading.noteStatus
            }
        },
        methods:{
            setType(type,data){
                if(type === 'market') {
                    this.$store.commit('modelsList/setMarketType',data)
                }
                else {
                    this.$store.commit('modelsList/setFollowingType',data)
                }
            },
            pushMarket(){
                this.$store.dispatch('modelsList/pushMarketList')
            },
            addNewMarket(){
                this.$store.dispatch('modelsList/getNewMarketList',this.maxId).then((response) => {
                    if(response.code === 200) {
                        this.maxId = response.data.maxid;
                        this.marketNewModel = 0;
                        this.backToTop()
                    }
                });
            }
        },
        beforeRouteLeave(to, from, next){
            clearInterval(this.timeId);
            next();
        }
    }
</script>
<style lang="scss">
    .models-container{
        .market-list-warp{
            padding: 20px 95px;
        }

    }
</style>
