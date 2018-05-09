<template>
    <div class="w-940 auto service-plans-warp">
        <!-- 步骤1 start -->
        <div v-if="step === 1">
            <h1 class="text-center">NovaHub plans</h1>
            <p class="text-center">Simple price, link the world</p>
            <div class="plans-instructions">
                <h5 class="text-center">Why NovaHub for your models ?</h5>
                <p>
                    Successful businesses know the importance of building and maintaining good working relationships, whether it is with partners, employees, business or trade organizations, the government, media representatives, vendors, consumers, or the community at large. A business must carefully balance the benefits of these interpersonal relationships and should never allow these relationships to blind their judgment especially when it relates to what is in the best interest of the business’s continued success and growth
                </p>
            </div>
            <ul class="service-choose flex">
                <li :class="item.className" v-for="(item,index) in planList">
                    <p class="title">{{item.name}}</p>
                    <div class="service-detail">
                        <div class="service-type">
                            <p>{{item.anno_nums}}</p>
                            <span>Annotations per scene</span>
                        </div>
                        <div class="service-type">
                            <p>{{item.space}}MB</p>
                            <span>Per upload</span>
                        </div>
                        <div class="note-icon" v-if="item.has_order"></div>
                        <p class="price" v-else>{{item.price}}</p>
                        <div class="btn-warp" v-if="!item.has_order">
                            <button class="btn" v-if="!loginStatus" @click="signInPop">Sign up</button>
                            <button class="btn" v-else @click="buy(item)">Upgrade</button>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <!-- 步骤1 end -->
        <!-- 步骤2 start -->
        <div v-if="step === 2">
            <h1 class="text-center">Buy NovaHub plans</h1>
            <div style="margin-top:62px">
                <tag tag="Select plan"></tag>
                <container class="select-plan">
                    <ul class="flex">
                        <li>
                            Plan:  <span>{{serviceMsg.name}}</span>
                        </li>
                        <li>
                            Annotations per scene: <span>{{serviceMsg.anno_nums}}</span>
                        </li>
                        <li>
                            Per upload:  <span>{{serviceMsg.space}}MB</span>
                        </li>
                    </ul>
                </container>
                <tag tag="Select cycle"></tag>
                <container class="select-cycle">
                    <span v-for="item in serviceTime" :class="{active:item.status}" @click="chooseMonth(item)">{{item.val}}</span>
                </container>
            </div>
            <div class="form-footer flex">
                <button class="btn btn-default-border btn-175" style="margin-right:60px" @click="backStep">Back</button>
                <button class="btn btn-default btn-175" :disabled="!nextStatus" @click="nextStep">Next</button>
            </div>
        </div>
        <!-- 步骤2 end -->
        <!-- 步骤3 start -->
        <div v-if="step === 3">
            <h1>Buy NovaHub plans</h1>
            <tag tag="Plan payment"></tag>
            <container class="plan-payment">
                <ul>
                    <li>
                        Plan:  <span>{{serviceMsg.name}}</span>
                    </li>
                    <li>
                        Cycle:  <span>{{month}} months</span>
                    </li>
                    <li>
                        Total:  <span>{{month * price}} Dollars</span>
                    </li>
                    <li>
                        <div>
                            <img src="../../assets/images/paypal.png" alt="">
                        </div>
                    </li>
                </ul>
            </container>
            <div class="form-footer flex">
                <button class="btn btn-default-border btn-175" style="margin-right:60px" @click="backStep">Back</button>
                <button class="btn btn-default btn-175" @click="openPayPal">Pay ${{month * price}} </button>
            </div>
        </div>
        <!-- 步骤3 end -->
    </div>
</template>

<script>
import tag from '../../components/novahub/tag.vue'
import container from '../../components/novahub/container.vue'
export default {
    name:'servicePlans',
    data(){
        return {
            step:1,
            planList:[],
            serviceMsg:{},
            serviceTime:[],
            price:'',
            month:0,
            planId:''
        }
    },
    computed:{
        loginStatus(){
            return this.$store.state.user.loginStatus
        },
        nextStatus(){
            if(this.month) {
                return true
            }
            else {
                return false
            }
        }
    },
    components:{
        tag,
        container
    },
    mounted(){
        this.requestPlanList()
    },
    methods:{
        signInPop:function () {
            this.$logPop().then((response) => {
                this.requestPlanList()
            })
        },
        requestPlanList(){
            this.$store.dispatch('service/planList').then((resolve) => {
                this.planList.splice(0,this.planList.length)
                resolve.data.plans.forEach((item,index) => {
                    if(index === 0) {
                        item.className = 'base-service'
                    }
                    else if (index === 1) {
                        item.className = 'silver-service'
                    }
                    else {
                        item.className = 'gold-service'
                    }
                    this.planList.push(item)
                })
            })
        },
        backStep(){
            this.step--
        },
        nextStep(){
            this.step++
        },
        buy(data){
            this.planId = data.id
            if(this.planId === 1) {
                this.$store.dispatch('service/planFree').then((response) => {
                    this.planList[0].has_order = 1
                })
            }
            else {
                this.$store.dispatch('service/planReview',{id:this.planId}).then((response) => {
                    this.serviceTime = []
                    if(response.code === 200) {
                        this.serviceMsg = response.data.plan
                        response.data.time.forEach((item,index) => {
                            item.status = false
                            this.serviceTime.push(item)
                        })
                        this.price = response.data.plan.price
                        this.step++
                    }
                })
            }
        },
        chooseMonth(data){
            this.serviceTime.forEach((item,index) => {
                item.status = false
            })
            data.status = true
            this.month = data.id
        },
        openPayPal(){
            this.$store.commit('pay/paypal/servicePay',{plan_id:this.planId,month:this.month})
        }
    }
}
</script>

<style lang="scss">
.service-plans-warp{
    h1{
        font-size: 30px;
        color: #515254;
        margin-top:78px;
        font-weight: normal;
    }
    h1+p{
        font-size: 16px;
        color: #7A7A7A;
        margin-top:15px;
    }
    .plans-instructions{
        background: #fff;
        border: 1px solid #E0E0E0;
        border-radius: 5px;
        padding:28px 30px;
        margin-top:50px;
        >h5{
            font-size: 18px;
            color: #181818;
            margin:0;
            font-weight: normal;
        }
        >p{
            font-size: 14px;
            color: #7A7A7A;
            margin-top:12px;
        }
    }
    .service-choose{
        margin-top:25px;
        justify-content: space-around;
        li{
            width:295px;
            height:475px;
            background: #fff;
            border-radius: 5px;
            overflow: hidden;
            .title{
                height:50px;
                line-height: 50px;
                font-size: 22px;
                color: #fff;
                text-align: center;
            }
            .service-detail{
                padding-top:35px;
                height:100%;
                border-left: 1px solid #E0E0E0;
                border-right: 1px solid #E0E0E0;
                border-bottom: 1px solid #E0E0E0;
                .price{
                    font-size: 20px;
                    color: #97999D;
                    text-align: center;
                    margin-top:45px;
                }
            }
            .service-type{
                width:242px;
                height:90px;
                margin-bottom:12px;
                margin-right:auto;
                margin-left: auto;
                border: 1px solid #BDBFC4;
                border-radius: 2px;
                p{
                    font-size: 26px;
                    color: #96989D;
                    text-align: center;
                    margin-top:15px;
                }
                span{
                    display: block;
                    width:100%;
                    margin-top:5px;
                    font-size: 16px;
                    color: #96989D;
                    text-align: center;
                }
            }
            .note-icon{
                width:46px;
                height:46px;
                margin-top:72px;
                margin-left: auto;
                margin-right: auto;
                background-image: url(../../assets/images/service-icon.png);
                background-repeat: no-repeat;
            }
            .btn-warp{
                display: flex;
                justify-content: center;
                margin-top:35px;
                button{
                    width:135px;
                    height:40px;
                    line-height: 40px;
                    font-size: 16px;
                    color: #fff;
                    border-radius: 100px;
                }
            }
        }
        .base-service{
            .title{
                background-color: #ACABAD;
                border-radius: 4px 4px 0 0;
            }
            .note-icon{
                background-position: 0 0;
            }
            .btn-warp{
                button{
                    background-color:#ACABAD;
                }
            }
        }
        .silver-service{
            .title{
                background-color: #C7CBD5;
                border-radius: 4px 4px 0 0;
            }
            .note-icon{
                background-position: -63px 0;
            }
            .btn-warp{
                button{
                    background-color:#C7CBD5;
                }
            }
        }
        .gold-service{
            .title{
                background-color: #E1CB98;
                border-radius: 4px 4px 0 0;
            }
            .note-icon{
                background-position: -126px 0;
            }
            .btn-warp{
                button{
                    background-color:#E1CB98;
                }
            }
        }
    }
    .select-plan{
        li{
            margin-right:80px;
            font-size: 16px;
            color: #515254;
            span{
                color:#7A7A7A;
            }
        }
    }
    .select-cycle{
        span{
            display: inline-block;
            width:102px;
            height:36px;
            line-height: 35px;
            border: 1px solid #9B9B9B;
            border-radius: 2px;
            font-size: 16px;
            color: #9B9B9B;
            text-align: center;
            cursor: pointer;
            margin-right:38px;
            &:hover{
                background-color:#EA6264;
                border:1px solid #EA6264;
                color:#fff;
            }
        }
        span.active{
            background-color:#EA6264;
            border:1px solid #EA6264;
            color:#fff;
        }
    }
    .plan-payment{
        li{
            color: #515254;
            margin-bottom:30px;
            &:last-child{
                margin-bottom:0;
            }
            span{
                color:#7A7A7A;
            }
            img{
                border: 2px solid #EA6264;
                border-radius: 5px;
            }
        }
    }
}
</style>
