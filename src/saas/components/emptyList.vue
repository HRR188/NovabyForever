<template>
    <div class="empty-container">
        <img src="../../assets/images/saas/icon_noone.png" alt="">
        <p>No one in this list</p>
    </div>
</template>

<script>
    export default {
        name: 'empty-list'
    }
</script>

<style scoped lang="scss">
.empty-container{
    display: flex;
    align-content: center;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 145px;
    p{
        text-align: center;
        width: 100%;
        margin-top: 26px;
    }
}
</style>