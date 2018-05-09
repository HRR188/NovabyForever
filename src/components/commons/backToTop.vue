<template>
    <!--<div class="back-to-top" @click="backToTop" v-show="backStatus"></div>-->
    <ul class="back-top-warp" v-show="backStatus" :class="{'yes-feebback':type}">
        <li class="top-arrow pointer" @click="backToTop">
            <img src="../../assets/images/icon-back-top.png" alt="">
        </li>
        <li class="feedback" v-if="type">
            <router-link to="/feedback" class="pointer">
                <img src="../../assets/images/icon-feedback.png" alt="">
            </router-link>
        </li>
    </ul>
</template>
<script>
import backTopFn from '../../mixins/backToTop/backToTop'
export default {
    name:'backToTop',
    mixins:[backTopFn],
    props:{
        type:{   //分别是否显示feedback
            default:false
        }
    }
}
</script>
<style lang="scss" scoped>
.back-top-warp{
    position: fixed;
    right: 35px;
    bottom: 70px;
    width:38px;
    padding:15px 0;
    background: #fff;
    box-shadow: 2px 14px 13px 0 rgba(227,227,227,0.50);
    border-radius: 100px;
    li{
        margin:0 auto;
        text-align: center;
    }
    .top-arrow{
        width:100%;
        height:8px;
    }
    .feedback{
        width:18px;
        margin-top:8px;
        border-top:1px solid  #F2F2F2;
        padding-top:8px;
    }
    &.yes-feebback{
        padding:15px 0 12px;
    }
}
</style>
