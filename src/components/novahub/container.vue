<template>
    <div class="custom-container">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: 'container'
    }
</script>

<style scoped lang="scss">
    .custom-container{
        padding:42px;
        background: #FFFFFF;
        border: 1px solid #F1F1F1;
        border-radius: 4px;
        margin-bottom: 34px;
        hr{
            border-top:none;
            border-bottom:1px solid #E1E1E1;
            margin:48px 0;
        }
        & .upload-row:last-child{
            margin-bottom: 0;
        }
    }
</style>