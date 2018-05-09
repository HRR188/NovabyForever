<template>
    <div class="head-portrait-warp">
        <!--<img :src="portraitUrl" alt="" class="portrait-img">-->
        <div :style="{'background-image':'url('+portraitUrl+')'}" class="portrait-img"></div>
        <img v-if="type === 3" src="../../assets/images/user-model-icon.png" class="user-status" :style="{width:width+'px',height:height+'px'}">
        <img v-if="type === 4" src="../../assets/images/business-icon.png" class="user-status" :style="{width:width+'px',height:height+'px'}">
    </div>
</template>

<script>
export default {
    name:'peoplePortrait',
    props:{
        portraitUrl:{
            required:true
        },
        type:{
            required:true
        },
        width:{
            required:true
        },
        height:{
            required:true
        }
    }
}
</script>

<style scoped lang="scss">
.head-portrait-warp{
    width:100%;
    height:100%;
    position: relative;
    .portrait-img{
        width:100% !important;
        height:100% !important;
        border-radius: 100%;
        border: 1px solid #D2D2D2;
        background-size: cover;
        background-position: center;
    }
    .user-status{
        position: absolute;
        right:0;
        top:0;
    }
}
</style>
