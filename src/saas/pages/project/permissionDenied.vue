<template>
    <div class="permission-denied-container">
        <img src="../../../assets/images/saas/icon_permission_denied.png" alt="">
        <p v-lang.p></p>
    </div>
</template>

<script>
    export default {
        name: "permission-denied",
        messages:{
            en:{
                p:'You don\'t have permission to access this page, pls contact this project manager'
            },
            zh:{
                p:'你无权限查看这个页面, 请联系项目管理员'
            }
        }
    }
</script>

<style scoped lang="scss">
.permission-denied-container{
    width: 100%;
    height: calc(100vh - 100px);
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-content: center;
    p{
        width: 100%;
        text-align: center;
        color:#4a4a4a;
        font-size: 18px;
        margin-top: 30px;
    }
}
</style>