<template>
    <h1 class="building-title">{{title}}</h1>
</template>

<script>
    export default {
        name: 'title',
        props:{
            title:{
                required:true
            }
        }
    }
</script>

<style scoped>
    .building-title{
        font-size: 24px;
        color: #515254;
        margin-top: 50px;
        margin-bottom: 60px;
        text-align: center;
        font-weight: 400;
    }
</style>
