<template>
    <section class="main">
        <div class="w-940 auto mywallet-container">
            <h1 class="text-center position-relative">
                {{translate('mw')}}
                <router-link to="/walletList" v-lang.wh></router-link>
            </h1>
            <template v-if="step === 1">
                <div class="balance flex">
                    <p v-lang.ba></p>
                    <div>$ {{money}}</div>
                </div>
                <p class="tips-note" style="margin-bottom:100px;">{{translate('tip')}}</p>
                <div class="form-footer flex">
                    <button class="btn btn-175 btn-default" :disabled="cashWithdrawalStatus" @click="cashWithdrawalFn" v-lang.wi></button>
                </div>
            </template>
            <template v-if="step === 2">
                <div class="cash-withdrawal">
                    <p>Cash Withdrawal Amount:</p>
                    <div class="money">
                        <input type="text" v-model="amount" v-amount/>USD
                    </div>
                    <p>Paypal account:</p>
                    <div class="account">
                        <template v-if="accountStatus">
                            <p>Account name:<span>{{payPalName}}</span></p>
                            <p>Email address:<span>{{payPalEmail}}</span></p>
                        </template>
                        <template v-else>
                            <router-link :to="{name:'personalPayMent',params:{id:userId}}">Add payment information</router-link>
                        </template>
                    </div>
                    <div class="tips-note">Tips：Writing A Good Headline For Your Advertisement</div>
                </div>
                <div class="border-box" style="margin-top:18px;"></div>
                <div class="form-footer flex">
                    <button class="btn btn-175 btn-default" :disabled="step2Btn" @click="cashWithdrawal()">Next</button>
                </div>
            </template>
            <template v-if="step === 3">
                <p class="waiting text-center">Withdraw in process（1-3 business days）</p>
                <p class="waiting-amount text-center">$ {{amount}}</p>
                <div class="border-box" style="margin-top:32px;"></div>
                <ul class="clearfix waiting-list">
                    <li>
                        <span>Paypal account name</span>
                        <span>{{payPalName}}</span>
                    </li>
                    <li>
                        <span>Paypal email address</span>
                        <span>{{payPalEmail}}</span>
                    </li>
                    <li>
                        <span>Withdraw time</span>
                        <span>{{Date(time*1000)}}</span>
                    </li>
                </ul>
            </template>
        </div>
    </section>
</template>
<script>
export default {
    name:'myWallet',
    computed:{
        userId(){
            return this.$store.state.user.userId
        }
    },
    data(){
        return {
            step:1,
            accountStatus:false,
            amount:'',
            money:'',
            cashWithdrawalStatus:true,
            step2Btn:true,
            payPalName:'',
            payPalEmail:'',
            time:0,
        }
    },
    messages:{
        en:{
            mw:'My wallet',
            wh:'Withdraw history',
            ba:'Balance',
            wi:'Withdraw',
            tip:'Tips：Writing A Good Headline For Your Advertisement'
        },
        zh:{
            mw:'我的钱包',
            wh:'提现历史记录',
            ba:'余额',
            wi:'提现',
            tip:'提示：为您的宣传写一个好标题'
        }
    },
    watch:{
        amount:function(val,oldval){
            let reg = /^[0-9]+([.]\d{1,2})?$/;
            if(reg.test(val)) {
                if(this.payPalName != '' && this.payPalEmail != '') {
                    this.step2Btn = false
                }
            }
            else {
                this.step2Btn = true
            }
        }
    },
    created(){
        this.$store.dispatch('wallet/PayPalMessage').then((response) => {
            this.money = response.data.data.wallet
            this.payPalName = response.data.data.paypal_name
            this.payPalEmail = response.data.data.paypal_email
            if(response.data.data.wallet > 0) {
                this.cashWithdrawalStatus = false
            }
            if(this.payPalName && this.payPalEmail) {
                this.accountStatus = true
            }
        })
    },
    methods:{
        cashWithdrawalFn(){
            this.step++
        },
        cashWithdrawal(){
            let data = {
                price:this.amount,
                paypal_email:this.payPalEmail,
                paypal_name:this.payPalName
            }
            this.$store.dispatch('wallet/withdrawal',data).then((response) => {
                if(response.code === 200) {
                    this.time = response.data.data.apply_time
                    this.step++
                }
            })
        }
    }
}
</script>
<style lang="scss">
.mywallet-container{
    >h1{
        padding:50px 0 38px 0;
        font-size: 30px;
        color: #515254;
        font-weight: normal;
        >a{
            position: absolute;
            font-size: 12px;
            color: #EA6264;
            display: inline-block;
            right:0;
            bottom:38px;
        }
    }
    .balance{
        padding:35px 52px;
        background-color:#fff;
        border: 1px solid #E0E0E0;
        border-radius: 4px;
        color: #515254;
        align-items: center;
        justify-content: space-between;
        >p{
            font-size: 22px;
        }
        >div{
            font-size: 30px;
        }
    }
    .tips-note{
        font-size: 12px;
        color: #ADADAD;
        margin-top:15px;
    }
    .cash-withdrawal{
        >p{
            font-size: 16px;
            color: #515254;
            margin-bottom:20px;
        }
        .money{
            font-size: 16px;
            color: #515254;
            input{
                background: #FFFFFF;
                border: 1px solid #D2D2D2;
                border-radius: 2px;
                width:155px;
                height:35px;
                font-size: 16px;
                color: #4A4A4A;
                padding:10px;
                display: inline-block;
                margin:0 10px 20px 0;
            }
        }
        .account{
            a{
                display: block;
                font-size: 16px;
                color: #EA6264;
                margin:30px 0 35px;
            }
            p{
                font-size: 16px;
                color: #7A7A7A;
                &:first-child{
                    margin-bottom:25px;
                }
                &:last-child{
                    margin-bottom:65px;
                }
            }
            span{
                display: inline-block;
                margin-left:15px;
            }
        }
    }
    .waiting{
        font-size: 18px;
        color: #4A4A4A;
        &:before{
            content:'';
            display: block;
            width:94px;
            height:94px;
            margin: 0 auto 25px;
            background:url(../../assets/images/projects-sprite.png) 0 -188px no-repeat;
        }
    }
    .waiting-amount{
        font-size: 30px;
        color: #515254;
        margin-top:22px;
    }
    .waiting-list{
        margin-top:82px;
        >li{
            float: left;
            width:100%;
            font-size: 16px;
            margin-bottom:25px;
            >span:first-child{
                color: #515254;
                float: left;
            }
            >span:last-child{
                color: #7A7A7A;
                float: right;
            }
        }
    }
}
</style>
