<template>
    <div class="saas-wrapper">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: 'saas-wrapper'
    }
</script>

<style scoped lang="scss">
.saas-wrapper{
    width: 100%;
    background-color: white;
    border-radius: 2px;
}
</style>