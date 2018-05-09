<template>
    <div class="saas-invite-wrap">
        <saas-wrapper>
            <loading ref="loading">
                <saas-title :title="translate('bs')"></saas-title>
                <div v-if="bidList.length">
                    <invite-List :input="false" :listData="bidList" @works="showLightbox" @payId="saveUser" :type="true"></invite-List>
                </div>
                <div class="result-none" v-else>
                    <div>
                        <p class="text-center">
                            <img src="../../../assets/images/result-none.png" alt="">
                            {{translate('wb')}}
                        </p>
                    </div>
                </div>
                <lightbox></lightbox>
                <div class="pop-wrap" v-if="popStatus">
                    <div class="pop-content">
                        <div class="pay">
                            <h6 class="text-center">Payment</h6>
                            <div class="pay-content">
                                <!--<p>Contract:<a :href="payMsg.contract">Novaby contract</a></p>-->
                                <p>Project time: <span>{{payMsg.apply_time}}</span> day</p>
                                <p>Subtotal: <span>{{payMsg.apply_price}}</span> USD</p>
                                <p>Payment Method:</p>
                                <div class="method">
                                    <div class="active">
                                        <img src="../../../assets/images/paypal.png" alt="" class="img-max">
                                    </div>
                                </div>
                            </div>
                            <div class="form-footer flex">
                                <button class="btn btn-default" @click="pay">Pay</button>
                                <button class="btn btn-default-border" @click="popStatus = false;payPopStatus = false">Cancel</button>
                            </div>
                        </div>
                        <!--<div class="contract" v-else>-->
                        <!--<h6 class="text-center">Novaby contract</h6>-->
                        <!--<div class="contract-cpontent">-->
                        <!--{{contractStr}}-->
                        <!--</div>-->
                        <!--<div class="form-footer flex">-->
                        <!--<button class="btn btn-default" @click="agree">Agree</button>-->
                        <!--<button class="btn btn-default-border" @click="popStatus = false">Disagree</button>-->
                        <!--</div>-->
                        <!--</div>-->
                    </div>
                </div>
            </loading>
        </saas-wrapper>
    </div>
</template>
<script>
    import {mapState} from 'vuex'
    import saasWrapper from '../../components/saasWrapper'
    import saasTitle from '../../components/saasTitle.vue'
    import loading from '../../components/loading.vue'
    import inviteList from '../../components/inviteList.vue'
    import lightbox from '../../../components/commons/lightbox.vue'
    export default {
        name:'saasSelect',
        data(){
            return {
                popStatus:false,
                payPopStatus:false,
                contractStr:"",
                userId:'',
                payMsg:{}
            }
        },
        messages:{
            en:{
                bs:'Bid & Select',
                wb:'Waiting for bids',

            },
            zh:{
                bs:'选择报价',
                wb:'等待报价'
            }
        },
        props:{
          id:{
              required:true
          }
        },
        components:{
            saasTitle,
            inviteList,
            lightbox,
            saasWrapper,
            loading
        },
        computed:{
            ...mapState('saas/invite',[
                'bidList'
            ])
        },
        created(){
            this.init()
        },
        methods:{
            async init(){
                await this.$store.dispatch('saas/invite/getBidList',{id:this.id});
                this.$refs.loading.showSlots()
            },
            showLightbox(val){
                this.$store.commit('lightbox/saveList',{list:val,index:0});
                this.$store.commit('lightbox/saveStatus',true)
            },
            saveUser(val){
                this.popStatus = true;
                this.userId = val.user_id
                this.payMsg = {
                    apply_price:val.apply_price,
                    apply_time:val.apply_price
                }
            },
            agree(){
                this.$store.dispatch('saas/invite/consentContract',{id:this.id,user_id:this.userId}).then((response) => {
                    this.payMsg = response.contract;
                    this.payPopStatus = true
                });
            },
            pay(){
                this.$store.commit('pay/paypal/openPayPalWindow',{proposalId:this.id,selectedId:this.userId})
            }
        }
    }
</script>
<style lang="scss">
.saas-invite-wrap{
    .result-none{
        background-color: #fff;
        div{
            height:868px;
            padding-top:200px;
            p{
                font-size: 24px;
                color: #4A4A4A;
                line-height: 103px;
                img{
                    margin-right:50px;
                }
            }
        }
    }
    .pop-wrap{
        position: fixed;
        width:100%;
        height:100%;
        background-color: rgba(0,0,0,0.5);
        top: 0;
        left:0;
        z-index:100;
        .pop-content{
            width:715px;
            background-color: #fff;
            position: absolute;
            transform: translate(-50%,-50%);
            top: 50%;
            left: 50%;
            h6{
                background: #F8F8F8;
                line-height: 62px;
                margin:0;
                padding:0;
                font-size: 22px;
                color: #4A4A4A;
                font-weight: normal;
            }
            .contract-content{
                padding:20px;
                max-height:765px;
                overflow: auto;
                font-size: 14px;
                color: #7A7A7A;
                line-height: 22px;
            }
            .pay-content{
                padding:35px;
                p{
                    font-size: 16px;
                    color: #515254;
                    margin-bottom:20px;
                }
                span{
                    font-size: 16px;
                    color: #7A7A7A;
                }
                a{
                    font-size: 16px;
                    color: #7A7A7A;
                    text-decoration: underline;
                }
                .method{
                    div{
                        width:210px;
                        height:125px;
                        border:1px solid #E8E8E8;
                        cursor: pointer;
                    }
                    .active{
                        border:1px solid #EA6264;
                    }
                }
            }
            .form-footer{
                padding:20px 0;
                border:1px solid #E8E8E8;
                .btn-default-border{
                    color: #EA6264 !important;
                }
                button{
                    width:112px;
                    height:30px;
                    font-size: 16px;
                    &:first-child{
                        margin-right:35px;
                    }
                }
            }
        }
    }
}
</style>