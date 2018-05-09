<template>
    <div class="party-b-refuse">
        <p>You have refuse this project, please check more projects</p>
        <router-link :to="{name:'saasProjectsList'}">
            <div class="btn btn-default">Back to my projects</div>
        </router-link>
    </div>
</template>

<script>
    export default {
        name: 'party-b-refuse'
    }
</script>

<style scoped lang="scss">
    .party-b-refuse{
        text-align: center;
        padding-top: 288px;
        p{
            font-size: 22px;
            color: #4A4A4A;
        }
        .btn{
            width: 160px;
            height: 35px;
            line-height: 35px;
            margin-top: 65px;
        }
    }
</style>