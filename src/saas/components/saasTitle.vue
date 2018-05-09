<template>
    <p class="saas-title">{{title}}</p>
</template>

<script>
    export default {
        name: 'saas-title',
        props:{
            title:{
                required:true,
                type:String
            }
        }
    }
</script>

<style scoped lang="scss">
    .saas-title{
        width: 100%;
        border-bottom: 1px solid #E8E8E8;
        padding-left: 20px;
        font-size: 16px;
        color: #4A4A4A;
        letter-spacing: 0;
        line-height: 47px;
    }
</style>