<template>
    <div class="partner-child-container">
        <!--<join :joinType="'artist'"></join>-->
        <div class="partners-container">
            <partner v-for="partner in partnerList" :partnerDetail="partner" :key="partner.user_id"></partner>
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
                act:0
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