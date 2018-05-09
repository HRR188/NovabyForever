<template>
    <div class="share-content">
        <p class="">Share to</p>
        <ul>
            <li @click="share('facebook')">
                <img src="../../assets/images/facebook.png" alt="">
                <span>Facebook</span>
            </li>
            <li @click="share('twitter')">
                <img src="../../assets/images/twitter.png" alt="">
                <span>Twitter</span>
            </li>
            <li @click="share('linkedin')">
                <img src="../../assets/images/Instagram.png" alt="">
                <span>Linkedln</span>
            </li>
            <li @click="share('pinterest')">
                <img src="../../assets/images/pinterest.png" alt="">
                <span>Pinterest</span>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: 'model-detail-share-links',
        props: {
            id: {
                required: true
            },
            type: {
                default: 1
            }
        },
        created() {
            this.$store.dispatch('getShareLinks', {id: this.id, type: this.type})
        },
        methods: {
            share: function (name) {
                let vm = this
                if (this.$store.state.user.loginStatus) {
                    this.$store.dispatch('beforeShare', vm.id).then(function () {
                        window.open(vm.$store.state.share.links[name], '_blank')
                    })
                }
                else {
                    this.$logPop().then(function (response) {
                        if (response) {
                            vm.$store.dispatch('beforeShare', vm.id).then(function () {
                                window.open(vm.$store.state.share.links[name], '_blank')
                            })
                        }
                    })
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    .share-content {
        top: 24px;
        background: #FFFFFF;
        border: 1px solid #EFEFF1;
        box-shadow: 0 2px 13px 0 rgba(208, 208, 208, 0.50);
        border-radius: 4px;
        width: 129px;
        height: 200px;
        left: -21px;
        position: relative;
        &:before{
            width:0;
            height:0;
            border: 8px transparent solid;
            border-bottom-color: #EFEFF1;
            position:absolute;
            top:-16px;
            left:53px;
            content:"";
        }
        &:after{
            width:0;
            height:0;
            border: 8px transparent solid;
            border-bottom-color: #FFFFFF;
            position:absolute;
            top:-14px;
            left:53px;
            content:"";
        }
        > p {
            margin-top: 10px;
            margin-left: 10px;
            font-family: Helvetica;
            font-size: 12px;
            color: #95979A;
            text-align: left;
        }
        ul {
            margin-top: 15px;
            padding-left: 10px;
            padding-right: 10px;
        }
        li {
            width: 40px;
            height: 40px;
            cursor: pointer;
            display: flex;
            img {
                width: 24px;
                height: 24px;
            }
            span{
                position: absolute;
                left: 50px;
                margin-top: 5px;
                font-family: Helvetica;
                font-size: 14px;
                color: #515254;
            }
        }
    }
</style>