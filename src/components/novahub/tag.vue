<template>
    <p class="novahub-tag upp" :class="{'no-border':noBorder}">{{tag}}</p>
</template>

<script>
    export default {
        name: 'tag',
        props:{
            tag:{
                required:true
            },
            noBorder:{
                type:Boolean,
                default:false
            }
        }
    }
</script>

<style lang="scss" scoped>
.novahub-tag{
    font-size: 14px;
    color: #181818;
    border-left: 4px solid #EA6264;
    padding-left: 10px;
    margin-bottom:20px;
    &.no-border{
        margin-top: 0;
        margin-bottom: 25px;
        border:none;
        padding-left:0;
    }
}
</style>
