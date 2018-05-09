<template>
    <div v-show="isActive">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: 'upload-tab',
        props:{
            name:{
                required:true
            },
            id:{
                required:true
            },
            currentStep:{
                required:true
            }
        },
        computed:{
            isActive:function () {
                return this.currentStep === this.id
            }
        }
    }
</script>

<style scoped>

</style>