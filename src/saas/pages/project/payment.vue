<template>
    <div class="saas-payment-wrap">
        <saas-wrapper>
            <loading ref="loading">
                <saas-title :title="translate('payment')"></saas-title>
                <div class="form" v-if="msg">
                    <!--<tag tag="Contract"></tag>-->
                    <!--<a :href="msg.contract">Novaby contract</a>-->
                    <tag :tag="translate('order')"></tag>
                    <span>{{translate('on')}}: {{msg.order_no}}   </span>
                    <tag :tag="translate('payment')"></tag>
                    <span>{{translate('pm')}}: {{msg.pay_method}}</span>
                    <span>{{translate('pt')}}: {{new Date(msg.pay_time*1000).toString()}}</span>
                    <span>{{translate('pa')}}: {{msg.price}}</span>
                    <span>{{translate('ps')}}: {{translate('su')}}</span>
                </div>
                <div v-else class="empty">
                    <p class="text-center" style="line-height: 100px;color:#4A4A4A;margin-top:200px;">
                        <img src="../../../assets/images/result-none.png" alt="">
                        {{translate('wp')}}
                    </p>
                </div>
            </loading>
        </saas-wrapper>
    </div>
</template>
<script>
    import saasWrapper from '../../components/saasWrapper'
    import saasTitle from '../../components/saasTitle.vue'
    import tag from '../../../components/novahub/tag.vue'
    import loading from '../../components/loading.vue'
    export default {
        name:'saasPayment',
        data(){
            return {
                msg:''
            }
        },
        messages:{
            en:{
                order:'Order',
                payment:'Payment',
                on:'Order No',
                pm:'Payment method',
                pt:'Payment time',
                pa:'Payment amount',
                ps:'Payment status',
                wp:'Waiting for payment',
                su:'Successful'
            },
            zh:{
                order:'订单',
                payment:'支付信息',
                on:'订单号',
                pm:'支付方式',
                pt:'支付时间',
                pa:'支付金额',
                ps:'支付状态',
                wp:'等待支付',
                su:'支付成功'
            }
        },
        components:{
            saasTitle,
            tag,
            saasWrapper,
            loading
        },
        props:{
            id:{
                required:true
            }
        },
        created(){
            let data = {
                id:this.id
            };
            this.$store.dispatch('saas/getPayment',data).then((response) => {
                this.msg = response;
                this.$refs.loading.showSlots()
            })
        }
    }
</script>
<style lang="scss">
.saas-payment-wrap{
    .form{
        padding:25px 20px 20px;
        a{
            display: block;
            font-size: 14px;
            color: #EA6264;
            text-decoration: underline;
            margin-bottom:30px;
            &:before{
                content:'';
                display: inline-block;
                width:12px;
                height:22px;
                vertical-align: middle;
                background: url(../../../assets/images/attachments.png);
                margin-right:15px;
            }
        }
        span{
            display: block;
            margin-bottom:25px;
            font-size: 14px;
            color: #4A4A4A;
        }
    }
    .empty{
        display: flex;
        align-content: center;
        justify-content: center;
        height: 500px;
    }
}
</style>