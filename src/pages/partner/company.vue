<template>
    <div class="partner-child-container">
        <!--<join :joinType="'company'"></join>-->
        <div class="partners-container">
            <partner v-for="(partner,index) in partnerList" :partnerDetail="partner" :key="partner.user_id" :lastChild="index === partnerList.length-1"></partner>
            <div v-if="partnerList.length > 0 && !noMoreData" class="btn btn-default-border pointer" @click="getData">{{translate('loadMore')}}</div>
        </div>
    </div>
</template>

<script>
    import partner from '../../components/partner/partner.vue'
    import join from '../../components/partner/join.vue'
    import partnerMix from '../../mixins/partner/partner'

    export default {
        name: 'company',
        computed:{
            userType(){
                return this.$store.state.user.userType
            }
        },
        mixins:[partnerMix],
        data(){
            return{
                act:1
            }
        },
        messages:{
            en:{
                loadMore:'Load more'
            },
            zh:{
                loadMore:'加载更多'
            }
        },
        components:{
            join,
            partner
        }
    }
</script>