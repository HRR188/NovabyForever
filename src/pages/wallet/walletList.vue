<template>
    <section class="main">
        <div class="w-940 auto mywallet-container">
            <h1 class="text-center position-relative">
                {{translate('wh')}}
                <router-link to="/wallet">{{translate('backWallet')}}</router-link>
            </h1>
            <div class="no-data text-center" v-if="noDataStatus">{{translate('bwh')}}</div>
            <div v-else>
                <ul class="cash-withdrawal-list">
                    <li v-for="item in list">
                        <div class="item-header">
                            <p>{{new Date(item.apply_time * 1000).toGMTString()}}</p>
                            <p>{{translate('transNum')}}. {{item.transaction_no}}</p>
                        </div>
                        <div class="item-body">
                            <p>{{translate('amount')}} : ${{item.amount}}</p>
                            <p>
                                {{translate('pea')}} : {{item.paypal_email}}
                                <span class="order-success" v-if="item.status === 1">{{translate('suc')}}</span>
                                <span class="order-failure"
                                      v-else-if="item.status === 2">{{translate('failure')}}</span>
                                <span class="order-process" v-else>{{translate('process')}}</span>
                            </p>
                            <p>{{translate('pan')}} : {{item.paypal_name}}</p>
                        </div>
                    </li>
                    <!-- <li>
                        <div class="item-header">
                            <p>Sydney UTC+3   13:32:12   4,Mar, 2017</p>
                            <p>Transaction No. 343943574895</p>
                        </div>
                        <div class="item-body">
                            <p>Amount : $200</p>
                            <p>
                                Paypal email address : djkfjj@gmail.com
                                <span class="order-failure">Failure</span>
                            </p>
                            <p>Paypal account name : jim</p>
                        </div>
                    </li>
                    <li>
                        <div class="item-header">
                            <p>Sydney UTC+3   13:32:12   4,Mar, 2017</p>
                            <p>Transaction No. 343943574895</p>
                        </div>
                        <div class="item-body">
                            <p>Amount : $200</p>
                            <p>
                                Paypal email address : djkfjj@gmail.com
                                <span class="order-process">In process</span>
                            </p>
                            <p>Paypal account name : jim</p>
                        </div>
                    </li> -->
                </ul>
                <div class="pagination-warp flex" style="margin-top:35px">
                    <paginate
                            :total="pages"
                            :page-size="10"
                            :show-page-num="5"
                            @listenerPage="receivePage">
                    </paginate>
                </div>
            </div>

        </div>
    </section>
</template>

<script>
    import paginate from '../../components/commons/paginate'

    export default {
        name: 'walletList',
        data() {
            return {
                pages: 5,
                noDataStatus: true,
                list: []
            }
        },
        created() {
            this.init()
        },
        messages: {
            en: {
                wh: 'Withdraw history',
                bwh: "You don't have any withdraw records",
                transNum: 'Transaction No',
                amount: 'Amount',
                pea: 'Paypal email address',
                pan: 'Paypal account name',
                suc: 'Successful',
                failure: 'Failure',
                process: 'In process',
                backWallet: 'Back to wallet'
            },
            zh: {
                wh: '提现历史记录',
                bwh: "您还没有任何提现记录",
                transNum: '交易编号',
                amount: '总计',
                pea: '贝宝电子邮件地址',
                pan: '贝宝帐户名称',
                suc: '成功',
                failure: '失败',
                process: '进行中',
                backWallet: '回到钱包'
            }
        },
        components: {
            paginate
        },
        methods: {
            async receivePage(page) {
                await this.$store.dispatch('wallet/withdrawalList', {page_size: 1, offset: page}).then((response) => {
                    if (response.code === 200) {
                        this.list = response.data.cashes;
                    }
                })
            },
            async init() {
                await this.$store.dispatch('wallet/withdrawalList', {
                    page_size: this.pages,
                    offset: 1
                }).then((response) => {
                    if (response.code === 200 && response.data.cashes.length > 0) {
                        this.noDataStatus = false;
                        this.list = response.data.cashes;
                        this.pages = response.data.count
                    }
                })
            }
        }
    }
</script>

<style lang="scss">
    .mywallet-container {
        .no-data {
            font-size: 16px;
            color: #9B9B9B;
            width: 100%;
            line-height: 190px;
            background: #fff;
            border: 1px solid #E0E0E0;
            border-radius: 4px;
        }
        .cash-withdrawal-list {
            li {
                background-color: #fff;
                font-size: 16px;
                color: #515254;
                margin-bottom: 20px;
                .item-header {
                    background: #F7F7F7;
                    border: 1px solid #E0E0E0;
                    border-radius: 5px 5px 0 0;
                    height: 52px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 0 20px;
                }
                .item-body {
                    padding: 5px 20px 20px;
                    border-left: 1px solid #E0E0E0;
                    border-right: 1px solid #E0E0E0;
                    border-bottom: 1px solid #E0E0E0;
                    border-bottom-left-radius: 5px;
                    border-bottom-right-radius: 5px;
                    p {
                        width: 100%;
                        margin-top: 15px;
                        > span {
                            float: right;
                            font-size: 14px;
                        }
                        .order-success {
                            color: #EA6264;
                        }
                        .order-failure {
                            color: #2CBE42;
                        }
                        .order-process {
                            color: #9B9B9B;
                        }
                    }
                }
            }
        }
    }
</style>
