<template lang="html">
    <div class="payment-container position-relative">
        <form @submit.prevent="handleSubmit">
            <p class="text-right">
                <button type="submit" class="save-btn btn-default btn" v-lang.save></button>
            </p>
            <div class="setting-payment-box auto">
                <p v-lang.pa></p>
                <input type="text" :placeholder="translate('emailAddress')" v-model="email"/>
                <input type="text" :placeholder="translate('accountName')" v-model="accountName"/>
            </div>
            <div class="form-note" v-show="noteStatus">{{vuerifyStr}}</div>
        </form>
    </div>
</template>

<script>
export default {
    name:'personalPayment',
    data(){
        return {
            email:'',
            accountName:'',
            vuerifyStr:'',
            noteStatus:false
        }
    },
    messages:{
        en:{
            pa:'Paypal account',
            email: 'The email address you entered is not valid',
            account: 'The account name you entered is incomplete'
        },
        zh:{
            pa:'paypal账户',
            email: '您输入了无效的电子邮件地址',
            account: '您输入的账户名称不完整'
        }
    },
    mounted(){
        this.$store.dispatch('wallet/PayPalMessage').then((response) => {
            if(response.code === 200) {
                this.email = response.data.data.paypal_email;
                this.accountName = response.data.data.paypal_name
            }
        })
    },
    methods:{
        handleSubmit() {
            let verifyList  = {
                email:{
                    test:'email',
                    value: this.email,
                    message: this.translate('email')
                },
                accountName:{
                    test:'required',
                    value: this.accountName,
                    message: this.translate('account')
                }
            };

            this.$verify(verifyList).then((response) => {
                if(response.res) {
                    let data = {
                        paypal_email:this.email,
                        paypal_name:this.accountName
                    };
                    this.$store.dispatch('wallet/changePayPal',data).then((response) => {
                        if(response.code === 200) {
                            this.vuerifyStr = response.msg;
                            this.noteStatus = true;
                            setTimeout(() => {this.noteStatus = false},1500)
                        }
                    })
                }
                else {
                    this.vuerifyStr = response.msg;
                    this.noteStatus = true;
                    let timer = setTimeout(() => {
                        this.noteStatus = false;
                        clearTimeout(timer)
                    },1500)
                }
            })
        }
    }
}
</script>

<style lang="scss">
.personal-warp{
    .payment-container{
        .setting-payment-box{
            width:100%;
            background: #FFFFFF;
            border: 1px solid #F1F1F1;
            border-radius: 5px;
            padding:30px 42px;
            >p{
                font-size: 16px;
                color: #515254;
            }
            [type=text]{
                display: block;
                width:470px;
                height: 36px;
                background-color: #fff;
                border: 1px solid #D2D2D2;
                border-radius: 2px;
                padding: 10px;
                font-size: 16px;
                margin-top:18px;
            }
        }
    }
}
</style>
