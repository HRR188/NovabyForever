<template>
    <div v-show="isActive">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: 'tab',
        props:{
            name:{
                required:true
            },
            selected:{
                default:false
            },
            requireAuth:{
                default:false
            }
        },
        data(){
            return{
                isActive:false
            }
        }
    }
</script>

<style>

</style>
