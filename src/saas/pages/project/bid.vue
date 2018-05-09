<template>
    <div class="saas-quote-wrap">
        <div class="title clearfix">
            <p class="float-left" v-lang.bid></p>
            <router-link :to="{name:'saasRequirement'}" class="float-right" v-if="status !== 5" v-lang.vs></router-link>
        </div>
        <!-- 甲方拒绝报价 start -->
        <div class="bid-price" v-if="status === 5">
            <p class="text-center">
                {{translate('time')}}:  <span>{{day}} Day</span>
                {{translate('quotes')}}:  <span>{{price}} USD</span>
            </p>
            <p class="text-center" v-if="language === 'zh'">
                对不起，你的报价没有被选中. 你可以去 <router-link to="">项目大厅</router-link> 查看更多项目
            </p>
            <p class="text-center" v-else>
                Sorry, your offer has not been accepted. You can go to <router-link to="">BIDDING GALLERY</router-link> for more projects
            </p>
        </div>
        <!-- 甲方拒绝报价 end -->

        <!-- 甲方接受报价 start -->
        <div class="bid-price" v-else-if="status === 3">
            <p class="text-center">
                {{translate('time')}}:  <span>{{day}} Day</span>
                {{translate('quotes')}}:  <span>{{price}} USD</span>
            </p>
            <p class="text-center" v-if="language === 'zh'">
                恭喜你报价已被选中! 现在你可以开始进行 <router-link :to="{name:'task'}">项目</router-link>.
            </p>
            <p class="text-center" v-else>
                Congratulations on having your proposal accepted! Now you can complete the <router-link :to="{name:'task'}">task</router-link>.
            </p>
        </div>
        <!-- 甲方接受报价 end -->

        <!-- 已发送报价，等待甲方选择 -->
        <div class="bid-price" v-else-if="status === 1">
            <p class="text-center">
                {{translate('time')}}:  <span>{{day}} Day</span>
                {{translate('quotes')}}:  <span>{{price}} USD</span>
            </p>
            <p class="text-center" v-if="language === 'zh'">
                报价已经发送
            </p>
            <p class="text-center" v-else>
                The quotation has been sent to the other party for confirmation
            </p>
            <div class="form-footer flex">
                <button class="btn btn-default-border" @click="status = 2" v-lang.mq></button>
            </div>
        </div>
        <!-- 已发送报价等待甲方选择 -->

        <!-- 添加报价信息 start -->
        <div v-else-if="status === 2">
            <div class="input-wrap">
                <div>
                    <span>{{translate('time')}}:</span>
                    <input type="text" v-model="day">
                    Day
                </div>
                <div>
                    <span>{{translate('quotes')}}:</span>
                    <input type="text" v-model="price">
                    USD
                </div>
            </div>
            <div class="form-footer flex">
                <button class="btn btn-default upp" @click="send" v-lang.submit></button>
            </div>
        </div>
        <!-- 添加报价信息 end -->
    </div>
</template>
<script>
    export default {
        name:'saasBid',
        data(){
            return {
                day:'',
                price:'',
                status:2
            }
        },
        messages:{
            en:{
                bid:'Bid',
                vs:'View Specifications',
                time:'Time',
                quotes:'Quotes',
                mq:'Modify the quotation'
            },
            zh:{
                bid:'报价',
                vs:'查看需求',
                time:'时间',
                quotes:'报价',
                mq:'编辑报价'
            }
        },
        props:{
            id:{
                required:true
            }
        },
        created(){
            this.$store.dispatch('saas/bid/getBidStatus',{id:this.id}).then((response) => {
                this.day = response.result.apply_time;
                this.price = response.result.apply_price;
                this.status = response.result.status;
            })
        },
        methods:{
            send(){
                this.$store.dispatch('saas/bid/sendBid',{id:this.id,time:this.day,price:this.price}).then((response) => {
                    if(response.code === 200) {
                        this.status = 1;
                    }
                })
            }
        }
    }
</script>
<style lang="scss">
.saas-quote-wrap{
    background-color:#fff;
    >.title{
        font-size: 16px;
        color: #4A4A4A;
        padding:15px 20px;
        border-bottom:1px solid #E8E8E8;
        a{
            font-size: 12px;
            color: #EA6264;
        }
    }
    .bid-price{
        height:235px;
        >p{
            padding-top:35px;
            font-size: 16px;
            color: #7A7A7A;
        }
        a{
            font-size: 16px;
            color: #EA6264;
            text-decoration: underline;
        }
        span{
            display: inline-block;
            margin-right:50px;
            font-size: 16px;
            color: #515254;
        }
    }
    .input-wrap{
        padding:40px 0 0 20px;
        font-size: 16px;
        color: #515254;
        div{
            margin-bottom:18px;
        }
        span{
            margin-right:0;
            display: inline-block;
            width:65px;
            line-height: 32px;
        }
        input{
            display: inline-block;
            width:178px;
            height: 32px;
            background: #fff;
            border: 1px solid #D2D2D2;
            border-radius: 2px;
            padding:5px 10px;
            font-size: 16px;
            color: #4A4A4A;
        }

    }
    .form-footer{
        padding:20px 0;
        margin-top:50px;
        border-top:1px solid #E8E8E8;
        .btn-default-border{
            width:195px;
            height:30px;
            font-size: 16px;
        }
        .btn-default{
            font-size: 16px;
            width:112px;
            height:30px;
        }
    }
}
</style>